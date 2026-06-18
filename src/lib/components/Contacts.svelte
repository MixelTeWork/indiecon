<script>
	import Button from "$lib/components/button/Button.svelte";
	import tg from "$lib/assets/tg.svg";
	import vk from "$lib/assets/vk.svg";
</script>

<h2 class="heading h3">Ссылки на соц сети</h2>

<div class="contacts">
	<div class="contacts__text">
		<h3 class="h2">Контакты</h3>
		<p>
			Познакомьтесь со специальными гостями — разработчиками, художниками, музыкантами, аниматорами и представителями
			независимой цифровой сцены. Узнайте больше об участниках, их проектах и активности в рамках мероприятия.
		</p>
	</div>
	<div class="contacts__btns">
		<Button href="https://example.com" small target="_blank"><img src={tg} alt="Telegram" /></Button>
		<Button href="https://example.com" small target="_blank"><img src={vk} alt="ВКонтакте" /></Button>
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
			text-align: center;
		}
	}
</style>
