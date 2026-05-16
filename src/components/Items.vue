<template>
  <div class="items-list">
    <ItemClass
      v-for="(name, i) in names"
      :key="i"
      :effects="effects"
      :name="name"
      :items="items.filter((a) => a.level === i)"
    />
    <div v-if="items.length === 0" class="empty">—</div>
  </div>
</template>

<script>
import axios from "axios";
import ItemClass from "@/components/ItemClass";

export default {
  name: "ItemsList",
  components: { ItemClass },
  data() {
    return { items: [], effects: [] };
  },
  computed: {
    names() {
      return [
        this.$t("items.common"),
        this.$t("items.rare"),
        this.$t("items.epic"),
        this.$t("items.legendary"),
        this.$t("items.special"),
        this.$t("items.event"),
        this.$t("items.mythic"),
      ];
    },
  },
  methods: {
    async load() {
      const locale = this.$i18n.locale || "pt";
      try {
        const [eff, items] = await Promise.all([
          axios.get(
            `https://info.asurabot.com.br/effects.json?language=${locale}`
          ),
          axios.get(
            `https://info.asurabot.com.br/items.json?language=${locale}`
          ),
        ]);
        this.effects = eff.data;
        this.items = items.data;
      } catch (e) {
        this.items = [];
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
.items-list {
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
