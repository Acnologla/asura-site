<template>
  <div style="cursor: pointer">
    <h2 @click="toggleActive">
      <font-awesome-icon v-if="active" icon="chevron-down" />
      <font-awesome-icon v-else icon="chevron-right" />
      {{ item.name }}
    </h2>
    <div style="margin-left: 22px" v-if="active">
      <p v-if="item.effect == 1">
        Aumenta o dano das suas habilidades em
        {{ Math.round((item.payload - 1) * 100) }}%
      </p>
      <p v-if="item.effect == 2">
        Suas habilidades tem chance de causar:
        <Effect
          :skill="{ effect: { chance: 0.3, effect: effects[item.payload] } }"
        />
      </p>
      <p v-if="item.effect == 3">
        Aumenta a chance dos seus efeitos em
        {{ Math.round(item.payload * 100) }}%
      </p>
      <p v-if="item.effect == 4">
        Aumenta sua vida em {{ Math.round((item.payload - 1) * 100) }}%
      </p>
      <p v-if="item.effect == 5">
        Diminui o dano que voce recebe em
        {{ Math.round((1 - item.payload) * 100) }}%
      </p>
      <p v-if="item.effect == 6">
        Aumenta o dano dos seus efeitos em
        {{ Math.round((item.payload - 1) * 100) }}%
      </p>
      <p v-if="item.effect == 7">
        Reflete todo dano levado em {{ Math.round(item.payload * 100) }}%
      </p>
      <p v-if="item.effect == 8">
        Voce ganha {{ item.payload * 100 }}% de xp adicional todo train
      </p>
      <p v-if="item.effect == 9">
        Voce ganha 2 de xp adicional por treino
      </p>
      <p v-if="item.effect == 11">
        Aumenta a sua cura e diminue a do oponente em
        {{ Math.round((item.payload - 1) * 100) }}%
      </p>
      <p v-if="item.effect == 12">
        Diminui o dano de efeitos que voce recebe em
        {{ Math.round((1 - item.payload) * 100) }}%
      </p>
      <p v-if="item.effect == 13">
        Ganha {{ item.payload }} de dinheiro extra por rinha
      </p>
      <p v-if="item.effect == 14">
        Seu oponente começa com {{ Math.round(item.payload * 100) }}% de vida
        faltando
      </p>
      <p></p>
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
