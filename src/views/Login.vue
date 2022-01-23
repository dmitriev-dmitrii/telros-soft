<template>
<main class="contanier">  
<fieldset v-if="!isLogin">
  <legend><h1>Авторизация</h1></legend>
  <form @submit.prevent="login" class="login-form">
    <input  v-model="formName" type="text">
    <input v-model="formPassword" type="pasword">
    <div > </div>
    <button type="submit"> send <loading-spinner v-show="loading"> Загрузка </loading-spinner>  </button>
  </form>
</fieldset>

<div v-else>
  <h1>Вы авторизованы  как <span>{{name}}</span> </h1>
  <h2> Желаете выйти ?</h2>
  <button @click="logout">выйти</button> <button >Назад</button>
</div>

</main>
</template>
<script>

import loadingSpinner from '@/components/loadingSpinner'

export default {
  components : {loadingSpinner },
  data: ()=> {
    return{
      formName:'admin',
      formPassword:'admin',
      loading:false,
    }
  },
computed : {
  serverMessage :function(){ return  this.$store.state.admin.serverMessage},
  isLogin :function(){ return  this.$store.state.admin.isLogin},
  name :function(){ return  this.$store.state.admin.name}
},
  methods : {
    login : function () {

      this.loading=true;

      this.$store.dispatch('LOGIN',{ 
        name:this.formName,
        password:this.formPassword
      })
      .then(()=> { 
        if ( this.isLogin ){this.$router.push('/users');}
        this.loading=false; 
        })
    },

      logout : function () {
      this.loading=true;
      this.$store.dispatch('LOGOUT')
      .then(()=> { 
        this.loading=false; 
        })
    }
  },

  
}

</script>
<style lang='scss'>
.login-form
  {
    display: flex;
    flex-direction: column;
  }
</style>