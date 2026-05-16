<template>
  <div class="rinha-info">
    <section class="rinha-hero">
      <div class="container">
        <div class="eyebrow">§ {{ $t("rinhaInfo.eyebrow") }}</div>
        <h1 class="h-display rinha-title">
          {{ $t("rinhaInfo.titleA") }}
          <span style="color: var(--primary)">{{
            $t("rinhaInfo.titleB")
          }}</span>
        </h1>
        <p class="rinha-sub">{{ $t("rinhaInfo.sub") }}</p>
      </div>
    </section>

    <section class="rinha-body">
      <div class="container rinha-grid">
        <div class="rinha-col card">
          <div class="col-head">
            <div class="col-eyebrow">§ 01</div>
            <h2 class="h-display col-title">
              {{ $t("rinhaInfo.upgrades") }}
            </h2>
          </div>
          <Upgrades />
        </div>
        <div class="rinha-col card">
          <div class="col-head">
            <div class="col-eyebrow">§ 02</div>
            <h2 class="h-display col-title">
              {{ $t("rinhaInfo.items") }}
            </h2>
          </div>
          <Items />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Upgrades from "@/components/Upgrades.vue";
import Items from "@/components/Items.vue";

export default {
  name: "RinhaInfo",
  components: { Upgrades, Items },
};
</script>

<style scoped>
.rinha-info {
  padding-bottom: 60px;
}
.rinha-hero {
  padding: 60px 0 40px;
}
.rinha-title {
  font-size: 56px;
  margin: 8px 0 16px;
}
.rinha-sub {
  font-size: 17px;
  color: var(--ink-2);
  max-width: 600px;
}
.rinha-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}
.rinha-col {
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 18px;
}
.col-head {
  padding-bottom: 16px;
  border-bottom: 1px solid var(--line);
}
.col-eyebrow {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.14em;
  color: var(--ink-3);
  text-transform: uppercase;
}
.col-title {
  font-size: 32px;
  margin: 6px 0 0;
}

@media (max-width: 768px) {
  .rinha-hero {
    padding: 32px 0 24px;
  }
  .rinha-title {
    font-size: 38px;
  }
  .rinha-sub {
    font-size: 15px;
  }
  .rinha-grid {
    grid-template-columns: 1fr;
  }
  .rinha-col {
    padding: 22px;
  }
  .col-title {
    font-size: 24px;
  }
}
</style>
