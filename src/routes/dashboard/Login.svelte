<script>
    import { enhance } from '$app/forms';
</script>
<h1>Log In</h1>
<form method="POST" use:enhance action="?/signup">
    <label>
        Username: 
        <input
            name="username"
            required
        />
    </label>
    <label>
        Email Address:
        <input
            name="email"
            type="email"
            required
        />
    </label>
    <label>
        Password:
        <input
            name="password"
            type="password"
            required
        />
    </label>
    <label>
        Password:
        <input
            name="confirmPassword"
            type="password"
            required
        />
    </label>
    <button>Submit</button>
</form>
<style>
    input:invalid {
		border: 1px solid red;
	}
    form {
		position: relative;
		display: flex;
		padding: 2em;
		flex-direction: column;
		color: white;
		background-color: #ffffff;
		border-radius: 2em;
	}
    input{
        width: 95%;
        padding: 0.5em;
    }
</style>