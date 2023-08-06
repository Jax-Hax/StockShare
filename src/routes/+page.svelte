<script>
    let loginModal;
    let signupModal;
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
		<button style="transform: none; transition: none; box-shadow: none; margin-right: 0.5em">Get Started</button>
		<button id="alternateButton" on:click={loginModal.showModal()}>Log In</button>
	</div>
</header>
<body>
    <dialog bind:this={loginModal}>
        <div>this is a model</div>
        <button on:click={loginModal.close()}>Close</button>
    </dialog>
    <section>
        
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
    #alternateButton{
        background-color: white;
        color: var(--green);
        border-width: 1.5px;
        border-style: solid;
        margin: -1px;
    }
    #alternateButton:hover{
        background-color: var(--green);
        color: white;
        transform: none;
        transition: none;
    }
    dialog{
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
</style>
