<script>
	import Tickets from "./Tickets.svelte";
</script>

<h1 class="h1">Виды билетов</h1>
<h2 class="heading h3">Выбери подходящий</h2>
<div class="text">
	<p class="">Продажа билетов осуществляется в группе в ВК или телеграмм канале</p>
</div>
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

	.text {
		padding: clamp(2.5rem, 1.1rem + 5.6vw, 6rem) 4em 0 4em;
		background-color: var(--theme-accent-bg);
		color: var(--theme-accent-text);
		transition: var(--theme-transition);
	}
	.text p {
		font-size: clamp(1.375rem, 1.025rem + 1.4vw, 2.25rem);
		max-width: 725px;
		margin: auto;
		text-align: center;
	}
</style>
