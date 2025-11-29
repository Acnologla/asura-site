<template>
  <div style="margin-left: 30px">
    <div v-for="(name, i) in names" :key="i">
      <ItemClass
        :effects="effects"
        :name="name"
        :items="items.filter((a) => a.level === i)"
      />
    </div>
  </div>
</template>
<script>
import axios from "axios";
import ItemClass from "@/components/ItemClass";
export default {
  name: "Items",
  components: {
    ItemClass,
  },
  data() {
    return {
      names: [
        this.$t ? this.$t("items.common") : "Comum",
        this.$t ? this.$t("items.rare") : "Raro",
        this.$t ? this.$t("items.epic") : "Epico",
        this.$t ? this.$t("items.legendary") : "Lendario",
        this.$t ? this.$t("items.special") : "Especial",
        this.$t ? this.$t("items.event") : "Evento",
        this.$t ? this.$t("items.mythic") : "Mitico",
      ],
      items: [],
      effects: [],
    };
  },
  created() {
    const locale = this.$i18n.locale || "pt";
    axios
      .get(`https://info.asurabot.com.br/effects.json?language=${locale}`)
      .then((effects) => {
        this.effects = effects.data;
      });
    axios
      .get(`https://info.asurabot.com.br/items.json?language=${locale}`)
      .then((items) => {
        this.items = items.data;
      });
  },
};
</script>
