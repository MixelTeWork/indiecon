<script>
	import { resolve, asset } from "$app/paths";
	import Button from "$lib/components/button/Button.svelte";
	import Stripe from "$lib/components/Stripe.svelte";

	const rows = [
		[
			{ url: "/imgs/gallery/1.webp", alt: "Вид сверху на полный зрительный зал фестиваля, где множество людей машут руками и следят за происходящим на сцене." },
			{ url: "/imgs/gallery/2.webp", alt: "Музыкальная группа выступает на большой сцене с яркой красно-синей подсветкой, а на заднем плане виден светящийся экран с надписью «MINDACRE»" },
			{ url: "/imgs/gallery/3.webp", alt: "Ретро-зона игрового фестиваля, где молодые люди играют в игры на старых пузатых ЭЛТ-мониторах" },
		],
		[
			{ url: "/imgs/gallery/4.webp", alt: "Оживлённая атмосфера в светлом просторном холле фестиваля, где ходит множество посетителей и работают выставочные стенды" },
			{ url: "/imgs/gallery/5.webp", alt: "Крупный план ярких деревянных значков и мерча ручной работы с персонажами игр и поп-культуры (например, Пикачу), разложенных на жёлтом фоне" },
			{ url: "/imgs/gallery/6.webp", alt: "Рок-группа исполняет песню на сцене в лучах сценического дыма и синей неоновой подсветки" },
			{ url: "/imgs/gallery/7.webp", alt: "Очередь посетителей в холле фестиваля, проходящая мимо тематической деревянной фотозоны с декорациями" },
		],
		[
			{ url: "/imgs/gallery/8.webp", alt: "Косплеер в шортах и футболке динамично бежит по сцене, удерживая в руке мягкую жёлтую игрушку" },
			{ url: "/imgs/gallery/9.webp", alt: "Девушка-косплеер в пышном детализированном платье с золотыми элементами и шляпке позирует на сцене фестиваля" },
			{ url: "/imgs/gallery/10.webp", alt: "Общая большая фотография множества косплееров на сцене под надписью «НАГРАЖДЕНИЕ» на главном экране" },
		],
	];
</script>

<section>
	<div class="gallery">
		<div class="rows">
			{#each rows as row, i (i)}
				<div class="row">
					{#each row as src, i (i)}
						<img src={asset(src.url)} alt={src.alt} loading="lazy" />
					{/each}
				</div>
			{/each}
		</div>
		<Stripe bottom="2.5rem">Билеты уже в продаже</Stripe>
	</div>
	<div class="content">
		<p>
			Купите билет на Индикон уже сейчас и получите доступ ко всем зонам мероприятия, лекциям, активностям и т. п. А
			также, выбирая вариант билета, вы можете получить классный эксклюзивный мерч от нашей команды художников!
		</p>
		<Button arrow href={resolve("/tickets")}>К билетам</Button>
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
