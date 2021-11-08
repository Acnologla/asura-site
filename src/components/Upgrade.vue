<template>
  <div>
    <h2 style="cursor: pointer" @click="toggleActive">
      <font-awesome-icon v-if="active" icon="chevron-down" />
      <font-awesome-icon v-else icon="chevron-right" />
      {{ upgrade.name }}
    </h2>
    <div class = "up" v-if="active">
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
  font-size: 1.7rem;
}
p {
  font-size: 1.2rem;
}
@media screen and (min-width: 1024px) {
.up{
  margin-left: 30px;
}
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