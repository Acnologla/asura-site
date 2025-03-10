<template>
  <main>
    <section v-for="(section, i) in sections" :key="i">
      <h2>{{ section }}</h2>
      <br />
      <div class="columns is-multiline">
        <div
          class="column is-one-fifth select-item"
          v-for="(item, i) in getSectionItems(section)"
          :key="i"
          @click="addItemToTrade(item)"
        >
          <img :src="getItemImage(item)" />
          <p>{{ item.name }}</p>
        </div>
      </div>
      <hr style="background-color: #552fbc" />
    </section>
  </main>
</template>

<script>
const sections = ["Roosters", "Items", "Cosmetics", "Shards"];
export default {
  name: "SelectTradeItems",
  props: {
    user: Object,
    getItemImage: Function,
    addItemToTrade: Function,
    info: Object,
  },
  data() {
    return { sections };
  },
  methods: {
    getSectionItems(section) {
      const mapItems = (items, type, infoGetter) => {
        return items
          .filter((item) => item.type === type)
          .map((item) => ({
            ...item,
            name: infoGetter(item.itemID),
            tradeType: "item",
          }));
      };

      switch (section) {
        case "Roosters":
          return this.user.roosters.map((r) => ({
            ...r,
            name: this.info.classes[r.type].name,
            tradeType: "rooster",
          }));

        case "Items":
          return mapItems(
            this.user.items,
            2,
            (itemId) => this.info.items[itemId].name
          );

        case "Cosmetics":
          return mapItems(
            this.user.items,
            3,
            (itemId) => this.info.cosmetics[itemId].name
          );

        case "Shards":
          return mapItems(
            this.user.items,
            5,
            (itemId) => this.info.rarities[itemId]
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
