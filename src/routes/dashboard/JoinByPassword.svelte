<script>
	export let form; // Receive the 'form' prop from the parent component
	import { enhance } from '$app/forms';
	import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    function disable() {
        dispatch('disable');
    }
</script>

<div id="competition">
	<div style="display: flex; align-items: center">
		<span id="expand" on:click={disable} class="material-symbols-outlined">remove</span>
		<h1 style="text-align: center; padding:0.3em; flex: 1;">Join Competition</h1>
	</div>
	<form method="POST" use:enhance action="?/joinByPassword">
			{#if form?.error}
				<p class="error">{form.error}</p>
			{/if}
			<input
				name="party_name" class="input"
				required
				placeholder="Competition Name"
			/>
			<input
				name="join_password" class="input"
				required
				placeholder="Public Password"
			/>
			<input id="submitPartyBtn" type="submit" value="Join" />
	</form>
	
</div>

<style>
	#competition {
		background-color: #1e1e1e;
		padding-bottom: 1em;
		margin: 2em;
		border-radius: 3em;
	}
	#expand {
		color: white;
		font-size: 35px;
		user-select: none;
		cursor: pointer;
		padding: 1em 0 1em 1em;
	}
	form {
		background-color: #272727;
		margin: 2em;
		color: white;
		border-radius: 16px;
		font-size: 1.25em;
		border-radius: 16px;
		text-align: center;
		padding: 4em 1em 1em
	}
	.input {
		padding: 0.75em;
		margin-bottom: 1em;
		width: 95%;
		border: 0.1em solid #46c759;
		border-radius: 16px;
		background-color: #121212;
		color: white;
		font-size: 18px;
	}
	#submitPartyBtn {
		padding: 1em 5em;
		border-radius: 16px;
		display: block;
		margin: 0 auto;
		font-size: 1em;
		background-color: var(--green);
		border: none;
	}
	#submitPartyBtn:hover {
		cursor: pointer;
	}
	.switch {
		position: relative;
		display: inline-block;
		width: 60px;
		height: 34px;
	}

	/* Hide default HTML checkbox */
	.switch input {
		opacity: 0;
		width: 0;
		height: 0;
	}

	/* The slider */
	.slider {
		position: absolute;
		cursor: pointer;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #121212;
		-webkit-transition: 0.4s;
		transition: 0.4s;
		border-radius: 34px;
	}

	.slider:before {
		position: absolute;
		content: '';
		height: 26px;
		width: 26px;
		left: 4px;
		bottom: 4px;
		background-color: white;
		-webkit-transition: 0.4s;
		transition: 0.4s;
		border-radius: 50%;
	}

	input:checked + .slider {
		background-color: var(--green);
	}

	input:focus + .slider {
		box-shadow: 0 0 1px var(--green);
	}

	input:checked + .slider:before {
		-webkit-transform: translateX(26px);
		-ms-transform: translateX(26px);
		transform: translateX(26px);
	}
	.error {
		text-align: center;
		color: red;
		font-size: 28px;
	}
	h1 {
		color: white;
	}
</style>
