<template>
  <div>
    <!-- <h2>Star Wars API using DataTables version: {{version}}</h2> -->

    <cdr-data-table
      :col-headers="true"
      :row-headers="true"
      caption="Table with data fed from REST API using slots"
      id="slots-example"
      v-if="hasData"
    >
      <template slot="thead">
        <tr>
          <th
            class="empty"
            scope="col"
          />
          <th
            v-for="(columnName, colIndex) in fieldNames"
            :key="colIndex"
          >
            {{ columnName }}
          </th>
        </tr>
      </template>
      <template slot="tbody">
        <tr
          v-for="(record, index) in characters"
          :key="'tr_' + index"
        >
          <th>{{ record.name }}</th>
          <td
            v-for="(colData, key) in record"
            :key="key"
          >
            {{ colData }}
          </td>
        </tr>
      </template>
    </cdr-data-table>

    <cdr-data-table
      :col-headers="fieldNames"
      :row-headers="getRowHeaders"
      :row-data="characters"
      :key-order="fieldNames"
      caption="REST data fed using cdr api"
      id="derp"
      v-if="hasData"
    />
  </div>
</template>

<script>
import Components from 'componentsdir/_index';


export default {
  name: 'StarWars',
  components: Components,
  data() {
    return {
      characters: [],
      hasData: false,
    };
  },
  computed: {
    fieldNames() {
      return Object.keys(this.characters[0]);
    },
    getRowHeaders() {
      return this.characters.map(char => char.name);
    },
  },
  mounted() {
    fetch('https://swapi.co/api/people')
      .then(response => response.json())
      .then((json) => {
        this.characters = json.results;
        this.hasData = true;
      })
      .catch(err => console.log(err)); /* eslint-disable-line */
  },
};
</script>

<style>
.table-examples-wrapper {
  padding: 10px;
}

.table-examples-wrapper > div {
  margin-bottom: 40px;
}

/* Text meant only for screen readers. */
.screen-reader-text {
  border: 0;
  clip: rect(1px, 1px, 1px, 1px);
  clip-path: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
  word-wrap: normal;
}
</style>
