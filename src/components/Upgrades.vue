<template>
  <div style="margin-left: 30px;text-align: left">
    <div v-for="(upgrade, i) in upgrades" :key="i">
      <Upgrade :upgrade="upgrade" />
    </div>
  </div>
</template>
<script>
import axios from "axios";
import Upgrade from "@/components/Upgrade";
export default {
  name: "Items",
  components: {
    Upgrade,
  },
  data() {
    return {
      upgrades: [],
    };
  },
  created() {
    const locale = this.$i18n.locale || "pt";
    axios
      .get(`https://info.asurabot.com.br/upgrades.json?language=${locale}`)
      .then((upgrades) => {
        this.upgrades = upgrades.data;
      });
  },
};
</script>
