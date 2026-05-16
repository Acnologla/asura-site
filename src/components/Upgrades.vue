<template>
  <div class="upgrades-list">
    <Upgrade v-for="(u, i) in upgrades" :key="i" :upgrade="u" />
    <div v-if="upgrades.length === 0" class="empty">—</div>
  </div>
</template>

<script>
import axios from "axios";
import Upgrade from "@/components/Upgrade";

export default {
  name: "UpgradesList",
  components: { Upgrade },
  data() {
    return { upgrades: [] };
  },
  methods: {
    async load() {
      const locale = this.$i18n.locale || "pt";
      try {
        const { data } = await axios.get(
          `https://info.asurabot.com.br/upgrades.json?language=${locale}`
        );
        this.upgrades = data;
      } catch (e) {
        this.upgrades = [];
      }
    },
  },
  watch: {
    "$i18n.locale"() {
      this.load();
    },
  },
  created() {
    this.load();
  },
};
</script>

<style scoped>
.upgrades-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
  text-align: left;
}
.empty {
  color: var(--ink-3);
  font-family: var(--font-mono);
  font-size: 12px;
  padding: 24px 0;
  text-align: center;
}
</style>
