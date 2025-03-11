<template>
  <div class="item-card">
    <div class="image-container">
      <img :src="imageURL" alt="" class="item-image" />
      <div v-if="item.quantity > 1" class="quantity-badge">
        {{ item.quantity }}
      </div>
    </div>
    <div class="footer" :style="`background: ${getRarityColor()}`">
      {{ getRarityName() }}
    </div>
    <div class="item-name">{{ item.name }}</div>
  </div>
</template>

<script>
export default {
  name: "TradeItemCard",
  props: {
    imageURL: String,
    item: Object,
  },
  methods: {
    getRarityColor() {
      return [
        "#CDE3FF",
        "#0000FF",
        "#9400D3",
        "#FF9000",
        "#FF0000",
        "linear-gradient(to bottom right, rgba(184, 39, 252, 0.5), rgba(44, 144, 252, 0.5), rgba(184, 253, 51, 0.5), rgba(254, 200, 55, 0.5), rgba(253, 24, 146, 0.5))",
        "#FF00FF",
      ][this.item.rarity];
    },
    getRarityName() {
      return [
        "Comum",
        "Raro",
        "Epico",
        "Lendario",
        "Especial",
        "Mitico",
        "Deus",
      ][this.item.rarity];
    },
  },
};
</script>

<style scoped>
.item-card {
  width: 100%;
  height: 100%;
  border-radius: 4px;
  overflow: hidden;
  background-color: #f0f0f0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  position: relative;
  font-family: Arial, sans-serif;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  max-height: 100%; /* Ensure the card doesn't exceed parent height */
}

.image-container {
  position: relative;
  width: 100%;
  flex: 1;
  min-height: 0; /* Allow container to shrink if needed */
  background-color: #f5f5f5;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.item-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
}

.quantity-badge {
  position: absolute;
  top: 4px;
  right: 4px;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  font-size: 0.7rem;
  padding: 2px 4px;
  border-radius: 2px;
  z-index: 1;
}

.footer {
  padding: 2px 0;
  text-align: center;
  color: white;
  font-size: 0.8rem;
  font-weight: bold;
  width: 100%;
  flex-shrink: 0; /* Prevent footer from shrinking */
}

.item-name {
  padding: 4px;
  text-align: center;
  font-size: 0.8rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #333;
  width: 100%;
  flex-shrink: 0; /* Prevent name from shrinking */
  background-color: white;
}
</style>
