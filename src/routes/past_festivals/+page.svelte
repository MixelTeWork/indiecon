<script>
	import FestivalsCarousel from "./FestivalsCarousel.svelte";
</script>

<h1 class="h1">Прошедшие<br />фестивали</h1>

<section>
	<div class="hero">
		<h2 class="h2">А какие<br />фестивали были?</h2>
		<p>
			+ Огромные благодарности с главной сцены на открытии * Вход на мероприятие * Набор мерча (открытка перевёртыш,
			стикерпак, значок побольше, плакат, брелок, блокнот, стенд, стикерпак вип, резиновый браслет, Значок Биг Биг,
			кружка, шоппер, фигурка, ланьярд с бейджиком, набор сладостей) + (Термос, футболка, носки, шарф от бабушки
			организатора) * Ранний вход * Участие в автограф сессиях * Вип зона * Вип турниры * Контент для спонсоров на сцене
			+ Главный организатор на открытии зачитает любое написанное вами предложение (в рамках регламента)
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
