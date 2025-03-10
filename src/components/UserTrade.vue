<template>
  <main
    class="trade"
    :style="`border: 3px solid ${confirmed ? 'green' : '#552fbc'};`"
  >
    <div v-if="trade" class="trade-grid">
      <div
        class="item-slot"
        v-for="(item, i) in Array.from({ length: 12 }).map((_, i) => trade[i])"
        :key="i"
      >
        <div v-if="item" class="item-content">
          <img :src="getItemImage(item)" alt="" />
          <p>{{ item.name }}</p>
        </div>
        <div v-else class="empty-slot"></div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: "UserTrade",
  props: {
    trade: Array,
    info: Object,
    getItemImage: Function,
    confirmed: Boolean,
  },
};
</script>

<style scoped>
.trade {
  border: 1px solid #552fbc;
  padding: 3px;
  width: 100%;
  max-width: 800px;
  background-color: #f8f9fa;
  border-radius: 6px;
}

.trade-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0;
  row-gap: 0;
  align-items: start;
}

.item-slot {
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 0.9; /* Slightly shorter height than width */
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  margin: 0;
  overflow: hidden;
}

.item-content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.item-content img {
  width: 65%;
  height: 65%;
  object-fit: contain;
  margin: 0;
}

.item-content p {
  margin: 0;
  padding: 0;
  font-size: 0.75rem;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
  color: #333;
  line-height: 0.9;
}

.empty-slot {
  width: 50%;
  height: 50%;
  border: 1px solid #6c5ce7;
  border-radius: 50%;
  background: linear-gradient(145deg, #a29bfe, #74b9ff);
  box-shadow: none;
  margin: 0;
}

@media (max-width: 768px) {
  .trade {
    padding: 2px;
  }

  .empty-slot {
    width: 55%;
    height: 55%;
  }
}

@media (max-width: 480px) {
  .item-content p {
    font-size: 0.65rem;
  }
}
</style>
