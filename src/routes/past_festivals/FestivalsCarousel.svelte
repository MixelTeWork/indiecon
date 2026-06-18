<script lang="ts">
	import { asset } from "$app/paths";
	import { fade } from "svelte/transition";

	const pastFestivals = [
		{
			id: 1,
			year: "2025",
			title: "ИНДИКОН RELOAD",
			subtitle: "(тут будет находиться логотип и различные узнаваемые элементы конкретного фестиваля)",
			imgs: [
				{
					image: "/imgs/past_fest/indiecon_reload.webp",
					imageAlt: "Групповое фото участников на сцене с плакатом Награждение",
				},
				{
					image: "/imgs/past_fest/hero_2025.webp",
					imageAlt: "Групповое фото участников на сцене с плакатом Награждение",
				},
			],
			review: {
				text: "“Лучший фест среди всех что я посещал. Спасибо что продолжаете торжество. Именно здесь каждый может продемонстрировать свою любовь к инди играм‚ анимации‚ музыке‚ косплею.”",
				author: "Владимир Варламов",
			},
		},
		{
			id: 2,
			year: "2025",
			title: "ИНДИКОН RELOAD",
			subtitle: "(тут будет находиться логотип и различные узнаваемые элементы конкретного фестиваля)",
			imgs: [
				{
					image: "/imgs/past_fest/hero_2025.webp",
					imageAlt: "Групповое фото участников на сцене с плакатом Награждение",
				},
			],
			review: {
				text: "“Лучший фест среди всех что я посещал. Спасибо что продолжаете торжество. Именно здесь каждый может продемонстрировать свою любовь к инди играм‚ анимации‚ музыке‚ косплею.”",
				author: "Владимир Варламов",
			},
		},
	];

	let festI = $state(0);
	const fest = $derived(pastFestivals[festI]);
	let imgI = $state(0);
	const img = $derived(fest.imgs[imgI]);

	function nextSlide() {
		festI = (festI + 1) % pastFestivals.length;
		imgI = 0;
	}

	function prevSlide() {
		festI = (festI - 1 + pastFestivals.length) % pastFestivals.length;
		imgI = 0;
	}

	function nextReview() {
		imgI = (imgI + 1) % fest.imgs.length;
	}
	function prevReview() {
		imgI = (imgI - 1 + fest.imgs.length) % fest.imgs.length;
	}
</script>

<section>
	{#key festI}
		<div transition:fade={{ duration: 200 }}>
			<div class="controls">
				<button class="btn" onclick={prevSlide} aria-label="Предыдущий фестиваль">
					{@render arrow()}
				</button>

				<div class="controls__body festival-info">
					<span class="year">{fest.year}</span>
					<h3 class="title h1">{fest.title}</h3>
					<p class="subtitle h4">{fest.subtitle}</p>
				</div>

				<button class="btn" onclick={nextSlide} aria-label="Следующий фестиваль">
					{@render arrow(true)}
				</button>
			</div>

			<div class="image">
				<div class="controls">
					<button class="btn" onclick={nextReview} aria-label="Предыдущее изображение">
						{@render arrow()}
					</button>

					<div></div>

					<button class="btn" onclick={prevReview} aria-label="Следующее изображение">
						{@render arrow(true)}
					</button>
				</div>
				{#key imgI}
					<img src={asset(img.image)} alt={img.imageAlt} loading="lazy" transition:fade={{ duration: 200 }} />
				{/key}
			</div>

			<div class="review h4">
				<span>Отзыв:</span>
				<blockquote class="review__text">{fest.review.text}</blockquote>
				<cite class="review__author">{fest.review.author}</cite>
			</div>
		</div>
	{/key}
</section>

{#snippet arrow(flip = false)}
	<svg width="55" height="82" viewBox="0 0 55 82" fill="none" xmlns="http://www.w3.org/2000/svg" class={{ flip }}>
		<path d="M53.3689 1.18555L2.3689 39.4886L50.0071 80.1855" stroke="currentColor" stroke-width="3" />
	</svg>
{/snippet}


<style>
	section {
		display: grid;
		grid-template-areas: "el";
		max-width: 1920px;
		margin: 0 auto;
		margin-bottom: clamp(10rem, -3.5rem + 36vw, 28rem);
	}
	section > * {
		grid-area: el;
	}

	.controls {
		max-width: 1700px;
		margin: clamp(5rem, 1.7rem + 13.2vw, 13.25rem) auto;
		padding: 0 1.1rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.5rem;
	}
	.controls > :nth-child(2) {
		flex-grow: 1;
	}

	.festival-info {
		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2.5em;
	}
	.year {
		font-weight: 900;
		font-size: clamp(1.125rem, -0.225rem + 5.4vw, 4.5rem);
	}
	.title {
		text-transform: uppercase;
	}
	.subtitle {
		max-width: 1200px;
	}

	.btn {
		padding: 0.5rem;
		flex-shrink: 0;
		transition: transform 100ms;
	}
	@media (pointer: fine) {
		.btn:hover {
			transform: scale(1.1);
		}
	}
	.btn svg {
		width: clamp(1.5rem, 0.8rem + 2.8vw, 3.25rem);
	}
	svg.flip {
		transform: scaleX(-1);
	}

	.image {
		position: relative;
		width: 100%;
		height: clamp(28rem, 19rem + 35vw, 50rem);
	}
	.image .controls {
		height: 100%;
	}
	.image .controls button {
		-webkit-tap-highlight-color: transparent;
	}
	.image .controls svg {
		width: clamp(2.5rem, 0.8rem + 2.8vw, 3.25rem);
		filter: drop-shadow(0 0 10px white) drop-shadow(0 0 3px white) drop-shadow(0 0 3px white);
	}
	.image .controls path {
		stroke: black;
	}
	.image img {
		position: absolute;
		top: 0;
		z-index: -1;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.review {
		margin: clamp(5rem, 1.7rem + 13.2vw, 13.25rem) auto;
		max-width: calc(1200px + 2 * 1.5rem);
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

	@media screen and (max-width: 380px) {
		.controls {
			padding: 0;
			gap: 0;
		}
	}
</style>
