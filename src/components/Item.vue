<template>
  <div style="cursor: pointer">
    <h2 @click="toggleActive">
      <font-awesome-icon v-if="active" icon="chevron-down" />
      <font-awesome-icon v-else icon="chevron-right" />
      {{ item.name }}
    </h2>
    <div style="margin-left: 22px" v-if="active">
      <p>
        {{ item.description }}
      </p>
    </div>
  </div>
</template>
<style scoped>
h2 {
  font-size: 1.2rem;
}
p {
  font-size: 1rem;
}
</style>
<script>
import Effect from "./Effect.vue";
export default {
  components: {
    Effect,
  },
  name: "Item",
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
    item: {
      type: Object,
      required: true,
    },
  },
};
</script>
