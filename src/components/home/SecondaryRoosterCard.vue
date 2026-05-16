<template>
  <section class="secondary-section">
    <div class="container">
      <div class="card secondary-card" v-if="rooster">
        <div class="image-side">
          <img
            :src="rooster.sprite"
            :alt="rooster.name"
            class="secondary-img fade-swap"
            :key="rooster.index"
          />
        </div>
        <div class="info-side">
          <div class="eyebrow">FEATURED · {{ fileNum }}</div>
          <h3 class="h-display secondary-title">{{ rooster.name }}</h3>
          <div :class="['rarity-badge', `rarity-${rooster.rarity}`]">
            ★ {{ rarityLabel }}
          </div>
          <p class="secondary-desc">{{ blurb }}</p>
          <router-link
            :to="{ name: 'Galo', query: { galo: rooster.index } }"
            class="btn btn-ghost"
          >
            {{ openLabel }}
            <ArrowIcon />
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import ArrowIcon from "../icons/ArrowIcon.vue";

const RARITY_NAMES = {
  pt: ["Comum", "Raro", "Épico", "Lendário", "Especial", "Mítico", "Deus"],
  en: ["Common", "Rare", "Epic", "Legendary", "Special", "Mythic", "God"],
};

export default {
  name: "SecondaryRoosterCard",
  components: { ArrowIcon },
  props: { rooster: Object },
  computed: {
    fileNum() {
      if (!this.rooster) return "—";
      return String(this.rooster.index + 1).padStart(3, "0");
    },
    rarityLabel() {
      if (!this.rooster) return "—";
      const lang = this.$i18n.locale === "en" ? "en" : "pt";
      return RARITY_NAMES[lang][this.rooster.rarity] || "—";
    },
    blurb() {
      return this.$i18n.locale === "pt"
        ? "Atualizado em tempo real. Confira detalhes, skills e contrapartidas no perfil completo."
        : "Live-updated. Open the full profile for skills, matchups and details.";
    },
    openLabel() {
      return this.$i18n.locale === "pt" ? "Ver perfil" : "View profile";
    },
  },
};
</script>

<style scoped>
.secondary-section {
  padding: 8px 0 40px;
}
.secondary-card {
  display: grid;
  grid-template-columns: 1fr 1.4fr;
  gap: 0;
  overflow: hidden;
  padding: 0;
}
.image-side {
  background: linear-gradient(135deg, #efeaf7, #ddd2f3);
  display: grid;
  place-items: center;
  padding: 32px;
  min-height: 280px;
}
.secondary-img {
  max-width: 80%;
  max-height: 260px;
  object-fit: contain;
}
.info-side {
  padding: 36px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  align-items: flex-start;
}
.secondary-title {
  font-size: 44px;
  margin: 0;
  text-transform: capitalize;
}
.rarity-badge {
  padding: 6px 12px;
  border-radius: 999px;
  border: 1px solid var(--r);
  color: var(--r);
  font-weight: 700;
  font-size: 11px;
  font-family: var(--font-mono);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  background: color-mix(in oklab, var(--r) 10%, white);
}
.secondary-desc {
  color: var(--ink-2);
  font-size: 15px;
  line-height: 1.6;
  margin: 4px 0 8px;
  max-width: 480px;
}

@media (max-width: 768px) {
  .secondary-card {
    grid-template-columns: 1fr;
  }
  .image-side {
    padding: 24px;
    min-height: 220px;
  }
  .info-side {
    padding: 24px;
  }
  .secondary-title {
    font-size: 30px;
  }
}
</style>
