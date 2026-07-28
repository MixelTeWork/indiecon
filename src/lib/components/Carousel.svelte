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
		{
			id: 1,
			title: "N-time",
			img: asset("/imgs/guests/n-time.webp"),
			alt: "",
			text: "Здарова, доходяги, на связи N-time!\nВ этом году, как и в прошлом, буду на Индиконе в дистанционном формате. Отвечу на ваши вопросы, а организаторы передадут вам подписанные мною открытки! Так что залетайте на ИНДИКОН! Ну а пошёл делать двухчасовые теории по Дельтаруну и думать, как мне выбраться из Майнкрафта…",
		},
		{
			id: 2,
			title: "WonderNope",
			img: asset("/imgs/guests/wonder-nope.webp"),
			alt: "",
			text: "Здарова, ну шо вы думали Индикон и без меня, не тут то было. Яж тоже потусить хочу, да вновь с вами повидаться, да новый Вондребокс НЕО завезти.",
		},
		{
			id: 3,
			title: "Уголок Акра",
			img: asset("/imgs/guests/ugolok-akra.webp"),
			alt: "",
			text: `В этом году к нам на мероприятие заглянет Артур Кутахов, автор канала Уголок Акра, голос канала "Научпоп" и автор своих авторских комиксов!`,
		},
		{
			id: 4,
			title: "NDRecords",
			img: asset("/imgs/guests/ndrecords.webp"),
			alt: "",
			text: "На связи NDRecords - команда, что занимается дубляжом и локализацией различных зарубежных проектов.\n\nВы скорее всего знаете нас по таким проектам, как: Удивительный Цифровой Цирк, Аццкий Босс, Шаранутый Космос ну и Реалистичный Андертейл.",
		},
		{
			id: 5,
			title: "Бискас",
			img: asset("/imgs/guests/biskas.webp"),
			alt: "",
			text: "Итак, с Вами БИСКАС/WICSUR\n\nОчень люблю места, в которых собираются нишевые (в хорошем смысле) коммьюнити из игр/сериалов, т к сам являюсь инди-разработчиком своего проекта\n\nБуду рад увидеться с Вами на моей автограф-сессии 15 августа на ИНДИКОНЕ",
		},
		{
			id: 6,
			title: "SayMaxWell",
			img: asset("/imgs/guests/saymaxwell.webp"),
			alt: "",
			text: "Меня зовут SayMaxWell, и 15 августа я буду на Индиконе в качестве специального гостя!\n\nДля тех, кто со мной еще не знаком: я делаю ремиксы и авторские треки по FNaF, Undertale, Deltarune и другим культовым инди-играм.\n\nБуду очень рад встретиться с вами вживую, пообщаться, пофоткаться и просто круто провести время вместе.",
		},
		{
			id: 7,
			title: "Сумочкин",
			img: asset("/imgs/guests/sumochkin.webp"),
			alt: "",
			text: "С вами Сумочкин, а это его неповторимые приключения в Москве на ИндиКоне! Наконец смогли выбраться из нашей пещеры и готовы встретить вас на мероприятии, а также просто хорошо провести время! Тем более, когда вокруг, нас будет окружать столько всего интересного. Так что, всех ждем!",
		},
		{
			id: 8,
			title: "Антикек",
			img: asset("/imgs/guests/antikek.webp"),
			alt: "",
			text: `Левон Мамулов - глава анимационной студии RestQue Team, что занималась разработкой анимации в "Шоу Гаврюши и Дяди Бори", "13 Картах", "Объяснялкиных" и многих других проектах, что вы могли видеть на Ютубе, и онлайн стримингах.\n\nВ этом году Левон приедет к нам, чтобы показать новый отрывок из своего собственного мультсериала "Диванный Аналитик"`,
		},
		{
			id: 9,
			title: "DTV",
			img: asset("/imgs/guests/dtv.webp"),
			alt: "",
			text: "Алоха! С Вами Ди с канал  DTV Animation! Я решил принести вам посмотреть над чем я так упорно работаю, а именно несколько минут аниматика пилотной серии моего полноценного мультсериала! Сам я появиться увы не смогу, сложно через измерения проходить но вот хоть какими то путями вам контентику принесу",
		},
		{
			id: 10,
			title: "JF Voice",
			img: asset("/imgs/guests/jf-voice.webp"),
			alt: "",
			text: `Этот эксперимент кажется очень... очень интересным. На фестивале вы прочувствуете это вживую.\n\nВас ждёт исполнение моей песни "ЭКСПЕРИМЕНТ Не Был Провальным" на сцене, рассказ о её производстве, куча нового эксклюзивного мерча, а также маленький сюрприз...`,
		},
		{
			id: 11,
			title: "SCHENEV",
			img: asset("/imgs/guests/schenev.webp"),
			alt: "",
			text: "Уже 4-ый год я посещаю это мероприятие, словно наблюдаю за ростом маленького пацаненка🤩\n\nПриду купить классный мерч, приду знакомиться с крутыми людьми, приду любоваться талантливыми косплеерами. А главное - приду повидаться с вами и провести время с удовольствием",
		},
		{
			id: 12,
			title: "SiRus",
			img: asset("/imgs/guests/sirus.webp"),
			alt: "",
			text: "В очередной раз очень рад побывать на таком БЕЗУМНОМ и КРУТОМ фестивале! в качестве Спец-Гостя! он обещает быть мега особенным и самым МАСШТАБНЫМ в несколько раз чем прежде!\nСам я делаю песни по Undertale и его вселенным, и буду очень рад увидеться с вами снова! или впервые ;)\nДавайте запомним этот день навсегда и сделаем его незабываемым!",
		},
		// {
		// 	id: 1,
		// 	title: "",
		// 	img: asset("/imgs/guests/"),
		// 	alt: "",
		// 	text: "",
		// },
		// ...new Array(12)
		// 	.fill(0)
		// 	.map((_, i) => ({
		// 		id: i + 1,
		// 		title: "",
		// 		img: "",
		// 		alt: "",
		// 		text: "",
		// 	})),
	];
	// .map((item, i) => ({
	// 	...item,
	// 	title: "???",
	// 	text: "Скоро тут появится кто-то очень крутой",
	// 	img: asset(`/imgs/guests/question_mark_${Math.floor(Math.abs(Math.sin(i * 12.989819) * 43758.5453 % 1) * 4) + 1}.webp`),
	// 	alt: "Вопросительный знак",
	// }));

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
