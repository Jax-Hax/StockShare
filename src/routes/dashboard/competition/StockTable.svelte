<script>
	export let data;
</script>

<div id="yourStocks">
	<h1 style="color: white">Your Stocks</h1>
	<div id="stockTable">
		<p>Symbol</p>
		<p>Total</p>
		<p>Am. Invested</p>
		<p>Price</p>
		<p>Day's Gain %</p>
		<p>Day's Gain $</p>
		<p>Total Gain %</p>
		<p>Total Gain $</p>
		<p>Qty</p>
		<p>Price Paid</p>
		{#each data.stockData as stock}
			<p style="color: #266bff">{stock.symbol}</p>
			{#if stock.total < 0}
				<p>-${stock.total * -1}</p>
			{:else}
				<p>${stock.total}</p>
			{/if}
			<p>${stock.am_invested}</p>
			<p>${stock.price}</p>
			{#if stock.day_gain_percent < 0}
				<p style="color: red">{stock.day_gain_percent}%</p>
			{:else}
				<p style="color: var(--green)">{stock.day_gain_percent}%</p>
			{/if}
			{#if stock.day_gain_dollar < 0}
				<p style="color: red">-${stock.day_gain_dollar * -1}</p>
			{:else}
				<p style="color: var(--green)">${stock.day_gain_dollar}</p>
			{/if}
			{#if stock.total_gain_percent < 0}
				<p style="color: red">{stock.total_gain_percent}%</p>
			{:else}
				<p style="color: var(--green)">{stock.total_gain_percent}%</p>
			{/if}
			{#if stock.total_gain_dollar < 0}
				<p style="color: red">-${stock.total_gain_dollar * -1}</p>
			{:else}
				<p style="color: var(--green)">${stock.total_gain_dollar}</p>
			{/if}
			<p>{stock.quantity}</p>
			<p>${stock.price_when_invested}</p>
		{/each}
	</div>
</div>

<style>
	#yourStocks {
		background-color: #2c2c2c;
		padding: 2em;
		color: white;
		border-radius: 16px;
		font-size: 1.25em;
		border-radius: 16px;
		text-align: center;
	}
	#stockTable {
		display: grid;
		grid-template-columns: repeat(10, 1fr);
		background-color: black;
		gap: 1px;
		overflow: scroll;
		border-radius: 10px;
	}
	#stockTable > p {
		padding: 1em;
		color: white;
		background-color: #363636;
	}
</style>
