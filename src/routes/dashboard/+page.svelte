<script>
    import { enhance } from '$app/forms';
	//user ID and parties
	export let data;
	let isLobby = true;
	let currentParty;
	let stocks;
	async function join(partyID, party, userID) {
		const response = await fetch('/api', {
			method: 'POST',
			body: JSON.stringify({ partyID, userID }),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		currentParty = party;
		stocks = await response.json();
		isLobby = false;
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
			<h1 id="nav-title">My Competitions</h1>
			<button class="loginButton">Log Out</button>
		</header>
        <div style="background-color: #1e1e1e;">
            <h1 style="text-align: center; padding:0.3em">New Competition</h1>
        <form method="POST" use:enhance action="?/newParty" id="partyMaker">
            <div>
                <input
                name="username"
                required placeholder="person"
                />
                <input
                name="username"
                required placeholder="person"
                />
            </div>
            <div>
                <input
                name="username"
                required placeholder="person"
                />
                <input
                name="username"
                required placeholder="person"
                />
            </div>
        </form>
        <input id="submitPartyBtn" type="submit" form="partyMaker" value="Create New Competition"/>
        </div>
		{#each data.parties as party}
			<h1>{party.name}</h1>
			<p>{party.users}</p>
			<button on:click={() => join(party.party_id, party, data.userID)}>Click</button>
		{/each}
	{:else if stocks != null}
		<header>
			<img src="/favicon.png" alt="the logo for StockShare" style="width: min(9vw,5em)" />
			<h1 id="nav-title">{currentParty.name}</h1>
			<button class="loginButton" on:click={() => (isLobby = true)}>Back</button>
		</header>
		{#each stocks.data as stock}
			<div>
				<p>{stock.stock_id}</p>
				<p>{stock.amount_invested}</p>
			</div>
		{/each}
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
		background-color: #182c25;
	}
	body h1,
	body p,
	body h2,
	body h3 {
		color: white;
	}
    #partyMaker{
        display: grid;
        gap: 1rem;
        grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
        padding: 1em
    }
    #partyMaker div{
        background-color: #272727;
        padding: 2em;
        color: white;
        border-radius: 16px;
        font-size: 1.25em;
        border-radius: 16px;
        text-align: center;
    }
    #partyMaker input{
        padding: 1em;
        margin-bottom: 1em;
        width: 95%;
        border: 0.1em solid #46c759;
        border-radius: 16px;
        background-color: #121212;
        color: white;
    }
    #submitPartyBtn{
        padding: 1em 5em;
        border-radius: 16px;
        display: block; margin:0 auto;
        font-size: 1em;
        background-color: var(--green);
        border: none;
    }
    #submitPartyBtn:hover{
        cursor: pointer;
    }
</style>
