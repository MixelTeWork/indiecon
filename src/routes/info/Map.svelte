<script>
	import map_first_floor from "./map/map_first_floor.webp";
	import map_second_floor from "./map/map_second_floor.webp";
	import map_game_zone from "./map/map_game_zone.webp";
	import map_market from "./map/map_market.webp";
	import { fade } from "svelte/transition";

	const maps = [
		{ src: map_first_floor, name: "Первый этаж" },
		{ src: map_second_floor, name: "Второй этаж" },
		{ src: map_game_zone, name: "Игровая зана" },
		{ src: map_market, name: "Маркет" },
	];
	let selectedMapI = $state(0);
	const selectedMap = $derived(maps[selectedMapI]);
</script>

<section>
	{#key selectedMapI}
		<div class="map" transition:fade>
			<img src={selectedMap.src} alt={`Карта - ${selectedMap.name}`} />
		</div>
	{/key}
	<div class="btns">
		{#each maps as map, i (i)}
			<button
				class={["borderedCard", selectedMapI == i && "btn_current"]}
				onclick={() => {
					selectedMapI = i;
				}}>{map.name}</button
			>
		{/each}
	</div>
</section>

<style>
	section {
		--_height: max(85vh, 400px);
		height: var(--_height);
		margin-top: clamp(4rem, 0.6rem + 13.6vw, 12.5rem);
		background-color: var(--theme-accent-bg);
		color: var(--theme-accent-text);
		display: grid;
		grid-template-rows: auto auto;
		align-items: center;
		justify-content: center;
		clip-path: polygon(0 clamp(0px, -32px + 8vw, 64px), 100% 0, 100% 100%, 0 100%);
		overflow: hidden;
	}
	.map {
		grid-column: 1;
		grid-row: 1;
		margin-top: clamp(0px, -32px + 8vw, 64px);
		max-width: 1200px;
		max-height: calc(var(--_height) - 14rem);
		display: grid;
	}
	.map img {
		object-fit: contain;
		width: 100%;
		min-height: 0;
		max-height: 100%;
	}
	.btns {
		margin-top: 1rem;
		margin-bottom: 3rem;
		display: flex;
		gap: 1em;
		flex-wrap: wrap;
		justify-content: center;
	}
	.btns button {
		--bbm: 1;
		background-color: var(--theme-secondary-bg);
		color: var(--theme-secondary-text);
		transition: var(--theme-transition);
		padding: 0.5em 1em;
	}
	.btn_current {
		text-decoration: underline;
	}
</style>
