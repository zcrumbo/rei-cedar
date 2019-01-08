<template>
  <tr
    ref="row"
    :style="{ height: `${height}px` }"
  >
    <th
      ref="row-header"
      scope="row"
      :style="{ height: `${height}px` }"
    >
      {{ rowHeader }}
    </th>
    <td
      v-for="(key, index) in keyOrder"
      :key="id + '_' + index + '_' + key"
    >
      {{ getCellContent(rowData, key) }}
    </td>
  </tr>
</template>

<script>

/**
 * Cedar 2 compfor for data table
 * @author [REI Software Engineering](https://rei.github.io/rei-cedar/)
 */
export default {
  name: 'CdrDataTableRow',
  props: {
    rowData: {
      type: Object,
    },
    rowHeader: {
      type: String,
    },
    keyOrder: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      height: 0,
    };
  },
  mounted() {
    const rowHeaderHeight = this.$refs['row-header'].clientHeight;
    const rowContentHeight = this.$refs['row'].clientHeight; /* eslint-disable-line */

    this.height = rowHeaderHeight > rowContentHeight ? rowHeaderHeight : rowContentHeight;
  },
  methods: {
    getCellContent(rowData, key) {
      return rowData[key] || '';
    },
  },
};
</script>
