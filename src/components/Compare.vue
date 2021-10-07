
<template>
  <div>
    <b-button
      style="margin-left: 10px"
      @click="
        () => (this.isComponentModalActive = !this.isComponentModalActive)
      "
      type="is-primary is-light"
      >Comparar</b-button
    >
    <b-modal
      v-model="isComponentModalActive"
      has-modal-card
      trap-focus
      :destroy-on-hide="false"
      aria-role="dialog"
      aria-label="Example Modal"
      aria-modal
    >
      <template>
        <div v-on:keyup.enter="compareFn">
          <div class="modal-card" style="width: 80vw">
            <header class="modal-card-head">
              <p class="modal-card-title">Comparar galos</p>
            </header>
            <section class="modal-card-body">
              <b-input
                v-on:keyup.enter="() => compareFn()"
               v-model="galo"
                placeholder="Digite o nome do galo que deseja comparar"
              >
              </b-input>
            </section>
          </div>
        </div>
      </template>
    </b-modal>
  </div>
</template>
<style scoped>
[data-theme="dark"] .button.is-primary.is-light {
  color: #f2effb;
  background-color: #552fbc;
}
</style>
<script>
export default {
  name: "Compare",
  methods: {
    compareFn() {
      const galo = this.classes.find(
        (a) => a.name.toLowerCase() === this.galo.toLowerCase()
      );
      if (!galo) return false;
      this.isComponentModalActive = false
      this.compare(galo);
      return true
    },
  },
  props: {
    classes: Array,
    compare: Function,
  },
  data() {
    return {
      isComponentModalActive: false,
      galo: "",
    };
  },
};
</script>