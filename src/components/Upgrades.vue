<template>
  <div style="margin-left: 30px;text-align: left">
    <div v-for="(upgrade, i) in upgrades" :key="i">
      <Upgrade
        :upgrade="upgrade"
      />
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
        upgrades : []
    };
  },
  created() {
    axios
      .get(
        "https://raw.githubusercontent.com/Acnologla/asura/master/resources/galo/upgrades.json"
      )
      .then((upgrades) => {
        this.upgrades = upgrades.data;
      });
  },
};
</script>
