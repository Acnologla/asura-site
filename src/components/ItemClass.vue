<template>
  <div class="item-class-row">
    <button class="ic-head" @click="active = !active">
      <span class="chev">{{ active ? "▾" : "▸" }}</span>
      <span class="ic-name">{{ name }}</span>
      <span class="ic-count">{{ items.length }}</span>
    </button>
    <div v-if="active" class="ic-body">
      <Item
        v-for="(item, i) in items"
        :key="i"
        :effects="effects"
        :item="item"
      />
      <div v-if="items.length === 0" class="empty">—</div>
    </div>
  </div>
</template>

<script>
import Item from "./Item";

export default {
  name: "ItemClass",
  components: { Item },
  props: {
    effects: Array,
    items: Array,
    name: String,
  },
  data() {
    return { active: false };
  },
};
</script>

<style scoped>
.item-class-row {
  border-bottom: 1px solid var(--line);
  padding: 8px 0;
}
.ic-head {
  display: flex;
  align-items: center;
  gap: 10px;
  background: none;
  border: 0;
  padding: 6px 0;
  cursor: pointer;
  width: 100%;
  text-align: left;
  font-family: inherit;
  color: var(--ink);
}
.chev {
  font-family: var(--font-mono);
  color: var(--primary);
  font-size: 12px;
  width: 14px;
}
.ic-name {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 18px;
  flex: 1;
}
.ic-count {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--ink-3);
  letter-spacing: 0.06em;
}
.ic-body {
  padding: 8px 0 8px 24px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.empty {
  color: var(--ink-3);
  font-family: var(--font-mono);
  font-size: 11px;
  padding: 8px 0;
}
</style>
