<template>
<div class="my-spiner__wrapper">
	<div class="my-spiner ">
		
	</div>
	<slot></slot>
</div>
</template>

<script>
export default {

};
</script>

<style lang='scss'>
.my-spiner__wrapper{
display: flex;
justify-content: center;
align-items: center;

opacity: 0;
}
.my-spiner__wrapper.active{
opacity: 1;
}
.my-spiner{
	background-color: transparent;
	height:2rem;
	width:2rem;
	display: inline-block;
	border-radius: 50%;
	border:.2em solid  darken($mainAccentColor , 30) ; 
	border-top: .2em solid  $mainAccentColor ;
	animation: spiner 1.7s linear infinite;
	margin-right: .5em;
}

@keyframes spiner {
	0%   { 
		transform: rotate(0deg) ;

	}

	100%  { 
		transform: rotate(-360deg) ;

	}
}
</style>
