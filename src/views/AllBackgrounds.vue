<template>
  <div>
    <character-grid
      :classes-data="backgrounds"
      :sprites-data="backgroundImages"
      :itemWidth="450"
      :itemHeight="200"
      detail-url-template="/background?background={index}"
    />
  </div>
</template>

<script>
import { GetCosmeticInfo } from "../trade/info.js";
import CharacterGrid from "@/components/SelectMultiple.vue";

export default {
  name: "AllBackgrounds",
  components: {
    CharacterGrid,
  },
  data() {
    return {
      backgrounds: [],
      backgroundImages: [],
    };
  },
  async created() {
    const cosmetics = await GetCosmeticInfo();
    this.backgrounds = cosmetics.filter((item) => item.type === 0);

    this.backgroundImages = this.backgrounds.map((bg) => bg.value);
  },
};
</script>
