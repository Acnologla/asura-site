<template>
  <main class="legal-page">
    <div class="container">
      <div class="legal-head">
        <div class="eyebrow">LEGAL</div>
        <h1 class="h-display">Privacy Policy for Asura</h1>
        <p class="effective">Effective Date: 11/17/2024</p>
      </div>

      <section class="legal-section">
        <h2>1. Information We Collect</h2>
        <p>Asura only collects the following information:</p>
        <ul>
          <li>Guild IDs (Server Identifiers)</li>
          <li>User IDs</li>
        </ul>
        <p>No other data is collected, stored, or shared.</p>
      </section>

      <section class="legal-section">
        <h2>2. How We Use the Information</h2>
        <p>
          The collected information is used solely to provide the intended
          functionality of Asura, such as managing server settings or tracking
          user interactions within the bot.
        </p>
      </section>

      <section class="legal-section">
        <h2>3. Data Sharing</h2>
        <p>
          We do not share, sell, or distribute any collected information to
          third parties unless required by law.
        </p>
      </section>

      <section class="legal-section">
        <h2>4. Data Retention</h2>
        <p>
          Guild IDs and user IDs are retained as long as necessary to support
          the bot's functionality. If a guild removes the bot, its associated
          data will be deleted promptly.
        </p>
      </section>

      <section class="legal-section">
        <h2>5. User Rights</h2>
        <p>
          If you have concerns about the data stored, you may contact us to
          request its deletion or to gain insight into how it is used.
        </p>
      </section>

      <section class="legal-section">
        <h2>6. Changes to This Policy</h2>
        <p>
          This Privacy Policy may be updated from time to time. Users will be
          notified of significant changes, and continued use of the bot
          constitutes acceptance of the updated policy.
        </p>
      </section>

      <section class="legal-section">
        <h2>7. Contact Us</h2>
        <p>
          For questions or concerns regarding this Privacy Policy, please
          contact us at the support server.
        </p>
      </section>
    </div>
  </main>
</template>

<script>
export default { name: "PrivacyPage" };
</script>

<style scoped>
.legal-page {
  padding: 56px 0 80px;
}
.legal-head {
  margin-bottom: 40px;
}
.legal-head h1 {
  font-size: 56px;
  margin: 8px 0 6px;
}
.effective {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--ink-3);
  letter-spacing: 0.08em;
}
.legal-section {
  margin-bottom: 32px;
  max-width: 760px;
}
.legal-section h2 {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 22px;
  margin: 0 0 10px;
}
.legal-section p,
.legal-section li {
  font-size: 15px;
  color: var(--ink-2);
  line-height: 1.65;
  margin: 0 0 8px;
}
.legal-section ul {
  margin: 0 0 8px;
  padding-left: 22px;
}

@media (max-width: 768px) {
  .legal-page {
    padding: 32px 0 60px;
  }
  .legal-head h1 {
    font-size: 36px;
  }
  .legal-section h2 {
    font-size: 18px;
  }
}
</style>
