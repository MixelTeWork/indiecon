<script>
	import Tickets from "./Tickets.svelte";
</script>

<h1 class="h1">Виды билетов</h1>
<h2 class="heading h3">Выбери подходящий</h2>
<Tickets />

<style>
	h1 {
		background-color: var(--theme-main-bg);
		color: var(--theme-main-text);
		transition: var(--theme-transition);
		height: 5em;
		text-align: center;
		display: flex;
		align-items: center;
		justify-content: center;
		text-transform: uppercase;
	}

	.heading {
		background-color: var(--theme-secondary-bg);
		color: var(--theme-secondary-text);
		transition: var(--theme-transition);
		text-align: center;
		text-transform: uppercase;
		padding: 0.5em 0;
	}
</style>
