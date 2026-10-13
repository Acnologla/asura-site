<template>
  <CatalogPage
    :classes-data="backgrounds"
    :sprites-data="backgroundImages"
    detail-url-template="/background?background={index}"
    :eyebrow="$t('catalog.bgEyebrow')"
    :title-a="$t('catalog.bgTitleA')"
    :title-b="$t('catalog.bgTitleB')"
    :subtitle="$t('catalog.bgSub')"
    :count-word="$t('catalog.of')"
    :grid-cols="3"
    :item-width="450"
    :item-height="200"
    :skip-leading404="false"
  />
</template>

<script>
import { GetCosmeticInfo } from "../trade/info.js";
import CatalogPage from "@/components/CatalogPage.vue";
import { markAppRendered } from "@/seo/render";

export default {
  name: "AllBackgrounds",
  components: { CatalogPage },
  data() {
    return {
      backgrounds: [],
      backgroundImages: [],
    };
  },
  methods: {
    async load() {
      let loaded = false;
      try {
        const cosmetics = await GetCosmeticInfo();
        if (!Array.isArray(cosmetics) || cosmetics.length === 0) {
          throw new Error("Background catalog response was incomplete.");
        }
        this.backgrounds = cosmetics.filter((item) => item.type === 0);
        this.backgroundImages = this.backgrounds.map((bg) => bg.value);
        loaded = true;
      } catch (e) {
        /* render empty */
      } finally {
        if (loaded) {
          await this.$nextTick();
          markAppRendered();
        }
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
