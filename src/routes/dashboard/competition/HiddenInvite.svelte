<script>
	//this component is literally just a different background color i should change it
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	function enable() {
		dispatch('enable');
	}
</script>

<div on:click={enable} id="hidden">
	<span id="expand" class="material-symbols-outlined">add</span>
	<slot />
</div>

<style>
	#hidden {
		background-color: #2c2c2c;
		padding: 2em;
		margin: 2em;
		border-radius: 3em;
		cursor: pointer;
		display: flex;
		align-items: center;
	}
	#expand {
		color: white;
		font-size: 35px;
		user-select: none;
	}
</style>
