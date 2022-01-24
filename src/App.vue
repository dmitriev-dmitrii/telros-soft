<template>

  <div id="nav" class="contanier">

    <router-link to="/">Home</router-link> 
    <router-link to="/users">Пользователи</router-link> 
    <router-link to="/login"> <span v-if="!isLogin">Войти</span> <span v-else> Выйти</span> </router-link>

  </div>
  <loading-spinner :class="{active : loading }"> Проверяем доступ </loading-spinner>
  <router-view v-show="!loading"/>
  
</template>
<script>
import loadingSpinner from '@/components/loadingSpinner'
export default {
  components : {loadingSpinner },
  data: ()=>{
    return {
      loading:true
    }
  },
  computed:{
    isLogin :function(){ return  this.$store.state.admin.isLogin},
    name :function(){ return  this.$store.state.admin.name},
  },

  mounted:function () {
    this.$store.dispatch('LOGIN_TEST').then(() => {

      if (!this.isLogin){ 
        // console.log('app pushed /login');
        this.$router.push('/login')
        }

      this.loading=false;
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
