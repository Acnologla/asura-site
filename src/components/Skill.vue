<template>
<div class="card" style="margin-bottom: 30px">
  <header class="card-header">
    <p style="color: #552fbc" class="card-header-title">
      {{skill.name}}
    </p>
  </header>
  <div class="card-content">
    <div class="content" style="text-align: left">
      Dano minimo: {{skill.damage[0]}}
      <br>
      Dano maximo: {{skill.damage[1] - 1}}
      <div v-if="skill.effect">
            <hr>
            <p v-if="effect" style="cursor: pointer" @click="changeEffect">
                <span style="color: #552fbc">{{skill.effect.effect.name}} </span> 
                <br>
                Chance: {{skill.effect.chance * 100}}% 
                <br>
                Turnos: {{skill.effect.effect.turns}}
                <br>
                <span v-if="skill.effect.effect.type === 1">
                Dano minimo: {{skill.effect.effect.range[0]}}
                <br>
                Dano maximo: {{skill.effect.effect.range[1] - 1}}
                </span>
                <span v-if="skill.effect.effect.type === 2">
                Cura minima: {{skill.effect.effect.range[0]}} 
                <br>
                Cura maxima: {{skill.effect.effect.range[1]}}
                </span>
                <span v-if="skill.effect.effect.type === 3">Stun: 1 turno</span>
                <span v-if="skill.effect.effect.type === 4">Dano reduzido: {{skill.effect.effect.range[0]}}%</span>
                <span v-if="skill.effect.effect.type === 5">Refletir o proximo ataque</span>
                <span v-if="skill.effect.effect.type === 6">Fragilidade: {{skill.effect.effect.range[0]}}%</span>
            </p>
            <b-button v-else @click="changeEffect" type="is-primary is-light">Efeito</b-button>
      </div>
    </div>
  </div>
  <footer class="card-footer">
    <p class="card-footer-item" style="color: #552fbc">Level {{skill.level}}</p>
  </footer>
</div>
</template>
<style scoped>
.card-header-title{
    font-weight: 500 ;
}
.card {
        display: flex;
        flex-direction: column;
}
.card-footer {
        margin-top: auto;  
}

[data-theme="dark"] .card hr{
  background-color: #2A2D32;
}

[data-theme="dark"] .button.is-primary.is-light{
    color: #f2effb;
    background-color: #552fbc
}
</style>
<script>
export default{
    name: "Skill",
    data(){
        return {
            effect: false,
        }
    },
    methods: {
        changeEffect(){
           this.effect = !this.effect
        }
    },
    props: {
        skill: Object,
    },
    watch: {
        "skill":{
            deep: true,
            handler(){
                this.effect = false
            }
        }
    }
}
</script>
