<template>
  <div class="hero-visual">
    <div class="rooster-slot">
      <div :style="imageRingStyle" class="rarity-ring">
        <div class="image-wrap" :key="rooster && rooster.index">
          <div v-if="!rooster" class="placeholder" />
          <img
            v-else
            :src="rooster.sprite"
            :alt="rooster.name"
            class="rooster-img fade-swap"
          />
        </div>
      </div>

      <div class="name-overlay">{{ name }}</div>

      <div :class="['rarity-tag', `rarity-${rooster && rooster.rarity}`]">
        ★ {{ rarityLabel }}
      </div>
    </div>
  </div>
</template>

<script>
const RARITY_NAMES = {
  pt: ["Comum", "Raro", "Épico", "Lendário", "Especial", "Mítico", "Deus"],
  en: ["Common", "Rare", "Epic", "Legendary", "Special", "Mythic", "God"],
};
const RARITY_HEX = [
  "#9ca3af",
  "#3b82f6",
  "#a855f7",
  "#f59e0b",
  "#ef4444",
  "#14b8a6",
  "#FF00FF",
];

export default {
  name: "HeroVisual",
  props: { rooster: Object },
  computed: {
    fileNum() {
      if (!this.rooster) return "001";
      return String(this.rooster.index + 1).padStart(3, "0");
    },
    name() {
      return (this.rooster && this.rooster.name) || "—";
    },
    rarityLabel() {
      const r = (this.rooster && this.rooster.rarity) || 0;
      const lang = this.$i18n.locale === "en" ? "en" : "pt";
      return RARITY_NAMES[lang][r] || "—";
    },
    imageRingStyle() {
      const r = (this.rooster && this.rooster.rarity) || 0;
      if (r === 5) {
        return {
          background:
            "linear-gradient(to bottom right, #b827fc 0%, #2c90fc 25%, #b8fd33 50%, #fec837 75%, #fd1892 100%)",
          padding: "3px",
          borderRadius: "17px",
        };
      }
      return {
        background: RARITY_HEX[r] || "#9ca3af",
        padding: "3px",
        borderRadius: "17px",
      };
    },
  },
};
</script>

<style scoped>
.hero-visual {
  position: relative;
  padding-top: 8px;
}

.spec-strip {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 10px 0 18px;
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.14em;
  color: var(--ink-3);
  text-transform: uppercase;
  border-bottom: 1px solid var(--line);
  margin-bottom: 18px;
}
.dot {
  width: 4px;
  height: 4px;
  border-radius: 999px;
  background: var(--ink-3);
}
.observed {
  margin-left: auto;
  color: var(--primary);
}

.rooster-slot {
  position: relative;
}
.rarity-ring {
  width: 100%;
  border-radius: 17px;
  overflow: hidden;
}
.image-wrap {
  width: 100%;
  aspect-ratio: 1.05 / 1;
  border-radius: 14px;
  background: linear-gradient(135deg, #efeaf7, #ddd2f3);
  display: grid;
  place-items: center;
  overflow: hidden;
}
.rooster-img {
  max-width: 78%;
  max-height: 78%;
  object-fit: contain;
}
.placeholder {
  width: 50%;
  height: 50%;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.4);
}

.name-overlay {
  position: absolute;
  left: -8px;
  bottom: -22px;
  padding: 12px 18px;
  background: var(--ink);
  color: #fff;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 30px;
  letter-spacing: -0.02em;
  box-shadow: var(--shadow);
  text-transform: capitalize;
}

.rarity-tag {
  position: absolute;
  right: -10px;
  top: 22px;
  padding: 6px 10px;
  background: color-mix(in oklab, var(--r, #f5d77a) 15%, white);
  color: var(--r, #a17404);
  border: 1px solid var(--r, #f5d77a);
  font-size: 10px;
  font-family: var(--font-mono);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-weight: 700;
  transform: rotate(2deg);
  box-shadow: var(--shadow-sm);
}

.caption {
  margin-top: 40px;
  padding-top: 18px;
  border-top: 1px solid var(--line);
  display: flex;
  align-items: baseline;
  gap: 14px;
  flex-wrap: wrap;
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--ink-3);
}
.ink-strong {
  color: var(--ink);
  font-weight: 600;
}

@media (max-width: 768px) {
  .name-overlay {
    font-size: 22px;
    padding: 10px 14px;
    bottom: -16px;
  }
  .caption {
    margin-top: 30px;
  }
}
</style>
