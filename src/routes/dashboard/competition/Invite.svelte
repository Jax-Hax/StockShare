<script>
	import { enhance } from '$app/forms';
	export let form;
	export let currentParty;
</script>

<div id="invite">
	<h1>Invite users to join your party</h1>
		<form method="POST" use:enhance action="?/inviteUsers" class="rowChild">
			<h2>Invite by email</h2>
            <p style="color: white">Send an invite link to the user</p>
			{#if form?.message}
				<p class="error">{form.message}</p>
			{/if}
			<input name="emails" type="text" required placeholder="Emails to invite (comma seperated)" />
            <br>
			<input type="submit" value="Email" />
		</form>
		<div class="rowChild">
			<h2>Invite by password</h2>
			<p style="color: white">
				Send the party name and password to any user and they will be able to join your party
			</p>
            <h3 style="margin: 0.5em 0">Party Name: {currentParty.party_name}</h3>
            <h3 style="margin: 0.5em 0">Public Password: {currentParty.join_password}</h3>
            <p style="color: #eb3838">
				WARNING: Any user with this name and password will be able to join your party
			</p>
		</div>
</div>

<style>
	#invite {
		background-color: #2c2c2c;
		padding: 2em;
		margin: 1em 1em 0;
		color: white;
		border-radius: 16px;
		font-size: 1.25em;
		border-radius: 16px;
		text-align: center;
	}
	input[type='text'] {
		padding: 0.75em;
		margin-bottom: 1em;
		border: 0.1em solid #46c759;
		border-radius: 16px;
		background-color: #232323;
		color: white;
        width: 98%;
		font-size: 18px;
	}
	input[type='submit']{
		padding: 0.5em 3em;
		border-radius: 16px;
		display: block;
		margin: 0 auto;
		font-size: 1em;
		background-color: var(--green);
		border: none;
		cursor: pointer;
	}
	input[type="submit"]:hover{
		background-color: var(--dark-green);
	}
	h1,
	h2,h3 {
		color: white;
	}
	h2 {
		font-size: 2.5rem;
	}
	.rowChild {
		background-color: #363636;
		border-radius: 16px;
		padding: 2em;
        margin: 1em;
	}
	.error {
		text-align: center;
		color: red;
		font-size: 28px;
	}
</style>
