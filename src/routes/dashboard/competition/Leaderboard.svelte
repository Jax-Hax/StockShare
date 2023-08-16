<script>
	import { enhance } from '$app/forms';

	export let data, form, currentParty;
</script>

<div id="leaderboard">
	<div id="row">
		<form method="POST" use:enhance action="?/refreshAllUsers">
			<input type="submit" id="buyButton" value="Refresh Leaderboard" />
		</form>
		<h1 style="color: white; flex: 1">Leaderboard</h1>
	</div>
	
	<form method="POST" use:enhance action="?/changeName" class="rowChild">
		{#if form?.error}
			<p class="error">{form.error}</p>
		{/if}
		<input name="displayName" class="input" type="text" required placeholder="Displayed Name" />
		<input type="submit" id="submitPartyBtn" value="Update Name" />
	</form>
	<p>
		This keeps track of the last known money for the player since their last sign in, so it may not
		be up to date. The admin can run a function to update all players money at once.
	</p>
	{#each data.leaderboard as player, i}
		<div class="leaderboardChild">
			<p>{i + 1}. {player.name}</p>
			{#if player.money - currentParty.starting_cash < 0}
				<p style="color: red">-${(player.money - currentParty.starting_cash).toFixed(2) * -1}</p>
			{:else}
				<p style="color: var(--green)">${(player.money - currentParty.starting_cash).toFixed(2)}</p>
			{/if}
		</div>
	{/each}
</div>

<style>
	.leaderboardChild {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding: 1em;
		background-color: #363636;
		border-radius: 16px;
		margin: 0.5em;
	}
	p {
		color: white;
	}
	#leaderboard {
		background-color: #2c2c2c;
		padding: 2em;
		color: white;
		border-radius: 16px;
		font-size: 1.25em;
		text-align: center;
	}
	.input {
		padding: 0.75em 1em 0.75em;
		margin-bottom: 1em;
		border: 0.1em solid #46c759;
		border-radius: 16px;
		background-color: #121212;
		color: white;
		font-size: 18px;
	}
	#submitPartyBtn {
		padding: 0.75em 2em;
		border-radius: 16px;
		font-size: 1rem;
		background-color: var(--green);
		border: none;
		cursor: pointer;
	}
	#submitPartyBtn:hover{
		background-color: var(--dark-green);
	}
	#buyButton{
		border-radius: 1em;
		padding: 0.5em;
		color: white;
		font-size: 1em;
		background-color: var(--green);
		border: none;
		cursor: pointer;
		margin-right: 70em;
	}
	#buyButton:hover{
		background-color: var(--dark-green);
	}
</style>
