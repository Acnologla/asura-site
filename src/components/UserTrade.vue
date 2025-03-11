<template>
  <div
    class="trade-offer-container"
    :style="` border: 3px solid ${confirmed ? 'green' : '#e0e0e0'};`"
  >
    <h3 class="offer-title">{{ title }}</h3>
    <div class="items-grid">
      <div class="grid-row" v-for="row in 3" :key="`row-${row}`">
        <div
          class="grid-cell"
          v-for="col in 4"
          :key="`cell-${row}-${col}`"
          @click="removeItem(items[getItemIndex(row, col)])"
        >
          <TradeItemCard
            style="cursor: pointer;"
            v-if="getItemIndex(row, col) < items.length"
            :imageURL="getItemImage(items[getItemIndex(row, col)])"
            :item="items[getItemIndex(row, col)]"
          />
          <div v-else class="empty-slot">
            <div class="placeholder-circle"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TradeItemCard from "./TradeItemCard.vue";

export default {
  name: "TradeOfferComponent",
  components: {
    TradeItemCard,
  },
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    maxSlots: {
      type: Number,
      default: 12, // Increased to account for 3 rows of 4 items each
    },
    getItemImage: {
      type: Function,
      required: true,
    },
    title: String,
    confirmed: Boolean,
    removeItem: Function,
  },
  methods: {
    getItemIndex(row, col) {
      // Calculate the index based on row and column
      return (row - 1) * 4 + (col - 1);
    },
  },
};
</script>

<style scoped>
.trade-offer-container {
  width: 100%;
  max-width: 600px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 16px;
  margin: 0 auto;
  box-sizing: border-box;
}

.offer-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
  margin: 0 0 16px 0;
  padding: 0;
  text-align: center;
}

.items-grid {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.grid-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  width: 100%;
}

.grid-cell {
  position: relative;
  width: 100%;
  height: 120px;
  border-radius: 4px;
  overflow: hidden;
}

.empty-slot {
  width: 100%;
  height: 100%;
  background-color: #f0f0f0;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.placeholder-circle {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #e0e0e0;
}

/* Responsive adjustments */
@media (max-width: 600px) {
  .grid-row {
    gap: 8px;
  }

  .grid-cell {
    height: 100px;
  }
}

@media (max-width: 480px) {
  .grid-row {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
