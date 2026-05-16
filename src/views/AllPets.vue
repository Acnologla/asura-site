<template>
  <CatalogPage
    :classes-data="pets"
    :sprites-data="petImages"
    detail-url-template="/pet?pet={index}"
    :eyebrow="$t('catalog.petsEyebrow')"
    :title-a="$t('catalog.petsTitleA')"
    :title-b="$t('catalog.petsTitleB')"
    :subtitle="$t('catalog.petsSub')"
    :count-word="$t('catalog.of')"
    :skip-leading404="false"
  />
</template>

<script>
import { GetPets } from "../trade/info.js";
import CatalogPage from "@/components/CatalogPage.vue";

export default {
  name: "AllPets",
  components: { CatalogPage },
  data() {
    return {
      pets: [],
      petImages: [],
    };
  },
  methods: {
    async load() {
      try {
        const petsPromises = GetPets();
        const petsData = await Promise.all(petsPromises);
        const validPets = petsData.filter((p) => p !== 1);
        this.pets = validPets.map((p) => ({
          name: p.name,
          rarity: p.rarity || 0,
          id: p.id,
          skills: p.skills || [],
        }));
        this.petImages = validPets.map((p) => p.sprite);
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
