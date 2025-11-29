<template>
  <div class="page-container">
    <div class="back-button">
      <b-button type="is-primary" @click="$router.push({ name: 'Pets' })">{{
        $t("pet.back")
      }}</b-button>
    </div>
    <div class="pet-detail" v-if="pet">
      <div class="container">
        <div class="card" :class="{ 'mythic-card': pet.rarity === 5 }">
          <div class="card-header">
            <h1 class="card-title">{{ pet.name }}</h1>
            <div
              class="rarity-badge"
              :style="{ backgroundColor: getRarityColor(pet.rarity) }"
            >
              {{ getRarityName(pet.rarity) }}
            </div>
          </div>

          <div class="pet-image-container">
            <div class="pet-image-wrapper">
              <img :src="pet.sprite" :alt="pet.name" class="pet-image" />
            </div>
          </div>

          <div class="card-content">
            <h2 class="section-title">{{ $t("pet.skills") }}</h2>
            <div class="columns is-multiline is-mobile skills-container">
              <div
                class="column is-full-mobile is-half-tablet is-one-third-desktop"
                v-for="(skill, i) in formattedSkills"
                :key="i"
              >
                <Skill
                  :skill="{ ...skill, level: i + 1 }"
                  class="skill-card"
                ></Skill>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from "../router/index.js";
import { GetPets } from "../trade/info.js";
import Skill from "@/components/Skill";

export default {
  name: "PetDetail",
  components: {
    Skill,
  },
  data() {
    return {
      pet: null,
      petId: null,
      effects: [],
      rarities: [
        {
          name: this.$t ? this.$t("selectMultiple.rarities.common") : "Comum",
          color: "#CDE3FF",
        },
        {
          name: this.$t ? this.$t("selectMultiple.rarities.rare") : "Raro",
          color: "#0000FF",
        },
        {
          name: this.$t ? this.$t("selectMultiple.rarities.epic") : "Epico",
          color: "#9400D3",
        },
        {
          name: this.$t
            ? this.$t("selectMultiple.rarities.legendary")
            : "Lendario",
          color: "#FF9000",
        },
        {
          name: this.$t
            ? this.$t("selectMultiple.rarities.special")
            : "Especial",
          color: "#FF4040",
        },
        {
          name: this.$t ? this.$t("selectMultiple.rarities.mythic") : "Mitico",
          color: "GRADIENT",
        },
        {
          name: this.$t ? this.$t("selectMultiple.rarities.god") : "Deus",
          color: "#FF00FF",
        },
      ],
      formattedSkills: [],
    };
  },
  methods: {
    getRarityName(rarityIndex) {
      return rarityIndex >= 0 && rarityIndex < this.rarities.length
        ? this.rarities[rarityIndex].name
        : "Comum";
    },
    getRarityColor(rarityIndex) {
      const color =
        rarityIndex >= 0 && rarityIndex < this.rarities.length
          ? this.rarities[rarityIndex].color
          : "#CDE3FF";

      if (color === "GRADIENT") {
        return "#b827fc";
      }

      return color;
    },
    formatPetSkills() {
      if (!this.pet || !this.pet.skills) return [];

      return this.pet.skills.map((skill) => {
        const formattedSkill = {
          name: skill.name,
          damage: skill.damage || [0, 0],
          level: 1,
        };

        if (skill.effect) {
          formattedSkill.effect = {
            chance: skill.effect[0],
            effect: this.effects[skill.effect[1]] || {
              name: "Effect",
              turns: 1,
              range: [0, 0],
              type: 1,
            },
          };
        } else {
          formattedSkill.effect = {
            chance: 0,
            effect: {
              name: "",
              turns: 0,
              range: [0, 0],
            },
          };
        }

        if (skill.self) {
          formattedSkill.self = true;
        }

        return formattedSkill;
      });
    },
  },
  async created() {
    this.petId = parseInt(this.$route.query.pet) + 1;

    if (!isNaN(this.petId)) {
      try {
        const locale = this.$i18n.locale || "pt";
        const effectsResponse = await fetch(
          `https://info.asurabot.com.br/effects.json?language=${locale}`
        );
        this.effects = await effectsResponse.json();

        const petsPromises = GetPets();
        const petsData = await Promise.all(petsPromises);

        const validPets = petsData.filter((pet) => pet !== 1);

        this.pet = validPets.find((pet) => pet.id === this.petId);

        if (this.pet) {
          this.formattedSkills = this.formatPetSkills();
        }
      } catch (error) {
        console.error("Error fetching pet data:", error);
      }
    }
  },
};
</script>

<style scoped>
.page-container {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  margin-top: 0px !important;
}

.pet-detail {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.container {
  width: 100%;
  max-width: 900px;
}

.card {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  background: white;
  margin-bottom: 2rem;
}

.mythic-card {
  position: relative;
}

.mythic-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border: 3px solid transparent;
  border-radius: 12px;
  background: linear-gradient(
      to bottom right,
      #b827fc 0%,
      #2c90fc 25%,
      #b8fd33 50%,
      #fec837 75%,
      #fd1892 100%
    )
    border-box;
  -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: destination-out;
  mask-composite: exclude;
  pointer-events: none;
}

.card-header {
  padding: 1rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #f0f0f0;
}

.card-title {
  font-family: "Rubik", sans-serif;
  font-size: 1.75rem;
  margin: 0;
  font-weight: 600;
  text-transform: capitalize;
}

.rarity-badge {
  padding: 0.5rem 1rem;
  border-radius: 20px;
  color: white;
  font-weight: bold;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

.pet-image-container {
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: #f8f8f8;
  border-bottom: 1px solid #f0f0f0;
}

.pet-image-wrapper {
  display: flex;
  justify-content: center;
  width: 280px;
  height: 280px;
}

.pet-image {
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.card-content {
  padding: 0.75rem 1.25rem 1.5rem;
}

.section-title {
  font-family: "Rubik", sans-serif;
  font-size: 1.5rem;
  margin: 0.5rem 0 1rem;
  color: #333;
  text-align: center;
}

.back-button {
  margin-top: 15px;
  margin-bottom: 1rem;
  text-align: left;
  align-self: left;
}

.skills-container {
  margin-top: 0.5rem;
}

.skill-card {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.columns.is-multiline {
  margin: -0.5rem;
}

.columns.is-multiline .column {
  padding: 0.5rem;
}

/* Dark mode styles */
[data-theme="dark"] .card,
[data-theme="dark"] .not-found-content {
  background-color: #2a2d32;
}

[data-theme="dark"] .pet-image-container {
  background-color: #222529;
}

[data-theme="dark"] .detail-item {
  background-color: #363a41;
}

[data-theme="dark"] .card-title,
[data-theme="dark"] .title,
[data-theme="dark"] .section-title,
[data-theme="dark"] .detail-value {
  color: #eceff4;
}

[data-theme="dark"] .detail-label {
  color: #adbac7;
}

[data-theme="dark"] .card-header,
[data-theme="dark"] .pet-image-container {
  border-bottom-color: #363a41;
}

@media (max-width: 768px) {
  .page-container {
    padding: 0.5rem;
  }

  .pet-image-wrapper {
    width: 290px;
    height: 290px;
  }
}
</style>
