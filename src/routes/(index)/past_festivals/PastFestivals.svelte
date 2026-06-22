<script>
	import { asset, resolve } from "$app/paths";
	import Button from "$lib/components/button/Button.svelte";
	import confetti from "./confetti.svg";
	import confetti2 from "./confetti2.svg";

	const confetti_url = `url("${confetti}")`;
	const confetti2_url = `url("${confetti2}")`;
</script>

<section>
	<h2 class="h3 title">Прошедшие фестивали</h2>

	<div class="hero">
		<!-- <span class="date h4">12.08.2025</span> -->
		<img src={asset("/imgs/past_fest/hero_2025.webp")} alt="Четыре улыбающихся молодых человека с бейджами на шее стоят в обнимку на сцене на тёмном фоне" loading="lazy" />
	</div>

	<div class="review h4">
		<p>Отзыв:</p>
		<blockquote class="review__text">
			“ЙООО ЧУВАКИ ЭТО БЫЛО МОЩНО, СПАСИБО!! Куча фендомов в одной огромной тусовке, впечатлений и эмоций просто море,
			ОТДЕЛЬНОЕ СПАСИБО 3 ЛЮДЯМ, ЧТО УГАДАЛИ ПЕРСОНАЖА Я ВАС ЛЮБЛЮ ХВАХВХВХ”
		</blockquote>
		<p class="review__author">Kido Skullcat</p>
	</div>

	<div class="promo" style:--bg1={confetti_url} style:--bg2={confetti2_url}>
		<div class="promo__inner">
			<div>
				<h3 class="h2 promo__title">Прошедшие фестивали</h3>
				<p class="promo__text">
					Мы проводим мероприятия далеко не в первый раз, но с каждым разом всё больше растём и развиваемся! Про наши
					предыдущие ивенты вы можете узнать в соответствующем разделе!
				</p>
			</div>
			<div class="promo__action">
				<Button href={resolve("/past_festivals")} arrow white_arrow size={0.85}>КАК ЭТО БЫЛО</Button>
			</div>
		</div>
	</div>
</section>

<style>
	section {
		max-width: 1920px;
		width: 100%;
		margin: 10rem auto 0 auto;
		display: flex;
		flex-direction: column;
	}

	.title {
		background-color: var(--theme-secondary-bg);
		color: var(--theme-secondary-text);
		transition: var(--theme-transition);
		text-align: center;
		text-transform: uppercase;
		padding: 0.5em 0;
	}

	.hero {
		position: relative;
		width: 100%;
		height: clamp(20rem, 11rem + 37vw, 43rem);
		overflow: hidden;
	}

	.date {
		position: absolute;
		top: clamp(1.5rem, 0.1rem + 5.6vw, 5rem);
		left: clamp(1.5rem, 0.1rem + 5.6vw, 5rem);
		color: #fff;
		z-index: 2;
	}

	.hero img {
		width: 100%;
		height: 120%;
		display: block;
		object-fit: cover;
		transform: translateY(-8.3%);
	}

	.review {
		max-width: calc(1200px + 2 * 1.5rem);
		margin: clamp(2rem, -0.4rem + 9.6vw, 8rem) auto;
		padding: 0 1.5rem;
		display: flex;
		flex-direction: column;
	}

	.review__text {
		font-size: 1.3em;
		font-weight: 600;
		margin-top: 1.5em;
		margin-bottom: 3.5em;
	}

	.review__author {
		align-self: flex-end;
	}

	.promo {
		background-color: var(--theme-primary-bg);
		background-image: var(--bg1);
		background-repeat: no-repeat;
		background-position: center;
		background-size: cover;
		color: var(--theme-primary-text);
		padding: clamp(2.5rem, -0.4rem + 10vw, 9rem) 0;
	}

	.promo__inner {
		max-width: calc(1200px + 2 * 3rem);
		margin: 0 auto;
		padding: 0 3rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 4rem;
	}

	.promo__title {
		margin-bottom: 0.95em;
		text-transform: uppercase;
	}

	.promo__text {
		max-width: 680px;
		font-weight: 700;
	}

	.promo__action {
		flex-shrink: 0;
		margin-block: 3rem;
	}

	@media screen and (max-width: 900px) {
		.promo__inner {
			flex-direction: column;
		}

		.promo {
			background-image: var(--bg2);
		}
	}
</style>
