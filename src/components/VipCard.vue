<template>
  <div class="card">
    <header class="card-header">
      <p style="color: #552fbc" class="card-header-title">
        Vip
      </p>
    </header>
    <div class="card-content">
      <div class="content" style="text-align: left">
        <h3>Vantagens:</h3>
        <ul>
          <li>Ouro extra e xp extra por treino.</li>
          <li>
            Trocar o nome do galo gratuitamente.
          </li>
          <li>Xp extra no passe de batalha.</li>
          <li>Conteúdo exclusivo no passe de batalha.</li>
          <li>Bônus adicional no comando daily.</li>
          <li>Ganha mais Asura Coins ao vender galos.</li>
          <li>Bônus na torre e nas raids.</li>
          <li>Bônus de xp no egg.</li>
          <li>Chance extra para conseguir chaves.</li>
          <li>Xp e money extra no galinheiro.</li>
          <li>50 Treinos extras por dia.</li>
          <li>Xp extra para seu pet (pombo).</li>
        </ul>
      </div>
    </div>

    <footer
      class="card-footer"
      style="display:block !important;justify-content: center"
    >
      <h3
        style="text-align: left;padding-left: 25px;font-size: 1.5em;font-weight: 600;margin-bottom: 15px;"
      >
        Preços:
      </h3>
      <p style="text-align: left;padding-left: 40px;">
        <b>R$35</b> Mensal<br />
        <span class="slashed">R$105 </span><b> R$84</b> Trimestral
        <span style="color:#552fbc;font-weight: 600;">(20%OFF)</span>
        <br />
        <span class="slashed">R$210</span><b> R$153</b> Semestral
        <span style="color:#552fbc;font-weight: 600;">(27%OFF)</span><br />
        <span class="slashed">R$420</span> <b>R$273</b> Anual
        <span style="color:#552fbc;font-weight: 600;">(35%OFF)</span>
      </p>
      <br />
      <b-button
        label="Comprar"
        type="is-success"
        outlined
        size="is-medium"
        style="margin-bottom: 25px"
        @click="buy"
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
              <p class="popup-text">
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

.popup-text {
  color: black;
  padding: 30px;
  font-weight: 500;
  font-size: 18px;
}

.card {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.slashed {
  text-decoration: line-through;
  font-size: 115%;
}

.card-footer {
  margin-top: auto;
}
[data-theme="dark"] b {
  font-weight: 500;
}
[data-theme="dark"] h3 {
  color: white;
  font-weight: 500;
}

[data-theme="dark"] .popup-text {
  color: white;
  font-weight: 200;
}

@media screen and (max-width: 550px) {
  .card-footer > * {
    padding-left: 15px !important;
  }
  .card-content {
    padding-left: 15px !important;
  }

  .card-content ul {
    margin-left: 1.4em;
  }
}
</style>
<script>
export default {
  name: "DonateCard",
  props: {
    description: String,
    title: String,
    price: String,
    url: String,
  },
  methods: {
    buy() {
      window.open(this.url, "_blank");
    },
  },
  data() {
    return {
      isComponentModalActive: false,
    };
  },
};
</script>
