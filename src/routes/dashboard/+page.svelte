<script>
    import Login from './Login.svelte'
    import Signup from './Signup.svelte'
    let login = false;
</script>
{#if login}
    <Login>
        <button type="button" on:click={() => login = true}>Not a user? Sign up</button>
    </Login>
{:else}
    <Signup>
        <button type="button" on:click={() => login = true}>Already a user? Log in</button>
    </Signup>
{/if}