<template>
  <div>
    <cdr-text
      tag="h2"
      modifier="heading-small"
    >
      Images
    </cdr-text>
    <div data-backstop="image-aspect-ratio">
      <cdr-text
        tag="h3"
        modifier="heading-small"
      >
        Aspect Ratios (with landscape images)
      </cdr-text>

      <ratios />
    </div>

    <div data-backstop="image-cropping">
      <cropping />
    </div>

    <div data-backstop="image-mods">
      <mods />
    </div>

    <div data-backstop="image-standard">
      <cdr-text
        tag="h3"
        modifier="heading-small"
      >
        Standard image
      </cdr-text>
      <cdr-img
        alt="ratio standard"
        src="http://placehold.it/200x200"
      />
      <cdr-img
        alt="standard landscape"
        src="http://placehold.it/350x150"
      />
      <cdr-img
        alt="standard portrait"
        src="http://placehold.it/150x350"
      />
    </div>
  </div>
</template>

<script>
import Components from 'componentsdir/_index';
import ratios from './demos/Ratios';
import cropping from './demos/Cropping';
import mods from './demos/Mods';

Components.ratios = ratios;
Components.cropping = cropping;
Components.mods = mods;

export default {
  name: 'Images',
  components: Components,
};
</script>
