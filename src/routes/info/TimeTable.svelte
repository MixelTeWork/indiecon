<script lang="ts">
	import Placeholder from "./Placeholder.svelte";

	interface ScheduleItem {
		time?: string;
		title?: string;
		desc?: string;
	}

	const schedule: ScheduleItem[] = [
		{ time: "Лекторий" },
		{
			time: "13:00",
			desc: "«Инди-игра: искусство и коммерция» Александр Кутехов Ведущий гейм-дизайнер проекта Emily’s Mind",
		},
		{
			time: "14:00",
			desc: "«С чего начать делать игры. Как сделать игру и не сойти с ума» Виктор Звягинский Сооснователь инди-студии Terrabyte Games",
		},
		{
			time: "15:00",
			desc: "«Как создавать запоминающихся персонажей» Геннадий Оникиенко. Арт-директор и 3D Character Artist",
		},
		{
			time: "16:00",
			desc: "«Важность силуэта персонажа в разработке концепт арта для игры» Анастасия Чеснокова (alayne) – разработчик, 2d концепт-артист",
		},
		{ time: "Зона автограф сессий" },
		{ title: "13:00", desc: "Антикек" },
		{ title: "13:30", desc: "Акр" },
		{ title: "14:00", desc: "JFVoice, FolkStudio, SiRus, Natsu Smeh, Neykas, FireVer) – SayMaxWell" },
		{ title: "15:00", desc: "Сумочкин – Ntime" },
		{ title: "16:00", desc: "NDRecords – Braindead project – Бискас" },
		{ title: "17:00", desc: "WonderNope – DTV" },
		{ title: "18:00", desc: "Клайп, sad.pigeon, Greschka05 – Aliazo – ИнкБлот" },
		{ time: "Турниры", desc: "Для участия в турнирах нужно заранее подойти на зону и записаться" },
		{ time: "Зона настолок" },
		{ title: "13:30", desc: "Повелители Токио" },
		{ title: "15:30", desc: "Уно" },
		{ title: "17:30", desc: "Гвинт" },
		{ time: "Зона ретро (RetroTechSquad)" },
		{ title: "13:00", desc: "Tekken 3 — PS 1" },
		{ title: "15:00", desc: "Tetris — SNES" },
		{ title: "17:00", desc: "TMNT TF — ZX Sprinter" },
		{ time: "Вип зона" },
		{ title: "12:30", desc: "Party Animals" },
		{ title: "14:30", desc: "Boomerang Fu" },
		{ title: "16:30", desc: "Rivals of Aether" },
		// { title: "", desc: "" },
	];
</script>

<section>
	{@render card(schedule.slice(0, 5))}
	{@render card(schedule.slice(5, 13), true)}
	{@render card(schedule.slice(13))}
</section>

{#snippet card(items: ScheduleItem[], addPlaceholder = false)}
	<div class="borderedCard card">
		{#each items as item, i (i)}
			<div class={["item", !item.time && "item_sm"]}>
				{#if item.time}
					<time class="item__time">{item.time}</time>
				{/if}
				{#if item.title}
					<h3 class="item__title">{item.title}</h3>
				{/if}
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

	.item_sm {
		flex-direction: row;
	}

	.item__time {
		font-size: 1.125em;
		font-weight: 900;
		font-variant-numeric: tabular-nums;
	}

	.item__title {
		font-size: 0.78em;
		font-weight: 700;
		white-space: nowrap;
		font-variant-numeric: tabular-nums;
	}

	.item_sm .item__title::after {
		content: " — ";
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
	}
</style>
