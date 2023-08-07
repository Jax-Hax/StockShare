<script>
    import Login from './Login.svelte'
    import Signup from './Signup.svelte'
    let login = false;
    export let form;
    if(form){
        console.log(form.user);
    }
</script>
{#if login}
    <Login>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
        <p class="already" on:click={() => login = false}>Not a user? Sign up</p>
    </Login>
{:else}
    <Signup>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
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