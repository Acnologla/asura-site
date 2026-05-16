<template>
  <div class="item-row">
    <button class="item-head" @click="active = !active">
      <span class="chev">{{ active ? "▾" : "▸" }}</span>
      <span class="item-name">{{ item.name }}</span>
    </button>
    <p v-if="active && item.description" class="item-desc">
      {{ item.description }}
    </p>
  </div>
</template>

<script>
export default {
  name: "Item",
  props: {
    effects: Array,
    item: { type: Object, required: true },
  },
  data() {
    return { active: false };
  },
};
</script>

<style scoped>
.item-row {
  padding: 4px 0;
}
.item-head {
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: 0;
  padding: 4px 0;
  cursor: pointer;
  width: 100%;
  text-align: left;
  font-family: inherit;
  color: var(--ink-2);
}
.chev {
  font-family: var(--font-mono);
  color: var(--primary);
  font-size: 11px;
  width: 12px;
}
.item-name {
  font-size: 14px;
  font-weight: 600;
}
.item-desc {
  font-size: 13px;
  color: var(--ink-2);
  line-height: 1.5;
  margin: 4px 0 8px 20px;
}
</style>
