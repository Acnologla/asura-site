<template>
<center>
  <b-carousel
      @change="change($event)"
      class = "galos"
      :pause-info="false"
      :repeat="false"
      :autoplay="false"
      :indicator-inside="false"
  >
        <b-carousel-item v-for="(sprite, i) in sprites" :key="i">
           <span class="image">
              <img :src="sprite" style="height: 200px">
            </span>
        </b-carousel-item>
  </b-carousel>
</center>

</template>
<script>
import axios from "axios"

export default {
  name: "galos",
  data(){
    return {
      sprites: []
    }
  },
  methods: {
    change(val){
      this.$emit("change",val)
    }
  },
  created(){
    axios.get("https://raw.githubusercontent.com/Acnologla/asura/master/resources/galo/sprites.json").then(result => {
      this.sprites = result.data[0]
    })
  }
}
</script>
<style>
.galos{
  width: 300px;
  height: 300px;
}
</style>