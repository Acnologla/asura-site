<template>
<center>
  <b-carousel
      @change="change($event)"
      class = "galos"
      arrow
      v-model="selected"
      :arrowHover="false"
      :indicator="false"
      :pause-info="false"
      :repeat="false"
      :autoplay="false"
      :indicator-inside="false"
  >
        <b-carousel-item v-for="(sprite, i) in sprites" :key="i">
           <span class="image">
              <img :src="sprite" :style="`height: 200px;border: 4px solid ${colors[classes[selected+1].rarity]}`">
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
      sprites: [],
      selected: 0,
      colors: ["#CDE3FF", "#0000FF", "#9400D3", "#FF9000", "#FF4040"]
    }
  },
  props: {
    classes: Array
  },
  methods: {
    change(val){
      this.$emit("change",val)
    }
  },
  created(){
    if (this.$route.query.galo){
      this.selected = parseInt(this.$route.query.galo)
    }
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