<script lang="ts">
	import { invalidate } from '$app/navigation'
	import { onMount } from 'svelte'

	export let data

	let { supabase, session } = data
	$: ({ supabase, session } = data)

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth')
			}
		})

		return () => data.subscription.unsubscribe()
	})
</script>
<html lang="en">
	<style>
		:root {
			--green: #26b54c;
			--dark-green: #219c41;
		}
		* {
			margin: 0;
			padding: 0;
			font-family: 'Source Sans 3', sans-serif;
			color: black;
		}
		h1,
		h2 {
			font-family: 'Oswald', sans-serif;
		}
		h1 {
			font-size: 3.5rem;
			letter-spacing: -3px;
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
	<slot />
</html>
