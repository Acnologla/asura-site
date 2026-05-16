<template>
  <CatalogPage
    :classes-data="classes"
    :sprites-data="sprites"
    detail-url-template="/galo?galo={index}"
    :eyebrow="$t('catalog.galosEyebrow')"
    :title-a="$t('catalog.galosTitleA')"
    :title-b="$t('catalog.galosTitleB')"
    :subtitle="$t('catalog.galosSub')"
    :count-word="$t('catalog.of')"
  />
</template>

<script>
import axios from "axios";
import CatalogPage from "@/components/CatalogPage.vue";

export default {
  name: "AllGalos",
  components: { CatalogPage },
  data() {
    return {
      classes: [],
      sprites: [],
    };
  },
  methods: {
    async load() {
      const locale = this.$i18n.locale || "pt";
      try {
        const [s, c] = await Promise.all([
          axios.get(
            `https://info.asurabot.com.br/sprites.json?language=${locale}`
          ),
          axios.get(
            `https://info.asurabot.com.br/class.json?language=${locale}`
          ),
        ]);
        this.sprites = s.data[0];
        this.classes = c.data;
      } catch (e) {
        /* page renders empty on failure */
      }
    },
  },
  watch: {
    "$i18n.locale"() {
      this.load();
    },
  },
  created() {
    this.load();
  },
};
</script>
