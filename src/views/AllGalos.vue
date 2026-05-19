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
import { GetClasses, GetSprites } from "@/trade/info";
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
      try {
        const [sprites, classes] = await Promise.all([GetSprites(), GetClasses()]);
        this.sprites = sprites[0];
        this.classes = classes;
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
