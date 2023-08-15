<script>
	import { enhance } from "$app/forms";

    export let showSellStock;
	export let form;
	export let data;
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
		<div id="row">
		<h1>Sell Stock</h1>
		<p>Total: {data.playerData[0].money}</p>
		<p>Cash: {data.playerData[0].cash_left}</p>
	</div>
	<hr style="margin: 1em 0"/>
		{#each data.stockData as stock}
		<div class="sellRow">
			<p style="color: white">{stock.symbol}</p>
			{#if stock.total_gain_percent < 0}
				<p style="color: red">{stock.total_gain_percent}%</p>
			{:else}
				<p style="color: var(--green)">{stock.total_gain_percent}%</p>
			{/if}
			<form method="POST" use:enhance action="?/sellStock" class="rowChild">
				{#if form?.message}
					<p class="error">{form.message}</p>
				{/if}
				<input name="stockToSell" type="hidden" value={stock.stock_id} />
				<input type="submit" class="sellButton" value="Sell" />
			</form>
		</div>
		{/each}
		<!-- svelte-ignore a11y-autofocus -->
		<button autofocus on:click={() => dialog.close()}>close modal</button>
	</div>
</dialog>
<style>
    dialog{
        margin: auto;
		padding: 3em;
		width: 50%;
		border: none;
		border-radius: 1em;
        background-color: #363636;
    }
	h1{
		color: white
	}
	p{
		font-size: min(2rem,6vw);
		margin-right: 0.5em;
		text-align: center;
		color: white
	}
	.sellRow{
		display: flex;
		justify-content: space-around;
		align-items: center;
	}
	.sellButton{
		border-radius: 1em;
		padding: 0.5em 1.5em;
		font-size: 1.35rem;
		background-color: #ea5252;
		border: none;
		cursor: pointer;
		color: white;
	}
	.sellButton:hover{
		background-color: #d84b4b;
	}
	#row{
		display: flex;
		align-items: center;
		justify-content: space-between;
		text-align: center;
	}
</style>