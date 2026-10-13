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
import { GetAllPets } from "../trade/info.js";
import CatalogPage from "@/components/CatalogPage.vue";
import { markAppRendered } from "@/seo/render";

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
      let loaded = false;
      try {
        const pets = await GetAllPets();
        if (!Array.isArray(pets) || pets.length === 0) {
          throw new Error("Pet catalog response was incomplete.");
        }
        this.pets = pets.map((p) => ({
          name: p.name,
          rarity: p.rarity || 0,
          id: p.id,
          skills: p.skills || [],
        }));
        this.petImages = pets.map((p) => p.sprite);
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
