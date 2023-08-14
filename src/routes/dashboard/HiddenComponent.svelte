<script>
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    function enable() {
        dispatch('enable');
    }
</script>
<div id="hidden">
    <span id="expand" on:click={enable} class="material-symbols-outlined">add</span>
</div>
<style>
    #hidden{
        background-color: #1e1e1e; 
        padding: 2em;
        margin: 2em;
        border-radius: 3em;
        cursor: pointer;
    }
    #expand{
        color: white;
        font-size: 35px;
        user-select: none;
    }
</style>