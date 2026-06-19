<script>
	import FestivalsCarousel from "./FestivalsCarousel.svelte";
</script>

<h1 class="h1">Прошедшие<br />фестивали</h1>

<section>
	<div class="hero">
		<h2 class="h2">А какие<br />фестивали были?</h2>
		<p>
			Первый Индикон прошёл в 2023 году. С тех пор мы сильно выросли не только в масштабах, но и в плане организации. Мы
			честно признаём, что далеко не всё в наших фестивалях было реализовано на необходимом уровне, но каждый год мы
			стараемся учиться на ошибках и создавать всё более качественные и интересные события!
		</p>
	</div>
</section>

<FestivalsCarousel />

<style>
	h1 {
		background-color: var(--theme-accent-bg);
		color: var(--theme-accent-text);
		transition: var(--theme-transition);
		height: 5em;
		text-align: center;
		display: flex;
		align-items: center;
		justify-content: center;
		text-transform: uppercase;
	}

	section {
		background-color: var(--theme-secondary-bg);
		color: var(--theme-secondary-text);
		transition: var(--theme-transition);
	}

	.hero {
		max-width: calc(1200px + 8em);
		margin: 0 auto;
		padding: clamp(2.5rem, 1.1rem + 5.6vw, 6rem) 4em;
		display: flex;
		flex-direction: column;
		gap: 4em;
	}
	.hero h2 {
		text-transform: uppercase;
	}
	.hero p {
		max-width: 680px;
		font-weight: 700;
	}

	@media screen and (max-width: 900px) {
		section {
			background-color: var(--theme-main-bg);
			color: var(--theme-main-text);
			text-align: center;
		}
		.hero p {
			font-weight: inherit;
		}
	}
</style>
