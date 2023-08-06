<script>
    import { enhance } from '$app/forms';
</script>

<div id="background">
<form method="POST" use:enhance action="?/login">
    <h1 style="text-align: center; letter-spacing: 0.05em">Log In</h1>
    <label>
        Email:
        <input
            name="email"
            type="email" class="material-symbols-outlined"
            required placeholder="&#xe158;"
        />
    </label>
    <label>
        Password:
        <input
            name="password"
            type="password" class="material-symbols-outlined"
            required placeholder="&#xe897;"
        />
    </label>
    <button class="bouncyButton">Log In</button>
    <slot />
</form>
</div>
<style>
    input:invalid {
		border: 1px solid red;
	}
    form {
		position: relative;
		display: flex;
		padding: 2em;
        max-width: 20em;
        margin: auto;
		flex-direction: column;
		color: white;
        height: 80vh;
		background-color: #ffffff;
		border-radius: 2em;
	}
    input{
        width: 90%;
        padding: 0.5em;
        margin-bottom: 0.5em;
    }
    #background{
        background-color: var(--dark-green);
        padding: 2em;
    }
</style>