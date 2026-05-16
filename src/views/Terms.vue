<template>
  <main class="legal-page">
    <div class="container">
      <div class="legal-head">
        <div class="eyebrow">LEGAL</div>
        <h1 class="h-display">Terms of Use for Asura</h1>
      </div>

      <section v-for="(s, i) in sections" :key="i" class="legal-section">
        <h2>{{ s.title }}</h2>
        <component :is="s.list ? 'ul' : 'p'" v-if="s.list">
          <li v-for="(item, j) in s.items" :key="j">{{ item }}</li>
        </component>
        <p v-else>{{ s.text }}</p>
      </section>
    </div>
  </main>
</template>

<script>
export default {
  name: "TermsPage",
  data() {
    return {
      sections: [
        {
          title: "1. Acceptance of Terms",
          text:
            'By using Asura ("the Bot"), you agree to these Terms of Use. If you do not agree with these terms, please do not use the Bot.',
        },
        {
          title: "2. Use of the Bot",
          list: true,
          items: [
            'The Bot is provided "as is" and "as available."',
            "You may not use the Bot for illegal or unauthorized purposes.",
            "You are responsible for any content you generate or actions you take using the Bot.",
          ],
        },
        {
          title: "3. Data Collection and Privacy",
          list: true,
          items: [
            "The Bot may collect certain information to function properly.",
            "No personal data will be shared with third parties unless required by law.",
            "By using the Bot, you consent to the collection and use of this data as outlined.",
          ],
        },
        {
          title: "4. Liability",
          list: true,
          items: [
            "The Bot creators are not responsible for any damage, loss, or issues arising from the use of the Bot.",
            "Use the Bot at your own risk.",
          ],
        },
        {
          title: "5. Modification of Terms",
          list: true,
          items: [
            "These terms may be updated at any time.",
            "Continued use of the Bot after changes implies acceptance of the updated terms.",
          ],
        },
        {
          title: "6. Bot Limitations",
          list: true,
          items: [
            "The Bot may experience downtime or errors.",
            "The creators reserve the right to modify, disable, or discontinue the Bot at any time without notice.",
          ],
        },
        {
          title: "7. User Conduct",
          list: true,
          items: [
            "You must not use the Bot to harass, spam, or harm others.",
            "Misuse of the Bot may result in a ban or other actions at the creators’ discretion.",
          ],
        },
        {
          title: "8. Ownership and Rights",
          list: true,
          items: [
            "All intellectual property related to the Bot belongs to the creators.",
            "You are granted a non-exclusive, non-transferable license to use the Bot as intended.",
          ],
        },
        {
          title: "9. Governing Law",
          text:
            "These Terms of Use are governed by the laws of [Country/Region].",
        },
      ],
    };
  },
};
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
  margin: 8px 0 0;
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
  margin: 0;
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
