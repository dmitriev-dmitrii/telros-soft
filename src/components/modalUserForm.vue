<template>

<button class="button " @click="showModal = true"> <slot></slot></button>

<div class=" user-form__overlay" :class="{'active': showModal }">

<fieldset class="user-form__wrapper"  >

	<legend><h1 class="title"> Заполните Форму</h1></legend>

	<form @submit.prevent="sendForm" class="user-form">

		<label  for="name">Имя</label>
		<input id="name"  v-model="user.name" type="text" placeholder="*" required="true">
		
		<label  for="sureName">Фамилия</label>
		<input id="sureName" v-model="user.sureName" type="text" placeholder="*" required="true">

		<label  for="patronymic">Отчество</label>
		<input id="patronymic" v-model="user.patronymic" type="text" >

		<label  for="born-date">Дата Рождения</label>
		<input id="born-date" v-model="user.bornDate" type="date" >
		

		<label  for="email">email</label>
		<input id="email" v-model="user.email" type="email" placeholder="*" required="true">

		<label  for="phone">Телефон</label>
		<input id="phone" v-model="user.phone" type="text" >

		<!-- <label  for="img">Фото</label>
		<input id="img"  type="file" > -->

		<span>
			<loading-spinner :class="{active : loading }" > Загрузка... </loading-spinner> 
		</span>
		<div class="user-form__buttons-wrapper">
			<button type="button"  class="button" @click="showModal = false">Закрыть</button>
			<button type="submit" class="button">  <slot> Отправить </slot>  </button>
		</div>

	</form>
</fieldset>

</div>

</template>

<script>

import loadingSpinner from '@/components/loadingSpinner';

export default {
components : { loadingSpinner },
data: ()=> {
    return{
    loading:false,
	showModal:false,
    }
},
props: {
	method:{
		type:String,
		require:true
	},
		user:{
		default:{
			name:'',
			sureName:'',
			patronymic:'',
			bornDate:'',
			phone:'',
			email:'',
			img:'',
		},
		type:Object
		},
},
methods: {

	sendForm ()  {
		this.loading=true;
		if (this.method === 'create') { this.$store.dispatch('CREATE_USER', this.user ).then(() => {
			this.loading=false;
			this.showModal = false;
		}).catch(() => {
			this.loading=false;
		}); }
		
		if (this.method === 'edit') {  this.$store.dispatch('EDIT_USER',  this.user ).then(() => {
			this.loading=false;
			this.showModal = false;
		}).catch(() => {
			this.loading=false;
		});}
	},


}
}
</script>

<style lang='scss'>

.user-form__overlay{
position: fixed;
top: 0;
left: 0;
display: none;

opacity: 0;
}

.user-form__overlay.active{

height: 100vh;
width: 100vw;

background-color:$bgColor1;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;

z-index: 1;
opacity: 1;
}



.user-form__wrapper{
	border-radius: .5rem;
	max-width: 50rem;
	text-align: center;
	padding: 2rem;
}
.user-form,.user-form__wrapper{
background-color:$bgColor1;
width: 100%;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
}
.user-form label
{
	align-self: flex-start;
	margin: .25rem 0;
}
.user-form input
{
	width: 100%;
	padding: .5em;
	border: none;
	background-color:lighten($bgColor1, 10);
	font-weight: bold;
	color: inherit;
	margin-bottom: 1rem;
}

.user-form__buttons-wrapper
{
	align-self: flex-end;
	margin: 1rem 0;
}
.user-form__buttons-wrapper .button {
	margin-left: 1rem;
}


</style>
