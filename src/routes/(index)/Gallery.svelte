<script>
	import { resolve } from "$app/paths";
	import Button from "$lib/components/button/Button.svelte";

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
		<h2 class="stripe h3">Билеты уже в продаже</h2>
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
	}
	.rows {
		display: flex;
		flex-direction: column;
		clip-path: polygon(0 0, 100% 0, 100% 95%, 0 91%);
	}
	.row {
		display: flex;
		justify-content: center;
	}
	.row img {
		height: clamp(210px, 96px + 18vw, 360px);
		aspect-ratio: 1.78;
		object-fit: cover;
	}

	.stripe {
		position: absolute;
		bottom: 2.5rem;
		width: 120%;
		background-color: var(--theme-accent-bg);
		color: var(--theme-accent-text);
		padding: min(0.75em, 2rem);
		padding-left: calc(min(0.75em, 2rem) + 0.5em);
		text-transform: uppercase;
		text-align: center;
		transition: var(--theme-transition);
		transform: translateX(-10%) rotate(2.42deg);
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
</style>
