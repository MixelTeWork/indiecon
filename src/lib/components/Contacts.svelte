<script lang="ts">
	import Button from "$lib/components/button/Button.svelte";
	import tg from "$lib/assets/tg.svg";
	import vk from "$lib/assets/vk.svg";

	const { hideVK = false, altText = false }: { hideVK?: boolean; altText?: boolean } = $props();
</script>

<h2 class="heading h3">Ссылки на соц сети</h2>

<div class="contacts">
	<div class="contacts__text">
		{#if altText}
			<p class="h4">Поближе с нами вы можете познакомиться в соцсетях нашей команды организации</p>
		{:else}
			<h3 class="h2">Контакты</h3>
			<p>
				Если хотите подробнее узнать о том, что будет на нашем мероприятии, а также поучаствовать в наших розыгрышах и
				активностях — скорее переходите в наши соцсети!
			</p>
		{/if}
	</div>
	<div class="contacts__btns">
		<Button href={altText ? "https://t.me/determevent" : "https://t.me/indiecon_msk"} small target="_blank"><img src={tg} alt="Telegram" /></Button>
		{#if !hideVK}
			<Button href="https://vk.com/indiecon" small target="_blank"><img src={vk} alt="ВКонтакте" /></Button>
		{/if}
	</div>
</div>

<style>
	.heading {
		background-color: var(--theme-secondary-bg);
		color: var(--theme-secondary-text);
		transition: var(--theme-transition);
		text-align: center;
		text-transform: uppercase;
		padding: 0.5em 0;
	}

	h3 {
		text-transform: uppercase;
	}

	.contacts {
		max-width: calc(1200px + 2 * 3rem);
		margin: clamp(4rem, 1.6rem + 9.6vw, 10rem) auto;
		margin-bottom: clamp(10rem, -3.5rem + 36vw, 28rem);
		padding: 0 3rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 2rem;
	}
	.contacts__text {
		display: flex;
		flex-direction: column;
		gap: 2em;
	}
	.contacts p {
		max-width: 710px;
	}

	.contacts__btns {
		flex-shrink: 0;
		display: flex;
		gap: 2em;
	}
	.contacts__btns img {
		height: 1.4em;
	}

	@media screen and (max-width: 900px) {
		.contacts {
			flex-direction: column;
			gap: 4em;
		}
		.contacts {
			/* text-align: center; */
		}
	}
</style>
