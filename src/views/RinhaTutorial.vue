<template>
  <article>
    <section>
      <h2 class="title">Como jogar</h2>
      <p class="aboutDescription">
        Primeiro use o comando <span class="bold">j!galo</span> para ver o tipo do seu
        galo, existem 5 raridades de galo (comum, raro, epico, lendario, mitico) voce ira começar
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
      <h2 class="title">Upgrades de galos</h2>
      <p class="aboutDescription">
        Quando você atingir o nível 35 do seu galo, você pode evoluir ele deixando ele mais forte, a cada upgrade de galo que você fizer, você ganha 10% a mais de ataque, de efeito e de cura! Mas lembrando, sempre que você usar esse upgrade seu galo voltará ao nível 1 ganhando apenas metade do xp do comando j!train e xp de suas missões diárias, os upgrades de galos são infinitos e você pode usar sempre que quiser, apenas precisa estar no nível 35.
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
        A cada rinha contra um amigo ganha, ou a cada missão concluída você vai ganhar dinheiro. Dinheiro pode user usado para mudar o nome do seu galo usando <span class="bold">j!changename novoNome (ira custar 100 de dinheiro)</span>, ou pode ser usado para comprar lootboxs usando <span class="bold">j!lootbox</span>. Existem 7 tipos de lootbox (comum, normal, rara, épica, lendária, itens especiais e cosmética) quando você abrir uma delas você ira ganhar um galo de uma das 5 raridades, quanto maior o nível da caixa mais a sua chance de pegar galos mais raros. Apos abrir uma lootbox use j!equip para ver o número e equipar o galo que você ganhou, caso queira equipar seu galo use <span class="bold"> j!equip numerodoGalo</span> ou caso queira vender ele para ganhar mais dinheiro use <span class="bold">j!equip numeroDoGalo remove</span>. Sobre Asura coins, você pode conseguir eles vendendo galos com mais de um upgrades de galo, ela serve para você comprar caixas lendárias e de itens especiais, essas caixas te darão chances melhores comparada as outras!
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
Você pode criar um clan usando <span class="bold">j!clan create nome</span> (ira custar 1000 de dinheiro), ou você pode entrar em algum clan caso seja convidado por algum usuário que seja administrador ou  dono do clan. Cada clan tem um número máximo de membros de até 25 pessoas (que podem ser aumentados com upgrades de banco do clã). Cada j!train que você ganhar faz com que seu clan ganhe mais 1 de xp. Quanto mais alto o nível do seu clan mais vantagens os membros do clan terão. Cada clan irá ter uma missão por mês e quando ela for concluída todos os membros do clan receberão recompensas!<br>Use <span class="bold">j!clan banco</span> para abrir o banco do clan, o banco do clan serve para você juntar dinheiro e comprar novas vantagens extras para o clan, todos os membros podem depositar dinheiro para ajudar o clan, com o dinheiro do banco vocês poderão comprar alguns upgrades  disponiveis.</p>
    </section>
    <hr style="margin-left: 10vw; margin-right: 10vw; background-color: #552fbc" />
       <section>
      <h2 class="title">Arenas</h2>
      <p class="aboutDescription">
Você pode comprar um ingresso para a arena por 500 de dinheiro, na arena você irá batalhar com outros players que podem ter níveis e itens (caso tenha um) maiores ou menores que o seu. O seu galo precisa ser no minímo level 5 para poder batalhar na arena. Se você perder 3 vezes você ira ganhar uma quantia de dinheiro e xp conforme o máximo de vitórias que você teve, cada vitória na arena te garantirá 80 de dinheiro e 20 de XP, se você chegar ao máximo de vitórias (12) na arena você vai ganhar 960 de dinheiro e 240 de xp para seu galo.
      </p>
    </section>
        <hr style="margin-left: 10vw; margin-right: 10vw; background-color: #552fbc" />
     <section>
      <h2 class="title">Upgrades</h2>
      <p class="aboutDescription">
Você pode conseguir xp de upgrades usando o comando j!train, cada vez que você ganhar você ganha mais 1 de xp, quando atingir certa quantia de xp você pode escolher alguns upgrades que te darão novas vantagens, cada tipo de upgrade te leva a um caminho único, então escolha com cuidado pois não poderá ser escolhidos outra vez!      </p>
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
