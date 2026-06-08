<script lang="ts">
	import { fade } from "svelte/transition";

	const items = [
		{
			id: 1,
			title: "Ливермор",
			img: "/imgs/guests/livermor.webp",
			alt: "Череп с желтым знаком радиации на лбу",
			text: "Привет, Индикон\n Мы - треш-метал группа Ливермор, и 23-го числа мы исполним 3 кавера на песни из таких популярных игр, как DOOM, Undertale и Sally Face, смешав привычные вам мелодии с новым звуком и авторскими текстами! Ждём всех на Индиконе)",
		},
		{
			id: 2,
			title: "Mindache",
			img: "/imgs/guests/mindache.webp",
			alt: "Музыкальная группа выступает на сцене со световыми эффектами",
			text: "Привет, Индикон! Мы — Mindache, и мы здесь, чтобы встряхнуть вашу реальность!\n Ожидайте кавера на песни по культовым играм — от Undertale до Sonic, в нашем безумном исполнении\n\n Узнали свои фандомы? Тогда встречайте их так, как вы ещё НЕ слышали!",
		},
		{
			id: 3,
			title: "Александра Иванидская",
			img: "/imgs/guests/ivanidskaya.webp",
			alt: "Портрет девушки с короткими вьющимися волосами на темном фоне",
			text: '“Всем привет! Меня зовут Александра, я основательница и арт-директор студии "Welsharess", мы обьединяем искусство и технологии с помощью видеоигр. Также художник, аниматор, продюссер. Расскажу как подходить играм как искусству и не только, и где здесь спрятана междисциплинарность. “ — Александра\n\n [t.me/sher_shared](https://t.me/sher_shared)\n[t.me/welshares](https://t.me/welshares)',
		},
		{
			id: 4,
			title: "Храм детей",
			img: "/imgs/guests/hram_detey.webp",
			alt: "Логотип Храм детей с жуткими существами и текстом",
			text: "Храм Детей — это хоррор-квест про обычную девочку из российской провинции, которая стала участником ужасных событий, наблюдая за тем, как её реальность превращается в ад. Чтобы выжить, ей придётся разгадать тайну, которую скрывают дети. Почему дети играют в классики, что они скрывают, и кто следит за Храмом детей? Это история о детях, их играх, и их Великом Боге.\n\n Проект находится в активной разработке и поиске финансирования. У нас уже готово демо и скоро мы его опубликуем)\n\n Cсылки. Steam: [store.steampowered.com/app/2856440](https://store.steampowered.com/app/2856440)\nVK Play: [vkplay.ru/play/game/...](https://vkplay.ru/play/game/... ) \n\nСсылки. TG: [t.me/hramdetey](https://t.me/hramdetey)\nVK: [vk.com/hramdetey_game](https://vk.com/hramdetey_game)\nBoosty: [boosty.to/thetempleo...](https://boosty.to/thetempleo...)",
		},
		{
			id: 5,
			title: "Annet",
			img: "/imgs/guests/annet.webp",
			alt: "Портрет девушки с терновым венком на голове и гримом",
			text: "Приветствую всех любителей искусства и креатива.\nМеня зовут Annet, я тематический фотограф и спешу сделать ваше пребывание на Индиконе незабываемым.\n Моя цель - запечатлеть волшебные миры через обьектив фотокамеры.\n Со мной у вас будет возможность увезти с собой кусочек мероприятия в виде потрясающих фотографий.\n Открыта к самым смелым идеям.\n [iskra20.wfolio.pro](https://iskra20.wfolio.pro)",
		},
		{
			id: 6,
			title: "Team Sawblade",
			img: "/imgs/guests/team_sawblade.webp",
			alt: "Оранжево-черный геометрический логотип со знаком шестеренки",
			text: 'Мы - небольшая инди-студия, разрабатывающая игры на Unity. За нами есть некоторый опыт в разработке хоррор игр и головоломок и хотели поделиться своей новейшей игрой "Fractal". \n"Fractal" - приключенческой головоломкой от первого лица вдохновлённой играми Portal, завязанной на лазерах, отражениях и цветах.\nСсылка на наш ТГ канал - [t.me/teamsawbla...](https://t.me/teamsawbla...)',
		},
		{
			id: 7,
			title: "Сглаз",
			img: "/imgs/guests/sglaz.webp",
			alt: "Зеленый знак всевидящего ока с надписью Сглаз",
			text: "Сглаз – это игра в жанре стелс квест. \nОсобняк ведьмы таит в себе множество тайн. Постоянно изменяющиеся коридоры, скрытые ходы и сама злая ведьма, которая бродит по дому. \nРуны, которые могут передавать изображение, как камеры, могут помочь избежать этих опасностей. Однако не теряйте бдительности, ведь хозяйка дома всегда где-то рядом, и никто не знает, что ждет вас за углом коридора. \nГруппа vk: [vk.com/club219039656](https://vk.com/club219039656)",
		},
		{
			id: 8,
			title: "Сплав Доверия",
			img: "/imgs/guests/splav_doveriya.webp",
			alt: "Рисунок персонажа в парадной военной форме, держащего в руках табличку с надписью «Сплав Доверия».",
			text: 'Доброго времени суток! Меня зовут Blam4ik, и я готова вам рассказать о своей визуальной новелле "Сплав Доверия"!\n Также вы можете поиграть в мою игру на Инди зоне!\n О чём игра?\n События визуальной новеллы разворачиваются в жизни после смерти. Главным героем является руководитель особняка Альберт Родионов, отвечающий за благополучие как особняка, так и его коллег. Он является очень простодушным и ответственным человеком, и всегда делает так, чтобы атмосфера их места проживания являлась комфортной. Однако в один день все начинает меняться: Персонажи стали узнавать о своём прошлом через их искажённые души после смерти, которые начинают на них давить с помощью их страхов и переживаний, Из-за чего атмосфера особняка становилась угнетающей. Сама новелла затрагивает такие темы как распространение идеологии о дружбе народов, умение прийти на помощь и товарищество.',
		},
		{
			id: 9,
			title: "Secret File",
			img: "/imgs/guests/secret_file.webp",
			alt: "Обложка игры Secret File с тремя пиксельными персонажами",
			text: "Secret File – это Tower Defense. Игра разворачивается в мире погружённом в человеческие грехи, насилие и пороки. Команде военных предстоит преодолеть огромные расстояния и каждую ночь отражать атаки орд заражённых. Строй укрепления, применяй разные тактики, комбинируй оружие и отбивайся от многочисленных врагов.\n\n Попробуйте демо Secret File на Инди Коне уже 23 августа!\n\n Ютуб: [www.youtube.com/@igrik_stu...](https://www.youtube.com/@igrik_stu...)",
		},
		{
			id: 10,
			title: "Wrong Way",
			img: "/imgs/guests/wrong_way.webp",
			alt: "Синий логотип Wrong Way с изометрическим изображением белого дома",
			text: "Всем привет, мы — пятеро мышей-полёвок, и мы делаем игру Wrong way!\n\n Wrong way – нарративная головоломка о жителях небольшого Города. Город необычный: он поворачивает кварталы и путает улицы. Ваша обязанность – следить за дорогами. Выстраивать их так, чтобы каждый житель смог добраться куда хочет.\n\n Довести бабушку до магазина, парня – до свидания, а также получить бесплатный стикер с собакой или кошкой (за прохождение демо ;) можно за нашим столиком на ИНДИКОНЕ!\n\n Следить за разработкой и мышами можно здесь: [t.me/polevkigames](https://t.me/polevkigames)",
		},
		{
			id: 11,
			title: "REKUSU",
			img: "/imgs/guests/rekusu.webp",
			alt: "Белый текстовый логотип REKUSU на черном фоне",
			text: "Rekusu - это RPG-шутер c элементами Буллет-хелла, вдохновленный UNDERTALE и ULTRAKILL. \nОтправляйтесь в Кейкен, разорванного кровопролитной войной на четыре части,чтобы восстановить мир…\n\n …Или же наоборот?\n\n ТГК игры: [t.me/free_head_huh](https://t.me/free_head_huh)\nГруппа ВК игры: [m.vk.com/club222135734?from=g...](https://m.vk.com/club222135734?from=g...)",
		},
		{
			id: 12,
			title: "Numeral Strike",
			img: "/imgs/guests/numeral_strike.webp",
			alt: "Обложка игры Numeral Strike с мультяшными воинами и монстром",
			text: "Numeral Strike - это пошаговый рогалик, где сражения происходят на поле чисел. Доступна демо версия игры, при желании на Индиконе будет доступна мобильная версия.\nСсылка на игру: [store.steampowered.com/app/370862...](https://store.steampowered.com/app/370862...)\nСсылка на ТГ разработчика: [t.me/ost_sergey](https://t.me/ost_sergey)",
		},
	];

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
		<button class="btn" onclick={() => switchPage(-1)} aria-label="Previous page">
			{@render arrow()}
		</button>

		<div class={["grid", cols == 2 && "col2", cols == 1 && "col1"]} style:grid-template-columns="repeat({cols}, 1fr)" style:grid-auto-rows="repeat(2, 1fr)">
			{#each visibleItems as item, i (item.id)}
				<div class="card" transition:fade style:grid-column={(i % cols) + 1} style:grid-row={Math.floor(i / cols) + 1}>
					<div class="card__image">
						<img src={item.img} alt={item.alt} />
					</div>
					<h3 class="card__title">{item.title}</h3>
					<div class="card__text">
						{@render renderText(item.text)}
					</div>
				</div>
			{/each}
		</div>

		<button class="btn" onclick={() => switchPage(1)} aria-label="Next page">
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
					{const match = chunk.match(/^\[([^\]]+)\]\(([^)]+)\)$/)}
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
		text-align: center;
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
		letter-spacing: 0.05em;
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
	}
	.btn svg {
		width: 1.45em;
	}
	svg.flip {
		transform: scaleX(-1);
	}
</style>
