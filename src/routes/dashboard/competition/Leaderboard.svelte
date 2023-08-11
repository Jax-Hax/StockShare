<script>
	export let data, currentParty;
</script>

<div id="leaderboard">
	<h1 style="color: white">Leaderboard</h1>
	{#each data.leaderboard as player, i}
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

<style>
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
	p {
		color: white;
	}
	#leaderboard {
		background-color: #2c2c2c;
		padding: 2em;
		color: white;
		border-radius: 16px;
		font-size: 1.25em;
		border-radius: 16px;
		text-align: center;
	}
</style>
