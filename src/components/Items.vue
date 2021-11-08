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
      names: ["Comum", "Raro", "Epico", "Lendario", "Especial", "Evento"],
      items: [],
      effects: [],
    };
  },
  created() {
    axios
      .get(
        "https://raw.githubusercontent.com/Acnologla/asura/master/resources/galo/effects.json"
      )
      .then((effects) => {
        this.effects = effects.data;
      });
    axios
      .get(
        "https://raw.githubusercontent.com/Acnologla/asura/master/resources/galo/items.json"
      )
      .then((items) => {
        this.items = items.data;
      });
  },
};
</script>
