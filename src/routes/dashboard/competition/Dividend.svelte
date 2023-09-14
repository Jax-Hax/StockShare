<script>
	import { enhance } from '$app/forms';

	export let showDividend;
	export let form;
	export let data;
	let dialog;
	let sellAmDialog;
	let stockToSell;
	let percentOfStock = 0
	let portionNum = 0;
	
	$: if (stockToSell && portionNum) percentOfStock = ((portionNum/stockToSell.total)*100).toFixed(2)
	$: if (dialog && showDividend) dialog.showModal();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<dialog bind:this={sellAmDialog} on:click|self={() => sellAmDialog.close()}>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div on:click|stopPropagation>
		<span
			class="material-symbols-outlined"
			style="color: white; cursor: pointer"
			on:click={() => sellAmDialog.close()}>arrow_back</span
		>
		{#if stockToSell}
		<h1>Sell {stockToSell.symbol} - ${stockToSell.total}</h1>
		{#if form?.message}
				<p class="error">{form.message}</p>
			{/if}
		<hr style="margin: 1em 0" />
		<div class="sellRow">
		<form method="POST" use:enhance action="?/sellStock">
			
			<input name="stockToSell" type="hidden" value={stockToSell.stock_id} />
			<input name="stockTotal" type="hidden" value={stockToSell.total} />
			<input name="cashLeft" type="hidden" value={data.playerData[0].cash_left} />
			<input type="submit" class="sellButton" value="Sell Entire Stock" />
		</form>
		<!--<form method="POST" use:enhance action="?/sellStockPortion">
			{#if form?.error}
				<p class="error">{form.error}</p>
			{/if}
			<input name="amToSell" type="number" required bind:value={portionNum} placeholder="Portion to sell (in dollars)" />
			<input name="stockToSell" type="hidden" value={stockToSell.stock_id} />
			<input name="stockTotal" type="hidden" value={stockToSell.total} />
			<input name="cashLeft" type="hidden" value={data.playerData[0].cash_left} />
			<input type="submit" class="sellButton" value="Sell Portion" />
			<p>{percentOfStock}%</p>
		</form>
-->
	</div>
		{/if}
	</div>
</dialog>
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<dialog
	bind:this={dialog}
	on:close={() => (showDividend = false)}
	on:click|self={() => dialog.close()}
>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div on:click|stopPropagation>
		<span
			class="material-symbols-outlined"
			style="color: white; cursor: pointer"
			on:click={() => dialog.close()}>arrow_back</span
		>
		<div id="row">
			<h1>Sell Stock</h1>
			<p>Total: {data.playerData[0].money}</p>
			<p>Cash: {data.playerData[0].cash_left}</p>
		</div>
		<hr style="margin: 1em 0" />
		{#each data.stockData as stock}
			<div class="sellRow">
				<p style="color: white">{stock.symbol}</p>
				{#if stock.total_gain_percent < 0}
					<p style="color: red">{stock.total_gain_percent}%</p>
				{:else}
					<p style="color: var(--green)">{stock.total_gain_percent}%</p>
				{/if}
				<button class="sellButton" on:click={() => {stockToSell = stock; sellAmDialog.showModal()}}>Sell</button>
			</div>
		{/each}
	</div>
</dialog>

<style>
	dialog {
		margin: auto;
		padding: 3em;
		width: 50%;
		border: none;
		border-radius: 1em;
		background-color: #363636;
	}
	h1 {
		color: white;
		font-size: min(3rem, 7vw)
	}
	p {
		font-size: min(2rem, 4vw);
		margin-right: 0.5em;
		text-align: center;
		color: white;
	}
	input[type="number"]{
		padding: 0.75em 1em 0.75em;
		border: 0.1em solid #46c759;
		border-radius: 16px;
		background-color: #121212;
		color: white;
		font-size: 18px;
	}
	.sellRow {
		display: flex;
		justify-content: space-around;
		align-items: center;
	}
	.sellButton {
		border-radius: 1em;
		padding: 0.5em 1.5em;
		font-size: 1.35rem;
		background-color: #ea5252;
		border: none;
		cursor: pointer;
		color: white;
	}
	.sellButton:hover {
		background-color: #d84b4b;
	}
	#row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		text-align: center;
	}
	.error{
		color: red;
	}
</style>
