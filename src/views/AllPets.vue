<template>
  <div>
    <character-grid
      :classes-data="pets"
      :sprites-data="petImages"
      detail-url-template="/pet?pet={index}"
    />
  </div>
</template>

<script>
import { GetPets } from "../trade/info.js";
import CharacterGrid from "@/components/SelectMultiple.vue";

export default {
  name: "AllPets",
  components: {
    CharacterGrid,
  },
  data() {
    return {
      pets: [],
      petImages: [],
    };
  },
  async created() {
    try {
      const petsPromises = GetPets();
      const petsData = await Promise.all(petsPromises);

      const validPets = petsData.filter((pet) => pet !== 1);

      this.pets = validPets.map((pet) => ({
        name: pet.name,
        rarity: pet.rarity || 0,
        id: pet.id,
        skills: pet.skills || [],
      }));

      this.petImages = validPets.map((pet) => pet.sprite);
    } catch (error) {
      console.error("Error fetching pets data:", error);
    }
  },
};
</script>
