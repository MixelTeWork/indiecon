<script lang="ts">
	import { getTitle } from "$lib/utils/getTtile";
</script>

<svelte:head>
	<title>{getTitle("Голосование")}</title>
</svelte:head>

<section>
	<h1 class="h2">Голосование</h1>
	<p>Чтобы определить лучшую инди игру приходите на главную сцену в 17:00</p>
</section>

<style>
	section {
		margin-bottom: clamp(10rem, -3.5rem + 36vw, 28rem);
		background-color: var(--theme-main-bg);
		color: var(--theme-main-text);
		transition: var(--theme-transition);
		height: calc(100dvh - var(--header-height) - 3em);
		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	h1 {
		text-transform: uppercase;
	}
</style>
