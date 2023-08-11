<script>
	import NewCompetitionForm from './NewCompetitionForm.svelte';
	export let data;
	export let form;

	//variables for the delete competition popup
	let party_to_delete;
	let deleteModal;
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
	<NewCompetitionForm {form} />
	<h1 style="text-align: center; padding: 0.5em">Your Competitions</h1>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<dialog bind:this={deleteModal}>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<span
			class="material-symbols-outlined"
			style="cursor: pointer; padding:0.25em; color: white; font-size: 40px"
			on:click={() => deleteModal.close()}>arrow_back</span
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
		<form method="post" action="?/deleteParty">
			<input type="hidden" name="party_id" value={party_to_delete} />

		<button
			class="redButton"
			style="margin: 1em;">Delete FOREVER</button
		></form>
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
				<form method="post" action="?/joinParty">
				<button
					class="bouncyButton" name="party_id" value={party.party_id}
					style="margin: 1em" >Stock Dashboard</button>
				</form>
				{#if data.session.user.id == party.owner_id}
					<button
						class="redButton"
						style="margin: 1em;"
						on:click={() => {
							party_to_delete = party.party_id;
							deleteModal.showModal();
						}}>Delete competition</button
					>
				{/if}
			</div>
		{/each}
	</div>
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
