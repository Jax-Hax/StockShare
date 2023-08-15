<script>
    export let showSellStock;
	export let form;
    let dialog;
    $: if(dialog && showSellStock) dialog.showModal();
</script>
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<dialog
	bind:this={dialog}
	on:close={() => (showSellStock = false)}
	on:click|self={() => dialog.close()}
>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div on:click|stopPropagation>
		<h1>Sell Stock</h1>
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
</style>