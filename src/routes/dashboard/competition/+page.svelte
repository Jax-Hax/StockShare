<script>
    export let data;
    let starting_cash = data.currentParty[0].starting_cash
</script>
<header>
    <img src="/favicon.png" alt="the logo for StockShare" style="width: min(9vw,5em)" />
    <h1 id="nav-title">{currentParty.name}</h1>
    <button
        class="loginButton"
        on:click={() => {
            isLobby = true;
            form = null;
        }}>Back</button
    >
</header>
<section id="stockDash">
    <div id="yourStocks">
        <h1>Your Stocks</h1>
        <div id="stockTable">
            <p>Symbol</p>
            <p>Total</p>
            <p>Am. Invested</p>
            <p>Price</p>
            <p>Day's Gain %</p>
            <p>Day's Gain $</p>
            <p>Total Gain %</p>
            <p>Total Gain $</p>
            <p>Qty</p>
            <p>Price Paid</p>
            {#each data.stockData as stock}
                <p style="color: #266bff">{stock.symbol}</p>
                {#if stock.total < 0}
                    <p>-${stock.total * -1}</p>
                {:else}
                    <p>${stock.total}</p>
                {/if}
                <p>${stock.am_invested}</p>
                <p>${stock.price}</p>
                {#if stock.day_gain_percent < 0}
                    <p style="color: red">{stock.day_gain_percent}%</p>
                {:else}
                    <p style="color: var(--green)">{stock.day_gain_percent}%</p>
                {/if}
                {#if stock.day_gain_dollar < 0}
                    <p style="color: red">-${stock.day_gain_dollar * -1}</p>
                {:else}
                    <p style="color: var(--green)">${stock.day_gain_dollar}</p>
                {/if}
                {#if stock.total_gain_percent < 0}
                    <p style="color: red">{stock.total_gain_percent}%</p>
                {:else}
                    <p style="color: var(--green)">{stock.total_gain_percent}%</p>
                {/if}
                {#if stock.total_gain_dollar < 0}
                    <p style="color: red">-${stock.total_gain_dollar * -1}</p>
                {:else}
                    <p style="color: var(--green)">${stock.total_gain_dollar}</p>
                {/if}
                <p>{stock.quantity}</p>
                <p>${stock.price_when_invested}</p>
            {/each}
        </div>
    </div>
    <div id="leaderboard">
        <h1>Leaderboard</h1>
        {#each data.leaderboard as player, i}
            <div class="leaderboardChild">
                <p>{i + 1}. {player.name}</p>
                {#if player.money - starting_cash < 0}
                    <p style="color: red">-${(player.money - starting_cash) * -1}</p>
                {:else}
                    <p style="color: var(--green)">${player.money - starting_cash}</p>
                {/if}
            </div>
        {/each}
    </div>
</section>