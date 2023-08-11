<script>
	import NewCompetitionForm from './NewCompetitionForm.svelte'
	import { invalidate } from '$app/navigation';
	import { goto } from '$app/navigation';
	//user ID and parties
	export let data;
	export let form;
	let isLobby = true;
	let currentParty;
	let stocks;
	//variables for the delete competition popup
	let party_id_delete;
	let deleteModal;
	
	async function join(partyID, party) {
		await fetch('/api/join', {
			method: 'POST',
			body: JSON.stringify({ partyID }),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		goto('/dashboard/competition')
		isLobby = false;
	}
	async function deleteParty(partyID) {
		await fetch('/api/delete', {
			method: 'POST',
			body: JSON.stringify({ partyID }),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		isLobby = true;
		deleteModal.close();
		invalidate((url) => url.pathname === '/path');
	}
	$: if (form?.party && isLobby) {
		join(form.party.party_id, form.party);
	}
</script>

<svelte:head>
	<title>StockShare - Dashboard</title>
	<meta
		name="description"
		content="Learn about the stock market without risk. Invite your friends to a competition for free!"
	/>
</svelte:head>
<body>
	{#if isLobby}
		<header>
			<h1 id="nav-title">StockShare</h1>
			<button class="loginButton">Log Out</button>
		</header>
		<NewCompetitionForm {form} />
		<h1 style="text-align: center; padding: 0.5em">Your Competitions</h1>
		<dialog bind:this={deleteModal}>
			<span
				class="material-symbols-outlined"
				style="cursor: pointer; padding:0.25em; color: white; font-size: 40px"
				on:click={deleteModal.close()}>arrow_back</span
			>
			<h1>
				Are you sure you want to do this? It is permanent and will delete the competition for all
				users involved.
			</h1>
			<button
				class="bouncyButton"
				style="margin: 1em; padding: 0.5em 1em"
				on:click={() => deleteModal.close()}>Back</button
			>
			<button
				class="redButton"
				style="margin: 1em;"
				on:click={() => {
					deleteParty(party_id_delete);
				}}>Delete FOREVER</button
			>
		</dialog>
		<div id="competitionGrid">
			{#each data.parties as party}
				<div>
					<h1>{party.name}</h1>
					{#if party.num_users == 1}
						<p>It's just you in this competition!</p>
					{:else}
						<p>There are {party.num_users} people in this party (including you)</p>
					{/if}
					<button
						class="bouncyButton"
						style="margin: 1em"
						on:click={() => join(party.party_id, party)}>Stock Dashboard</button
					>
					{#if data.userID == party.owner_id}
						<button
							class="redButton"
							style="margin: 1em;"
							on:click={() => {
								party_id_delete = party.party_id;
								deleteModal.showModal();
							}}>Delete competition</button
						>
					{/if}
				</div>
			{/each}
		</div>
	{:else if stocks != null}
		<header>
			<img src="/favicon.png" alt="the logo for StockShare" style="width: min(9vw,5em)" />
			<h1 id="nav-title">{currentParty.name}</h1>
			<button
				class="loginButton"
				on:click={() => {
					isLobby = true;
					form = null;
				}}>Back</button
			>
		</header>
		<section id="stockDash">
			<div id="yourStocks">
				<h1>Your Stocks</h1>
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
					{#each stocks.stockData as stock}
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
			<div id="leaderboard">
				<h1>Leaderboard</h1>
				{#each stocks.leaderboard as player, i}
					<div class="leaderboardChild">
						<p>{i + 1}. {player.name}</p>
						{#if player.money - currentParty.starting_cash < 0}
							<p style="color: red">-${(player.money - currentParty.starting_cash) * -1}</p>
						{:else}
							<p style="color: var(--green)">${player.money - currentParty.starting_cash}</p>
						{/if}
					</div>
				{/each}
			</div>
		</section>
	{/if}
</body>

<style>
	header {
		display: flex;
		justify-content: space-between;
		padding: 0.5em;
		align-items: center;
		background-color: #121212;
	}
	header h1 {
		color: white;
		letter-spacing: 0;
	}
	header button {
		padding: 0.75em 2em;
	}
	.loginButton {
		background-color: white;
		color: var(--green);
		cursor: pointer;
		margin: -1px;
		border: 1px solid var(--green);
	}
	.loginButton:hover {
		background-color: #2bcf57;
		color: white;
		transform: none;
		transition: none;
	}
	body {
		background-color: #232323;
	}
	body h1,
	body p {
		color: white;
	}
	
	#competitionGrid {
		display: grid;
		gap: 1rem;
		grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
		align-items: center;
		padding: 1em;
	}
	#competitionGrid div {
		background-color: #2c2c2c;
		padding: 2em;
		color: white;
		border-radius: 16px;
		font-size: 1.25em;
		border-radius: 16px;
		text-align: center;
	}
	#stockDash {
		display: grid;
		gap: 1rem;
		grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
		padding: 1em;
	}
	.leaderboardChild {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding: 1em;
		background-color: #363636;
		border-radius: 16px;
		margin: 0.5em;
		max-width: 740px;
	}
	#yourStocks,
	#leaderboard {
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
		background-color: #363636;
	}
	.redButton {
		background-color: #ea5252;
		border: none;
		color: white;
		padding: 0.5em 1em;
		border-radius: 19px;
		text-decoration: none;
		cursor: pointer;
		display: inline-block;
		font-size: 1rem;
	}
	.redButton:hover {
		background-color: white;
		box-shadow: 0 3px;
		color: #ea5252;
		transform: translateY(-0.25em);
		transition: transform 0.25s;
		border-width: 1px;
		border-style: solid;
		margin: -1px;
	}
	
	dialog {
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		padding: 3em;
		border: none;
		border-radius: 1em;
		text-align: center;
		background-color: #2e2e2e;
	}
</style>
