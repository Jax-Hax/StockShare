<script>
    export let showNewStock;
    export let form;
	export let data;
    let dialog;
    $: if(dialog && showNewStock) dialog.showModal();
</script>
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<dialog
	bind:this={dialog}
	on:close={() => (showNewStock = false)}
	on:click|self={() => dialog.close()}
>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div on:click|stopPropagation>
		<h1>New Stock</h1>
		<!-- svelte-ignore a11y-autofocus -->
		<button autofocus on:click={() => dialog.close()}>close modal</button>
	</div>
</dialog>
<style>
    dialog{
        margin: auto;
		padding: 3em;
		border: none;
		border-radius: 1em;
        background-color: #363636;
    }
	h1{
		color: white
	}
</style>