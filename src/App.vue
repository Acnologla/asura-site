<template>
  <div id="app">
    <Nav/>
    <router-view style="margin-top: 70px"/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
    border-bottom: 4px solid #552fbc;
}

#nav {
  padding: 30px;
  
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
[data-theme='dark']{
    background-color: #2A2D32;
    color: #ECEFF4;
}
[data-theme='dark'] #app{
    color: #ECEFF4;
}
[data-theme="dark"] .card{
  background-color: #1D1F21;
  color: #ECEFF4;
}
[data-theme="dark"] .card-footer{
  border-top-color: #2A2D32;
}
</style>

<script>
  import Nav from "./components/Nav"
  export default {
    components: {Nav}
  }
</script>