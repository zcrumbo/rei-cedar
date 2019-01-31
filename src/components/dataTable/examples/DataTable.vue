<template>
  <div>
    <cdr-text
      tag="h2"
      modifier="heading-small"
    >
      Tables
    </cdr-text>
    <!-- <all-headers />
    <no-col-headers />
    <no-headers />
    <variants />
    <content-resilience /> -->
    <star-wars />
  </div>
</template>

<script>
/* eslint-disable */
import Components from 'componentsdir/_index';
import AllHeaders from './demo/AllHeaders';
import NoColHeaders from './demo/NoColHeaders';
import NoHeaders from './demo/NoHeaders';
import Variants from './demo/Variants';
import ContentResilience from './demo/ContentResilience';
import StarWars from './demo/StarWars';

export default {
  name: 'Tables',
  components: {
    ...Components,
    AllHeaders,
    NoColHeaders,
    NoHeaders,
    Variants,
    ContentResilience,
    StarWars,
  },
};
</script>
