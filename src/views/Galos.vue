<template>
  <div>
    <Galos :classes="classes" @change="change"></Galos>
    <center>
      <h1 style="margin-top: -90px;font-family: Rubik;font-size: 32px">
        <div style="display:flex;justify-content: center;align-items:center">
          {{ this.classes[this.current + 1].name }}
          <Compare :compare="compare" :classes="classes" />
        </div>
      </h1>
      <br />
      <div class="columns is-variable is-centered cPrincipal">
        <card
          class="column is-three-quarters-mobile is-half-tablet is-one-third"
          type="Bom contra"
          :galos="findGood(this.current)"
        ></card>
        <card
          class="column is-three-quarters-mobile is-half-tablet is-one-third"
          type="Ruim contra"
          :galos="findBad(this.current)"
        ></card>
      </div>
      <b-button
        type="is-primary"
        style="margin-top: -15px;margin-bottom: 15px;"
        @click="scrollToSkins"
        >Skins</b-button
      >

      <!-- Passive Skill Section -->
      <div v-if="currentClass && currentClass.passive" class="passive-section">
        <h1 class="passive-title">
          <span class="passive-icon">✦</span> Habilidade Passiva
          <span class="passive-icon">✦</span>
        </h1>
        <div class="passive-card">
          <div class="passive-glow"></div>
          <div class="passive-content">
            <p class="passive-description">
              {{ currentClass.passive }}
            </p>
          </div>
        </div>
      </div>

      <h1 style="margin-bottom:20px;font-family: Rubik;font-size: 32px">
        Habilidades
      </h1>
      <br />
      <div class="columns is-multiline cPrincipal">
        <Skill
          class="column is-three-quarters-mobile is-half-tablet is-one-third-desktop is-one-quarter-widescreen is-one-quarter-fullhd"
          v-for="(skill, i) in skills"
          :key="i"
          :toCompare="toCompare[i]"
          :skill="skill"
        ></Skill>
      </div>

      <h1
        style="margin-top:40px;margin-bottom:20px;font-family: Rubik;font-size: 32px"
        id="skins-title"
      >
        Skins Disponíveis
      </h1>
      <div
        v-if="skins.length > 0"
        class="columns is-multiline is-centered cPrincipal"
      >
        <div
          v-for="(skin, i) in skins"
          :key="i"
          class="column is-one-mobile is-5-tablet is-one-quarter-desktop  is-one-quarter-widescreen is-one-fifth-fullhd"
        >
          <div class="skin-card" :style="getSkinCardStyle(skin)">
            <img :src="skin.value" :alt="skin.name" class="skin-image" />
            <h3 class="skin-name">{{ skin.name }}</h3>
            <span
              class="skin-rarity"
              :style="{ color: getRarityColor(skin.rarity) }"
            >
              {{ getRarityName(skin.rarity) }}
            </span>
          </div>
        </div>
      </div>
      <div v-else class="no-skins">
        <p>Sem skins disponíveis para este personagem</p>
      </div>
    </center>
  </div>
</template>

<style scoped>
.cPrincipal {
  margin-right: 30px;
  margin-left: 30px;
}

@media screen and (max-width: 768px) {
  .cPrincipal {
    margin-right: 0px;
    margin-left: 0px;
  }
}

.skin-card {
  border: 3px solid;
  border-radius: 8px;
  max-width: 350px;
  padding: 0.5rem;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.skin-card:hover {
  transform: translateY(-5px);
}

.skin-image {
  width: 100%;
  height: 200px;
  border-radius: 4px;
}

.skin-name {
  margin: 0.5rem 0;
  font-size: 1rem;
  text-align: center;
}

.skin-rarity {
  font-weight: bold;
}

.no-skins {
  padding: 20px;
  background: #f5f5f5;
  border-radius: 8px;
  margin-bottom: 40px;
}

/* Passive Skill Premium Styling */
.passive-section {
  margin: 40px auto;
  max-width: 900px;
  padding: 0 20px;
}

.passive-title {
  font-family: Rubik, sans-serif;
  font-size: 32px;
  text-align: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 25px;
  font-weight: 700;
  letter-spacing: 1px;
}

.passive-icon {
  color: #fbbf24;
  animation: sparkle 2s infinite;
  display: inline-block;
}

@keyframes sparkle {
  0%,
  100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.7;
    transform: scale(1.1);
  }
}

.passive-card {
  position: relative;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 16px;
  padding: 4px;
  box-shadow: 0 10px 40px rgba(102, 126, 234, 0.4);
  transition: all 0.3s ease;
  overflow: hidden;
}

.passive-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 50px rgba(102, 126, 234, 0.6);
}

.passive-glow {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 0.3) 0%,
    transparent 70%
  );
  animation: rotate-glow 8s linear infinite;
  pointer-events: none;
}

@keyframes rotate-glow {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.passive-content {
  position: relative;
  background: white;
  border-radius: 12px;
  padding: 35px 30px;
  text-align: center;
}

[data-theme="dark"] .passive-content {
  background: #2a2d32;
}

.passive-description {
  font-size: 18px;
  line-height: 1.8;
  color: #4b5563;
  max-width: 700px;
  margin: 0 auto;
  font-weight: 500;
}

[data-theme="dark"] .passive-description {
  color: #d8dee9;
}

@media screen and (max-width: 768px) {
  .passive-section {
    margin: 30px 20px;
  }

  .passive-title {
    font-size: 24px;
  }

  .passive-content {
    padding: 25px 20px;
  }

  .passive-description {
    font-size: 15px;
  }
}
</style>
<script>
import Galos from "@/components/Galos";
import Skill from "@/components/Skill";
import Card from "@/components/Card";
import Compare from "@/components/Compare";
import axios from "axios";
import { GetCosmeticInfo } from "../trade/info";
export default {
  name: "Home",
  data() {
    return {
      skills: [],
      current: 0,
      toCompare: [],
      classes: [, {}],
      effects: [],
      skins: [],
      rarities: [
        {
          name: "Comum",
          color: "#CDE3FF",
        },
        {
          name: "Raro",
          color: "#0000FF",
        },
        {
          name: "Epico",
          color: "#9400D3",
        },
        {
          name: "Lendario",
          color: "#FF9000",
        },
        {
          name: "Especial",
          color: "#FF4040",
        },
        {
          name: "Mitico",
          color: "GRADIENT",
        },
        {
          name: "Deus",
          color: "#FF00FF",
        },
      ],
    };
  },
  computed: {
    currentClass() {
      return this.classes[this.current + 1] || {};
    },
  },
  methods: {
    scrollToSkins() {
      const element = document.getElementById("skins-title");
      element.scrollIntoView({ behavior: "smooth" });
    },

    change(val) {
      this.current = val;
      this.$router.push({
        query: {
          galo: val,
        },
      });
      this.updateSkills();
      this.updateSkins();
    },
    async compare(galo) {
      const skills = await this.fetchSkills(galo);
      this.toCompare = skills;
    },
    findBad(galo) {
      if (!this.classes[galo + 1].disadvantages) return [];
      return this.classes[galo + 1].disadvantages.map(
        (disadvantage) => this.classes[disadvantage]
      );
    },
    findGood(galo) {
      return this.classes.filter((galoClass) => {
        if (!galoClass.disadvantages) return false;
        return galoClass.disadvantages.includes(galo + 1);
      });
    },
    fetchSkills(selectedClass) {
      return axios
        .get(`https://info.asurabot.com.br/attacks/${selectedClass.name}.json`)
        .then((skills) => {
          skills.data
            .filter((skill) => skill.effect)
            .forEach((skill) => {
              skill.effect = {
                chance: skill.effect[0],
                effect: this.effects[skill.effect[1]],
              };
            });
          return skills.data;
        });
    },
    async updateSkills() {
      const selectedClass = this.classes[this.current + 1];
      this.skills = await this.fetchSkills(selectedClass);
    },
    async updateSkins() {
      try {
        const response = await GetCosmeticInfo();
        this.skins = response.filter(
          (skin) => skin.type === 2 && skin.extra === this.current + 1
        );
      } catch (error) {
        console.error("Error fetching skins:", error);
        this.skins = [];
      }
    },
    getSkinCardStyle(skin) {
      const color = this.getRarityColor(skin.rarity);
      if (color === "GRADIENT") {
        return {
          borderImage:
            "linear-gradient(to bottom right, #b827fc 0%, #2c90fc 25%, #b8fd33 50%, #fec837 75%, #fd1892 100%)",
          borderImageSlice: 1,
        };
      }
      return { borderColor: color };
    },
    getRarityColor(rarityIndex) {
      return rarityIndex >= 0 && rarityIndex < this.rarities.length
        ? this.rarities[rarityIndex].color
        : "#CDE3FF";
    },
    getRarityName(rarityIndex) {
      return rarityIndex >= 0 && rarityIndex < this.rarities.length
        ? this.rarities[rarityIndex].name
        : "Comum";
    },
  },
  async created() {
    await axios
      .get("https://info.asurabot.com.br/class.json")
      .then((classes) => {
        this.classes = classes.data;
      });
    await axios
      .get("https://info.asurabot.com.br/effects.json")
      .then((effects) => {
        this.effects = effects.data;
      });
    if (this.$route.query.galo) {
      this.current = parseInt(this.$route.query.galo);
    }
    await this.updateSkills();
    await this.updateSkins();
  },
  components: {
    Galos,
    Skill,
    Card,
    Compare,
  },
};
</script>
