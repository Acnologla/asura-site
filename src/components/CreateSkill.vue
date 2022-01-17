<template>
  <div class="card" style="margin-bottom: 30px">
    <header class="card-header">
      <p style="color: #552fbc" class="card-header-title">
        <input v-model="skill.name" placeholder="nome da skill" />
      </p>
    </header>
    <div class="card-content">
      <div class="content" style="text-align: left">
        Dano minimo:
        <input v-model="skill.damage[0]" placeholder="dano minimo" />
        <br />
        Dano maximo:
        <input v-model="skill.damage[1]" placeholder="dano maximo" />
        <br />
        <br />
        <b-button @click="() => (effect = !effect)" type="is-primary">
          Criar efeito
        </b-button>
        <div v-if="effect">
          <hr />
          <input v-model="createdEffect.name" placeholder="nome" />
          <br />
          <input v-model="createdEffect.chance" placeholder="chance %" />
          <br />

          <input v-model="createdEffect.turns" placeholder="turnos" />
          <br />
          Tipo do efeito:
          <br />
          <select v-model="createdEffect.type">
            <option value="1">Dano</option>
            <option value="2">Cura</option>
            <option value="3">Stun</option>
            <option value="4">Dano reduzido</option>
            <option value="5">Reflexão</option>
            <option value="6">Fragilidade</option>
          </select>
          <br />

          <div v-if="['1','2'].includes(createdEffect.type)">
            Minimo:<br />
            <input v-model="createdEffect.range[0]" placeholder="minimo" />
            <br />
            Maximo:<br />

            <input v-model="createdEffect.range[1]" placeholder="maximo" />
          </div>
          <div
            v-if="['4','5'].includes(createdEffect.type)"
          >
            Porcentagem minima:
            <br />
            <input v-model="createdEffect.range[0]" />
            <br />
            Porcentagem maxim:
            <br />
            <input v-model="createdEffect.range[1]" placeholder="maximo%" />
          </div>
          <b-button @click="changeEffect" type="is-primary is-light"
            >Deletar efeito</b-button
          >
        </div>
      </div>
    </div>
    <footer class="card-footer">
      <p class="card-footer-item" style="color: #552fbc">
        Level:
        <input
          style="margin-left: 10px"
          v-model="skill.level"
          placeholder="level"
        />
      </p>
    </footer>
  </div>
</template>
<style scoped>
.up {
  color: green;
}
.down {
  color: red;
}
.card-header-title {
  font-weight: 500;
}
.card {
  display: flex;
  flex-direction: column;
}
.card-footer {
  margin-top: auto;
}

[data-theme="dark"] .card hr {
  background-color: #2a2d32;
}

[data-theme="dark"] .button.is-primary.is-light {
  color: #f2effb;
  background-color: #552fbc;
}
</style>
<script>
import Effect from "./Effect.vue";
export default {
  name: "CreateSkill",
  components: {
    Effect,
  },
  data() {
    return {
      effect: false,
      createdEffect: this.defaultObject(),
    };
  },
  methods: {
    defaultObject() {
      return {
        range: [0, 0],
      };
    },
    changeEffect() {
      this.effect = !this.effect;
      if (!this.effect) {
        this.createdEffect = this.defaultObject();
      }
    },
  },
  props: {
    skill: Object,
    callback: Function,
    toDown: Boolean,
  },
  watch: {
    toDown(newVal) {
      if (newVal) {
        this.callback(this.skill, this.createdEffect);
      }
    },
  },
};
</script>
