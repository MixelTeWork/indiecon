<script>
	import Carousel from "$lib/components/Carousel.svelte";
	import Contacts from "$lib/components/Contacts.svelte";
	import Stripe from "$lib/components/Stripe.svelte";
	import Map from "./Map.svelte";
	// import TimeTable from "./TimeTable.svelte";
	import TimeTableSoon from "./TimeTableSoon.svelte";
</script>

<h1 class="h1">Информация</h1>
<h2 class="heading h3">Спец-гости</h2>

<Carousel />

<div class="stripe">
	<Stripe centerY large>Расписание</Stripe>
</div>

<!-- <TimeTable /> -->
<TimeTableSoon />

<Map />

<Contacts />

<style>
	h1 {
		background-color: var(--theme-accent-bg);
		color: var(--theme-accent-text);
		transition: var(--theme-transition);
		height: 5em;
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

	.stripe {
		position: relative;
		overflow: hidden;
		padding-top: 12em;
		padding-bottom: clamp(1.5rem, -2.5rem + 16vw, 11.5rem);
	}

	@media (max-width: 330px) {
		h1 {
			font-size: 2.25rem;
		}
	}
</style>
