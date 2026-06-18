<script>
	import Organizers from "./Organizers.svelte";
	import Contacts from "$lib/components/Contacts.svelte";
	import logo from "./logo.svg";
</script>

<div class="hero h1">
	<img src={logo} alt="DETERMINATION" />
</div>
<h1 class="heading h3">Организаторы</h1>

<p class="intro-text">
	За каждым проектом Determination стоит команда людей с разными навыками, интересами и опытом, объединенных общей идеей
	— создать уникальное и запоминающееся событие для сообщества. Ниже вы можете познакомиться с организаторами и
	участниками команды подробнее.
</p>

<Organizers />

<Contacts />

<style>
	.hero {
		height: 5em;
		background: linear-gradient(to right, #b5ff00 25%, #c11fe3 25% 50%, #ffec00 50% 75%, #020202 75%);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.hero img {
		max-width: 90%;
	}

	.heading {
		background-color: var(--theme-accent-bg);
		color: var(--theme-accent-text);
		transition: var(--theme-transition);
		text-align: center;
		text-transform: uppercase;
		padding: 0.5em 0;
	}

	.intro-text {
		max-width: 725px;
		margin: clamp(2.5rem, 1.1rem + 5.6vw, 6rem) auto;
		padding: 0 4em;
	}

	@media screen and (max-width: 900px) {
		.intro-text {
			text-align: center;
		}
	}
	@media screen and (max-width: 380px) {
		.intro-text {
			padding: 0 2em;
		}
	}
</style>
