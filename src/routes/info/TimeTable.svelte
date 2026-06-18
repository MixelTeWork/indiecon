<script lang="ts">
	import Placeholder from "./Placeholder.svelte";

	interface ScheduleItem {
		time: string;
		title: string;
		desc?: string;
	}

	const schedule: ScheduleItem[] = [
		{
			time: "10:00 — 11:00",
			title: "Регистрация участников",
			desc: "Знакомство с пространством, навигация, свободное общение",
		},
		{
			time: "11:00 — 11:20",
			title: "Открытие Индикона",
			desc: "Короткое вступление от организаторов, что будет происходить в течение дня",
		},
		{
			time: "11:30 — 12:15",
			title: "Лекция / выступление",
			desc: "Инди-разработка: путь от идеи до первого релиза",
		},
		{
			time: "12:30 — 13:15",
			title: "Лекция / выступление",
			desc: "Визуальный стиль в играх, анимации и медиа-проектах",
		},
		{
			time: "13:15 — 14:15",
			title: "Перерыв",
			desc: "Еда, общение, демо-проекты, знакомство с участниками",
		},
		{
			time: "14:15 — 15:00",
			title: "Панельная дискуссия",
			desc: "Как делать независимые проекты и не выгореть",
		},
		{
			time: "15:15 — 16:00",
			title: "Лекция / выступление",
			desc: "Звук и музыка в интерактивных проектах",
		},
		{
			time: "16:00 — 16:30",
			title: "Свободное время",
			desc: "Нетворкинг, стенды, демо-зона",
		},
		{
			time: "16:30 — 17:30",
			title: "Практический блок / воркшоп",
			desc: "Работа над идеями, прототипирование, обсуждение проектов",
		},
		{
			time: "17:45 — 18:30",
			title: "Показ проектов",
			desc: "Короткие презентации участников",
		},
		{
			time: "18:30 — 19:00",
			title: "Перерыв",
			desc: "",
		},
		{
			time: "19:00 — 19:30",
			title: "Закрытие основной программы",
			desc: "Итоги дня, благодарности, анонсы",
		},
		{
			time: "19:30 — 21:00",
			title: "Неформальная часть",
			desc: "Общение, музыка, свободная программа",
		},
		{
			time: "17:45 — 18:30",
			title: "Показ проектов",
			desc: "Короткие презентации участников",
		},
		{
			time: "18:30 — 19:00",
			title: "Перерыв",
			desc: "",
		},
		{
			time: "19:00 — 19:30",
			title: "Закрытие основной программы",
			desc: "Итоги дня, благодарности, анонсы",
		},
		{
			time: "19:30 — 21:00",
			title: "Неформальная часть",
			desc: "Общение, музыка, свободная программа",
		},
	];
</script>

<section>
	{@render card(schedule.slice(0, 6))}
	{@render card(schedule.slice(6, 13))}
	{@render card(schedule.slice(13), true)}
</section>

{#snippet card(items: ScheduleItem[], addPlaceholder = false)}
	<div class="borderedCard card">
		{#each items as item, i (i)}
			<div class="item">
				<time class="item__time">{item.time}</time>
				<h3 class="item__title">{item.title}</h3>
				{#if item.desc}
					<p class="item__description">{item.desc}</p>
				{/if}
			</div>
		{/each}

		{#if addPlaceholder}
			<div class="placeholder">
				<Placeholder />
			</div>
		{/if}
	</div>
{/snippet}

<style>
	section {
		display: grid;
		justify-items: center;
		grid-template-columns: repeat(3, 1fr);
		gap: 4em 2em;
		width: 100%;
		max-width: 1200px;
		margin: 0 auto;
	}

	.card {
		width: 100%;
		max-width: 23em;
		padding: 2em 1.5em;
		display: flex;
		flex-direction: column;
		gap: 1em;
	}

	.item {
		display: flex;
		flex-direction: column;
		gap: 0.25em;
	}

	.item__time {
		font-size: 1.125em;
		font-weight: 900;
	}

	.item__title {
		font-size: 0.78em;
		font-weight: 700;
	}

	.item__description {
		font-size: 0.78em;
		font-weight: 400;
	}

	.placeholder {
		flex-grow: 1;
		display: flex;
		justify-content: center;
		align-items: flex-end;
		padding-top: 1rem;
		width: 100%;
		height: 0;
	}

	@media (max-width: 1200px) {
		section {
			grid-template-columns: repeat(2, 1fr);
			grid-template-rows: repeat(2, 1fr);
		}
		section > :nth-child(3) {
			grid-column: 1/3;
		}
	}

	@media (max-width: 900px) {
		section {
			grid-template-columns: 1fr;
			grid-template-rows: repeat(3, 1fr);
		}
		section > :nth-child(3) {
			grid-column: unset;
		}

		.card {
			max-width: 20em;
		}

		.item__time {
			font-size: 1em;
		}

		.item__title {
			font-size: 0.65em;
		}

		.item__description {
			font-size: 0.65em;
		}
	}
</style>
