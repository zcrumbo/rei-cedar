<template>
  <!-- eslint-disable max-len -->
  <component
    :is="href ? 'a' : 'div'"
    :href="href"
    :class="[
      contentPriorityClass,
      sizeClass,
      space,
      href ? $style['cdr-rating--linked'] : '',
    ]"
  >
    <div :class="$style['cdr-rating__background']">
      <span
        :class="[
          $style['cdr-rating__icon'],
          count > 0 ? $style['cdr-rating__placeholder'] : $style['cdr-rating__placeholder--no-reviews'],
        ]"
        v-for="n in 5"
        :key="n"
        aria-hidden="true"
      />
    </div>
    <div :class="$style['cdr-rating__ratings']">
      <span
        :class="[$style['cdr-rating__icon'], $style['cdr-rating__100']]"
        v-for="n in whole"
        :key="n"
        aria-hidden="true"
      />
      <span
        v-if="remainder === '25'"
        :class="[$style['cdr-rating__icon'], $style['cdr-rating__25']]"
        aria-hidden="true"
      />
      <span
        v-else-if="remainder === '50'"
        :class="[$style['cdr-rating__icon'], $style['cdr-rating__50']]"
        aria-hidden="true"
      />
      <span
        v-else-if="remainder === '75'"
        :class="[$style['cdr-rating__icon'], $style['cdr-rating__75']]"
        aria-hidden="true"
      />
    </div>
    <span
      v-if="count"
      aria-hidden="true"
      :class="$style['cdr-rating__count']"
    ><span
      v-if="href"
      :class="$style['cdr-rating__number']"
    >{{ rounded }}</span><span>{{ formattedCount }}</span><span v-if="!compact">
      Reviews
    </span></span>
    <span
      class="cdr-sr-only"
    >rated {{ rounded }} out of 5 with {{ count }} reviews</span>
  </component>
</template>

<script>
import contentPriority from 'mixinsdir/contentPriority';
import size from 'mixinsdir/size';
import space from 'mixinsdir/space';
/**
 * Cedar 2 component for rating
 * Ratings are rounded to nearest .25 for displaying stars.
 * <span class="modifiers">Modifiers</span>
 * Modifiers can be combined 1 from each grouping.
 * {small, medium, large}
 * Default is large
 * @version 0.0.1
 * @author [REI Software Engineering](https://rei.github.io/rei-cedar/)
 */
export default {
  name: 'CdrRating',
  mixins: [
    contentPriority,
    size,
    space,
  ],
  props: {
    /**
     * Rating value (out of 5)
     */
    rating: {
      required: true,
      type: [String, Number],
      default: 0,
    },
    /**
     * Total number of ratings
     */
    count: {
      required: false,
      type: [String, Number],
      default: 0,
    },
    /**
     * Hides the word 'reviews' if true
     */
    compact: {
      type: Boolean,
      default: false,
    },
    /**
     * Allows the ratings to act as a link
     */
    href: {
      type: String,
    },
  },
  computed: {
    baseClass() {
      return 'cdr-rating';
    },
    rounded() {
      return Math.round(this.rating * 4) / 4;
    },
    whole() {
      return Math.floor(this.rounded);
    },
    remainder() {
      return this.rounded.toFixed(2).split('.')[1];
    },
    formattedCount() {
      return this.compact ? `(${this.count})` : `${this.count}`;
    },
  },
};
</script>

<style module>
  @import 'cssdir/settings/_index.pcss';
  @import './styles/vars/CdrRating.vars.pcss';
  @import './styles/CdrRating.pcss';
</style>
