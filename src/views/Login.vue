<template>
<main class="contanier">  
<fieldset v-if="!isLogin">
  <legend><h1>Авторизация</h1></legend>
  <form @submit.prevent="sendForm" class="login-form">
    <input  v-model="formName" type="text">
    <input v-model="formPassword" type="pasword">
    <div ><loading-spiner :class="{ 'hidden' : !loading }"/> </div>
    <button type="submit"> send  </button>
  </form>
</fieldset>

<div v-else>
  <h1>Вы авторизованы  как <span>{{name}}</span> </h1>
  <h2> Желаете выйти ?</h2>
  <button>выйти</button> <button @click="$router.go(-1)">Назад</button>
</div>
</main>
</template>
<script>

import loadingSpiner from '@/components/loadingSpiner'

export default {
  components : {loadingSpiner },
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
    sendForm : function () {

      this.loading=true;

      this.$store.dispatch('LOGIN',{ 
        name:this.formName,
        password:this.formPassword
      })
      .then(()=> { 
        if ( this.isLogin ){this.$router.push('/users');}
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