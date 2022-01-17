<template>
  <div>
    <h1 style="margin-bottom: 20px; font-family: Rubik; font-size: 32px">
      Habilidades
    </h1>
    <br />
    <div
      class="columns is-multiline"
      style="margin-left: 30px; margin-right: 30px"
    >
      <div
        v-for="(skill, i) in skills"
        :key="i"
        class="
          column
          is-three-quarters-mobile
          is-half-tablet
          is-one-third-desktop
          is-one-quarter-widescreen
          is-one-quarter-fullhd
        "
      >
        <CreateSkill
          :toDown="toDown"
          :callback="callback"
          :skill="skill"
        ></CreateSkill>
      </div>
    </div>
    <div
      class="columns is-multiline"
      style="margin-left: 30px; margin-right: 30px"
    >
      <b-button
        label="Criar"
        v-if="skills.length < 17"
        type="is-success"
        outlined
        size="is-medium"
        style="margin-bottom: 5px"
        @click="createSkill"
      />
    </div>
    <b-button
      v-if="skills.length === 17"
      :label="toDown ? 'Baixando' : 'Download'"
      type="is-success"
      outlined
      size="is-medium"
      style="margin-bottom: 5px"
      @click="startDownload"
    />
    <a id="downloadAnchorElem" style="display: none"></a>
  </div>
</template>
    
<script>
import CreateSkill from "../components/CreateSkill";
export default {
  name: "CreateGalo",
  data() {
    return {
      skills: [],
      download: [],
      toDown: false,
    };
  },
  components: {
    CreateSkill,
  },
  methods: {
    createSkill() {
      this.skills.push({
        damage: [0, 0],
      });
    },
    startDownload() {
      this.toDown = true;
      setTimeout(() => {
        const dataStr =
          "data:text/json;charset=utf-8," +
          encodeURIComponent(JSON.stringify(this.download));
        const dlAnchorElem = document.getElementById("downloadAnchorElem");
        dlAnchorElem.setAttribute("href", dataStr);
        dlAnchorElem.setAttribute("download", "galo.json");
        dlAnchorElem.click();
        this.toDown = false
        this.download = []
      }, 5000);
    },
    callback(skill, effect) {

      if (effect.type) {
          console.log(effect.type)
        effect.type = parseInt(effect.type)
        if (effect.type === 2 || effect.type === 5) {
          skill.self = true;
        }
        if (effect.type === 2 || effect.type === 4 || effect.type === 5) {
          effect.self = true;
        }
        effect.phrase = "";
        skill.effect = [effect.chance / 100];
        effect.range = effect.range.map(a => parseInt(a))
        delete effect.chance;
        skill.effect.push(effect);
      }
      skill.damage = skill.damage.map( a => parseInt(a))
      skill.level = parseInt(skill.level)
      this.download.push(skill);
    },
  },
};
</script>