<template>
<main class="contanier">
  
  <loading-spinner v-show="loading"></loading-spinner>
  <div class="user" v-if="!loading">
  <h1 class="title">
    <span>{{user.name}}</span><span>{{user.sureName}}</span><span v-if="!!user.patronymic">{{user.patronymic}}</span>
  </h1>
    <p v-if="!!user.bornDate">Дата рождения : <span>{{ formatData(user.bornDate) }}</span> </p>
    <p v-if="!!user.email">Электронная почта : <a class="link" v-if="!!user.email" :href="`mailto:${user.email}`" > {{user.email}} </a> </p>
    <p v-if="!!user.phone">Номер телефона : <a class="link" v-if="!!user.phone" :href="`tel:${user.phone}`"> {{user.phone}} </a> </p>

  <div class="user__buttons">
    <modal-user-form method="edit" :user="user">Редактировать</modal-user-form>
    <button class="button" @click="deleteUser">Удалить</button>
  </div>

  </div>

</main>
</template>

<script>

import loadingSpinner from '@/components/loadingSpinner'
import modalUserForm from '@/components/modalUserForm'
export default {

  components : {loadingSpinner,modalUserForm },

  data: ()=> {
    return{
      loading:true,
    }
  },

  computed:{
    currentId () { return this.$route.params.id;},
    user :function(){ return  this.$store.state.user.item},
  },

  mounted: function () {
    this.loading= true;
    this.$store.dispatch('GET_USER',this.currentId ).then(() => {
    this.loading= false;
    })
    .catch(() => {
    this.loading= false;
    });
  },
  methods: {

	deleteUser ()  {
        this.loading= true;
        this.$store.dispatch('DELETE_USER',{_id:this.currentId} )
        .then(() => {
          this.loading= false;
          this.$router.go(-1)
        })
          .catch(() => {
        this.loading= false;
        });
	},
	formatData (data) {
		return data.split('T')[0]
	}
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
  // font-size: 2em;
  text-transform: capitalize;
  align-self: flex-end;
}
.user
{ 
  margin-top: 3rem;
  padding: 2rem;
  border-radius: .5rem;
  border: 1px solid currentColor;
  overflow: hidden;
}
.user__buttons{
  align-self: flex-end;
}
.user__buttons .button {
  margin-left: 1rem;
}
</style>