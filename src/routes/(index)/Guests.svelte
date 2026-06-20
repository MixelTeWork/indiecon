<script>
	import { resolve } from "$app/paths";
	import Button from "$lib/components/button/Button.svelte";
	import Carousel from "$lib/components/Carousel.svelte";
</script>

<section>
	<div>
		<h2 class="h2">Анонс спецгостей!</h2>
		<p>
			Наше мероприятие — это в первую очередь люди, увлечённые своим делом! Познакомьтесь с теми, с кем мы бок о бок
			проведём этот, как мы надеемся, запоминающийся ивент!
		</p>
	</div>
	<Button href={resolve("/info")} arrow size={0.9}>Спец гости</Button>
</section>

<Carousel />

<style>
	section {
		max-width: calc(1200px + 2 * 3rem);
		width: 100%;
		margin: 4rem auto;
		padding: 0 3rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 4rem;
	}
	div {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2em;
	}

	h2 {
		text-transform: uppercase;
	}

	@media screen and (max-width: 900px) {
		section {
			flex-direction: column;
		}
		h2 {
			text-align: center;
		}
	}
</style>
