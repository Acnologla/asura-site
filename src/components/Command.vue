<template>
  <div class="command">
    <div class="commandContainer" @click="() => (active = !active)">
      <div>
        <p class="commandTitle">{{ command.name }}</p>
        <p class="commandHelp">{{ command.help }}</p>
      </div>
      <div class="is-hidden-mobile" style="margin-left: auto">
        <font-awesome-icon
          v-if="!active"
          style="color: #7957d5; font-size: 40px; margin-right: 30px"
          icon="plus-circle"
        />
        <font-awesome-icon
          v-else
          style="color: #7957d5; font-size: 40px; margin-right: 30px"
          icon="minus-circle"
        />
      </div>
    </div>
    <div class="commandInfo" v-if="active">
      <p>Cooldown: {{ command.cooldown }} segundos</p>
    </div>
  </div>
</template>
<style scoped>
.command {
  text-align: left;
  background-color: #f3f4f5;
  cursor: pointer;
  border-radius: 20px;
}
.commandInfo {
  margin-left: 20px;
  padding-top: 15px;
  padding-bottom: 15px;
}
.commandContainer {
  margin-left: 20px;
  padding-top: 15px;
  padding-bottom: 15px;
  display: flex;
  align-items: center;
}
.commandTitle {
  font-weight: 500;
  color: #7957d5;
  font-size: 30px;
}
.commandHelp {
  font-size: 20px;
}
[data-theme="dark"] .command {
  background-color: #1d1f21;
}
@media screen and (min-width: 1024px) {
  .command:hover {
    opacity: 0.7;
  }
}
</style>
<script>
export default {
  name: "Command",
  props: {
    command: Object,
  },
  data() {
    return {
      active: false,
    };
  },
};
</script>
