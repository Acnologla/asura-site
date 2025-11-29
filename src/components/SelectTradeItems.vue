<template>
  <main>
    <br />
    <b-tabs
      type="is-toggle"
      class="is-hidden-mobile"
      v-model="selectedTab"
      style="margin-bottom: -20px;"
    >
      <b-tab-item
        v-for="(section, i) in sections"
        :label="section"
        :key="i"
        :value="i.toString()"
      ></b-tab-item>
    </b-tabs>
    <b-select
      expanded
      style="margin-top: -20px;margin-bottom: 20px;"
      class="is-hidden-tablet"
      :placeholder="$t('selectTrade.selectType')"
      v-model="selectedTab"
    >
      <option
        v-for="(section, i) in sections"
        :label="section"
        :key="i"
        :value="i.toString()"
      >
        {{ section }}
      </option>
    </b-select>
    <div class="columns is-mobile is-multiline">
      <div
        class="column is-half-mobile is-half-tablet is-one-third-desktop is-one-quarter-fullhd select-item"
        v-for="(item, i) in getSectionItems(sections[selectedTab])"
        :key="i"
        @click="addItemToTrade(item)"
      >
        <TradeItemCard :imageURL="getItemImage(item)" :item="item" />
      </div>
    </div>
  </main>
</template>

<script>
import TradeItemCard from "./TradeItemCard.vue";
export default {
  name: "SelectTradeItems",
  props: {
    user: Object,
    getItemImage: Function,
    addItemToTrade: Function,
    map: Function,
  },
  components: {
    TradeItemCard,
  },
  data() {
    return { 
      sections: [
        this.$t ? this.$t('selectTrade.roosters') : "Roosters",
        this.$t ? this.$t('selectTrade.items') : "Items",
        this.$t ? this.$t('selectTrade.cosmetics') : "Cosmetics",
        this.$t ? this.$t('selectTrade.shards') : "Shards",
        this.$t ? this.$t('selectTrade.pets') : "Pets",
      ], 
      selectedTab: 0 
    };
  },
  methods: {
    getSectionItems(section) {
      const mapped = this.map(
        this.user.roosters,
        this.user.items,
        this.user.pets
      );
      const items = mapped.filter((m) => m.tradeType === "item");
      const roostersKey = this.$t ? this.$t('selectTrade.roosters') : "Roosters";
      const petsKey = this.$t ? this.$t('selectTrade.pets') : "Pets";
      const itemsKey = this.$t ? this.$t('selectTrade.items') : "Items";
      const cosmeticsKey = this.$t ? this.$t('selectTrade.cosmetics') : "Cosmetics";
      const shardsKey = this.$t ? this.$t('selectTrade.shards') : "Shards";
      
      if (section === roostersKey) {
        return mapped.filter((m) => m.tradeType === "rooster");
      } else if (section === petsKey) {
        return mapped.filter((m) => m.tradeType === "pet");
      } else if (section === itemsKey) {
        return items
          .filter((t) => t.type === 2)
          .filter((t) => t.rarity !== 6);
      } else if (section === cosmeticsKey) {
        return items.filter((t) => t.type === 3);
      } else if (section === shardsKey) {
        return items.filter((t) => t.type === 5);
      }
      return [];
    },
  },
};
</script>

<style scoped>
.select-item > img {
  max-width: 115px;
}

.select-item {
  cursor: pointer;
}

.select-item:hover {
  opacity: 0.5;
}
</style>
