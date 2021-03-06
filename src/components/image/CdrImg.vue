<template>
  <!-- eslint-disable max-len -->
  <div
    v-if="ratio"
    :class="[$style['cdr-media-frame'], ratioClass, cropClass]"
  >
    <div
      :class="[coverClass, lazyClass, radiusClass]"
      :style="styleObject"
      aria-hidden="true"
      v-bind="lazyAttrs"
    />
    <img
      :class="[$style['cdr-media-frame__image'], $style['cdr-media-frame__image--hidden'], modifierClass, radiusClass]"
      :src="src"
      :alt="alt"
    >
  </div>
  <img
    v-else
    :class="[modifierClass, radiusClass, lazyClass]"
    :src="src"
    :alt="alt"
    v-bind="lazyAttrs"
  >
</template>

<script>
import modifier from 'mixinsdir/modifier';

/**
 * Cedar 2 component for image
 * <span class="modifiers">Modifiers</span>
 * {responsive}
 * @version 0.0.1
 * @author [REI Software Engineering](https://rei.github.io/rei-cedar/)
 */
export default {
  name: 'CdrImg',
  mixins: [modifier],
  props: {
    /**
     * Required. Image source url.
     */
    src: {
      type: String,
      required: true,
    },
    /**
     * Required. Image alt text.
     */
    alt: {
      type: String,
      default: ' ',
    },
    /**
     * Enable lazy loading.
     */
    lazy: {
      type: Boolean,
    },
    /**
     * Object of lazy options
     */
    lazyOpts: {
      type: Object,
      default: () => {},
    },
    /**
     * Aspect ratio of the media container. {auto, square, 1-2, 2-3, 3-4, 9-16, 2-1, 3-2, 4-3, 16-9}
     */
    ratio: {
      type: String,
      validator: value => ([
        'auto',
        'square',
        '1-2',
        '2-3',
        '3-4',
        '9-16',
        '2-1',
        '3-2',
        '4-3',
        '16-9'].indexOf(value) >= 0) || false,
    },
    /**
     * sm breakpoint and above
     */
    ratioSm: {
      type: String,
      validator: /* istanbul ignore next */ value => ([
        'auto', 'square', '1-2', '2-3', '3-4', '9-16', '2-1', '3-2', '4-3',
        '16-9'].indexOf(value) >= 0) || false,
    },
    /**
     * md breakpoint and above
     */
    ratioMd: {
      type: String,
      validator: /* istanbul ignore next */ value => ([
        'auto', 'square', '1-2', '2-3', '3-4', '9-16', '2-1', '3-2', '4-3',
        '16-9'].indexOf(value) >= 0) || false,
    },
    /**
     * lg breakpoint and above
     */
    ratioLg: {
      type: String,
      validator: /* istanbul ignore next */ value => ([
        'auto', 'square', '1-2', '2-3', '3-4', '9-16', '2-1', '3-2', '4-3',
        '16-9'].indexOf(value) >= 0) || false,
    },
    /**
     * Requires a `ratio`. Area to crop the image overflow to. {top, y-center, bottom} {left, x-center, right}
     */
    crop: {
      type: String,
    },
    /**
     * Requires a `ratio`. Scale the image to be as large as possible to fill the area (background-position: cover;)
     */
    cover: {
      type: Boolean,
    },
    /**
     * Sets a border radius to an element {square, top, right, bottom, left}
     */
    radius: {
      type: String,
      validator: /* istanbul ignore next */ value => ([
        'circle',
        'rounded'].indexOf(value) >= 0) || false,
    },
  },
  computed: {
    baseClass() {
      return 'cdr-image';
    },
    lazyClass() {
      const classObj = {};
      classObj['lazy-image'] = this.lazy;
      return classObj;
    },
    radiusClass() {
      const classObj = {};
      classObj[this.$style[`cdr-image--${this.radius}`]] = this.radius;
      return classObj;
    },
    ratioClass() {
      const classObj = {};
      classObj[this.$style[`cdr-media-frame--${this.ratio}`]] = this.ratio;
      classObj[this.$style[`cdr-media-frame--${this.ratioSm}@sm`]] = this.ratioSm;
      classObj[this.$style[`cdr-media-frame--${this.ratioMd}@md`]] = this.ratioMd;
      classObj[this.$style[`cdr-media-frame--${this.ratioLg}@lg`]] = this.ratioLg;
      return classObj;
    },
    coverClass() {
      const classObj = {};
      classObj[this.$style['cdr-media-frame__cover']] = true;
      classObj[this.$style['cdr-media-frame__cover--crop']] = this.crop;
      classObj[this.$style['cdr-media-frame__cover--cover']] = this.cover;
      return classObj;
    },
    cropClass() {
      const base = 'cdr-media-frame';
      const cropArr = this.crop ? this.crop.split(' ') : [];
      let final = [];

      final = final.concat(cropArr.map(mod => this.modifyClassName(base, mod)));

      return final.join(' ');
    },
    styleObject() {
      return {
        backgroundImage: `url(${this.src})`,
      };
    },
    lazyAttrs() {
      const attrObj = {};
      if (this.lazy) {
        Object.keys(this.lazyOpts).forEach((opt) => {
          attrObj[`data-${opt}`] = this.lazyOpts[opt];
        });
      }
      return attrObj;
    },
  },
};
</script>

<style module>
  @import 'cssdir/settings/_index.pcss';
  @import './styles/CdrImg.pcss';
</style>
