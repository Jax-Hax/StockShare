<script>
    //user ID and parties
    export let data;
    let isLobby = true;
    let party;
    async function join(partyID, party){
        party = party;
        const response = await fetch('/api', {
				method: 'POST',
				body: JSON.stringify({ partyID, data.userID }),
				headers: {
					'Content-Type': 'application/json'
				}
			});
    }
</script>
{#if isLobby}
{#each data.parties as party}
    <h1>{party.name}</h1>
    <p>{party.users}</p>
    <button on:click={() => join(party.party_id,party)}>Click</button>
{/each}
{:else}

{/if}