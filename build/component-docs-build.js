const path = require('path');
const semverDiff = require('semver-diff');
const semver = require('semver');
const fs = require('fs-extra');
const json2md = require('json2md');
const vueDocgen = require('vue-docgen-api');

const util = require('util');

/**
 * convert <cedar component>.vue file into JSON object
 * @param {String} file -- file path of raw Vue component file
 * @param {Object} info -- package.json
 */
function docsBuild(file, info) {
  console.log(`Processing file: ${file}\n`);
  const vueObj = vueDocgen.parse(file);

  let compDataObj = {
    "name": '',
    "api": {}
  };

  // calculate associated component names and paths
  const vueCompName = path.basename(file,'.vue'); // component file name
  const vueCompDirArr = path.dirname(file).split(path.sep);
  const vueCompDir = vueCompDirArr[vueCompDirArr.length - 1]; // component directory name (npm package name)

  // Determine version of current vue package based on its associated package.json file
  const currentDir = path.dirname(file) + path.sep;
  const compDataObjFilePath = `${currentDir}build${path.sep}component-data.json`;

  // If component versioned data object exists use existing object, if not create one and use that
  let compDataHistory;
  compDataHistory = fs.readJsonSync(compDataObjFilePath, {throws: false});
  
  if (compDataHistory == null) {
    console.log(`${compDataObjFilePath} doesn't exist. Creating new one.\n`);
    compDataHistory = {"pkgName": `${vueCompDir}`, "versions": [{components:[], version: info.version}]};
  }

  // create data objects for component props, events, methods, and slots
  const apiProm = new Promise((resolve, reject) => { resolve(buildAPIs(vueObj)) })
  .then( api => { 
    console.log(`Completed API data object for ${vueCompName}\n`);
    console.log(`${util.inspect(api)}`);
    Object.assign(compDataObj.api, api);
    compDataObj.name = `${vueCompName}`;
  })
  .catch( err => { console.log(`Error while trying to create API objects:\n${err}`) });

  // After all promises complete, add new component data object to history of component
  // If current version is in history array, replace that element with current 
  Promise.all([apiProm])
  .then(() => {
    let currVersionIdx = compDataHistory.versions.findIndex((element) => {
      return element.version === info.version;
    });
    
    // Adding new version to history of data object
    if (currVersionIdx == -1) {
      compDataHistory.versions.push({ "components":[...compDataObj], "version": info.version });
    } else {
      // Replacing API data for current version of the component
      let compIdx = compDataHistory.versions[currVersionIdx].components.findIndex( element => {
        return element.name == `${vueCompName}`;
      })
      compIdx == -1 ?
        compDataHistory.versions[currVersionIdx].components.unshift(compDataObj) : // this component not added yet
        compDataHistory.versions[currVersionIdx].components[compIdx] = compDataObj; // update already present component
    }

    return fs.outputJSON(compDataObjFilePath, compDataHistory, {spaces: '\t'});
  })
  .catch( err => {
    console.log(`Problem saving component history for ${vueCompName}:\n${err}`)
    process.exit(1)
  });
}

/**
 * build data objects for Vue props, methods, events, and slots
 * @param {Object} vueObj -- JSON object returned by vue-docgen-api library
 * @returns {Object} -- object representing different parts of component API
 */
function buildAPIs(vueObj) {
  const funcArray = [propsAPIObject, eventsAPIObject, slotsAPIObject, methodsAPIObject]

  const compAPIObj = funcArray.reduce((apiObj, curFn) => {
    const obj = curFn(vueObj)

    if (obj !== null) {
      Object.assign(apiObj.api, obj)
    }
    return apiObj
  }, {})
  
  return compAPIObj
}

/**
 * Create object representing component props
 * @param {Object} -- JSON object from vue-docgen-api library
 * @returns {Object} -- Object for component props that goes into Cedar Data Object
 */
function propsAPIObject(vueObj) {
  const propsObj = vueObj["props"] || {}

  let props = []
  
  // construct array of objects for props
  for (const prop in propsObj) {
    if (propsObj.hasOwnProperty(prop)) {
      // Don't document properties with `@ignore` tag
      if (propsObj[prop].tags.ignore) {
        continue
      }

      // object representing a single prop
      const ele = {
        "name": `${prop}`,
        "type": propsObj[prop]["type"] ? propsObj[prop]["type"]["name"] : 'unknown',
        "default": (propsObj[prop]["defaultValue"] && propsObj[prop]["defaultValue"] !== " ") ? 
          propsObj[prop]["defaultValue"]["value"] : 'n/a',
        "description": `${propsObj[prop]["description"] || 'MISSING DESCRIPTION'}`
      }
      props.push(ele)
    }
  }
  return props.length > 0 ? {props} : null
}

/**
 * Create object representing component public methods
 * @param {Object} -- JSON object from vue-docgen-api library
 * @returns {Object} -- Object for component methods that goes into Cedar Data Object
 */
function methodsAPIObject(vueObj) {
  const methodsArr = vueObj["methods"] || []
  let methods = []
  
  // construct array of objects for public methods
  methodsArr.forEach((method) => {
    const ele = {
      "name": `${method["name"]}`,
      "parameters": `${method["params"].reduce((paramList, param) => {
          paramList += `${param["name"]}: ${param["type"]["name"]} - ${param["description"]}\n`
          return paramList
      }, '')}`,
      "description": `${method["description"] || 'MISSING DESCRIPTION'}`
    }
    methods.push(ele)
  })
  return methods.length > 0 ? {methods} : null
}

/**
 * Create object representing component events
 * @param {Object} -- JSON object from vue-docgen-api library
 * @returns {Object} -- Object for component events that goes into Cedar Data Object
 */
function eventsAPIObject(vueObj) {
  const eventsObj = vueObj["events"] || {}
  let events = []

  for (const evt in eventsObj) {
    if (eventsObj.hasOwnProperty(evt)) {
      const ele = {
        "name": `${evt}`,
        "type": `${eventsObj[evt]["type"]["names"].reduce((typeList, type, idx, arr) => {
          typeList += `${type}${arr[idx+1] ? `|` : ''}`
          return typeList
        }, '')}`,
        "description": `${eventsObj[evt]["description"] || 'MISSING DESCRIPTION'}`
      }
      events.push(ele)
    }
  }
  return events.length > 0 ? {events} : null
}

/**
 * Create object representing component slots
 * @param {Object} -- JSON object from vue-docgen-api library
 * @returns {Object} -- Object for component slots that goes into Cedar Data Object
 */
function slotsAPIObject(vueObj) {
  slotsObj = vueObj["slots"] || {}
  let slots = []
  
  for (const slot in slotsObj) {
    if (slotsObj.hasOwnProperty(slot)) {
      const ele = {
        "name": `${slot}`,
        "description": `${slotsObj[slot]["description"] || 'MISSING DESCRIPTION'}`
      }
      slots.push(ele)
    }
  }
  return slots.length > 0 ? {slots} : null
}

module.exports = docsBuild