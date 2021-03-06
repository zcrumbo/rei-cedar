<template>
  <component
    :is="tag"
    :class="[
      modifierClass,
      buttonSizeClass,
      fullWidthClass,
      iconClass,
    ]"
    :type="tag === 'button' ? type : null"
    @click="onClick"
  >
    <!-- @slot for icon -->
    <slot name="icon" />
    <!-- @slot innerHTML on the inside of the button component -->
    <slot />
  </component>
</template>

<script>
import modifier from 'mixinsdir/modifier';
import size from 'mixinsdir/size';

/**
 * Cedar 2 component for button
 *
 * CdrButton will render either a button, or an anchor that looks like a button.
 * As such, the decision to use CdrButton vs CdrAnchor should be made based on what
 * you need the rendered element to look like.
 *
 * @author [REI Software Engineering](https://rei.github.io/rei-cedar/)
 */
export default {
  name: 'CdrButton',
  mixins: [modifier, size],
  props: {
    /**
     * Controls render as button or anchor. {button, a}
     */
    tag: {
      type: String,
      default: 'button',
      validator: value => (['button', 'a'].indexOf(value) >= 0) || false,
    },
    /**
     * Sets the button type. {button, submit, reset}
     */
    type: {
      type: String,
      default: 'button',
      validator: value => (['button', 'submit', 'reset'].indexOf(value) >= 0) || false,
    },
    /**
     * Adds custom click actions.
     */
    onClick: {
      type: Function,
      default: () => () => null,
    },
    /**
     * Sets width to be 100%.
    */
    fullWidth: {
      type: Boolean,
      default: false,
      validator: value => typeof value === 'boolean',
    },
    /**
     * Renders an icon-only button. Default slot is disabled. Overrides size and responsiveSize props.
     */
    iconOnly: {
      type: Boolean,
      default: false,
    },
    /**
     * Renders an icon-only button with a light fill color for use on dark backgrounds.
     * iconOnly must be true.
     */
    onDark: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    baseClass() {
      return 'cdr-button';
    },
    buttonSizeClass() {
      return !this.iconOnly ? this.sizeClass : null;
    },
    iconClass() {
      const classes = [];

      if (this.$slots.icon && this.$slots.default) {
        /* only add class for buttons with text + icon */
        classes.push(this.modifyClassName(this.baseClass, 'has-icon'));
      }

      if (this.iconOnly) {
        classes.push(this.modifyClassName(this.baseClass, 'icon-only'));

        if (this.onDark) {
          classes.push(this.modifyClassName(this.baseClass, 'on-dark'));
        }
      }
      return classes.join(' ');
    },
    fullWidthClass() {
      return this.fullWidth && !this.iconOnly
        ? this.modifyClassName(this.baseClass, 'full-width') : null;
    },
  },
};
</script>

<style module>
  @import 'cssdir/settings/_index.pcss';
  @import './styles/vars/CdrButton.vars.pcss';
  @import './styles/CdrButton.pcss';
</style>

<style>
  @import '@rei/cdr-icon/dist/cdr-icon.css';
</style>
