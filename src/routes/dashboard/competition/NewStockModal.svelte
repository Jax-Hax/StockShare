<script>
	import { enhance } from "$app/forms";

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
<span
			class="material-symbols-outlined"
			style="color: white; cursor: pointer"
			on:click={() => dialog.close()}>arrow_back</span
		>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div on:click|stopPropagation>
		<h1>New Stock</h1>
		<form method="POST" use:enhance action="?/buyStock">
			{#if form?.error}
				<p class="error">{form.error}</p>
			{/if}
			<input name="stockToBuy" type="text" required placeholder="Symbol of stock to buy" />
			<input name="amToBuy" type="number" required placeholder="Amount to buy (in dollars)" />
			<input type="submit" class="sellButton" value="Buy" />
			<input name="max_stock_num" type="hidden" value={data.currentParty[0].max_stock_num} />
			<input name="min_stock_price" type="hidden" value={data.currentParty[0].min_stock_price} />
		</form>
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
	input[type="number"],input[type="text"]{
		padding: 0.75em 1em 0.75em;
		border: 0.1em solid #46c759;
		border-radius: 16px;
		width: 50vw;
		background-color: #121212;
		color: white;
		font-size: 18px;
	}
	.sellButton {
		border-radius: 1em;
		padding: 0.5em 1.5em;
		font-size: 1.35rem;
		background-color: var(--green);
		border: none;
		cursor: pointer;
		color: white;
	}
	.sellButton:hover {
		background-color: var(--dark-green);
	}
	form{
		display: flex;
		flex-direction: column;
		gap: 1em;
	}
	.error{
		color: #ea5252;
		font-size: 20px
	}
</style>