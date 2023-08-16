<script>
    export let showSignup;
</script>
<div id="attention">
<div>
    <h1>StockShare - Simulated Stock Competitions</h1>
    <p>
        Invite your family and friends to a free stock competition, where you can invest fake money into stocks to learn about the market.
    </p>
    <button on:click={() => showSignup = true} class="bouncyButton"> Sign up </button>
</div>
<div>
    <img
        style="max-width: min(50vw,50em); max-height: 50%"
        src="favicon.png"
        alt="the stockshare logo"
    />
</div>
</div>
<style>
#attention {
    background: #232323;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10em 4vw;
    justify-content: space-between;
    color: white;
    gap: 1rem;
}
#attention h1 {
    font-size: max(4.5vw, 2.5em);
    color: white;
}
#attention p {
    color: white;
    font-size: 1.5rem;
    padding-bottom: 2em;
}
@media screen and (min-width: 1100px) {
    #attention h1 {
        width: 90%;
    }
    #attention {
        flex-flow: row nowrap;
    }
    #attention p {
        width: 90%;
    }
    #attention img {
        object-fit: contain;
    }
}
</style>