<template>
  <div>
    <h2 style="cursor: pointer;color: #552fbc" @click="toggleActive">
      <font-awesome-icon v-if="active" icon="chevron-down" />
      <font-awesome-icon v-else icon="chevron-right" />
      {{ upgrade.name }}
    </h2>
    <div v-if="active">
      <p>{{ upgrade.value }}</p>
      <div v-if="upgrade.childs" style="margin-left: 30px">
        <Upgrade
          v-for="(upgrade, i) in upgrade.childs"
          :key="i"
          :upgrade="upgrade"
        />
      </div>
    </div>
  </div>
</template>
<style scoped>
h2 {
  font-size: 2rem;
}
p {
  font-size: 1.5rem;
}
</style>
<script>
export default {
  name: "Upgrade",
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
    upgrade: {
      type: Object,
      required: true,
    },
  },
};
</script>