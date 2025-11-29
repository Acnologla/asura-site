<template>
  <div
    class="min-h-screen bg-gradient-to-b from-purple-50 to-white"
    :class="{ 'dark-mode': isDarkMode }"
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
        <div class="card">
          <header class="card-header">
            <p class="popup-text">
              {{ $t("donatePage.donationNotice") }}
              <a target="_blank" href="https://discord.gg/CfkBZyVsd7">{{
                $t("donatePage.supportDiscord")
              }}</a>
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
          {{ $t("donatePage.support") }}
        </h1>
        <p class="text-gray-600 max-w-2xl mx-auto text-lg">
          {{ $t("donatePage.subtitle") }}
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
              {{ $t("donatePage.buy") }}
            </button>
          </div>
        </div>
      </div>

      <!-- Membership Plans -->
      <div class="max-w-7xl mx-auto mb-16">
        <div class="text-center mb-10">
          <h2 class="text-3xl font-bold text-purple-700 mb-2">
            {{ $t("donatePage.membershipPlans") }}
          </h2>
          <p class="text-gray-600">
            {{ $t("donatePage.membershipSubtitle") }}
          </p>
        </div>

        <div class="w-full">
          <div
            class="grid w-full grid-cols-2 sm:grid-cols-4 mb-8 bg-gray-100 rounded-lg p-1 gap-1"
          >
            <button
              v-for="tab in tabs"
              :key="tab.value"
              @click="activeTab = tab.value"
              :class="[
                'py-2 px-2 sm:px-4 rounded-md transition-all tab-btn text-sm sm:text-base',
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
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3"
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
                <p class="text-green-100 mt-1">
                  {{ $t("donatePage.primeDesc") }}
                </p>
                <div class="mt-4 text-4xl font-bold">R$16</div>
                <p class="text-green-100">{{ $t("donatePage.perMonth") }}</p>
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
                  {{ $t("donatePage.subscribePrime") }}
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
                <p class="text-purple-100 mt-1">
                  {{ $t("donatePage.vipDesc") }}
                </p>
                <div class="mt-4 text-4xl font-bold">R$35</div>
                <p class="text-purple-100">{{ $t("donatePage.perMonth") }}</p>
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
                  {{ $t("donatePage.subscribeVip") }}
                </button>
              </div>
            </div>

            <!-- Royal VIP Plan -->
            <div
              class="border-2 border-black shadow-xl transition-all duration-300 overflow-hidden relative rounded-lg royal-vip-card"
            >
              <div
                class="text-center py-8 bg-gradient-to-r from-black via-purple-900 to-black text-white relative"
              >
                <div class="flex justify-center mb-2">
                  <font-awesome-icon
                    icon="crown"
                    class="h-8 w-8 text-yellow-400"
                  />
                </div>
                <h3 class="text-2xl font-bold">Royal VIP</h3>
                <p class="text-purple-200 mt-1">
                  {{ $t("donatePage.royalVipDesc") }}
                </p>
                <div class="mt-4 text-4xl font-bold">R$65</div>
                <p class="text-purple-200">{{ $t("donatePage.perMonth") }}</p>
              </div>

              <div
                class="space-y-4 align-helper bg-gradient-to-b from-gray-900 to-gray-800"
              >
                <ul class="space-y-3 min-h-[320px]">
                  <li
                    v-for="(feature, index) in alignedFeatures.royalVip"
                    :key="index"
                    class="flex items-start gap-3"
                  >
                    <font-awesome-icon
                      icon="check"
                      class="h-5 w-5 text-yellow-400 flex-shrink-0 mt-0.5"
                    />
                    <span class="text-gray-200">{{ feature }}</span>
                  </li>
                </ul>

                <div class="pt-4 space-y-3 border-t border-purple-800 mt-5">
                  <div
                    v-for="(plan, index) in royalVipPlans"
                    :key="index"
                    class="flex items-center justify-between"
                  >
                    <div class="flex items-center gap-2">
                      <span class="font-medium text-gray-200">{{
                        plan.name
                      }}</span>
                      <span
                        v-if="plan.discount"
                        class="bg-yellow-400 text-black font-medium text-xs px-2 py-1 rounded-full"
                      >
                        {{ plan.discount }}
                      </span>
                    </div>
                    <div class="text-lg font-bold text-yellow-400">
                      {{ plan.price }}
                    </div>
                  </div>
                </div>

                <div class="pt-6 pb-6 px-0">
                  <button
                    class="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold rounded-md py-3 shadow-lg transition-all hover:from-yellow-400 hover:to-yellow-500"
                  >
                    {{ $t("donatePage.subscribeRoyalVip") }}
                  </button>
                </div>
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
                <h3 class="text-2xl font-bold">
                  {{ $t("vipFeatures.primePlan") }}
                </h3>
              </div>
              <p class="text-green-100 text-center">
                {{ $t("donatePage.primeAccessiblePrice") }}
              </p>
            </div>

            <div class="align-helper">
              <div class="grid md:grid-cols-2 gap-8">
                <div>
                  <h3
                    class="text-xl font-bold text-green-600 mb-4 flex items-center gap-2"
                  >
                    <font-awesome-icon icon="star" class="h-5 w-5" />
                    {{ $t("donatePage.primeFeatures") }}
                  </h3>
                  <ul class="space-y-3">
                    <li
                      v-for="(benefit, index) in alignedFeatures.prime"
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
                  <h3 class="text-xl font-bold text-green-600 mb-4">
                    {{ $t("donatePage.prices") }}
                  </h3>
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
                      {{ $t("donatePage.subscribePrime") }}
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
                <h3 class="text-2xl font-bold">
                  {{ $t("vipFeatures.vipPlan") }}
                </h3>
              </div>
              <p class="text-purple-100 text-center">
                {{ $t("donatePage.vipCompleteAccess") }}
              </p>
            </div>

            <div class="align-helper">
              <div class="grid md:grid-cols-2 gap-8">
                <div>
                  <h3
                    class="text-xl font-bold text-purple-700 mb-4 flex items-center gap-2"
                  >
                    <font-awesome-icon icon="crown" class="h-5 w-5" />
                    {{ $t("donatePage.vipFeatures") }}
                  </h3>
                  <ul class="space-y-3">
                    <li
                      v-for="(benefit, index) in alignedFeatures.allVip"
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
                    {{ $t("donatePage.prices") }}
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
                      {{ $t("donatePage.subscribeVip") }}
                    </button>
                  </div>
                  <br />
                </div>
              </div>
            </div>
          </div>

          <!-- Royal VIP Tab -->
          <div
            v-if="activeTab === 'royal'"
            class="border-2 border-black overflow-hidden rounded-lg royal-vip-card"
          >
            <div
              class="bg-gradient-to-r from-black via-purple-900 to-black text-white py-6"
            >
              <div class="flex items-center justify-center gap-2 mb-4">
                <font-awesome-icon
                  icon="crown"
                  class="h-6 w-6 text-yellow-400"
                />
                <h3 class="text-2xl font-bold">
                  {{ $t("vipFeatures.royalVipPlan") }}
                </h3>
              </div>
              <p class="text-purple-200 text-center">
                {{ $t("donatePage.royalUltimateExperience") }}
              </p>
            </div>

            <div
              class="align-helper bg-gradient-to-b from-gray-900 to-gray-800"
            >
              <div class="grid md:grid-cols-2 gap-8">
                <div>
                  <h3
                    class="text-xl font-bold text-yellow-400 mb-4 flex items-center gap-2"
                  >
                    <font-awesome-icon icon="crown" class="h-5 w-5" />
                    {{ $t("donatePage.royalVipFeatures") }}
                  </h3>
                  <ul class="space-y-3">
                    <li
                      v-for="(benefit, index) in alignedFeatures.allRoyalVip"
                      :key="index"
                      class="flex items-start gap-2"
                    >
                      <font-awesome-icon
                        icon="check"
                        class="h-5 w-5 text-yellow-400 flex-shrink-0 mt-0.5"
                      />
                      <span class="text-gray-200">{{ benefit }}</span>
                    </li>
                  </ul>
                  <br class="is-hidden-mobile" />
                </div>

                <div>
                  <h3 class="text-xl font-bold text-yellow-400 mb-4">
                    {{ $t("donatePage.prices") }}
                  </h3>
                  <div class="space-y-4">
                    <div
                      v-for="(plan, index) in royalVipPlans"
                      :key="index"
                      class="flex items-center justify-between border-b border-purple-800 pb-3"
                    >
                      <div>
                        <div class="font-medium text-gray-200">
                          {{ plan.name }}
                        </div>
                        <span
                          v-if="plan.discount"
                          class="bg-yellow-400 text-black font-medium text-xs px-2 py-1 rounded-full"
                        >
                          {{ plan.discount }}
                        </span>
                      </div>
                      <div class="text-lg font-bold text-yellow-400">
                        {{ plan.price }}
                      </div>
                    </div>
                  </div>

                  <div class="mt-6 flex justify-center">
                    <button
                      class="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold border-none w-full py-3 rounded-md hover:from-yellow-400 hover:to-yellow-500"
                    >
                      {{ $t("donatePage.subscribeRoyalVip") }}
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
      isDarkMode:
        document.documentElement.getAttribute("data-theme") === "dark",
    };
  },
  computed: {
    primePlans() {
      return [
        {
          name: this.$t("donatePage.monthlyPlan"),
          price: "R$16",
          discount: null,
        },
        {
          name: this.$t("donatePage.quarterlyPlan"),
          price: `R$${Math.round(16 * 3 * 0.9)}`,
          discount: "10% OFF",
        },
        {
          name: this.$t("donatePage.semiannualPlan"),
          price: `R$${Math.round(16 * 6 * 0.8)}`,
          discount: "20% OFF",
        },
        {
          name: this.$t("donatePage.annualPlan"),
          price: `R$${Math.round(16 * 12 * 0.7)}`,
          discount: "30% OFF",
        },
      ];
    },
    vipPlans() {
      return [
        {
          name: this.$t("donatePage.monthlyPlan"),
          price: "R$35",
          discount: null,
        },
        {
          name: this.$t("donatePage.quarterlyPlan"),
          price: "R$84",
          discount: "20% OFF",
        },
        {
          name: this.$t("donatePage.semiannualPlan"),
          price: "R$153",
          discount: "27% OFF",
        },
        {
          name: this.$t("donatePage.annualPlan"),
          price: "R$273",
          discount: "35% OFF",
        },
      ];
    },
    royalVipPlans() {
      return [
        {
          name: this.$t("donatePage.monthlyPlan"),
          price: "R$65",
          discount: null,
        },
        {
          name: this.$t("donatePage.quarterlyPlan"),
          price: "R$156",
          discount: "20% OFF",
        },
        {
          name: this.$t("donatePage.semiannualPlan"),
          price: "R$285",
          discount: "27% OFF",
        },
        {
          name: this.$t("donatePage.annualPlan"),
          price: "R$507",
          discount: "35% OFF",
        },
      ];
    },
    tabs() {
      return [
        {
          label: this.$t("donatePage.comparePlans"),
          value: "compare",
        },
        {
          label: this.$t("donatePage.prime"),
          value: "prime",
        },
        {
          label: this.$t("donatePage.vip"),
          value: "vip",
        },
        {
          label: this.$t("donatePage.royalVip"),
          value: "royal",
        },
      ];
    },
    currencyOptions() {
      return [
        {
          title: this.$t("donatePage.moneyPurchase"),
          description: this.$t("donatePage.moneyDesc"),
          priceValue: "R$ 10",
          priceUnit: this.$t("donatePage.perCoins"),
          icon: "coins",
        },
        {
          title: this.$t("donatePage.xpPurchase"),
          description: this.$t("donatePage.xpDesc"),
          priceValue: "R$ 10",
          priceUnit: this.$t("donatePage.perXp"),
          icon: "bolt",
        },
        {
          title: this.$t("donatePage.asuraCoinsPurchase"),
          description: this.$t("donatePage.asuraCoinsDesc"),
          priceValue: "R$ 15",
          priceUnit: this.$t("donatePage.perAsuraCoin"),
          icon: "medal",
        },
        {
          title: this.$t("donatePage.userXpPurchase"),
          description: this.$t("donatePage.userXpDesc"),
          priceValue: "R$ 10",
          priceUnit: this.$t("donatePage.perUserXp"),
          icon: "user",
        },
        {
          title: this.$t("donatePage.resetsPurchase"),
          description: this.$t("donatePage.resetsDesc"),
          priceValue: "R$ 45",
          priceUnit: this.$t("donatePage.perReset"),
          icon: "user",
        },
      ];
    },
    alignedFeatures() {
      const commonFeatures = this.$t("vipFeatures.commonFeatures");
      const primeOnly = this.$t("vipFeatures.primeOnly");
      const vipOnly = this.$t("vipFeatures.vipOnly");
      const royalVipOnly = this.$t("vipFeatures.royalVipOnly");

      return {
        prime: [...commonFeatures, ...primeOnly],
        vip: [this.$t("vipFeatures.allPrimeFeatures"), ...vipOnly],
        allVip: [...commonFeatures, ...vipOnly],
        royalVip: [
          this.$t("vipFeatures.allVipFeatures"),
          ...royalVipOnly.slice(6),
        ],
        allRoyalVip: [...commonFeatures, ...royalVipOnly],
      };
    },
  },
  mounted() {
    this.activeTab = "compare";
    // Listen for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "data-theme") {
          this.isDarkMode =
            document.documentElement.getAttribute("data-theme") === "dark";
        }
      });
    });
    observer.observe(document.documentElement, { attributes: true });
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
    padding-top: 1rem;
    padding-left: 1rem;
    padding-right: 1rem;
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

/* Dark mode styles */
[data-theme="dark"] .min-h-screen {
  background: linear-gradient(to bottom, #232731, #1a1d21);
}

[data-theme="dark"] p {
  color: #eceff4;
}

[data-theme="dark"] .text-gray-600,
[data-theme="dark"] .text-gray-700 {
  color: #d8dee9;
}

[data-theme="dark"] .bg-white {
  background-color: #2a2d32;
}

[data-theme="dark"] .border-gray-100,
[data-theme="dark"] .border-gray-200 {
  border-color: #3b4252;
}

[data-theme="dark"] .bg-gray-100 {
  background-color: #1d1f21;
}

[data-theme="dark"] .bg-purple-50 {
  background-color: rgba(124, 58, 237, 0.1);
}

[data-theme="dark"] .text-purple-600,
[data-theme="dark"] .text-purple-700,
[data-theme="dark"] .text-purple-800 {
  color: #b39ddb;
}

[data-theme="dark"] .text-green-600,
[data-theme="dark"] .text-green-800 {
  color: #81c784;
}

[data-theme="dark"] .bg-green-100 {
  background-color: rgba(74, 222, 128, 0.1);
}

[data-theme="dark"] .bg-purple-100 {
  background-color: rgba(124, 58, 237, 0.1);
}

[data-theme="dark"] .card {
  background-color: #1d1f21;
  color: #eceff4;
}

[data-theme="dark"] .popup-text {
  color: #eceff4;
}

[data-theme="dark"] a {
  color: #88c0d0;
}

[data-theme="dark"] .tab-btn:not(.bg-white) {
  color: #d8dee9;
}

[data-theme="dark"] .tab-btn.bg-white {
  background-color: #2a2d32;
  color: #b39ddb;
}

[data-theme="dark"] .border-2.border-green-400,
[data-theme="dark"] .border-2.border-purple-400 {
  border-color: #3b4252;
}

/* Royal VIP Premium Styles */
.royal-vip-card {
  box-shadow: 0 0 30px rgba(168, 85, 247, 0.4);
}

.royal-vip-card:hover {
  box-shadow: 0 0 40px rgba(234, 179, 8, 0.6);
}

[data-theme="dark"] .royal-vip-card {
  box-shadow: 0 0 30px rgba(168, 85, 247, 0.6);
}

[data-theme="dark"] .royal-vip-card:hover {
  box-shadow: 0 0 50px rgba(234, 179, 8, 0.8);
}

[data-theme="dark"] .border-2.border-black {
  border-color: #8b5cf6;
}
</style>
