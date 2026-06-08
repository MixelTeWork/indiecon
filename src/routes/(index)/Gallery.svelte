<script>
	import { resolve } from "$app/paths";
	import Button from "$lib/components/button/Button.svelte";
	import Stripe from "$lib/components/Stripe.svelte";

	const rows = [
		["/imgs/gallery/1.webp", "/imgs/gallery/2.webp", "/imgs/gallery/3.webp"],
		["/imgs/gallery/4.webp", "/imgs/gallery/5.webp", "/imgs/gallery/6.webp", "/imgs/gallery/7.webp"],
		["/imgs/gallery/8.webp", "/imgs/gallery/9.webp", "/imgs/gallery/10.webp"],
	];
</script>

<section>
	<div class="gallery">
		<div class="rows">
			{#each rows as row, i (i)}
				<div class="row">
					{#each row as src, i (i)}
						<img {src} alt="Фото" />
					{/each}
				</div>
			{/each}
		</div>
		<Stripe bottom="2.5rem">Билеты уже в продаже</Stripe>
	</div>
	<div class="content">
		<p>
			Получите доступ ко всем основным зонам мероприятия, лекциям, активностям и специальным событиям Индикона. Выберите
			подходящий формат участия и станьте частью пространства независимого цифрового творчества, игр и искусства.
		</p>
		<Button arrow href={resolve("/")}>К билетам</Button>
	</div>
</section>

<style>
	section {
		max-width: 1920px;
		margin: 0 auto;
	}
	.gallery {
		position: relative;
		overflow: hidden;
		padding-bottom: 1rem;

		view-timeline: --galleryTimeline y;
	}
	.rows {
		display: flex;
		flex-direction: column;
		clip-path: polygon(0 0, 100% 0, 100% 95%, 0 91%);
	}
	.row {
		display: flex;
		justify-content: center;

		animation: moveLeft linear both;
		animation-timeline: --galleryTimeline;
		animation-range: entry 0% exit 100%;
	}
	.row:nth-child(even) {
		animation-name: moveRight;
	}
	.row img {
		height: clamp(210px, 96px + 18vw, 360px);
		/* aspect-ratio: 1.78; */
		aspect-ratio: 1.85;
		object-fit: cover;
	}

	.content {
		max-width: calc(1200px + 2 * 3rem);
		margin: 5.3rem auto;
		padding: 0 3rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 2rem;
	}

	p {
		max-width: 600px;
	}

	@media screen and (max-width: 900px) {
		.content {
			flex-direction: column;
		}
		p {
			text-align: center;
		}
	}

	@keyframes moveLeft {
		from {
			transform: translateX(40px);
		}
		to {
			transform: translateX(-40px);
		}
	}
	@keyframes moveRight {
		from {
			transform: translateX(-40px);
		}
		to {
			transform: translateX(40px);
		}
	}
</style>
