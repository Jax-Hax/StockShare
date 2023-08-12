<script>
    export let form; // Receive the 'form' prop from the parent component
    import { enhance } from '$app/forms';
  </script>
<div style="background-color: #1e1e1e; padding-bottom: 1em">
    <h1 style="text-align: center; padding:0.3em">New Competition</h1>
    <form method="POST" use:enhance action="?/newParty" id="partyMaker">
        <div>
            <h1>Main</h1>
            {#if form?.error}
                <p class="error">{form.error}</p>
            {/if}
            <input name="party_name" style="font-size: 25px" required placeholder="Competition name (must be unique)" />
            <input
                name="starting_cash"
                type="number"
                required
                placeholder="Amount of cash each player starts with"
            />
			<input
                name="join_password"
                required
                placeholder="Public password you can share to invite users to your party"
            />
        </div>
        <div>
            <h1>Extra</h1>
            <input
                name="max_players"
                type="number"
                placeholder="Max number of players allowed (leave blank for unlimited)"
            />
            <input
                name="max_stock_num"
                type="number"
                placeholder="Maximum number of unique stocks any player can have at once (leave blank for unlimited)"
            />
            <input
                name="min_stock_price"
                type="number"
                step="0.01"
                placeholder="Minimum price of a stock, to prevent penny stocks (leave blank for 0)"
            />
            <input
                name="max_sells"
                type="number"
                placeholder="The maximum number of times people can sell a stock (leave blank for unlimited)"
            />
            Are index funds allowed:
            <label class="switch">
                <input name="index_funds_allowed" type="checkbox" />
                <span class="slider" />
            </label>
            <br />
            Is buying just a part of a stock (partial) allowed:
            <label class="switch">
                <input name="partials_allowed" type="checkbox" />
                <span class="slider" />
            </label>
            <br />
            Is the Leaderboard enabled:
            <label class="switch">
                <input name="leaderboard_enabled" type="checkbox" />
                <span class="slider" />
            </label>
            <br />
            Automatic Dividend Reinvesting (money will be deposited to account if not):
            <label class="switch">
                <input name="drip_enabled" type="checkbox" />
                <span class="slider" />
            </label>
        </div>
    </form>
    <input id="submitPartyBtn" type="submit" form="partyMaker" value="Create New Competition" />
    </div>  

    <style>
#partyMaker {
		display: grid;
		gap: 1rem;
		grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
		align-items: center;
		padding: 1em;
	}
	#partyMaker div {
		background-color: #272727;
		padding: 2em;
		color: white;
		border-radius: 16px;
		font-size: 1.25em;
		border-radius: 16px;
		text-align: center;
	}
	#partyMaker input {
		padding: 0.75em;
		margin-bottom: 1em;
		width: 95%;
		border: 0.1em solid #46c759;
		border-radius: 16px;
		background-color: #121212;
		color: white;
		font-size: 18px;
	}
    #submitPartyBtn {
		padding: 1em 5em;
		border-radius: 16px;
		display: block;
		margin: 0 auto;
		font-size: 1em;
		background-color: var(--green);
		border: none;
	}
    #submitPartyBtn:hover {
		cursor: pointer;
	}
	.switch {
		position: relative;
		display: inline-block;
		width: 60px;
		height: 34px;
	}

	/* Hide default HTML checkbox */
	.switch input {
		opacity: 0;
		width: 0;
		height: 0;
	}

	/* The slider */
	.slider {
		position: absolute;
		cursor: pointer;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #121212;
		-webkit-transition: 0.4s;
		transition: 0.4s;
		border-radius: 34px;
	}

	.slider:before {
		position: absolute;
		content: '';
		height: 26px;
		width: 26px;
		left: 4px;
		bottom: 4px;
		background-color: white;
		-webkit-transition: 0.4s;
		transition: 0.4s;
		border-radius: 50%;
	}

	input:checked + .slider {
		background-color: var(--green);
	}

	input:focus + .slider {
		box-shadow: 0 0 1px var(--green);
	}

	input:checked + .slider:before {
		-webkit-transform: translateX(26px);
		-ms-transform: translateX(26px);
		transform: translateX(26px);
	}
	.error {
		text-align: center;
		color: red;
		font-size: 28px;
	}
    h1{
        color: white
    }
    </style>