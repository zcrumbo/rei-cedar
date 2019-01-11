<template>
  <tr
    class="cdr-data-table-row"
    ref="row"
  >
    <th
      class="empty"
      scope="col"
      v-if="headerRow"
    />
    <slot>
      <th
        ref="row-header"
      >
        Hello I'm a th
      </th>
    </slot>
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
    headerRow: {
      type: Boolean,
      default: false,
    },
    updateHeight: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      rowHeight: null,
    };
  },
  computed: {
    alignHeight() {
      return this.rowHeight;
    },
  },
  mounted() {
    this.rowHeight = this.$el.clientHeight;

    console.log('cdrDataTableRow mounted'); /* eslint-disable-line */
    this.$emit('handleSize', 'more info');
  },
  methods: {
    setHeight() {
      this.rowHeight = this.$el.clientHeight;
    },
  },
};
</script>
