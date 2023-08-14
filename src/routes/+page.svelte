<script>
    import { enhance } from '$app/forms';
    /**
	 * @type {HTMLDialogElement}
	 */
    let loginModal;
    /**
	 * @type {HTMLDialogElement}
	 */
    let signupModal;
	export let form;
	if (form?.user){
		console.log("form submitted");
	}
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
	<button id="signupButton" on:click={signupModal.showModal()}>Get Started</button>
	<button id="loginButton" on:click={loginModal.showModal()}>Log In</button>
	</div>
</header>
<body>
    <section>
        <dialog bind:this={signupModal}>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<span class="material-symbols-outlined" style="cursor: pointer; padding:0.25em" on:click={signupModal.close()}>arrow_back</span>
			<form method="POST" use:enhance action="?/signup">
				<h1 style="text-align: center; letter-spacing: 0.05em">Sign up</h1>
				{#if form?.error}
					<p class="error">{form.error.message}</p>
				{/if}
				{#if form?.message}
					<p style="text-align: center">{form.message}</p>
				{:else}
				<label>
					Email:
					<input
						name="email"
						type="email"
						required placeholder="mail"
					/>
				</label>
				<label>
					Password:
					<input style="margin: 0"
						name="password"
						type="password"
						required placeholder="lock"
					/>
				</label>
				<p style="margin-bottom: 1em; color: #6a737c">Password should be at least 6 characters long.</p>
				<label>
					Confirm Password:
					<input
						name="confirmPassword"
						type="password"
						required placeholder="key"
					/>
				</label>
				<button class="bouncyButton">Sign up</button>
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
				<p class="already" on:click={() => {signupModal.close(); loginModal.showModal()}}>Already a user? Log in</p>
				{/if}
			</form>
		</dialog>
		<dialog bind:this={loginModal}>
			<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<span class="material-symbols-outlined" style="cursor: pointer; padding:0.25em" on:click={loginModal.close()}>arrow_back</span>
			<form method="POST" use:enhance action="?/login">
				
				<h1 style="text-align: center; letter-spacing: 0.05em">Log In</h1>
				{#if form?.error}
					<p class="error">{form.error}</p>
				{/if}
				<label>
					Email:
					<input
						name="email"
						type="email"
						required placeholder="mail"
					/>
				</label>
				<label>
					Password:
					<input
						name="password"
						type="password"
						required placeholder="lock"
					/>
				</label>
				<button class="bouncyButton">Log In</button>
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<p class="already" on:click={() => {loginModal.close(); signupModal.showModal()}}>Not a user? Sign up</p>
			</form>
		</dialog>
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
	#loginButton{
        background-color: white;
        color: var(--green);
        cursor: pointer;
        margin: -1px;
        border: 1px solid var(--green);
    }
    #loginButton:hover{
        background-color: #2bcf57;
        color: white;
        transform: none;
        transition: none;
    }
    #signupButton{
        background-color: var(--green);
        color: white;
        cursor: pointer;
        border: none;
        margin-right: 0.51em;
    }
    #signupButton:hover{
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
    input{
        width: 90%;
        padding: 0.5em;
        margin-bottom: 0.5em;
    }
	dialog{
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        padding: 3em;
		border: none;
		border-radius: 1em
    }
	.already{
        cursor: pointer; 
        text-align: center
    }
    .already:hover {
		color: var(--green);
		text-decoration: underline;
	}
	input::placeholder {
		font-family: 'Material Symbols Outlined';
		font-weight: normal;
		font-style: normal;
		font-size: 24px;  /* Preferred icon size */
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
	.error{
		text-align: center;
		color: red;
	}
</style>
