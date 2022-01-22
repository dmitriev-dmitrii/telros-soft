<template>
	<span class="spiner"></span>
</template>

<script>
export default {

};
</script>

<style scoped lang="scss">
.spiner{

	background-color: transparent;
	margin: 0 .5em;
	// height: 1em;
	// width: 1em;
	// display: inline-block;
	border-radius: 50%;

	// box-shadow: $mainAccentColor 1px 0 3px 2px;

	animation: spiner 1.7s linear infinite;
}
@keyframes spiner {
	0%    { 
		transform: rotate(0deg) ;
		border:.4em solid $mainAccentColor; 
		border-top: .4em solid transparent;

	}

	25%    { 
		border:.4em solid $loadingColor; 
		border-top: .4em solid transparent;

	}
	50%    { 
		border:.4em solid $succesColor; 
		border-top: .4em solid transparent;
	}

	100%  { 
		border:.4em solid $mainAccentColor;
		border-top: .4em solid transparent;
		transform: rotate(-360deg) ;
	}
}
</style>
