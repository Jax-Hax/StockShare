<script>
	import { enhance } from "$app/forms";

	export let data;
</script>
<div id="invite">
    <h1>Invite users to join your party</h1>
    <span class="material-symbols-outlined">
        help
        </span>
    <form method="POST" use:enhance action="?/inviteUsers" id="emailForm">
        <input name="emails" required placeholder="Emails to invite (comma seperated)" />
        <input type="submit" value="Submit">
    </form>
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
    h1{
        color: white
    }
    #emailForm{

    }
</style>