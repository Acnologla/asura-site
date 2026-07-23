<template>
  <div class="extras-page">
    <div class="container extras-tabs">
      <button
        v-for="t in tabs"
        :key="t.id"
        :class="['extras-tab', { active: activeTab === t.id }]"
        @click="activeTab = t.id"
      >
        {{ t.label }}
      </button>
    </div>

    <CatalogPage
      v-if="activeTab === 'armor'"
      :classes-data="armors"
      :sprites-data="armorImages"
      :clickable="false"
      :eyebrow="$t('catalog.armorEyebrow')"
      :title-a="$t('catalog.armorTitleA')"
      :title-b="$t('catalog.armorTitleB')"
      :subtitle="$t('catalog.armorSub')"
      :count-word="$t('catalog.of')"
      :skip-leading404="false"
    />
    <CatalogPage
      v-else
      :classes-data="globalSkins"
      :sprites-data="globalSkinImages"
      :clickable="false"
      :eyebrow="$t('catalog.gskinEyebrow')"
      :title-a="$t('catalog.gskinTitleA')"
      :title-b="$t('catalog.gskinTitleB')"
      :subtitle="$t('catalog.gskinSub')"
      :count-word="$t('catalog.of')"
      :skip-leading404="false"
    />
  </div>
</template>

<script>
import { GetArmorItems, GetCosmeticInfo } from "../trade/info.js";
import CatalogPage from "@/components/CatalogPage.vue";

export default {
  name: "Extras",
  components: { CatalogPage },
  data() {
    return {
      activeTab: "armor",
      armors: [],
      armorImages: [],
      globalSkins: [],
      globalSkinImages: [],
    };
  },
  computed: {
    tabs() {
      return [
        { id: "armor", label: this.$t("catalog.armorTitleB") },
        { id: "skins", label: this.$t("catalog.gskinTitleB") },
      ];
    },
  },
  methods: {
    async load() {
      try {
        const armorItems = await GetArmorItems();
        this.armors = armorItems.map((a) => ({
          ...a,
          rarity: a.level,
          subtitle: a.effectLabel,
          effects: a.effects,
        }));
        this.armorImages = armorItems.map((a) => a.imageURL);
      } catch (e) {
        /* render empty */
      }
      try {
        const cosmetics = await GetCosmeticInfo();
        this.globalSkins = cosmetics.filter((item) => item.type === 5);
        this.globalSkinImages = this.globalSkins.map((s) => s.value);
      } catch (e) {
        /* render empty */
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

<style scoped>
.extras-tabs {
  display: flex;
  gap: 8px;
  padding-top: 32px;
}

@media (min-width: 1024px) {
  .extras-tabs {
    padding-top: 14px;
  }
}

.extras-tab {
  padding: 9px 18px;
  border-radius: 999px;
  border: 1px solid var(--line);
  background: #fff;
  color: var(--ink-2);
  font-weight: 700;
  font-size: 13px;
  cursor: pointer;
}

.extras-tab.active {
  background: var(--ink);
  color: #fff;
  border-color: var(--ink);
}
</style>
