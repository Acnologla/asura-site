<template>
  <div>
      <div class="columns is-variable is-centered is-desktop rinhaInfo">
                <div class ="column is-full-mobile is-full-tablet is-half-desktop">
                    <h2>Upgrades</h2>
                    <Upgrades/>
                </div>
                <div class ="column is-full-mobile is-full-tablet is-half-desktop">
                    <h2> Items</h2>
                    <Items/>
                </div>
        </div>
  </div>
</template>
<style scoped>

h2 {
    font-size: 32px
}
  .rinhaInfo {
      margin-left: 30px;
      margin-right: 30px;
  }
@media screen and (max-width: 1024) {
  .rinhaInfo {
      margin-left: 0px !important;
      margin-right: 0px !important;
  }
}
</style> 
<script>
import Upgrades from "@/components/Upgrades.vue"
import Items from "@/components/Items.vue"
export default {
  name: "Rinhainfo",
  components: {
    Upgrades,
    Items
  },
};
</script>
