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
      try {
        const cosmetics = await GetCosmeticInfo();
        this.backgrounds = cosmetics.filter((item) => item.type === 0);
        this.backgroundImages = this.backgrounds.map((bg) => bg.value);
      } catch (e) {
        /* render empty */
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
