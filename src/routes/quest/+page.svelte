<script lang="ts">
	import { getTitle } from "$lib/utils/getTtile";
</script>

<svelte:head>
	<title>{getTitle("Голосование")}</title>
</svelte:head>

<section class="borderedCard">
	<div class="introBox">
		<h1>Голосование</h1>
		<p>Время прошло...</p>
	</div>
</section>

<style>
	section {
		margin: 1em;
		padding: 1em;
		height: calc(100dvh - var(--header-height) - 3em);
		display: flex;
		overflow: hidden;
		position: relative;
	}

	.introBox {
		position: absolute;
		inset: 0;
		padding: 1em;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
		gap: 1rem;
	}
	h1 {
		font-size: 2rem;
		font-weight: 600;
		text-transform: uppercase;
	}
</style>
