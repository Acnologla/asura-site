<template>
  <article>
    <section>
      <h2 class="title">Como jogar</h2>
      <p class="aboutDescription">
        Primeiro use o comando <span class="bold">j!galo</span> para ver o tipo do seu
        galo, existem 4 raridades de galo (comum, raro, epico, lendario) voce ira começar
        com um galo comum aleatorio,
        <router-link target="_blank" :to="{ name: 'Galos' }"
          >Veja aqui a lista de galos e habilidades.</router-link
        >
        Apos isso use o comando <span class="bold">j!missoes</span> para ver suas missoes
        diarias, voce ira começar com 3 e elas voltaram uma a cada dia. Use
        <span class="bold">j!train</span> para ganhar xp e dinheiro.
        <span class="bold">j!rinha @usuario</span> para batalhar com algum amigo, caso
        vença voce ira ganhar 4 de dinheiro e xp baseado no nivel do seu adversario
        (tambem completa missoes diarias).
      </p>
    </section>
    <hr style="margin-left: 10vw; margin-right: 10vw; background-color: #552fbc" />
    <section>
      <h2 class="title">Habilidades</h2>
      <p class="aboutDescription">
        A cada nivel seu galo ganha 3 de vida e pode ou não ganhar uma habilidade, seu
        galo ira desbloquear a ultima habilidade no nivel 30. Seu galo ira
        <span class="bold">Automaticamente</span> usar as 5 ultimas habilidades que voce
        desbloqueou, se voce quiser usar alguma habilidade antiga voce podera usar o
        comando <span class="bold">j!skills</span> para equipa-las. Mesmo que voce equipe
        só uma habilidade o seu galo ira continuar usando 5 habilidades, a que voce
        equipou + as suas 4 ultimas, e assim consecutivamente. caso queria usar 5
        habilidades especificas voce tera que equipar 5 habilidades especificas.
      </p>
    </section>
    <hr style="margin-left: 10vw; margin-right: 10vw; background-color: #552fbc" />
    <section>
      <h2 class="title">Economia</h2>
      <p class="aboutDescription">
        A cada rinha contra um amigo ganha, ou a cada missão concluida voce vai ganhar
        dinheiro. Dinheiro pode user usado para mudar o nome do seu galo usando
        <span class="bold">j!changename novoNome</span> (ira custar 100 de dinheiro), ou
        pode ser usado para comprar lootboxs usando <span class="bold">j!lootbox</span>.
        Existem 3 tipos de lootbox (comum, normal, rara e cosmetica) quando voce abrir uma delas voce
        ira ganhar um galo de uma das 4 raridades, quanto maior o nivel da caixa mais a
        sua chance de pegar galos mais raros. Apos abrir uma lootbox use
        <span class="bold">j!equip</span> para ver e quipar o galo que voce ganhou, caso
        queira equipar seu galo use <span class="bold">j!equip numerodoGalo</span> ou caso
        queira vender ele para ganhar mais dinheiro use
        <span class="bold">j!equip numeroDoGalo remove</span>.
      </p>
    </section>
    <hr style="margin-left: 10vw; margin-right: 10vw; background-color: #552fbc" />
     <section>
      <h2 class="title">Cosmeticos</h2>
      <p class="aboutDescription">
          Voce pode comprar lootboxs cosmeticas usando <span class="bold">j!lootbox buy cosmetica</span> 
          sempre que voce abrir uma lootbox cosmetica voce ira ganhar um background
          que ira ser usado como imagem de fundo nos comandos <span class="bold">j!galo & j!perfil</span>. Voce pode equipar backgrounds usando o comando <span class="bold">j!backgrounds</span>, existem 4 raridades de backgrounds (comuns, raros, epicos e lendarios).
      </p>
    </section>
    <hr style="margin-left: 10vw; margin-right: 10vw; background-color: #552fbc" />
    <section>
      <h2 class="title">Itens e dungeon</h2>
      <p class="aboutDescription">
        Quando seu galo estiver forte voce pode começar a fazer a dungeon usando
        <span class="bold">j!dungeon</span> para enfrentar um chefe, a cada andar da
        dungeon voce ira ganhar lootboxs ou algum iten. Existem 4 raridades de itens
        (comum, raro, epico, lendario) e quanto mais alto for o andar da dungeon maior sua
        chance de conseguir um item de raridade mais alta. Apos receber seu primeiro item
        use <span class="bold">j!item</span> para equipar ele. <br />
        Itens <span class="bold">NÃO</span> funcionam na dungeon, apenas em batalhas de
        treino ou contra outra pessoa.
      </p>
    </section>
    <hr style="margin-left: 10vw; margin-right: 10vw; background-color: #552fbc" />
    <section>
      <h2 class="title">Clãs</h2>
      <p class="aboutDescription">
        Voce pode criar um clan usando <span class="bold">j!clan create nome</span> (ira
        custar 1000 de dinheiro), ou voce pode entrar em algum clan caso seja convidado
        por algum usuario que ja esteja em um. Cada clan tem um numero maximo de membros
        de até 15 pessoas (20 pessoas caso seu clan chegue até ao nivel 3), cada rinha
        contra um amigo ganha faz voce ganhar 1 de xp para o seu clan. Quanto mais alto o
        nivel do seu clan mais vantagens os membros do clan terão, sendo o nivel 5 o
        maximo de nivel para um clan.
        Cada clan ira ter uma missão por semana, e quando ela for concluida ira dar xp e dinheiro dividido entre todos os membros do clan.
      </p>
    </section>
    <hr style="margin-left: 10vw; margin-right: 10vw; background-color: #552fbc" />
    <h2 class="title">Ainda tem alguma duvida? não hesite em entrar no meu <a href="https://discord.gg/tdVWQGV" target="_blank">Servidor de suporte</a>.</h2>
  </article>
</template>
<style scoped>
article {
  text-align: left;
  margin-left: 10vw;
  margin-right: 10vw;
}
.bold {
  font-weight: 600;
}
[data-theme="dark"] .bold{
  color: #fff;
  font-weight: 500;
}
</style>
<script>
import "../assets/main.css";
export default {
  name: "RinhaTutorial",
};
</script>
