<template>
  <div class="card">
    <header class="card-header">
      <p style="color: #552fbc" class="card-header-title" v-html="title"></p>
    </header>
    <div class="card-content">
      <div v-html="description" class="content" style="text-align: left"></div>
    </div>
    <footer
      class="card-footer"
      style="display:block !important;justify-content: center"
    >
      <p>
        <b>{{ price }}</b>
      </p>
      <br />
      <b-button
        label="Comprar"
        type="is-success"
        outlined
        size="is-medium"
        style="margin-bottom: 25px"
        @click="isComponentModalActive = true"
      />

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
          <div class="card">
            <header class="card-header">
              <p
                style="color: black;padding: 30px;font-weight: 500;font-size: 18px;"
              >
                Atualmente doaçoes devem ser feitas no privado do acnologla, ou
                em algum canal no servidor de
                <a target="_blank" href="https://discord.gg/CfkBZyVsd7"
                  >suporte do discord.</a
                >
              </p>
            </header>
          </div>
        </template>
      </b-modal>
    </footer>
  </div>
</template>
<style scoped>
.card-footer {
  border-top: 0px;
}
.card {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.card-footer {
  margin-top: auto;
}
[data-theme="dark"] b {
  font-weight: 500;
}
</style>
<script>
export default {
  name: "DonateCard",
  props: {
    description: String,
    title: String,
    price: String,
  },
  data() {
    return {
      isComponentModalActive: false,
    };
  },
};
</script>
