<template>
  <div class="card" style="margin-bottom: 30px">
    <header class="card-header">
      <p style="color: #552fbc" class="card-header-title">
        {{ skill.name }}
      </p>
    </header>
    <div class="card-content">
      <div class="content" style="text-align: left">
        {{ $t("skill.minDamage") }}: {{ skill.damage[0] }}
        <span v-if="toCompare" :class="this.isBetterDamage()[0]">
          {{ toCompare.damage[0] }}
        </span>
        <br />
        {{ $t("skill.maxDamage") }}: {{ skill.damage[1] }}
        <span v-if="toCompare" :class="this.isBetterDamage()[1]">
          {{ toCompare.damage[1] }}
        </span>
        <div v-if="skill.effect.chance > 0">
          <hr />
          <div v-if="effect" style="cursor: pointer" @click="changeEffect">
            <Effect :skill="skill" />
          </div>
          <b-button v-else @click="changeEffect" type="is-primary is-light">{{
            $t("skill.effect")
          }}</b-button>
        </div>
        <div v-if="toCompare && toCompare.effect">
          <hr />

          <p
            v-if="toCompareEffect"
            style="cursor: pointer"
            @click="toCompareChangeEffect"
          >
            <span style="color: #552fbc"
              >{{ toCompare.effect.effect.name }}
            </span>
            <br />
            {{ $t("skill.chance") }}:
            <span
              :class="
                toCompare.effect.chance >= skill.effect.chance ? 'up' : 'down'
              "
            >
              {{ toCompare.effect.chance * 100 }}%
            </span>
            <br />
            {{ $t("skill.turns") }}:
            <span
              :class="
                toCompare.effect.effect.turns >= skill.effect.effect.turns
                  ? 'up'
                  : 'down'
              "
            >
              {{ toCompare.effect.effect.turns }}
            </span>
            <br />
            <span v-if="toCompare.effect.effect.type === 1">
              {{ $t("skill.minDamage") }}:
              <span
                :class="
                  toCompare.effect.effect.range[0] >=
                  skill.effect.effect.range[0]
                    ? 'up'
                    : 'down'
                "
              >
                {{ toCompare.effect.effect.range[0] }}
              </span>
              <br />
              {{ $t("skill.maxDamage") }}:
              <span
                :class="
                  toCompare.effect.effect.range[1] >=
                  skill.effect.effect.range[1]
                    ? 'up'
                    : 'down'
                "
              >
                {{ toCompare.effect.effect.range[1] }}
              </span>
            </span>
            <span v-if="toCompare.effect.effect.type === 2">
              {{ $t("skill.minHeal") }}:<span
                :class="
                  toCompare.effect.effect.range[0] >=
                  skill.effect.effect.range[0]
                    ? 'up'
                    : 'down'
                "
              >
                {{ toCompare.effect.effect.range[0] }}
              </span>
              <br />
              {{ $t("skill.maxHeal") }}:
              <span
                :class="
                  toCompare.effect.effect.range[1] >=
                  skill.effect.effect.range[1]
                    ? 'up'
                    : 'down'
                "
              >
                {{ toCompare.effect.effect.range[1] }}
              </span>
            </span>
            <span v-if="toCompare.effect.effect.type === 3">{{
              $t("skill.stun")
            }}</span>
            <span v-if="toCompare.effect.effect.type === 4"
              >{{ $t("skill.reducedDamage") }}:
              <span
                :class="
                  toCompare.effect.effect.range[0] >=
                  skill.effect.effect.range[0]
                    ? 'up'
                    : 'down'
                "
              >
                {{ toCompare.effect.effect.range[0] }}%
              </span></span
            >
            <span v-if="toCompare.effect.effect.type === 5">{{
              $t("skill.reflectNext")
            }}</span>
            <span v-if="toCompare.effect.effect.type === 6"
              >{{ $t("skill.fragility") }}:
              {{ toCompare.effect.effect.range[0] }}%</span
            >
          </p>
          <b-button
            v-else
            @click="toCompareChangeEffect"
            type="is-primary is-light"
            >{{ $t("skill.compareEffect") }}</b-button
          >
        </div>
      </div>
    </div>
    <footer class="card-footer">
      <p class="card-footer-item" style="color: #552fbc">
        {{ $t("skill.level") }}: {{ skill.level }}
        <span
          v-if="toCompare"
          :class="toCompare.level <= skill.level ? 'up' : 'down'"
        >
          {{ " |" + toCompare.level }}
        </span>
      </p>

      <p v-if="skill.evolved" class="card-footer-item" style="color: #552fbc">
        {{ $t("skill.evolved") }}
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
  name: "Skill",
  components: {
    Effect,
  },
  data() {
    return {
      effect: false,
      toCompareEffect: false,
    };
  },
  methods: {
    changeEffect() {
      this.effect = !this.effect;
    },
    toCompareChangeEffect() {
      this.toCompareEffect = !this.toCompareEffect;
    },
    isBetterDamage() {
      return [
        this.toCompare.damage[0] > this.skill.damage[0] ? "up" : "down",
        this.toCompare.damage[1] > this.skill.damage[1] ? "up" : "down",
      ];
    },
  },
  props: {
    skill: Object,
    toCompare: Object,
  },
  created() {
    if (!this.skill.effect)
      this.skill.effect = {
        effect: {
          range: [0, 0],
          turns: 0,
        },
        chance: 0,
      };
  },
  watch: {
    skill: {
      deep: true,
      handler() {
        this.effect = false;
        if (!this.skill.effect)
          this.skill.effect = {
            effect: {
              range: [0, 0],
              turns: 0,
            },
            chance: 0,
          };
      },
    },
  },
};
</script>
