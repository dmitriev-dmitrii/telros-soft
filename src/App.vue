<template>

  <div id="nav" class="contanier">

    <router-link to="/">Home</router-link> 
    <router-link to="/users">Пользователи</router-link> 
    <router-link to="/login"> <span v-if="!isLogin">Войти</span> <span v-else> Выйти</span> </router-link>
    <h1>isLogin {{isLogin}}</h1>
  </div>

  <router-view/>

</template>
<script>
export default {
  computed:{
    isLogin :function(){ return  this.$store.state.admin.isLogin},
    name :function(){ return  this.$store.state.admin.name}
  },

  created:function () {
    this.$store.dispatch('LOGIN_TEST').then(() => {
      
      if (!this.isLogin){ 
        // console.log('app pushed /login');
        this.$router.push('/login')
        }
    })
  }
}
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#nav {
display: flex;
align-items: center;
justify-content: center;
  a {
    font-weight: bold;
    margin: .5em;
    &:hover {
      color: $mainAccentColor;
    }
    &.router-link-exact-active {
      color: $mainAccentColor;
    }
  }
}
</style>
