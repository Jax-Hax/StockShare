<script>
	import HiddenComponent from './HiddenComponent.svelte';
	import JoinByPassword from './JoinByPassword.svelte';
import NewCompetitionForm from './NewCompetitionForm.svelte';
	import PartyList from './PartyList.svelte';
	export let data;
	export let form;
	let newCompetitionEnabled = false;
	let joinCompetitionEnabled = false;
</script>

<svelte:head>
	<title>StockShare - Dashboard</title>
	<meta
		name="description"
		content="Learn about the stock market without risk. Invite your friends to a competition for free!"
	/>
</svelte:head>
<body>
	<header>
		<h1 id="nav-title">StockShare</h1>
		<form method="post" action="?/signout">
			<button class="loginButton">Log Out</button>
		</form>
	</header>
	{#if newCompetitionEnabled}
	<NewCompetitionForm on:disable={() => newCompetitionEnabled = false} {form} />
	{:else}
	<HiddenComponent on:enable={() => newCompetitionEnabled = true}><h1 style="text-align: center; flex: 1; color: white;">New Competition</h1></HiddenComponent>
	{/if}
	{#if joinCompetitionEnabled}
	<JoinByPassword on:disable={() => joinCompetitionEnabled = false} {form} />
	{:else}
	<HiddenComponent on:enable={() => joinCompetitionEnabled = true}><h1 style="text-align: center; flex: 1; color: white;">Join</h1></HiddenComponent>
	{/if}
	<PartyList {data}/>
</body>

<style>
	header {
		display: flex;
		justify-content: space-between;
		padding: 0.5em;
		align-items: center;
		background-color: #272727;
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
	
</style>
