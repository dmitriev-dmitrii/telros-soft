<template>
<main class="contanier">
  <loading-spiner v-show="loading"></loading-spiner>
  <div class="user" v-if="!loading">
  <h1>
    <span>{{user.name}}</span><span>{{user.sureName}}</span><span v-if="!!user.patronymic">{{user.patronymic}}</span>
  </h1>
  <p>Дата рождения : <span>{{user.bornDate}}</span> </p>
  <p>Электронная почта : <a class="link" v-if="!!user.email" :href="`mailto:${user.email}`" > {{user.email}} </a> </p>
  <p>Номер телефона : <a class="link" v-if="!!user.phone" :href="`tel:${user.phone}`"> {{user.phone}} </a> </p>
<button class="edit-button button">Редактировать</button>
  </div>

</main>
</template>

<script>

import loadingSpiner from '@/components/loadingSpiner'

export default {

  components : {loadingSpiner },

  data: ()=> {
    return{
      loading:true,
    }
  },

  computed:{
    currentId () { return this.$route.params.id;},
    user :function(){ return  this.$store.state.user.item},
  },

created: function () {
    this.loading= true;
    this.$store.dispatch('GET_USER',this.currentId ).then(() => {
    this.loading= false;
    })
    .catch(() => {
    this.loading= false;
    });
  
}
}
</script>
<style lang='scss'>
.user,.user>h1
{
  display: flex; 
  flex-direction: column;
}
.user>h1 , .user p
{
  margin-bottom: 0.5em;
}
.user>h1 
{
  font-size: 2em;
  text-transform: capitalize;
}
.user
{ position: relative;
  padding: 1em;
  border-radius: .5rem;
  border: 1px solid currentColor;
  overflow: hidden;
}
.edit-button{
  
  position: absolute;
  right: 0;
  top: 0;

}
</style>