<template>
 <b-navbar class="nav" style="box-shadow: 0px 0px 20px rgba(0,0,0,0.1)a" fixed-top>
        <template #brand>
        <b-navbar-item style="margin-left: 30px" tag="router-link" :to="{ name: 'Home' }"  >
          <span class="navTitle">Asura Bot</span>
        </b-navbar-item>
        </template>
        <template #end>
         <b-navbar-item tag="router-link" :to="{ name: 'Home' }" class="navItem">
                Home
            </b-navbar-item>
            <b-navbar-item href="#about" @click="about" class="navItem">
                Sobre
            </b-navbar-item>
            <b-navbar-item  tag="router-link" :to="{ name: 'Galos' }" class="navItem">
                    Galos
            </b-navbar-item>
            <b-navbar-item tag="router-link" :to="{ name: 'Donate' }"  class="navItem">
                Doaçoes
            </b-navbar-item>
            <b-navbar-item tag="div" id="add" style="margin-right: 30px">
                <div>
                    <a target="_blank" href="https://discordapp.com/oauth2/authorize?client_id=470684281102925844&scope=bot&permissions=8Discord" class="button is-primary">
                        <strong>Me adicione</strong>
                    </a>
                </div>
            </b-navbar-item>
        </template>
      <template slot-scope="{isOpened, toggleActive}" slot="burger">
            <a style="margin-top:5px;margin-right: 30px" role="button" @click="toggleActive" aria-label="menu" class= "navbar-burger burger"><span aria-hidden="true"></span><span aria-hidden="true"></span><span aria-hidden="true"></span></a>
        </template>
    </b-navbar>
</template>

<style>
@media screen and (max-width: 1024px) {
  #add {
    margin-right: 0px !important;
  }
}
.navTitle{
    font-weight: 500;
    color: rgb(76, 86, 106);
    font-family: Rubik;
    font-size: 30px;
}
.navItem{
    font-weight: 400;
    font-family: Rubik;
    font-size: 20px;
}
</style>
<script>
export default{
    name: "Nav",
    methods: {
        about(){
            if (this.$route.name !== "Home"){
                this.$router.push({name: "Home"})
                document.getElementById('about').scrollIntoView()
            }
        }
    }
}
</script>