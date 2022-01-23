<template>
<main class="contanier">
<loading-spinner v-show="loading"> Загрузка списка пользователей</loading-spinner>

<div v-if="list.length > 0 && !loading">

  <div class="users">

      <h1 class="title">Список пользователей</h1>

        <modal-user-form method="create">Создать Пользователя</modal-user-form>

    <div class="users__list">
    <router-link  class="users__item " v-for="user of list" :key="user._id" :to="`/users/${user._id}`">
      <h2>{{user.name}}</h2> 
      <h2> {{user.sureName}}</h2> 
    </router-link>
  </div>
  </div>
</div>

<div v-if="list.length == 0 && !loading" >
    <h1>Список пользователей пуст</h1>
</div>
</main>
</template>

<script>
import loadingSpinner from '@/components/loadingSpinner'
import modalUserForm from '@/components/modalUserForm'
export default {
  components : { loadingSpinner ,modalUserForm},
  data: ()=> {
    return{
      loading:true,
    }
  },
computed : {
  list :function(){ return  this.$store.state.users.list},
},
mounted: function () {
    this.loading= true;

    this.$store.dispatch('GET_USERS').then(() => {
    this.loading= false;
    })
    .catch(() => {
    this.loading= false;
    });
  
}
}
</script>

<style lang='scss'>

.users{
  $base-margin:1rem;
  $cards:1;
  // количество карточек при медиазапросе
  &__list{
  margin-top: 3rem;
  display: flex;
  flex-wrap: wrap;
  margin-left: - $base-margin ;
  margin-right: - $base-margin ;
  }
  &__item {

  padding: 1rem;
  border: 1px solid currentColor;
  border-radius: .5rem;
text-transform: capitalize;

  &:hover {
    border: 1px solid $mainAccentColor;
    color: $mainAccentColor;
  }

  $cards:1;
  // 1card
  margin: $base-margin auto;
  width:calc( ( 100% - $base-margin * ($cards * 2) )  / $cards ) ;
  max-width: 35rem;
  
  @media (min-width: 575.98px)
  {
   // 2cards
  $cards:2;
  width:calc( ( 100% - $base-margin * ($cards * 2) )  / $cards ) ;
  margin: $base-margin ;
  // получаем такой код
  // width:calc( ( 100% - 4rem )  / 2 ) ;
  // margin: 1rem ;
  max-width: none;
  }
  
  @media (min-width: 767.98px)
  {
  $cards:3;
  // 3cards
  width:calc( ( 100% - $base-margin * ($cards * 2) )  / $cards ) ;
  }
  }

}

.users  > .title{
  text-align: center;
  margin: 1em 0;
}

.users .button{
    margin: 1rem 0;
}
</style>