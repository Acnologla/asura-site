<template>
  <div v-if="background" class="bg-detail">
    <section class="breadcrumb-section">
      <div class="container breadcrumb">
        <router-link :to="{ name: 'Home' }">{{
          $t("nav.about")
        }}</router-link>
        <span>/</span>
        <router-link :to="{ name: 'Backgrounds' }">{{
          $t("nav.backgrounds")
        }}</router-link>
        <span>/</span>
        <span class="current">{{ background.name }}</span>
      </div>
    </section>

    <section class="header-section">
      <div class="container">
        <div class="spec-line">
          <span>FILE · {{ fileNum }}</span>
          <span class="dot" />
          <span class="strong">{{ background.name.toUpperCase() }}</span>
          <span :class="['rarity-text', `rarity-${background.rarity}`]"
            >★ {{ rarityLabel.toUpperCase() }}</span
          >
        </div>

        <div class="bg-hero">
          <div :style="rarityWrapStyle" class="bg-image-wrap">
            <img :src="background.value" :alt="background.name" class="bg-image" />
          </div>
          <div class="bg-meta">
            <div class="meta-row">
              <span class="meta-label">{{ $t("background.name") }}</span>
              <span class="meta-val">{{ background.name }}</span>
            </div>
            <div class="meta-row">
              <span class="meta-label">{{ $t("background.rarity") }}</span>
              <div :class="['rarity-pill', `rarity-${background.rarity}`]">
                ★ {{ rarityLabel }}
              </div>
            </div>
            <div class="meta-row">
              <span class="meta-label">{{ $t("background.type") }}</span>
              <span class="meta-val">Background</span>
            </div>
          </div>
        </div>

        <div style="text-align: center; margin-top: 32px">
          <router-link to="/backgrounds" class="btn btn-ghost">
            ← {{ $t("pet.back") }}
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { GetCosmeticInfo } from "../trade/info.js";

export default {
  name: "BackgroundDetail",
  data() {
    return { background: null };
  },
  computed: {
    rarityNames() {
      return [
        this.$t("selectMultiple.rarities.common"),
        this.$t("selectMultiple.rarities.rare"),
        this.$t("selectMultiple.rarities.epic"),
        this.$t("selectMultiple.rarities.legendary"),
        this.$t("selectMultiple.rarities.special"),
        this.$t("selectMultiple.rarities.mythic"),
        this.$t("selectMultiple.rarities.god"),
      ];
    },
    rarityLabel() {
      return (
        (this.background && this.rarityNames[this.background.rarity]) || ""
      );
    },
    rarityWrapStyle() {
      const RARITY_HEX = ["#9ca3af", "#3b82f6", "#a855f7", "#f59e0b", "#ef4444", "#14b8a6", "#FF00FF"];
      const r = this.background && this.background.rarity;
      if (r === 5) {
        return {
          background: "linear-gradient(to bottom right, #b827fc 0%, #2c90fc 25%, #b8fd33 50%, #fec837 75%, #fd1892 100%)",
          padding: "5px",
          border: "none",
          overflow: "hidden",
        };
      }
      return {
        background: RARITY_HEX[r] || "#9ca3af",
        padding: "5px",
        border: "none",
        overflow: "hidden",
      };
    },
    fileNum() {
      const id = parseInt(this.$route.query.background, 10);
      return String((isNaN(id) ? 0 : id) + 1).padStart(3, "0");
    },
  },
  methods: {
    async load() {
      const id = parseInt(this.$route.query.background, 10);
      if (isNaN(id)) return;
      try {
        const cosmetics = await GetCosmeticInfo();
        const backgrounds = cosmetics.filter((item) => item.type === 0);
        this.background = backgrounds[id] || backgrounds[id + 1] || null;
      } catch (e) {
        /* render empty */
      }
    },
  },
  watch: {
    "$i18n.locale"() {
      this.load();
    },
    "$route.query.background"() {
      this.load();
    },
  },
  created() {
    this.load();
  },
};
</script>

<style scoped>
.bg-detail {
  padding-bottom: 60px;
}

.breadcrumb-section {
  padding: 32px 0 16px;
}

@media (min-width: 1024px) {
  .breadcrumb-section {
    padding-top: 14px;
  }
}
.breadcrumb {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: var(--ink-3);
}
.breadcrumb a {
  color: inherit;
}
.breadcrumb .current {
  color: var(--ink);
}

.header-section {
  padding: 8px 0 40px;
}
.spec-line {
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
  padding: 14px 0;
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  margin-bottom: 36px;
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--ink-3);
}
.spec-line .dot {
  width: 4px;
  height: 4px;
  border-radius: 999px;
  background: var(--ink-3);
}
.spec-line .strong {
  color: var(--ink);
  font-weight: 600;
}

.bg-hero {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 32px;
  align-items: start;
}
.bg-image-wrap {
  width: 100%;
  border-radius: var(--radius-lg);
  overflow: hidden;
}
.bg-image {
  width: 100%;
  height: auto;
  display: block;
  border-radius: 10px;
}

.bg-meta {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 20px;
  background: #fff;
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
}
.meta-row {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.meta-label {
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--ink-3);
}
.meta-val {
  font-size: 16px;
  font-weight: 600;
}

.rarity-pill {
  align-self: flex-start;
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

@media (max-width: 768px) {
  .bg-hero {
    grid-template-columns: 1fr;
    gap: 20px;
  }
}
</style>
