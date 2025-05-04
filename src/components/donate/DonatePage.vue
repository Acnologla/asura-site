<template>
  <div class="min-h-screen bg-gradient-to-b from-purple-50 to-white">
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
              Atualmente doaçoes devem ser feitas no privado do acnologla, ou em
              algum canal no servidor de
              <a target="_blank" href="https://discord.gg/CfkBZyVsd7"
                >suporte do discord.</a
              >
            </p>
          </header>
        </div>
      </template>
    </b-modal>
    <div class="container mx-auto py-12 px-2 sm:px-4" @click="handleClick">
      <div class="text-center mb-12">
        <h1
          class="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-800 mb-4"
        >
          Apoie nosso servidor
        </h1>
        <p class="text-gray-600 max-w-2xl mx-auto text-lg">
          Escolha a melhor opção para você e aproveite os benefícios exclusivos
          em nosso bot.
        </p>
      </div>

      <div
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 max-w-9xl mx-auto "
      >
        <div
          v-for="(option, index) in currencyOptions"
          :key="index"
          class="border-0 shadow-lg transition-all duration-300 overflow-hidden group rounded-lg w-full"
        >
          <div
            class="bg-gradient-to-r from-purple-600 to-purple-700 text-white py-6 rounded-t-lg relative overflow-hidden"
          >
            <div class="flex items-center justify-center mb-2">
              <font-awesome-icon :icon="option.icon" class="h-8 w-8" />
            </div>
            <h3 class="text-center text-lg font-medium">{{ option.title }}</h3>
          </div>

          <div class="pt-6 pb-4 px-6 bg-white relative z-10">
            <p class="text-center mb-6 text-gray-600">
              {{ option.description }}
            </p>
            <div
              class="text-center mb-4 bg-purple-50 py-2 px-4 rounded-full mx-auto w-fit"
            >
              <div class="font-bold text-xl text-purple-700">
                {{ option.priceValue }}
              </div>
              <div class="text-xs text-purple-600 uppercase font-medium">
                {{ option.priceUnit }}
              </div>
            </div>
          </div>

          <div
            class="pb-6 pt-0 px-6 flex justify-center bg-white relative z-10"
          >
            <button
              class="bg-green-500 text-white border-none w-full rounded-md font-medium transition-all duration-300 py-3"
            >
              Comprar
            </button>
          </div>
        </div>
      </div>

      <!-- Membership Plans -->
      <div class="max-w-5xl mx-auto mb-16">
        <div class="text-center mb-10">
          <h2 class="text-3xl font-bold text-purple-700 mb-2">
            Planos de Assinatura
          </h2>
          <p class="text-gray-600">
            Escolha o plano que melhor se adapta às suas necessidades
          </p>
        </div>

        <div class="w-full">
          <div class="grid w-full grid-cols-3 mb-8 bg-gray-100 rounded-lg p-1">
            <button
              v-for="tab in tabs"
              :key="tab.value"
              @click="activeTab = tab.value"
              :class="[
                'py-2 px-4 rounded-md transition-all tab-btn',
                activeTab === tab.value
                  ? 'bg-white shadow-sm text-purple-700 font-medium'
                  : 'text-gray-600',
              ]"
            >
              {{ tab.label }}
            </button>
          </div>

          <!-- Compare Tab -->
          <div
            v-if="activeTab === 'compare'"
            class="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <!-- Prime Plan -->
            <div
              class="border-2 border-green-400 shadow-md transition-all duration-300 relative overflow-hidden rounded-lg"
            >
              <div
                class="text-center py-8 bg-gradient-to-r from-green-400 to-green-500 text-white relative"
              >
                <div class="flex justify-center mb-2">
                  <font-awesome-icon icon="hand-sparkles" class="h-8 w-8" />
                </div>
                <h3 class="text-2xl font-bold">Prime</h3>
                <p class="text-green-100 mt-1">Benefícios essenciais</p>
                <div class="mt-4 text-4xl font-bold">R$17</div>
                <p class="text-green-100">por mês</p>
              </div>

              <div class="space-y-4 align-helper">
                <ul class="space-y-3 min-h-[300px]">
                  <li
                    v-for="(feature, index) in alignedFeatures.prime"
                    :key="index"
                    class="flex items-start gap-3"
                  >
                    <font-awesome-icon
                      icon="check"
                      class="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5"
                    />
                    <span class="text-gray-700">{{ feature }}</span>
                  </li>
                </ul>

                <div class="pt-4 space-y-3 border-t border-gray-100 mt-5">
                  <div
                    v-for="(plan, index) in primePlans"
                    :key="index"
                    class="flex items-center justify-between"
                  >
                    <div class="flex items-center gap-2">
                      <span class="font-medium text-gray-700">{{
                        plan.name
                      }}</span>
                      <span
                        v-if="plan.discount"
                        class="bg-green-100 text-green-800 font-medium text-xs px-2 py-1 rounded-full"
                      >
                        {{ plan.discount }}
                      </span>
                    </div>
                    <div class="text-lg font-bold text-green-600">
                      {{ plan.price }}
                    </div>
                  </div>
                </div>
              </div>
              <br />
              <div class="pt-0 pb-6 px-6">
                <button
                  class="w-full bg-green-500 text-white rounded-md py-3 shadow-lg transition-all"
                >
                  Assinar Prime
                </button>
              </div>
            </div>

            <div
              class="border-2 border-purple-400 shadow-md transition-all duration-300 overflow-hidden relative rounded-lg"
            >
              <div
                class="text-center py-8 bg-gradient-to-r from-purple-600 to-purple-700 text-white relative"
              >
                <div class="flex justify-center mb-2">
                  <font-awesome-icon icon="crown" class="h-8 w-8" />
                </div>
                <h3 class="text-2xl font-bold">VIP</h3>
                <p class="text-purple-100 mt-1">Todos os benefícios</p>
                <div class="mt-4 text-4xl font-bold">R$35</div>
                <p class="text-purple-100">por mês</p>
              </div>

              <div class="space-y-4 align-helper">
                <ul class="space-y-3 min-h-[320px]">
                  <li
                    v-for="(feature, index) in alignedFeatures.vip"
                    :key="index"
                    class="flex items-start gap-3"
                  >
                    <font-awesome-icon
                      icon="check"
                      class="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5"
                    />
                    <span class="text-gray-700">{{ feature }}</span>
                  </li>
                </ul>

                <div class="pt-4 space-y-3 border-t border-gray-100 mt-5">
                  <div
                    v-for="(plan, index) in vipPlans"
                    :key="index"
                    class="flex items-center justify-between"
                  >
                    <div class="flex items-center gap-2">
                      <span class="font-medium text-gray-700">{{
                        plan.name
                      }}</span>
                      <span
                        v-if="plan.discount"
                        class="bg-purple-100 text-purple-800 font-medium text-xs px-2 py-1 rounded-full"
                      >
                        {{ plan.discount }}
                      </span>
                    </div>
                    <div class="text-lg font-bold text-purple-700">
                      {{ plan.price }}
                    </div>
                  </div>
                </div>
              </div>

              <br />
              <div class="pt-0 pb-6 px-6">
                <button
                  class="w-full bg-purple-600 text-white rounded-md py-3 shadow-lg transition-all"
                >
                  Assinar VIP
                </button>
              </div>
            </div>
          </div>

          <!-- Prime Tab -->
          <div
            v-if="activeTab === 'prime'"
            class="border-2 border-green-400 overflow-hidden rounded-lg"
          >
            <div
              class="bg-gradient-to-r from-green-400 to-green-500 text-white py-6"
            >
              <div class="flex items-center justify-center gap-2 mb-4">
                <font-awesome-icon icon="hand-sparkles" class="h-6 w-6" />
                <h3 class="text-2xl font-bold">Plano Prime</h3>
              </div>
              <p class="text-green-100 text-center">
                Benefícios essenciais por um preço acessível
              </p>
            </div>

            <div class="align-helper">
              <div class="grid md:grid-cols-2 gap-8">
                <div>
                  <h3
                    class="text-xl font-bold text-green-600 mb-4 flex items-center gap-2"
                  >
                    <font-awesome-icon icon="star" class="h-5 w-5" /> Vantagens
                    Prime:
                  </h3>
                  <ul class="space-y-3">
                    <li
                      v-for="(benefit, index) in primeFeatures"
                      :key="index"
                      class="flex items-start gap-2"
                    >
                      <font-awesome-icon
                        icon="check"
                        class="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5"
                      />
                      <span class="text-gray-700">{{ benefit }}</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 class="text-xl font-bold text-green-600 mb-4">Preços:</h3>
                  <div class="space-y-4">
                    <div
                      v-for="(plan, index) in primePlans"
                      :key="index"
                      class="flex items-center justify-between border-b border-gray-200 pb-3"
                    >
                      <div>
                        <div class="font-medium">{{ plan.name }}</div>
                        <span
                          v-if="plan.discount"
                          class="bg-green-100 text-green-800 font-medium text-xs px-2 py-1 rounded-full"
                        >
                          {{ plan.discount }}
                        </span>
                      </div>
                      <div class="text-lg font-bold text-green-600">
                        {{ plan.price }}
                      </div>
                    </div>
                  </div>
                  <div class="mt-6 flex justify-center">
                    <button
                      class="bg-green-500 text-white border-none w-full py-3 rounded-md"
                    >
                      Assinar Prime
                    </button>
                  </div>
                  <br />
                </div>
              </div>
            </div>
          </div>

          <!-- VIP Tab -->
          <div
            v-if="activeTab === 'vip'"
            class="border-2 border-purple-400 overflow-hidden rounded-lg"
          >
            <div
              class="bg-gradient-to-r from-purple-600 to-purple-700 text-white py-6"
            >
              <div class="flex items-center justify-center gap-2 mb-4">
                <font-awesome-icon icon="crown" class="h-6 w-6" />
                <h3 class="text-2xl font-bold">Plano VIP</h3>
              </div>
              <p class="text-purple-100 text-center">
                Acesso completo a todos os benefícios premium
              </p>
            </div>

            <div class="align-helper">
              <div class="grid md:grid-cols-2 gap-8">
                <div>
                  <h3
                    class="text-xl font-bold text-purple-700 mb-4 flex items-center gap-2"
                  >
                    <font-awesome-icon icon="crown" class="h-5 w-5" /> Vantagens
                    VIP:
                  </h3>
                  <ul class="space-y-3">
                    <li
                      v-for="(benefit, index) in vipFeatures"
                      :key="index"
                      class="flex items-start gap-2"
                    >
                      <font-awesome-icon
                        icon="check"
                        class="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5"
                      />
                      <span class="text-gray-700">{{ benefit }}</span>
                    </li>
                  </ul>
                  <br class="is-hidden-mobile" />
                </div>

                <div>
                  <h3 class="text-xl font-bold text-purple-700 mb-4">
                    Preços:
                  </h3>
                  <div class="space-y-4">
                    <div
                      v-for="(plan, index) in vipPlans"
                      :key="index"
                      class="flex items-center justify-between border-b border-gray-200 pb-3"
                    >
                      <div>
                        <div class="font-medium">{{ plan.name }}</div>
                        <span
                          v-if="plan.discount"
                          class="bg-purple-100 text-purple-800 font-medium text-xs px-2 py-1 rounded-full"
                        >
                          {{ plan.discount }}
                        </span>
                      </div>
                      <div class="text-lg font-bold text-purple-700">
                        {{ plan.price }}
                      </div>
                    </div>
                  </div>

                  <div class="mt-6 flex justify-center">
                    <button
                      class="bg-purple-600 text-white border-none w-full py-3 rounded-md"
                    >
                      Assinar VIP
                    </button>
                  </div>
                  <br />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faCheck,
  faCrown,
  faStar,
  faCoins,
  faBolt,
  faMedal,
  faUser,
  faHandSparkles,
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faCheck,
  faCrown,
  faStar,
  faCoins,
  faBolt,
  faMedal,
  faUser,
  faHandSparkles
);

export default {
  components: {
    FontAwesomeIcon,
  },
  data() {
    return {
      activeTab: "compare",
      isComponentModalActive: false,
      tabs: [
        { label: "Comparar Planos", value: "compare" },
        { label: "Prime", value: "prime" },
        { label: "VIP", value: "vip" },
      ],
      currencyOptions: [
        {
          title: "Compra de dinheiro",
          description: "Comprar dinheiro avisadamente na sua conta.",
          priceValue: "R$ 10",
          priceUnit: "a cada 12000 moedas",
          icon: "coins",
        },
        {
          title: "Compra de Xp",
          description: "Comprar Xp avisadamente na sua conta.",
          priceValue: "R$ 10",
          priceUnit: "a cada 8000 Xp",
          icon: "bolt",
        },
        {
          title: "Compra de Asura coins",
          description: "Comprar Asura coins avisadamente na sua conta.",
          priceValue: "R$ 15",
          priceUnit: "a cada 1 Asura Coin",
          icon: "medal",
        },
        {
          title: "Compra de UserXp",
          description: "Comprar UserXp avisadamente na sua conta.",
          priceValue: "R$ 10",
          priceUnit: "a cada 2000 UserXp",
          icon: "user",
        },
        {
          title: "Compra de Resets",
          description: "Comprar Um reset de galo avulsamente na sua conta.",
          priceValue: "R$ 45",
          priceUnit: "R$ 45 a cada 1 Reset",
          icon: "user",
        },
      ],
      primeFeatures: [
        "Ouro extra e xp extra por treino",
        "Trocar o nome do galo gratuitamente",
        "Bônus adicional no comando daily",
        "Chance extra para conseguir chaves",
        "Xp e money extra no galinheiro",
        "20 treinos extras por dia",
        "Bônus de xp no egg",
      ],
      vipFeatures: [
        "Ouro extra e xp extra por treino",
        "Trocar o nome do galo gratuitamente",
        "Xp extra no passe de batalha",
        "Conteúdo exclusivo no passe de batalha",
        "Bônus adicional no comando daily",
        "Ganha mais Asura Coins ao vender galos",
        "Bônus na torre e nas raids",
        "Bônus de xp no egg",
        "Chance extra para conseguir chaves",
        "Xp e money extra no galinheiro",
        "50 Treinos extras por dia",
        "Xp extra para seu pet (pombo)",
      ],
      primePlans: [
        {
          name: "Mensal",
          price: "R$17",
          discount: null,
        },
        {
          name: "Trimestral",
          price: `R$${Math.round(17 * 3 * 0.9)}`,
          discount: "10% OFF",
        },
        {
          name: "Semestral",
          price: `R$${Math.round(17 * 6 * 0.8)}`,
          discount: "20% OFF",
        },
        {
          name: "Anual",
          price: `R$${Math.round(17 * 12 * 0.7)}`,
          discount: "30% OFF",
        },
      ],
      vipPlans: [
        {
          name: "Mensal",
          price: "R$35",
          discount: null,
        },
        {
          name: "Trimestral",
          price: "R$84",
          discount: "20% OFF",
        },
        {
          name: "Semestral",
          price: "R$153",
          discount: "27% OFF",
        },
        {
          name: "Anual",
          price: "R$273",
          discount: "35% OFF",
        },
      ],
    };
  },
  computed: {
    alignedFeatures() {
      const commonFeatures = [
        "Ouro extra e xp extra por treino",
        "Trocar o nome do galo gratuitamente",
        "Bônus adicional no comando daily",
        "Chance extra para conseguir chaves",
        "Xp e money extra no galinheiro",
        "Bônus de xp no egg",
      ];

      const primeOnly = ["20 treinos extras por dia"];

      const vipOnly = [
        "50 Treinos extras por dia",
        "Xp extra no passe de batalha",
        "Conteúdo exclusivo no passe",
        "Mais Asura Coins ao vender galos",
        "Bônus na torre e nas raids",
        "Xp extra para seu pet (pombo)",
      ];

      return {
        prime: [...commonFeatures, ...primeOnly],
        vip: ["Todas as vantagens do prime", ...vipOnly],
      };
    },
  },
  mounted() {
    this.activeTab = "compare";
  },
  methods: {
    handleClick(event) {
      if (
        event.target.tagName === "BUTTON" &&
        !event.target.classList.contains("tab-btn")
      ) {
        this.isComponentModalActive = true;
      }
    },
    switchTab(tabValue) {
      this.activeTab = tabValue;
    },
  },
};
</script>

<style scoped>
.rounded-md {
  border-radius: 0.375rem;
}

.align-helper {
  padding-top: 1.25rem;
  padding-left: 0.75rem;
  padding-right: 0.75rem;
}

@media (min-width: 640px) {
  .align-helper {
    padding-top: 2rem;
    padding-left: 2rem;
    padding-right: 2rem;
  }
}

button {
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}

button:hover {
  opacity: 0.5;
}

.popup-text {
  color: black;
  padding: 30px;
  font-weight: 500;
  font-size: 18px;
}

.w-full {
  width: 100%;
}
</style>
