<script>
	const organizers = [
		{
			name: "ANDREY LIPA",
			role: "Главный организатор",
			desc: "Всем привет! Меня зовут Александр... Мы объединяем искусство и технологии с помощью видеоигр.",
			bg: "#002FF7",
			image: "/imgs/team/andrey.webp",
		},
		{
			name: "MINI WOLFI",
			role: "CMM, Организатор команды мерча",
			desc: "Огромная благодарность... Набор мерча (открытки, перевертыши, стикерпаки, значки, брелоки, блокноты).",
			bg: "#FFBF00",
			image: "/imgs/team/wolfi.webp",
		},
		{
			name: "МИША UVB",
			role: "Организатор гейм зоны",
			desc: "Координация игровых зон, консолей и интерактивных стендов на площадке.",
			bg: "#020202",
			image: "/imgs/team/misha.webp",
		},
		{
			name: "САВВАТИЙ SAVVATOZ",
			role: "Организатор волонтеров",
			desc: "Управление командой волонтеров, распределение задач и координация логистики.",
			bg: "#FF3F25",
			image: "/imgs/team/savvatiy.webp",
		},
		{
			name: "СВЕТА SV_PAK",
			role: "Организатор маркета",
			desc: "Отбор авторов, распределение мест на аллее авторов и контроль мерч-шопов.",
			bg: "#00C3FF",
			image: "/imgs/team/sveta.webp",
		},
		{
			name: "КСЕНИЯ МАЗУР",
			role: "Организатор сцены",
			desc: "Тайминг шоу-программы, координация ведущих, артистов и технического персонала.",
			bg: "#D81FFF",
			image: "/imgs/team/ksenia.webp",
		},
	];
</script>

<section>
	{#each organizers as org, i (i)}
		<div class="card">
			<div class="info">
				<div class="role">{org.role}</div>
				<h2 class="name h2">{org.name}</h2>
				<p class="desc">{org.desc}</p>
			</div>

			<div class="image" style:--color={org.bg}>
				<div class="image__bg"></div>

				<img src={org.image} alt={org.name} loading="lazy" />
			</div>
		</div>
	{/each}
</section>

<style>
	section {
		max-width: 1920px;
		margin-inline: auto;
	}

	.card {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-template-areas: "txt img";
		min-height: 60vh;
	}

	.info {
		grid-area: txt;
		justify-self: end;
		max-width: 600px;
		padding: 20% 2em;
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 3em;
	}

	.role {
		font-size: clamp(0.8125rem, 0.3375rem + 1.9vw, 2rem);
		font-weight: 400;
	}

	.image {
		grid-area: img;
		position: relative;
		clip-path: polygon(0 -20%, 100% -20%, 100% 95%, 0 100%);
	}
	.card:nth-child(2n) .image {
		clip-path: polygon(0 -20%, 100% -20%, 100% 100%, 0 95%);
	}
	.card:last-child .image {
		clip-path: none;
	}
	.image__bg {
		position: absolute;
		bottom: 0;
		background-color: var(--color);
		width: 100%;
		height: 100%;
		z-index: -1;
		clip-path: polygon(0 0%, 100% 5%, 100% 100%, 0 100%);
	}
	.card:nth-child(2n) .image__bg {
		clip-path: polygon(0 5%, 100% 0%, 100% 100%, 0 100%);
	}
	.card:first-child .image__bg {
		clip-path: none;
	}
	.image img {
		position: absolute;
		bottom: 0;
		height: 120%;
		width: 100%;
		object-fit: cover;
		object-position: top;
	}

	@media (min-width: 900px) {
		.card:nth-child(2n) {
			grid-template-areas: "img txt";
		}
		.card:nth-child(2n) .info {
			justify-self: start;
		}
	}

	@media (max-width: 899px) {
		.card {
			display: grid;
			grid-template-columns: 1fr;
			grid-template-rows: auto auto;
			grid-template-areas: "img" "txt";
			min-height: fit-content;
		}
		.card:last-child {
			margin-bottom: 4rem;
		}
		.info {
			justify-self: center;
			padding: 4em;
			padding-bottom: 2em;
			gap: 1em;
		}
		.image {
			clip-path: polygon(0 -20%, 100% -20%, 100% 100%, 0 95%);
		}
		.card:first-child .image {
			clip-path: none;
		}
		.card:nth-child(2n) .image {
			clip-path: polygon(0 -20%, 100% -20%, 100% 95%, 0 100%);
		}
		.image__bg {
			height: 90%;
		}
		.image img {
			position: static;
			height: auto;
			max-width: 600px;
			margin-inline: auto;
		}
	}
	@media (max-width: 389px) {
		.info {
			padding: 2em;
		}
	}
</style>
