<template>
  <div class="catalog-page">
    <section class="catalog-head-section">
      <div class="container">
        <div class="catalog-head">
          <div>
            <div class="eyebrow">{{ eyebrow }}</div>
            <h1 class="h-display catalog-title">
              {{ titleA }}
              <span style="color: var(--primary)">{{ titleB }}</span>
            </h1>
            <p class="catalog-sub">{{ subtitle }}</p>
          </div>
          <div class="catalog-controls">
            <div class="input-pill catalog-search">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--ink-3)"
                stroke-width="2"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="M21 21l-4.3-4.3" stroke-linecap="round" />
              </svg>
              <input
                type="text"
                :placeholder="$t('selectMultiple.search')"
                v-model="text"
              />
            </div>
            <select v-model="filterRarity" class="select-pill">
              <option :value="null">{{ $t("selectMultiple.all") }}</option>
              <option v-for="(r, i) in rarityNames" :key="i" :value="i">
                {{ r }}
              </option>
            </select>
          </div>
        </div>

        <div class="catalog-chip-row">
          <div class="chip catalog-count">
            {{ sorted.length }} {{ countWord }} {{ classes.length }}
          </div>
        </div>

        <div class="catalog-grid" :class="`grid-${gridCols}`">
          <button
            v-for="(item, idx) in sorted"
            :key="item.name + '-' + idx"
            class="catalog-card"
            @click="open(item)"
          >
            <div :style="rarityRingStyle(item)" class="rarity-ring">
              <div class="card-img-wrap" :style="imageWrapStyle">
                <img
                  :src="getImage(item)"
                  :alt="item.name"
                  class="card-img"
                />
                <div :class="['rarity-tag', `rarity-${item.rarity}`]">
                  ★ {{ rarityNames[item.rarity] }}
                </div>
              </div>
            </div>
            <div class="card-body">
              <div class="card-row">
                <div class="card-name">{{ item.name }}</div>
                <div class="card-idx">
                  #{{
                    String(getOriginalIndex(item) + 1).padStart(3, "0")
                  }}
                </div>
              </div>
            </div>
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "CatalogPage",
  props: {
    classesData: { type: Array, required: true, default: () => [] },
    spritesData: { type: Array, required: true, default: () => [] },
    detailUrlTemplate: { type: String, default: "/galo?galo={index}" },
    eyebrow: { type: String, default: "CATÁLOGO" },
    titleA: { type: String, default: "Todos os" },
    titleB: { type: String, default: "galos" },
    subtitle: {
      type: String,
      default:
        "Clique em qualquer um para ver detalhes, raridades e habilidades.",
    },
    countWord: { type: String, default: "de" },
    gridCols: { type: Number, default: 4 },
    itemWidth: { type: Number },
    itemHeight: { type: Number },
    // skipFirst: API returns a leading "404" entry as classes[0].
    skipLeading404: { type: Boolean, default: true },
  },
  data() {
    return {
      text: "",
      filterRarity: null,
    };
  },
  computed: {
    classes() {
      return this.classesData;
    },
    sprites() {
      return this.spritesData;
    },
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
    sorted() {
      return [...this.classes]
        .filter((c) => c.rarity !== -1)
        .filter((c) =>
          this.text
            ? c.name && c.name.toLowerCase().includes(this.text.toLowerCase())
            : true
        )
        .filter(
          (c) => this.filterRarity === null || c.rarity === this.filterRarity
        )
        .sort((a, b) => a.rarity - b.rarity);
    },
    imageWrapStyle() {
      if (this.itemWidth && this.itemHeight) {
        return {
          aspectRatio: `${this.itemWidth} / ${this.itemHeight}`,
        };
      }
      return { aspectRatio: "1 / 1" };
    },
  },
  methods: {
    getOriginalIndex(item) {
      return this.classes.findIndex((g) => g.name === item.name);
    },
    open(item) {
      const idx = this.getOriginalIndex(item);
      const offset = this.skipLeading404 ? 1 : 0;
      const url = this.detailUrlTemplate.replace("{index}", idx - offset);
      window.open(url, "_self");
    },
    getImage(item) {
      const idx = this.getOriginalIndex(item);
      const offset =
        this.skipLeading404 &&
        this.classes[0] &&
        /404/.test(this.classes[0].name)
          ? 1
          : 0;
      return this.sprites[idx - offset];
    },
    rarityRingStyle(item) {
      const RARITY_HEX = ["#9ca3af", "#3b82f6", "#a855f7", "#f59e0b", "#ef4444", "#14b8a6", "#FF00FF"];
      const r = item.rarity;
      if (r === 5) {
        return {
          background: "linear-gradient(to bottom right, #b827fc 0%, #2c90fc 25%, #b8fd33 50%, #fec837 75%, #fd1892 100%)",
          padding: "4px",
          borderRadius: "18px",
          overflow: "hidden",
        };
      }
      return {
        background: RARITY_HEX[r] || "#9ca3af",
        padding: "4px",
        borderRadius: "18px",
        overflow: "hidden",
      };
    },
  },
};
</script>

<style scoped>
.catalog-page {
  padding-top: 0;
}
.catalog-head-section {
  padding: 60px 0 32px;
}

@media (min-width: 1024px) {
  .catalog-head-section {
    padding-top: 28px;
  }
}

.catalog-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
}
.catalog-title {
  font-size: 56px;
  margin: 8px 0 12px;
}
.catalog-sub {
  font-size: 16px;
  color: var(--ink-2);
  max-width: 540px;
  margin: 0;
}
.catalog-controls {
  display: flex;
  gap: 10px;
  align-items: center;
}
.catalog-search {
  min-width: 280px;
}

.catalog-chip-row {
  display: flex;
  gap: 8px;
  margin-bottom: 32px;
  flex-wrap: wrap;
  align-items: center;
}
.catalog-count {
  background: var(--primary-soft);
  color: var(--primary-ink);
  border-color: #d9c9ff;
}

.catalog-grid {
  display: grid;
  gap: 18px;
}
.catalog-grid.grid-4 {
  grid-template-columns: repeat(4, 1fr);
}
.catalog-grid.grid-3 {
  grid-template-columns: repeat(3, 1fr);
}
.catalog-grid.grid-2 {
  grid-template-columns: repeat(2, 1fr);
}

.catalog-card {
  background: #fff;
  border: 1px solid var(--line);
  border-radius: 18px;
  padding: 10px;
  cursor: pointer;
  text-align: left;
  transition: transform 0.15s, box-shadow 0.2s, border-color 0.2s;
  display: flex;
  flex-direction: column;
  gap: 12px;
  color: inherit;
  font-family: inherit;
}
.catalog-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow);
  border-color: var(--primary);
}

.rarity-ring {
  width: 100%;
}
.card-img-wrap {
  position: relative;
  width: 100%;
  border-radius: 14px;
  background: linear-gradient(135deg, #efeaf7, #ddd2f3);
  display: grid;
  place-items: center;
  overflow: hidden;
}
.card-img {
  max-width: 88%;
  max-height: 88%;
  object-fit: contain;
}

.rarity-tag {
  position: absolute;
  top: 10px;
  left: 10px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 9px;
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(6px);
  font-size: 10px;
  font-family: var(--font-mono);
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--r);
  border: 1px solid var(--line);
  border-radius: 4px;
}

.card-body {
  padding: 0 6px 8px;
}
.card-row {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 8px;
}
.card-name {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 20px;
  text-transform: capitalize;
}
.card-idx {
  font-size: 10px;
  font-family: var(--font-mono);
  color: var(--ink-3);
  letter-spacing: 0.08em;
}

@media (max-width: 1024px) {
  .catalog-grid.grid-4 {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .catalog-head-section {
    padding: 32px 0 24px;
  }
  .catalog-head {
    flex-direction: column;
    align-items: stretch;
  }
  .catalog-title {
    font-size: 38px;
  }
  .catalog-sub {
    font-size: 15px;
  }
  .catalog-controls {
    flex-direction: column;
  }
  .catalog-search {
    min-width: 0;
    width: 100%;
  }
  .select-pill {
    width: 100%;
  }
  .catalog-grid.grid-4,
  .catalog-grid.grid-3 {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
  .catalog-grid.grid-2 {
    grid-template-columns: 1fr;
  }
  .card-name {
    font-size: 17px;
  }
}
@media (max-width: 450px) {
  .catalog-grid.grid-3 {
    grid-template-columns: 1fr;
  }
}
</style>
