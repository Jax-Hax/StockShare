<html lang="en">
	<style>
		:root {
			--green: #26b54c;
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
		button {
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
		button:hover {
			background-color: white;
			box-shadow: 0 3px;
			color: var(--green);
			transform: translateY(-0.25em);
			transition: transform 0.25s;
			border: -2px solid var(--green);
			border-width: 1px;
			border-style: solid;
			margin: -1px;
		}
		h1 {
			font-size: 3.5rem;
			letter-spacing: -3px;
		}
	</style>
<slot />
</html>
