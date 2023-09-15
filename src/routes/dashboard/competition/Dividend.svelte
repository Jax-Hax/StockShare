<script>
	import { enhance } from '$app/forms';

	export let showDividend;
	export let form;
	export let data;
	let dialog;
	let stockToSell;
	let percentOfStock = 0
	let portionNum = 0;
	
	$: if (dialog && showDividend) dialog.showModal();
</script>


<!-- svelte-ignore a11y-click-events-have-key-events -->
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
			<h1>Report a dividend</h1>
			<p>Buy will be executed with today's date</p>
			<p>HONOR CODE SYSTEM!!</p>
		</div>
		<hr style="margin: 1em 0" />
		<a style="color: white; font-size: 1.5rem;" href="https://www.investopedia.com/terms/d/dividendyield.asp#mntl-sc-block_1-0-28">How dividends work</a>
		<form method="POST" use:enhance action="?/dividend">
			{#if form?.error}
				<p class="error">{form.error}</p>
			{/if}
			<input name="stock" type="text" required placeholder="Symbol of stock that had the dividend (WARNING: This will error if you input a stock you do not own)" />
			<input name="money" type="number" required step=0.001 placeholder="Amount of money you earned (you need to do the calculations yourself based off the dividend return and your quantity of shares)" />
			<input type="submit" class="sellButton" value="Buy" />
			<input name="max_stock_num" type="hidden" value={data.currentParty[0].max_stock_num} />
			<input name="min_stock_price" type="hidden" value={data.currentParty[0].min_stock_price} />
		</form>
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
		width: 48vw;
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
