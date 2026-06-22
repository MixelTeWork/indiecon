<script lang="ts">
	import { asset } from "$app/paths";
	import { fade } from "svelte/transition";

	const items: {
		id: number;
		title: string;
		img: string;
		alt: string;
		text: string;
	}[] = [
		// {
		// 	id: 1,
		// 	title: "",
		// 	img: asset("/imgs/guests/"),
		// 	alt: "",
		// 	text: "",
		// },
		...new Array(12)
			.fill(0)
			.map((_, i) => ({
				id: i + 1,
				title: "",
				img: "",
				alt: "",
				text: "",
			})),
	].map((item, i) => ({
		...item,
		title: "???",
		text: "Скоро тут появится кто-то очень крутой. Хом-ном",
		img: asset(`/imgs/guests/guest_placeholder_${Math.floor(Math.abs(Math.sin(i * 9301 + 49297 + 4)) * 3) + 1}.webp`),
		alt: "Хомяк скрывающий гостя",
	}));

	let pageWidth = $state(0);

	let cols = $derived(pageWidth > 1400 ? 3 : pageWidth > 900 ? 2 : 1);
	let rows = $derived(pageWidth > 900 ? 2 : 1);

	const itemsPerPage = $derived(cols * rows);

	const totalPages = $derived(Math.ceil(items.length / itemsPerPage));

	let currentPage = $derived(totalPages && 0);
	let visibleItems = $derived(items.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage));

	function switchPage(d: number) {
		currentPage = (currentPage + d + totalPages) % totalPages;
	}
</script>

<svelte:window bind:innerWidth={pageWidth} />

<section>
	<div class="carousel">
		<button class="btn" onclick={() => switchPage(-1)} aria-label="Предыдущая страница">
			{@render arrow()}
		</button>

		<div
			class={["grid", cols == 2 && "col2", cols == 1 && "col1"]}
			style:grid-template-columns="repeat({cols}, 1fr)"
			style:grid-auto-rows="repeat(2, 1fr)"
		>
			{#each visibleItems as item, i (item.id)}
				<div class="card" transition:fade style:grid-column={(i % cols) + 1} style:grid-row={Math.floor(i / cols) + 1}>
					<div class="card__image">
						<img src={item.img} alt={item.alt} loading="lazy" />
					</div>
					<h3 class="card__title">{item.title}</h3>
					<div class="card__text">
						{@render renderText(item.text)}
					</div>
				</div>
			{/each}
		</div>

		<button class="btn" onclick={() => switchPage(1)} aria-label="Следующая страница">
			{@render arrow(true)}
		</button>
	</div>
	{#if cols == 1}
		<div class="description">
			{#key currentPage}
				<div class="description__text" transition:fade>
					{@render renderText(visibleItems[0].text)}
				</div>
			{/key}
		</div>
	{/if}
</section>

{#snippet arrow(flip = false)}
	<svg width="55" height="82" viewBox="0 0 55 82" fill="none" xmlns="http://www.w3.org/2000/svg" class={{ flip }}>
		<path d="M53.3689 1.18555L2.3689 39.4886L50.0071 80.1855" stroke="currentColor" stroke-width="3" />
	</svg>
{/snippet}

{#snippet renderText(text: string)}
	{#each text.split("\n") as line, i (i)}
		{#if line.trim() == ""}
			<br />
		{:else}
			<p>
				{#each line.split(/(\[[^\]]+\]\([^)]+\))/g) as chunk, i (i)}
					{@const match = chunk.match(/^\[([^\]]+)\]\(([^)]+)\)$/)}
					{#if match}
						<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
						<a href={match[2]} target="_blank" rel="noopener noreferrer" class="link">
							{match[1]}
						</a>
					{:else}
						{chunk}
					{/if}
				{/each}
			</p>
		{/if}
	{/each}
{/snippet}

<style>
	section {
		max-width: 1920px;
		margin: 6rem auto;
		padding: 0 1.1rem;
	}
	.carousel {
		font-size: clamp(1rem, 0.525rem + 1.9vw, 2.1875rem);
		display: flex;
		align-items: center;
		justify-content: space-around;
		gap: 1.1rem;
	}

	.description {
		display: grid;
		margin-top: 3rem;
		padding: 0 2rem;
		justify-content: center;
	}

	.description__text {
		grid-area: 1/1;
		max-width: 24em;
		/* text-align: center; */
	}

	.link {
		text-decoration: underline;
	}

	.grid {
		max-width: 1200px;
		display: grid;
		justify-items: center;
		gap: 1.4em;
		flex-grow: 1;
	}
	.grid.col2 {
		gap: 1.4em 0;
	}

	.card {
		position: relative;
		--bw: clamp(2px, 1.2px + 0.2vw, 4px);
		--p: clamp(0.8125rem, 0.5875rem + 0.9vw, 1.375rem);
		--sep: clamp(2rem, 1.3rem + 2.8vw, 3.75rem);
		width: 100%;
		max-width: 12em;
		border: var(--bw) solid currentColor;
		padding: var(--p);
		padding-bottom: var(--sep);
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--sep);
		transition: var(--theme-transition);
	}

	.card__image {
		width: 100%;
		aspect-ratio: 1.09;
		border: var(--bw) solid currentColor;
		overflow: hidden;
		transition: var(--theme-transition);
	}

	.card__image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.card__title {
		margin-block: auto;
		font-weight: 600;
		text-align: center;
		text-transform: uppercase;
		overflow-wrap: anywhere;
	}

	.card__text {
		position: absolute;
		opacity: 0;
		pointer-events: none;
		inset: 0;
		padding: var(--p);
		font-size: 0.4em;
		font-weight: 700;
		background-color: var(--theme-main-bg);
		color: var(--theme-main-text);
		transition:
			var(--theme-transition),
			opacity 250ms;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	.col2 .card__text {
		font-size: 0.45em;
	}
	.grid:not(.col1) .card:hover .card__text {
		opacity: 1;
		pointer-events: auto;
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
		width: 1.45em;
	}
	svg.flip {
		transform: scaleX(-1);
	}
</style>
