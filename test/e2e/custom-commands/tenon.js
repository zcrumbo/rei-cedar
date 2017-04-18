const util = require('util');
const Tenon = require('tenon-node');

exports.command = function () {
  const FAILURE_MSG = '%s\n Description: %s\n Location: Line %d, Column %d\n Help: %s \n';
  const PASS_MSG = '%d Tenon a11y tests passed';
  const BP_URL = 'https://tenon.io/';
  const self = this;

  let source;

  self
    .source((results) => {
      source = results.value.trim();
    })
    .perform((client, done) => {
      const tenonTest = new Tenon({
        key: 'c8a0926f7aae28afadd49e9cbddd160c',
      });

      tenonTest.checkSrc(source, {
        projectID: 'DEFAULT_PROJECT',
        store: 0,
        appID: 'Cedar',
        ref: 1,
      }, (err, results) => {
        if (err) {
          self.verify.fail(null, null, util.format('Error with request: %s', err));
        } else if (results.resultSet.length) { // errors
          results.resultSet.forEach((violation) => {
            self.verify.fail(violation.errorTitle, violation.resultTitle, util.format(FAILURE_MSG, violation.errorTitle, violation.errorDescription, violation.position.line, violation.position.column, util.format(BP_URL, violation.tID, violation.bpID)));
          });
        } else {
          self.assert.ok(true, util.format(PASS_MSG, results.resultSummary.tests.passing));
        }

        done();
      });
    });


  return this;
};
