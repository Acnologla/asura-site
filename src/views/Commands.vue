<template>
  <article>
    <section
      style="justify-content: center; margin-left: 20px; margin-right: 20px"
    >
      <div class="columns is-vcentered is-centered">
        <div class="column is-full-mobile is-full-tablet is-two-fifths">
          <b-input
            v-on:input="handleInput"
            placeholder="Procurar comando"
            type="search"
            icon="magnify"
          />
          <br />
          <b-menu>
            <b-menu-list label="Categoria">
              <b-menu-item
                @click="() => filterCategory(0)"
                :active="true"
                label="Comandos normais"
              />
              <b-menu-item
                @click="() => filterCategory(1)"
                label="Comandos de rinha"
              />
              <b-menu-item
                @click="() => filterCategory(2)"
                label="Comandos de perfil"
              />
              <b-menu-item
                @click="() => filterCategory(3)"
                label="Comandos de jogos"
              />
            </b-menu-list>
          </b-menu>
        </div>
        <div class="column commands is-full-mobile is-full-tablet is-half">
          <Command
            style="margin-bottom: 15px"
            v-for="(command, i) in displayCommands"
            :command="command"
            :key="i"
          />
        </div>
      </div>
    </section>
  </article>
</template>
<style scoped>
.commands {
  height: 80vh;
  overflow-y: scroll;
}
::-webkit-scrollbar {
  width: 20px;
}

::-webkit-scrollbar-track {
  background-color: transparent;
}
::-webkit-scrollbar-thumb {
  background-color: #7957d5;
  border-radius: 20px;
  border: 6px solid transparent;
  background-clip: content-box;
}
</style>
<script>
import axios from "axios";
import levenshtein from "js-levenshtein";
import Command from "../components/Command";
export default {
  name: "Commands",
  data() {
    return {
      commands: [],
      displayCommands: [],
      category: 0,
    };
  },
  components: {
    Command,
  },
  methods: {
    handleInput(text) {
      const validate = text.replace(/ /g, "");
      if (validate !== "") {
        this.displayCommands = this.commands.filter((command) => {
          command.aliases = command.aliases || [];

          return (
            command.aliases.some(
              (aliase) =>
                levenshtein(aliase, validate) <= 1 || aliase.includes(validate)
            ) || command.name.includes(validate)
          );
        });
      } else {
        this.filterCategory(this.category);
      }
    },
    filterCategory(category) {
      this.category = category;
      this.displayCommands = this.commands.filter(
        (a) => a.category === category
      );
    },
  },
  mounted() {
    axios.get("/resources/commands.json").then(({ data }) => {
      this.commands = data;
      this.filterCategory(0);
    });
  },
};
</script>
