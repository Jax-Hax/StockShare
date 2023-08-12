<script>
	import { goto } from '$app/navigation';
	import Invite from './Invite.svelte';
	import Leaderboard from './Leaderboard.svelte';
	import StockTable from './StockTable.svelte';

	export let data;
	let currentParty;
	$: currentParty = data.currentParty[0];
</script>

<svelte:head>
	<title>{currentParty.party_name}</title>
	<meta
		name="description"
		content="Learn about the stock market without risk. Invite your friends to a competition for free!"
	/>
</svelte:head>

<header>
	<img src="/favicon.png" alt="the logo for StockShare" style="width: min(9vw,5em)" />
	<h1 id="nav-title">{currentParty.party_name}</h1>
	<button
		class="loginButton"
		on:click={() => {
			goto('/dashboard');
		}}
		>Back
	</button>
</header>
{#if currentParty.owner_id == data.session.user.id}
	<Invite {data}/>
{/if}
<body>
	<section id="stockDash">
		<StockTable {data} />
		<Leaderboard {data} {currentParty} />
	</section>
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
		min-height: 100%;
	}
	#stockDash {
		display: grid;
		gap: 1rem;
		grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
		padding: 1em;
	}
</style>
