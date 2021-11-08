<template>
  <div class = "itemClass" style="cursor: pointer">
    <h2  @click="toggleActive">
       <font-awesome-icon v-if="active" icon="chevron-down" />
      <font-awesome-icon v-else icon="chevron-right" />
      {{ name }}
    </h2>
    <div v-if="active" style="margin-left: 30px">
      <Item
        v-for="(item, i) in items"
        :effects="effects"
        :key="i"
        :item="item"
      />
    </div>
  </div>
</template>
<style scoped>
h2 {
    font-size: 1.7rem;
}
.itemClass{
    text-align: left;
}
</style>
<script>
import Item from "./Item";
export default {
  name: "itemClass",
  components: {
    Item,
  },
  data() {
    return {
      active: false,
    };
  },
  methods: {
    toggleActive() {
      this.active = !this.active;
    },
  },
  props: {
    effects: Array,
    items: Array,
    name: String,
  },
};
</script>
