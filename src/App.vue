<template>
  <cdr-themer
    :theme="globalTheme"
    :background="globalTheme"
  >
    <div
      id="app"
      class="cdr-container-fluid"
    >
      <cdr-text
        tag="h1"
        modifier="heading-large"
      >
        Cedar Proving grounds
      </cdr-text>

      <cdr-radio
        name="theme-picker"
        value="lightest"
        v-model="globalTheme"
        @change="radioNavigate"
      >Light</cdr-radio>
      <cdr-radio
        name="theme-picker"
        value="dark"
        v-model="globalTheme"
        @change="radioNavigate"
      >Dark</cdr-radio>

      <router-link
        v-for="route in routes"
        :key="route.path"
        :to="route.path"
      >{{ route.name }} *
      </router-link>

      <links
        class="cpg-section"
        data-backstop="links"
      />
      <accordion
        class="cpg-section"
        data-backstop="accordion"
      />
      <breadcrumb
        class="cpg-section"
        data-backstop="breadcrumbs"
      />
      <buttons
        class="cpg-section"
        data-backstop="buttons"
      />
      <cta
        class="cpg-section"
        data-backstop="cta-links"
      />
      <cards class="cpg-section" />
      <!-- <card-content class="cpg-section"></card-content> -->
      <activity class="cpg-section" />
      <checkboxes
        class="cpg-section"
        data-backstop="checkboxes"
      />
      <data-table
        class="cpg-section"
        data-backstop="DataTable"
      />
      <grid class="cpg-section" />
      <texts class="cpg-section" />
      <icons
        class="cpg-section"
        data-backstop="icons"
      />
      <images class="cpg-section" />
      <searchbox
        class="cpg-section"
        data-backstop="search"
      />
      <inputs
        class="cpg-section"
        data-backstop="inputs"
      />
      <lists
        class="cpg-section"
        data-backstop="lists"
      />
      <mediaObject class="cpg-section" />
      <pagination class="cpg-section" />
      <radios
        class="cpg-section"
        data-backstop="radios"
      />
      <quote-example
        class="cpg-section"
        data-backstop="quote"
      />
      <ratings
        class="cpg-section"
        data-backstop="ratings"
      />
      <selects
        class="cpg-section"
        data-backstop="selects"
      />
      <tabs
        class="cpg-section"
        data-backstop="tabs"
      />
      <utilities class="cpg-section" />

      <caption-example
        class="cpg-section"
        data-backstop="caption"
      />

      <router-view />
    </div>
  </cdr-themer>
</template>

<script>
import examples from 'componentsdir/examples';
import compexamples from 'compositionsdir/examples';
import components from 'componentsdir/_index';
import routes from './router';


const all = Object.assign(components, {}, examples, compexamples);
export default {
  name: 'App',
  components: all,
  data() {
    return {
      routes,
      globalTheme: 'lightest',
    };
  },
  mounted() {
    if (this.$route.query['global-theme']) this.globalTheme = this.$route.query['global-theme'];
  },
  methods: {
    radioNavigate() {
      this.$router.replace({
        query: Object.assign(
          {},
          this.$route.query,
          { 'global-theme': this.globalTheme },
        ),
      });
    },
  },
};
</script>

<style scoped>
  .cpg-section {
    margin: 16px 0;
  }
</style>
