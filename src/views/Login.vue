<template>
<main class="contanier login-form__main " v-cloak>  

<fieldset v-if="!isLogin" class="login-form__wrapper">
  <legend><h1 class="title">Авторизация</h1></legend>
  <form @submit.prevent="login" class="login-form">
    <input  v-model="formName" required="true" type="text">
    <input v-model="formPassword" required="true" type="pasword">
    <div>
      <span class="message"> {{serverMessage}}</span>
      <loading-spinner :class="{active : loading }"> Загрузка </loading-spinner>
    </div>
    <div class="login-form__buttons">
      <button class="button" type="reset">Очистить</button>
      <button class="button" type="submit"> Вход  </button>
    </div>
  </form>
</fieldset>

<div v-else class="logout">
  <h1 class="title" >Вы авторизованы  как <span class="admin-name">{{name}}</span> </h1>
  <h2> Желаете выйти ?</h2>
  <loading-spinner :class="{active : loading }"> Загрузка </loading-spinner>
  <div class="logout__buttons">
    <button class="button" @click="this.$router.go(-1)">Назад</button>
    <button class="button" @click="logout">Выйти</button>
  </div>

</div>

</main>
</template>
<script>

import loadingSpinner from '@/components/loadingSpinner'

export default {
  components : {loadingSpinner },
  data: ()=> {
    return{
      formName:'',
      formPassword:'',
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

.login-form__main{
display: flex;
align-items: center;
flex-direction: column;
justify-content: center;
min-height: 60vh;
}
.login-form__wrapper{
max-width: 60rem;
text-align: center;
}
.login-form,.login-form__wrapper{

background-color:$bgColor1;
width: 100%;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
}
.login-form label
{
	align-self: flex-start;
	margin: .25rem 0;
}
.login-form input
{
	width: 100%;
	padding: .5em;
	border: none;
	background-color:lighten($bgColor1, 10);
	font-weight: bold;
	color: inherit;
	margin: 1.5rem 0;
}

.login-form .message{
font-weight: bold;
}

.logout{
  border: 1px solid;
  padding: 2.5rem 2rem 1rem 2rem;
  border-radius: .5rem;
  display: flex;
  flex-direction: column;

}
.logout__buttons,.login-form__buttons{
  margin-left: auto;
  margin-top: 1rem;
  align-self: flex-end;
}
.logout__buttons button ,.login-form__buttons button {
margin-left: 0.5rem;
}
</style>