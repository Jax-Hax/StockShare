<script>
    import Login from './Login.svelte'
    import Signup from './Signup.svelte'
    let login = false;
</script>
{#if login}
    <Login>
        <p class="already" on:click={() => login = false}>Not a user? Sign up</p>
    </Login>
{:else}
    <Signup>
        <p class="already" on:click={() => login = true}>Already a user? Log in</p>
    </Signup>
{/if}
<style>
    .already{
        cursor: pointer; 
        text-align: center
    }
    .already:hover {
		color: var(--green);
		text-decoration: underline;
	}
</style>