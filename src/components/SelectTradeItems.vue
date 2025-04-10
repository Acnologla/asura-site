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
const sections = ["Roosters", "Items", "Cosmetics", "Shards", "Pets"];
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
    return { sections, selectedTab: 0 };
  },
  methods: {
    getSectionItems(section) {
      const mapped = this.map(
        this.user.roosters,
        this.user.items,
        this.user.pets
      );
      const items = mapped.filter((m) => m.tradeType === "item");
      switch (section) {
        case "Roosters":
          return mapped.filter((m) => m.tradeType === "rooster");

        case "Pets":
          return mapped.filter((m) => m.tradeType === "pet");

        case "Items":
          return items
            .filter((t) => t.type === 2)
            .filter((t) => t.rarity !== 6);

        case "Cosmetics":
          return items.filter((t) => t.type === 3);

        case "Shards":
          return items.filter((t) => t.type === 5);
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
