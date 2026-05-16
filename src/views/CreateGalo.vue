<template>
  <div class="create-galo">
    <div class="container">
      <div class="create-head">
        <div class="eyebrow">DEV TOOL</div>
        <h1 class="h-display">Habilidades</h1>
      </div>

      <div class="skill-grid">
        <CreateSkill
          v-for="(skill, i) in skills"
          :key="i"
          :toDown="toDown"
          :callback="callback"
          :skill="skill"
        />
      </div>

      <div class="actions">
        <button
          v-if="skills.length < 17"
          class="btn btn-primary"
          @click="createSkill"
        >
          Criar
        </button>
        <button
          v-if="skills.length === 17"
          class="btn btn-primary"
          @click="startDownload"
        >
          {{ toDown ? "Baixando…" : "Download" }}
        </button>
      </div>
      <a id="downloadAnchorElem" style="display: none"></a>
    </div>
  </div>
</template>

<script>
import CreateSkill from "../components/CreateSkill";

export default {
  name: "CreateGalo",
  components: { CreateSkill },
  data() {
    return { skills: [], download: [], toDown: false };
  },
  methods: {
    createSkill() {
      this.skills.push({ damage: [0, 0] });
    },
    startDownload() {
      this.toDown = true;
      setTimeout(() => {
        const dataStr =
          "data:text/json;charset=utf-8," +
          encodeURIComponent(JSON.stringify(this.download));
        const el = document.getElementById("downloadAnchorElem");
        el.setAttribute("href", dataStr);
        el.setAttribute("download", "galo.json");
        el.click();
        this.toDown = false;
        this.download = [];
      }, 5000);
    },
    callback(skill, effect) {
      if (effect.type) {
        effect.type = parseInt(effect.type);
        if (effect.type === 2 || effect.type === 5) skill.self = true;
        if (effect.type === 2 || effect.type === 4 || effect.type === 5)
          effect.self = true;
        effect.phrase = "";
        skill.effect = [effect.chance / 100];
        effect.range = effect.range.map((a) => parseInt(a));
        delete effect.chance;
        skill.effect.push(effect);
      }
      skill.damage = skill.damage.map((a) => parseInt(a));
      skill.level = parseInt(skill.level);
      this.download.push(skill);
    },
  },
};
</script>

<style scoped>
.create-galo {
  padding: 32px 0 80px;
}
.create-head {
  margin-bottom: 24px;
}
.create-head h1 {
  font-size: 40px;
  margin: 6px 0 0;
}
.skill-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 18px;
  margin-bottom: 24px;
}
.actions {
  display: flex;
  justify-content: center;
}

@media (max-width: 768px) {
  .skill-grid {
    grid-template-columns: 1fr;
  }
  .create-head h1 {
    font-size: 28px;
  }
}
</style>
