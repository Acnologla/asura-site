<template>
  <CatalogPage
    :classes-data="classes"
    :sprites-data="sprites"
    :detail-url-for-item="detailPath"
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
import { roosterPath } from "@/seo/roosters";
import { markAppRendered } from "@/seo/render";

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
      let loaded = false;
      try {
        const [sprites, classes] = await Promise.all([GetSprites(), GetClasses()]);
        if (
          !Array.isArray(classes) ||
          classes.length < 2 ||
          !Array.isArray(sprites) ||
          !Array.isArray(sprites[0]) ||
          sprites[0].length === 0
        ) {
          throw new Error("Rooster catalog response was incomplete.");
        }
        this.sprites = sprites[0];
        this.classes = classes;
        loaded = true;
      } catch (e) {
        /* page renders empty on failure */
      } finally {
        if (loaded) {
          await this.$nextTick();
          markAppRendered();
        }
      }
    },
    detailPath(item, index) {
      return roosterPath(item, index);
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
