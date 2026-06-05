<script>
	import { resolve } from "$app/paths";
	import Button from "$lib/components/button/Button.svelte";

	import back from "./back.svg";
	import logo from "./logo.svg";
	import tg from "./tg.svg";
	import vk from "./vk.svg";
	import controller from "./controller.svg";
	import joystick from "./joystick.svg";
	import quest from "./quest.svg";
	import wire1 from "./wire1.svg";
	import wire2 from "./wire2.svg";
</script>

<section>
	<img class="back" src={back} alt="" />
	<div class="hero-container">
		<div class="hero">
			<img class="wire1" src={wire1} alt="" />
			<img class="wire2" src={wire2} alt="" />
			<img class="joystick" src={joystick} alt="" />
			<img class="controller" src={controller} alt="" />
			<img class="logo" src={logo} alt="Логотип Индикон" />
			<img class="quest" src={quest} alt="Квест" />
		</div>
	</div>
	<div class="container">
		<div class="row">
			<div class="column content-about">
				<h1 class="h2 blueTitle">ИНДИКОН</h1>
				<p class="blueX">
					— это место встречи инди-разработчиков, художников, аниматоров, музыкантов и всех, кто делает проекты своими
					руками.
				</p>
				<p class="blue">
					Такое мероприятие не про скучные доклады и формальные разговоры. Это живое общение, эмоции, шутки и моменты,
					которые хочется запомнить. Мы за атмосферу, где легко подойти к незнакомому человеку и начать разговор — про
					игру, музыку, идею или жизнь.
				</p>
			</div>
			<Button href={resolve("/")} arrow white_arrow class="btn-info">Информация</Button>
		</div>
		<div class="sep lg-hide"></div>
		<div class="row">
			<div class="column content-details">
				<p class="date">2026 г. <br /> 15 августа</p>
				<p>
					Москва, <br class="lg-hide" /> Шарикоподшипниковская ул., <br class="lg-hide" /> 13, стр. 33
				</p>
			</div>
			<div class="social-links">
				<Button href={resolve("/")} small><img src={tg} alt="Telegram" /></Button>
				<Button href={resolve("/")} small><img src={vk} alt="ВКонтакте" /></Button>
			</div>
		</div>
	</div>
</section>

<style>
	section {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		overflow: hidden;
		padding-bottom: 5rem;
		--s: clamp(0.5, calc(1vh / 1vw), 2);
		--sn: calc((var(--s) - 0.5) / 1.5);
	}
	.back {
		position: absolute;
		top: calc(-40vh + var(--sn) * 30vh);
		left: 50%;
		height: calc(190vh + var(--sn) * -90vh);
		max-width: none;
		transform: translateX(-50%);
		z-index: -1;
	}

	.hero-container {
		height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		max-width: 2000px;
	}
	.hero {
		position: relative;
		left: calc(-6vh + var(--sn) * 6vh);
		top: calc(-4.7vh + var(--sn) * -10vh);
	}
	.hero > img {
		position: absolute;
		max-width: none;
	}
	.logo {
		height: calc(45vh + var(--sn) * -22vh);
		transform: translate(-50%, -50%);
	}
	.quest {
		height: calc(30vh + var(--sn) * -15vh);
		top: calc(-31vh + var(--sn) * 10vh);
		left: calc(18vh + var(--sn) * -15vh);
	}
	@media screen and (max-aspect-ratio: 1) {
		.quest {
			display: none;
		}
	}
	.joystick {
		height: calc(15.8vh + var(--sn) * -6vh);
		top: calc(-37vh + var(--sn) * 9vh);
		left: calc(-50vh + var(--sn) * 28.8vh);
	}
	.wire2 {
		height: calc(27.7vh + var(--sn) * -12vh);
		top: calc(-36vh + var(--sn) * 13vh);
		left: calc(-39.3vh + var(--sn) * 20vh);
		rotate: calc(var(--sn) * var(--sn) * 20deg);
		scale: calc(1 + var(--sn) * -0.25) calc(1 + var(--sn) * 0.5);
	}
	.controller {
		height: calc(11.6vh + var(--sn) * -5vh);
		top: calc(30vh + var(--sn) * -9vh);
		left: calc(50.8vh + var(--sn) * -45.8vh);
	}
	.wire1 {
		top: calc(16vh + var(--sn) * -5vh);
		left: calc(7vh + var(--sn) * -15vh);
		height: calc(15.5vh + var(--sn) * -9vh);
		rotate: calc(var(--sn) * 30deg);
	}

	.container {
		max-width: calc(1200px + 2 * 3rem);
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 15rem;
		padding: 0 3rem;
	}
	.sep {
		align-self: center;
		width: 6rem;
		height: 1px;
		background: currentColor;
	}
	.row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 2rem;
	}
	.column {
		max-width: 600px;
	}
	h1 {
		margin-bottom: 2.25rem;
	}
	p {
		font-weight: 700;
	}

	.content-about {
		color: var(--color-white);
	}

	.content-details {
		font-size: 0.8em;
		padding: 0.5em;
		margin: -0.5em;
		border-radius: 0.5em;
		background-color: var(--theme-main-bg);
		transition: var(--theme-transition);
	}

	.date {
		margin-bottom: 2rem;
	}

	.social-links {
		display: flex;
		gap: 1em;
	}

	.social-links img {
		height: 1.08em;
	}

	/* @media screen and (max-aspect-ratio: 1) {
		.quest {
			display: none;
		}
	} */

	@media screen and (max-width: 900px) {
		.container {
			margin-top: calc((1 - var(--sn)) * 50vh);
			gap: 3rem;
			text-align: center;
		}
		.row {
			flex-direction: column;
			gap: 6rem;
		}

		.content-about {
			color: inherit;
		}

		:global(.btn-info) :global(img) {
			filter: none !important;
		}

		h1 {
			margin-bottom: 1rem;
		}

		p {
			font-weight: inherit;
		}

		.content-details {
			font-size: inherit;
			font-weight: 700;
		}

		.social-links,
		.social-links img {
			font-size: 1.5em;
		}
	}
	@media screen and (min-width: 901px) {
		.lg-hide {
			display: none;
		}
	}
	@media screen and (((min-width: 901px) and (max-width: 2000px)) or ((min-width: 2000px) and (max-height: 900px))) {
		.blue {
			background: linear-gradient(35deg, #1919cf 80%, transparent 85%);
			padding: 0 0 0.5em 0.5em;
			margin-left: -0.5em;
			border-bottom-left-radius: 0.5em;
			border-bottom-right-radius: 0.5em;
		}
	}
	@media screen and (min-width: 901px) and ((max-height: 640px) or (max-aspect-ratio: 0.9)) {
		.blueTitle {
			text-shadow:
				-0.05em -0.05em 0 #1919cf,
				0.05em -0.05em 0 #1919cf,
				-0.05em 0.05em 0 #1919cf,
				0.05em 0.05em 0 #1919cf;
		}
		.blueX {
			background: #1919cf;
			padding: 0.5em 0 0 0.5em;
			margin-top: -0.5em;
			margin-left: -0.5em;
			border-top-left-radius: 0.5em;
			border-top-right-radius: 0.5em;
		}
		.blue {
			background: #1919cf;
		}
	}
</style>
