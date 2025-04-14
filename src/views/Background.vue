<template>
  <div class="page-container">
    <div class="back-button">
      <b-button type="is-primary" @click="$router.push({ name: 'Backgrounds' })"
        >Voltar</b-button
      >
    </div>
    <div class="background-detail" v-if="background">
      <div class="container">
        <div class="card" :class="{ 'mythic-card': background.rarity === 5 }">
          <div class="card-header">
            <h1 class="card-title">{{ background.name }}</h1>
            <div
              class="rarity-badge"
              :style="{ backgroundColor: getRarityColor(background.rarity) }"
            >
              {{ getRarityName(background.rarity) }}
            </div>
          </div>

          <div class="card-image">
            <figure class="image">
              <img :src="background.value" :alt="background.name" />
            </figure>
          </div>

          <div class="card-content">
            <div class="details-section">
              <div class="detail-item">
                <span class="detail-label">Type:</span>
                <span class="detail-value">Background</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { GetCosmeticInfo } from "../trade/info.js";

export default {
  name: "BackgroundDetail",
  data() {
    return {
      background: null,
      backgroundId: null,
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
    getGradientStyle() {
      return {
        background:
          "linear-gradient(to right, #b827fc, #2c90fc, #b8fd33, #fec837, #fd1892)",
      };
    },
  },
  async created() {
    this.backgroundId = parseInt(this.$route.query.background);

    if (!isNaN(this.backgroundId)) {
      try {
        const cosmetics = await GetCosmeticInfo();
        const backgrounds = cosmetics.filter((item) => item.type === 0);

        this.background = backgrounds[this.backgroundId + 1];
      } catch (error) {
        console.error("Error fetching background:", error);
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
}

.background-detail {
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
  padding: 1.5rem;
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
}

.rarity-badge {
  padding: 0.5rem 1rem;
  border-radius: 20px;
  color: white;
  font-weight: bold;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

.card-image {
  width: 100%;
  overflow: hidden;
}

.image {
  margin: 0;
  display: flex;
  justify-content: center;
}

.back-button {
  margin-top: 15px;
  margin-bottom: 1rem;
  text-align: left;
  align-self: left;
}

.image img {
  width: auto;
  height: auto;
  max-width: 100%;
}

.card-content {
  padding: 1.5rem;
}

.details-section {
  display: flex;
  justify-content: center;
}

.detail-item {
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  background-color: #f9f9f9;
  border-radius: 8px;
  min-width: 120px;
  text-align: center;
}

.detail-label {
  font-size: 0.9rem;
  color: #777;
  margin-bottom: 0.25rem;
}

.detail-value {
  font-weight: 600;
  font-size: 1.1rem;
}

.actions {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
}

.not-found-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
}

.not-found-content {
  text-align: center;
  background-color: white;
  padding: 3rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

/* Dark mode styles */
[data-theme="dark"] .card,
[data-theme="dark"] .not-found-content {
  background-color: #2a2d32;
}

[data-theme="dark"] .detail-item {
  background-color: #363a41;
}

[data-theme="dark"] .card-title,
[data-theme="dark"] .title,
[data-theme="dark"] .detail-value {
  color: #eceff4;
}

[data-theme="dark"] .detail-label {
  color: #adbac7;
}

[data-theme="dark"] .card-header {
  border-bottom-color: #363a41;
}

@media (max-width: 768px) {
  .page-container {
    padding: 1rem;
  }

  .card-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .rarity-badge {
    align-self: flex-start;
  }
}
</style>
