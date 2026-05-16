<template>
  <main class="invite-page">
    <div class="container">
      <div class="card invite-card">
        <div class="brand-square">A</div>
        <h1 class="h-display">Redirecionando…</h1>
        <p>Te levando para o Discord para adicionar o Asura.</p>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: "Invite",
  mounted() {
    window.location.href =
      "https://discord.com/oauth2/authorize?client_id=470684281102925844&scope=applications.commands+bot&permissions=8";
  },
};
</script>

<style scoped>
.invite-page {
  padding: 120px 0;
}
.invite-card {
  padding: 60px 40px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  max-width: 480px;
  margin: 0 auto;
}
.brand-square {
  width: 64px;
  height: 64px;
  border-radius: 14px;
  background: linear-gradient(135deg, #7c4dff 0%, #4a1fd1 100%);
  display: grid;
  place-items: center;
  color: #fff;
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 36px;
  box-shadow: 0 12px 30px -10px rgba(74, 31, 209, 0.5);
}
h1 {
  font-size: 32px;
  margin: 0;
}
p {
  color: var(--ink-2);
  font-size: 15px;
  margin: 0;
}
</style>
