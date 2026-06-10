<script>
	import Button from "$lib/components/button/Button.svelte";
	import Carousel from "$lib/components/Carousel.svelte";
	import Stripe from "$lib/components/Stripe.svelte";
	import tg from "$lib/assets/tg.svg";
	import vk from "$lib/assets/vk.svg";
	import Map from "./Map.svelte";
	import TimeTable from "./TimeTable.svelte";
</script>

<h1 class="h1">Информация</h1>
<h2 class="heading h3">Спец-гости</h2>

<Carousel />

<div class="stripe">
	<Stripe centerY large>Расписание</Stripe>
</div>

<TimeTable />

<Map />

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
	h1 {
		background-color: var(--theme-accent-bg);
		color: var(--theme-accent-text);
		transition: var(--theme-transition);
		padding: 2em 0;
		text-align: center;
		text-transform: uppercase;
	}

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

	.stripe {
		position: relative;
		overflow: hidden;
		padding-top: 12em;
		padding-bottom: clamp(1.5rem, -2.5rem + 16vw, 11.5rem);
	}

	.contacts {
		max-width: calc(1200px + 2 * 3rem);
		margin: clamp(2rem, -0.4rem + 9.6vw, 8rem) auto;
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
