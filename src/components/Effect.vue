<template>
    <p>
            <span style="color: #552fbc">{{ skill.effect.effect.name }} </span>
            <br />
            Chance: {{ skill.effect.chance * 100 }}%
            <br />
            Turnos: {{ skill.effect.effect.turns }}
            <br />
            <span v-if="skill.effect.effect.type === 1">
              Dano minimo: {{ skill.effect.effect.range[0] }}
              <br />
              Dano maximo: {{ skill.effect.effect.range[1] }}
            </span>
            <span v-if="skill.effect.effect.type === 2">
              Cura minima: {{ skill.effect.effect.range[0] }}
              <br />
              Cura maxima: {{ skill.effect.effect.range[1] }}
            </span>
            <span v-if="skill.effect.effect.type === 3">Stun: 1 turno</span>
            <span v-if="skill.effect.effect.type === 4"
              >Dano reduzido: {{ skill.effect.effect.range[0] }}%</span
            >
            <span v-if="skill.effect.effect.type === 5"
              >Refletir o proximo ataque</span
            >
            <span v-if="skill.effect.effect.type === 6"
              >Fragilidade: {{ skill.effect.effect.range[0] }}%</span
            >
          </p>
</template>

<script>

export default {
    name: "Effect",
    props: {
        skill: {
            type: Object,
            required: true
        }
    },
}
</script>