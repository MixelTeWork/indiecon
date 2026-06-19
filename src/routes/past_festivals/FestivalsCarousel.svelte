<script lang="ts">
	import { asset } from "$app/paths";
	import { fade } from "svelte/transition";

	const pastFestivals = [
		{
			year: "2023",
			title: "ИНДИКОН",
			subtitle: "(тут будет находиться логотип и различные узнаваемые элементы конкретного фестиваля)",
			imgs: [
				{
					image: "/imgs/past_fest/indiecon23_1.webp",
					imageAlt: "Круглый оранжевый логотип с надписью «ИНДИ КОН» на синем абстрактном фоне, стилизованный под интерфейс компьютерного окна",
				},
				{
					image: "/imgs/past_fest/indiecon23_2.webp",
					imageAlt: "Яркий арт-коллаж с персонажами популярных инди-игр (Фредди Фазбер, Хорнет, Айзек и другие) вокруг белой плашки с надписью «ИНДИ КОН '23»",
				},
				{
					image: "/imgs/past_fest/indiecon23_3.webp",
					imageAlt: "Два человека стоят перед большим синим баннером с логотипом фестиваля «Инди Кон»",
				},
				{
					image: "/imgs/past_fest/indiecon23_4.webp",
					imageAlt: "Парень в большом сомбреро и очках смотрит вверх посреди толпы людей на мероприятии",
				},
				{
					image: "/imgs/past_fest/indiecon23_5.webp",
					imageAlt: "Человек в ростовой кукле Золотого Фредди (Golden Freddy) из Five Nights at Freddy's держит в руках маленькую плюшевую копию этого же персонажа",
				},
				{
					image: "/imgs/past_fest/indiecon23_6.webp",
					imageAlt: "Улыбающийся парень в синей кофте стоит между картонной фигурой Капхэда (Cuphead) и ростовой куклой аниматроника, держа в руках плюшевого Фредди",
				},
				{
					image: "/imgs/past_fest/indiecon23_7.webp",
					imageAlt: "Два косплеера в ярких детализированных костюмах Солнца и Луны (Sun and Moon) из FNAF: Security Breach выступают на сцене",
				},
			],
			review: {
				text: "Безумно благодарна за проведенный день, я уверена, что если будет повтор, то я обязательно приеду. Понравилось все, начиная от программы, заканчивая прекрасными людьми, которые не дали мне долго чувствовать себя некомфортно! Всем спасибо!\n(а ещё, хотелось бы найти девочку, которая косплеила ХМаффет :р)",
				author: "Someone Else",
			},
		},
		{
			year: "2023",
			title: "ИНДИКОН: Halloween",
			subtitle: "(тут будет находиться логотип и различные узнаваемые элементы конкретного фестиваля)",
			imgs: [
				{
					image: "/imgs/past_fest/halloween_1.webp",
					imageAlt: "Большая группа людей и косплееров в праздничном лофтовом помещении с кирпичными стенами, украшенном к Хэллоуину",
				},
				{
					image: "/imgs/past_fest/halloween_2.webp",
					imageAlt: "Три косплеера в чёрно-белых готических костюмах и масках динамично выступают или танцуют на сцене",
				},
				{
					image: "/imgs/past_fest/halloween_3.webp",
					imageAlt: "Два косплеера на сцене: один в маске скелета Санса (Sans) из Undertale, другой в свитере Фриск (Frisk), стоящие в обнимку",
				},
				{
					image: "/imgs/past_fest/halloween_4.webp",
					imageAlt: "Тёмный круглый логотип с надписью «ИНДИ КОН», украшенный хэллоуинской тыквой и костями",
				},
				{
					image: "/imgs/past_fest/halloween_5.webp",
					imageAlt: "Атмосферный хэллоуинский арт в тёплых тонах с изображением старого светящегося монитора, на котором написан текст «ИНДИ КОН HALLOWEEN»",
				},
				{
					image: "/imgs/past_fest/halloween_6.webp",
					imageAlt: "Крупный план улыбающейся девушки в полосатом красно-чёрном свитере (в стиле Фредди Крюгера) и с бутафорским черепом на голове",
				},
				{
					image: "/imgs/past_fest/halloween_7.webp",
					imageAlt: "Косплеер в объёмном ростовом костюме Гримма (Grimm) из игры Hollow Knight стоит в профиль в помещении фестиваля",
				},
			],
			review: {
				text: "Ну чтож. Я побывал на индиконе. Снова. И мне вообщем-то понравилось. Я нарядился, познакомился с интересными людьми, повеселился, повоткался с крутыми косплеерами (фотки ниже), купил всякой прикольный и ненужной (но красивой) ерунды. Меня даже умудрились опознать (был в костюме жнеца из игры Grimm's Hollow) целых 2 раза (Если есть фотки со мной пришлите пожайлуста). Поиграл в демки, получил призы и хорошие воспоминания. Вообщем-то я отлично провел время.",
				author: "Иван Волков",
			},
		},
		{
			year: "2024",
			title: "ИНДИКОН: BIG Update",
			subtitle: "(тут будет находиться логотип и различные узнаваемые элементы конкретного фестиваля)",
			imgs: [
				{
					image: "/imgs/past_fest/bigupdate_1.webp",
					imageAlt: "Общий план концертного зала фестиваля со сценой, большим экраном и толпой посетителей, освещённых синими прожекторами",
				},
				{
					image: "/imgs/past_fest/bigupdate_2.webp",
					imageAlt: "Крупный план улыбающейся девушки-косплеера с чёрно-белыми волосами и маской-глазом ГЛаДОС (GLaDOS) из Portal на лице",
				},
				{
					image: "/imgs/past_fest/bigupdate_3.webp",
					imageAlt: "Девушка спикер с микрофоном выступает на фоне экрана, на котором транслируется визуальная новелла или аниме-игра",
				},
				{
					image: "/imgs/past_fest/bigupdate_4.webp",
					imageAlt: "Спикер общается со зрителями, сидящими в красных креслах лекционного зала или кинотеатра",
				},
				{
					image: "/imgs/past_fest/bigupdate_5.webp",
					imageAlt: "Зона со старыми ретро-компьютерами и ЭЛТ-мониторами, за которыми сидят и играют молодые люди",
				},
				{
					image: "/imgs/past_fest/bigupdate_6.webp",
					imageAlt: "Горизонтальный баннер фестиваля «ИНДИКОН» с подписью «BIG UPDATE МОСКВА», украшенный рамками в стиле компьютерных окон с персонажами инди-игр",
				},
				{
					image: "/imgs/past_fest/bigupdate_7.webp",
					imageAlt: "Круглый логотип фестиваля с оранжево-жёлтой надписью «ИНДИ КОН» на голубом фоне, стилизованный под открытое круглое компьютерное окно с кнопками управления",
				},
			],
			review: {
				text: "Я ОЧЕН РАДА И ОЧЕН УСТАЛАП, это было круто!!! организаторы умнички, прыгнули выше головы и вот результат налицо. на фесте как всегда была дружелюбная атмосфера, И ОЧЕН МНОГО МАЙНКРАФТ КОСПЛЕЕРОВ РЕБЯТ Я ВАС ЛЮБЛЮ‼️ в гейм и инди зонах крутые игрушечки, хоть не во все удалось поиграть. вип зона ОЧЕН КЛАССНАЯ спасибо большое что завезли вкусняшек и дали разрешение выносить вкусняшки из вип зоны!!",
				author: "Рита Шамаева",
			},
		},
		{
			year: "2025",
			title: "ИНДИКОН: Reload",
			subtitle: "(тут будет находиться логотип и различные узнаваемые элементы конкретного фестиваля)",
			imgs: [
				{
					image: "/imgs/past_fest/reload_1.webp",
					imageAlt: "Широкий план концертного зала, где на сцене выступает музыкальная рок-группа перед экраном с яркой графикой",
				},
				{
					image: "/imgs/past_fest/reload_2.webp",
					imageAlt: "Группа косплееров в разнообразных игровых костюмах (включая Роксану Вульф из FNAF) позирует на сцене во время награждения",
				},
				{
					image: "/imgs/past_fest/reload_3.webp",
					imageAlt: "Большая деревянная вывеска с надписью «BENDY HELL» и изображением чернильного демона Бенди, подсвеченная лампочками",
				},
				{
					image: "/imgs/past_fest/reload_4.webp",
					imageAlt: "Девушка-косплеер в розово-белом наряде Чики (Chica) из FNAF держит в руке игрушечный кекс со свечкой",
				},
				{
					image: "/imgs/past_fest/reload_5.webp",
					imageAlt: "Атмосферная фотозона в стиле средневекового фэнтези/подземелья, где человек в доспехах стоит у деревянных ворот с черепом",
				},
				{
					image: "/imgs/past_fest/reload_6.webp",
					imageAlt: "Круглый футуристичный логотип фестиваля с белой надписью «ИНДИ КОН» на тёмно-синем фоне со светящимися дугами",
				},
				{
					image: "/imgs/past_fest/reload_7.webp",
					imageAlt: "Графический элемент интерфейса — синяя полоса загрузки с надписью «ПЕРЕЗАГРУЗКА» и маленькими иконками персонажей под ней",
				},
			],
			review: {
				text: "ЙООО ЧУВАКИ ЭТО БЫЛО МОЩНО, СПАСИБО!!\nКуча фендомов в одной огромной тусовке, впечатлений и эмоций просто море, ОТДЕЛЬНОЕ СПАСИБО 3 ЛЮДЯМ, ЧТО УГАДАЛИ ПЕРСОНАЖА Я ВАС ЛЮБЛЮ ХВАХВХВХ\nМерча купил мало, вернее, только 1 плюшку, но зато какую, лучший из лучших ай олвайс кам бэк :D\nС нетерпением жду следующий Индикон, а, точно, если у вас есть фотки со мной - кидайте в лс, общий альбом, буду очень рад))",
				author: "Kido Skullcat",
			},
		},
	];

	let festI = $state(0);
	const fest = $derived(pastFestivals[festI]);
	let imgI = $state(0);
	const img = $derived(fest.imgs[imgI]);

	function nextSlide() {
		festI = (festI + 1) % pastFestivals.length;
		imgI = 0;
	}

	function prevSlide() {
		festI = (festI - 1 + pastFestivals.length) % pastFestivals.length;
		imgI = 0;
	}

	function nextImg() {
		imgI = (imgI + 1) % fest.imgs.length;
	}
	function prevImg() {
		imgI = (imgI - 1 + fest.imgs.length) % fest.imgs.length;
	}
</script>

<section>
	{#key festI}
		<div transition:fade={{ duration: 200 }}>
			<div class="controls">
				<button class="btn" onclick={prevSlide} aria-label="Предыдущий фестиваль">
					{@render arrow()}
				</button>

				<div class="controls__body festival-info">
					<span class="year">{fest.year}</span>
					<h3 class="title h1">{fest.title}</h3>
					<p class="subtitle h4">{fest.subtitle}</p>
				</div>

				<button class="btn" onclick={nextSlide} aria-label="Следующий фестиваль">
					{@render arrow(true)}
				</button>
			</div>

			<div class="image">
				<div class="controls">
					<button class="btn" onclick={nextImg} aria-label="Предыдущее изображение">
						{@render arrow()}
					</button>

					<div></div>

					<button class="btn" onclick={prevImg} aria-label="Следующее изображение">
						{@render arrow(true)}
					</button>
				</div>
				{#key imgI}
					<img src={asset(img.image)} alt={img.imageAlt} loading="lazy" transition:fade={{ duration: 200 }} />
					<div class="imageAlt showImgsAlt" transition:fade={{ duration: 200 }}>{img.imageAlt}</div>
				{/key}
			</div>

			<div class="review h4">
				<span>Отзыв:</span>
				<blockquote class="review__text">{@render renderText(fest.review.text)}</blockquote>
				<cite class="review__author">{fest.review.author}</cite>
			</div>
		</div>
	{/key}
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
			<p>{line.trim()}</p>
		{/if}
	{/each}
{/snippet}

<style>
	section {
		display: grid;
		grid-template-areas: "el";
		max-width: 1920px;
		margin: 0 auto;
		margin-bottom: clamp(10rem, -3.5rem + 36vw, 28rem);
	}
	section > * {
		grid-area: el;
	}

	.controls {
		max-width: 1700px;
		margin: clamp(5rem, 1.7rem + 13.2vw, 13.25rem) auto;
		padding: 0 1.1rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.5rem;
	}
	.controls > :nth-child(2) {
		flex-grow: 1;
	}

	.festival-info {
		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2.5em;
	}
	.year {
		font-weight: 900;
		font-size: clamp(1.125rem, -0.225rem + 5.4vw, 4.5rem);
	}
	.subtitle {
		max-width: 1200px;
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
		width: clamp(1.5rem, 0.8rem + 2.8vw, 3.25rem);
	}
	svg.flip {
		transform: scaleX(-1);
	}

	.image {
		position: relative;
		width: 100%;
		height: clamp(28rem, 19rem + 35vw, 55rem);
	}
	.image .controls {
		height: 100%;
	}
	.image .controls button {
		-webkit-tap-highlight-color: transparent;
	}
	.image .controls svg {
		width: clamp(2.5rem, 0.8rem + 2.8vw, 3.25rem);
		filter: drop-shadow(0 0 10px white) drop-shadow(0 0 3px white) drop-shadow(0 0 3px white);
	}
	.image .controls path {
		stroke: black;
	}
	.image img {
		position: absolute;
		top: 0;
		z-index: -1;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	.imageAlt {
		position: absolute;
		bottom: -1em;
		left: 50%;
		transform: translate(-50%, 100%);
	}

	.review {
		margin: clamp(5rem, 1.7rem + 13.2vw, 13.25rem) auto;
		max-width: calc(1200px + 2 * 1.5rem);
		padding: 0 1.5rem;
		display: flex;
		flex-direction: column;
	}

	.review__text {
		font-size: 1.3em;
		font-weight: 600;
		margin-top: 1.5em;
		margin-bottom: 3.5em;
	}
	.review__text > :first-child:before {
		content: "“";
	}
	.review__text > :last-child::after {
		content: "”";
	}

	.review__author {
		align-self: flex-end;
	}

	@media screen and (max-width: 380px) {
		.controls {
			padding: 0;
			gap: 0;
		}
	}
</style>
