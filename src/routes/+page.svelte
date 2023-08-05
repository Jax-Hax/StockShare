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
		<a href="/contact" style="padding-right: 0.5em"><button>Get Started</button></a>
		<a href="/contact"><button>Log In</button></a>
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
</style>
