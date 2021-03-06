<template>
  <!-- disable lint errors on line length in template -->
  <!-- eslint-disable max-len -->
  <transition
    name="fly"
    v-on="animationHooks"
  >
    <div
      v-show="active"
      :aria-hidden="!active"
      :class="[modifierClass]"
      ref="cdrTabPanelContainer"
      tabindex="0"
      role="tabpanel"
      @keydown.up.prevent="handleUpArrowNav"
      :key="name"
    >
      <slot />
    </div>
  </transition>
</template>

<script>
import modifier from 'mixinsdir/modifier';

export default {
  name: 'CdrTabPanel',
  mixins: [modifier],
  props: {
    /**
     * Required string value that shows up on tab header
     */
    name: {
      type: String,
      required: true,
    },
    /**
     * Optional extra reference value to be set on the tab, otherwise
     * the tab name will be used for reference.
     */
    id: String,
  },
  data() {
    return {
      active: false,
      offsetX: 0,
      tabId: this.id || this.name,
      animationDirection: 'default',
    };
  },
  computed: {
    baseClass() {
      return 'cdr-tab-panel';
    },
    animationHooks() {
      return {
        beforeEnter: this.setEnterStart,
        afterEnter: this.setEnterEnd,
        beforeLeave: this.setLeaveStart,
        afterLeave: this.setLeaveEnd,
        ...this.$listeners,
      };
    },
  },
  methods: {
    setActive(state) {
      this.active = state;
      this.$emit('tabChange', state, this.tabId);
    },
    setAnimationDirection(direction) {
      this.animationDirection = direction;
    },
    setOffsetX(x) {
      this.offsetX = x;
    },
    setEnterStart(element) {
      const el = element;
      el.style.animationDirection = 'reverse';
      el.style.animationTimingFunction = 'cubic-bezier(0.4, 0, 0.68, .06)';
      el.classList.add(this.animationDirection);
    },
    setEnterEnd(element) {
      const el = element;
      el.style.animationDirection = '';
      el.classList.remove(this.animationDirection);
    },
    setLeaveStart(element) {
      const el = element;
      el.classList.add(this.animationDirection);
      el.style.animationTimingFunction = 'cubic-bezier(0.32, 0.94, 0.6, 1)';
    },
    setLeaveEnd(element) {
      const el = element;
      el.classList.remove(this.animationDirection);
    },
    handleUpArrowNav() {
      this.$parent.setFocusToActiveTabHeader();
    },
  },
};
</script>

<style>
  @import '../../css/settings/_index.pcss';
  @import './styles/CdrTabPanel.pcss';
</style>
