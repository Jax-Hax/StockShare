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
		<button id="signupButton">Dashboard</button>
	</div>
</header>
<body>
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
    dialog{
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        padding: 3em;
        width: 80vw;
        height: 70vh;
    }
    .bouncyButton {
        background-color: var(--green);
        border: none;
        color: white;
        padding: 1em 2em;
        border-radius: 19px;
        text-align: center;
        text-decoration: none;
        cursor: pointer;
        display: inline-block;
        font-size: 1rem;
    }
    .bouncyButton:hover {
        background-color: white;
        box-shadow: 0 3px;
        color: var(--green);
        transform: translateY(-0.25em);
        transition: transform 0.25s;
        border-width: 1px;
        border-style: solid;
        margin: -1px;
    }
</style>
