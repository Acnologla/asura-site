<template>
 <b-navbar :type="dark ? 'is-dark' : ''" class="nav" style="box-shadow: 0px 0px 20px rgba(0,0,0,0.1)a" fixed-top>
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
            <b-navbar-item class="navItem" @click="changeTheme">
               <i id="themeIcon" class="fas"></i>
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
[data-theme="dark"] .navTitle{
    color: #fff;
}
[data-theme="dark"] .navItem{
    color: #fff ;
}
[data-theme="dark"] .navItem:hover{
    color: grey;
    background-color: #1D1F21
}
[data-theme="dark"] .nav,  [data-theme="dark"] .navbar-menu{
    background-color: #2A2D32 !important;
}

</style>
<script>
export default{
    name: "Nav",
    data(){
        return {
            dark: document.body.hasAttribute("theme")
        }
    },
    mounted(){
        if (localStorage.getItem("theme") === "dark"){
            this.dark = true
        }
        this.applyTheme()
    },
    methods: {
        about(){
            if (this.$route.name !== "Home"){
                this.$router.push({name: "Home"})
                document.getElementById('about').scrollIntoView()
            }
        },
        changeTheme(){
            if (this.dark){
                localStorage.removeItem("theme")
            }else{
                localStorage.setItem("theme", "dark")
            }
            this.dark = !this.dark
            this.applyTheme()
        },
        applyTheme(){
            if (this.dark){
                themeIcon.classList.remove("fa-moon")
                themeIcon.classList.add("fa-sun")
                document.body.setAttribute("data-theme", "dark")
            }else{
                 themeIcon.classList.remove("fa-sun")
                themeIcon.classList.add("fa-moon")
                document.body.removeAttribute("data-theme")
            }
        }
    }
}
</script>