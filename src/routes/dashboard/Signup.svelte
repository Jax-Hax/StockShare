<script>
    import { enhance } from '$app/forms';
</script>

<div id="background">
<form method="POST" use:enhance action="?/signup">
    <h1 style="text-align: center">Sign up</h1>
    <span class="material-symbols-outlined">
        person
    </span>
    <label>
        <input
            name="username"
            required placeholder="Username"
        />
    </label>
    <label>
        <input
            name="email"
            type="email"
            required placeholder="Email"
        />
    </label>
    <label>
        <input
            name="password"
            type="password"
            required placeholder="Password"
        />
    </label>
    <label>
        <input
            name="confirmPassword"
            type="password"
            required placeholder="Confirm Password"
        />
    </label>
    <button>Sign up</button>
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
        width: 95%;
        padding: 0.5em;
        margin: 1em 0;
    }
    #background{
        background-color: var(--green);
        padding: 2em;
    }
</style>