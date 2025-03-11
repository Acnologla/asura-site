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
      placeholder="Secione um tipo"
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
const sections = ["Roosters", "Items", "Cosmetics", "Shards"];
export default {
  name: "SelectTradeItems",
  props: {
    user: Object,
    getItemImage: Function,
    addItemToTrade: Function,
    info: Object,
  },
  components: {
    TradeItemCard,
  },
  data() {
    return { sections, selectedTab: 0 };
  },
  methods: {
    getSectionItems(section) {
      const mapItems = (items, type, infoGetter, rarityGetter) => {
        return items
          .filter((item) => item.type === type)
          .map((item) => ({
            ...item,
            name: infoGetter(item.itemID),
            tradeType: "item",
            rarity: rarityGetter(item.itemID),
          }));
      };

      switch (section) {
        case "Roosters":
          return this.user.roosters.map((r) => ({
            ...r,
            name: this.info.classes[r.type].name,
            tradeType: "rooster",
            rarity: this.info.classes[r.type].rarity,
          }));

        case "Items":
          return mapItems(
            this.user.items,
            2,
            (itemId) => this.info.items[itemId].name,
            (itemId) => this.info.items[itemId].level
          );

        case "Cosmetics":
          return mapItems(
            this.user.items,
            3,
            (itemId) => this.info.cosmetics[itemId].name,
            (itemId) => this.info.cosmetics[itemId].rarity
          );

        case "Shards":
          return mapItems(
            this.user.items,
            5,
            (itemId) => "Shard " + this.info.rarities[itemId],
            (itemId) => itemId
          );
      }
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
