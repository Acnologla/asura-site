<template>
  <div class="upgrade-row">
    <button class="upgrade-head" @click="active = !active">
      <span class="chev">{{ active ? "▾" : "▸" }}</span>
      <span class="up-name">{{ upgrade.name }}</span>
    </button>
    <div v-if="active" class="upgrade-body">
      <p v-if="upgrade.value" class="up-value">{{ upgrade.value }}</p>
      <div v-if="upgrade.childs" class="upgrade-children">
        <Upgrade v-for="(u, i) in upgrade.childs" :key="i" :upgrade="u" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Upgrade",
  props: { upgrade: { type: Object, required: true } },
  data() {
    return { active: false };
  },
};
</script>

<style scoped>
.upgrade-row {
  border-bottom: 1px solid var(--line);
  padding: 8px 0;
}
.upgrade-head {
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
.up-name {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 18px;
}
.upgrade-body {
  padding: 8px 0 8px 24px;
}
.up-value {
  font-size: 14px;
  color: var(--ink-2);
  line-height: 1.6;
  margin: 0 0 8px;
}
.upgrade-children {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding-left: 8px;
  border-left: 2px solid var(--primary-soft);
  margin-top: 4px;
}
</style>
