<script>
	import { enhance } from '$app/forms';
	import Login from './Login.svelte';
	import Signup from './Signup.svelte';
	export let form;
	let showSignup = false
	let showLogin = false
</script>

<svelte:head>
	<title>StockShare - Practice Trading Stocks with Friends</title>
	<meta
		name="description"
		content="Learn about the stock market without risk. Invite your friends to a competition for free!"
	/>
</svelte:head>
<header>
	<img src="/favicon.png" alt="the logo for StockShare" style="width: min(9vw,5em)" />
	<h1 id="nav-title"><a href="/" style="text-decoration: none">StockShare</a></h1>
	<div>
		<button id="signupButton" on:click={() => showSignup = true}>Get Started</button>
		<button id="loginButton" on:click={() => showLogin = true}>Log In</button>
	</div>
</header>
<body>
	<section>
		{#if showSignup}
		<Signup {form} bind:showSignup bind:showLogin />
		{/if}
		{#if showLogin}
		<Login {form} bind:showSignup bind:showLogin />
		{/if}
	</section>
</body>

<style>
	header {
		display: flex;
		justify-content: space-between;
		padding: 0.5em;
		align-items: center;
	}
	header a {
		text-decoration: none;
		color: #555;
		transition: all 0.3s ease 0s;
	}
	header a:hover {
		color: var(--green);
		text-decoration: underline;
	}
	header button {
		padding: 0.75em 2em;
	}
	#loginButton {
		background-color: white;
		color: var(--green);
		cursor: pointer;
		margin: -1px;
		border: 1px solid var(--green);
	}
	#loginButton:hover {
		background-color: #2bcf57;
		color: white;
		transform: none;
		transition: none;
	}
	#signupButton {
		background-color: var(--green);
		color: white;
		cursor: pointer;
		border: none;
		margin-right: 0.51em;
	}
	#signupButton:hover {
		background-color: var(--dark-green);
		color: white;
	}
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
		background-color: #ffffff;
		border-radius: 2em;
	}
	input {
		width: 90%;
		padding: 0.5em;
		margin-bottom: 0.5em;
	}
	dialog {
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		padding: 3em;
		border: none;
		border-radius: 1em;
	}
	.already {
		cursor: pointer;
		text-align: center;
	}
	.already:hover {
		color: var(--green);
		text-decoration: underline;
	}
	input::placeholder {
		font-family: 'Material Symbols Outlined';
		font-weight: normal;
		font-style: normal;
		font-size: 24px; /* Preferred icon size */
		display: inline-block;
		line-height: 1;
		text-transform: none;
		letter-spacing: normal;
		word-wrap: normal;
		white-space: nowrap;
		direction: ltr;

		/* Support for all WebKit browsers. */
		-webkit-font-smoothing: antialiased;
		/* Support for Safari and Chrome. */
		text-rendering: optimizeLegibility;

		/* Support for Firefox. */
		-moz-osx-font-smoothing: grayscale;

		/* Support for IE. */
		font-feature-settings: 'liga';
	}
	.error {
		text-align: center;
		color: red;
	}
</style>
