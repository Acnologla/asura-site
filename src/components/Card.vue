<template>
<div class="card" style="margin-bottom: 30px">
  <header class="card-header">
    <p style="color: #552fbc" class="card-header-title">
      {{type}}
    </p>
  </header>
  <div class="card-content">
    <div class="content" style="text-align: left">
        <span v-if="galos.length === 0">
            {{ $t('galos.none') }}
        </span>
        <span v-for="(galo, i) in galos" :key="i">
            {{galo.name}}
            <br>
        </span>
    </div>
  </div>
</div>
</template>
<style scoped>
.card-header-title{
    font-weight: 500 ;
}
</style>
<script>
export default{
    name: "Card",
    props: {
        galos: Array,
        type: String
    },
}
</script>