<script lang="ts">
	import { textWave } from "$lib/utils/textWave";
	import { toCapitalCase } from "$lib/utils/toCapitalCase";
	import { tick } from "svelte";
	import { PUBLIC_TIMETABLE_API } from "$env/static/public";
	import { numNoun } from "$lib/utils/numNoun";
	import { SvelteSet } from "svelte/reactivity";

	interface ScheduleApiItem {
		id: number;
		pos: number;
		indexId: number | null;
		requestId: number | null;
		showType: "show" | "block" | "section" | string;
		nomination: string | null;
		name: string | null;
		cosband: string | null;
		nicknames: string | null;
		duration: number | null;
		cancelled: boolean;
		predictedStartAt: string | null;
		offlineStartAt: string | null;
		startedAt: string | null;
		stoppedAt: string | null;
		extra: Record<string, unknown>;
	}

	type ItemState = "cancelled" | "live" | "past" | "upcoming";
	type ItemType = "entry" | "title" | "block" | "sep";

	interface ScheduleItem {
		id: number;
		apiItem: ScheduleApiItem;
		pos: number;
		type: ItemType;
		state: ItemState;
		text: string;
		subtext?: string;
		time: string[];
		blockEntries?: ScheduleItem[];
		blockHeadless?: boolean;
	}

	interface DayConfig {
		id: number;
		label: string;
	}

	interface Props {
		festId: number;
		title?: string;
	}

	let { festId, title = "" }: Props = $props();
	const scheduleDate = "2026-08-15";
	const days: DayConfig[] = [{ id: 0, label: "День 1" }];
	const refreshMs = 10000;

	let currentDay = $derived(days[0]?.id ?? 0);
	let items = $state([] as ScheduleItem[]);
	const expandedBlocks = new SvelteSet<number>();
	let statusText = $state("загружаю программу…");
	let isError = $state(false);

	let listContainer = $state<HTMLElement | undefined>();
	let hasScrolled = $state<boolean>(false);

	// let sortedItems = $derived([...items].sort((a, b) => a.pos - b.pos));

	function timeToDate(hms: string | null): Date | null {
		if (!hms) return null;
		const dateParts = scheduleDate.split("-").map(Number);
		const timeParts = hms.split(":").map(Number);
		return new Date(dateParts[0], dateParts[1] - 1, dateParts[2], timeParts[0] || 0, timeParts[1] || 0, timeParts[2] || 0, 0);
	}

	function itemTiming(item: ScheduleApiItem): { start: Date; end: Date } | null {
		let start = item.startedAt ? new Date(item.startedAt) : timeToDate(item.predictedStartAt || item.offlineStartAt);

		if (item.startedAt && start && isNaN(start.getTime())) {
			start = timeToDate(item.startedAt);
		}
		if (!start) return null;

		let end = item.stoppedAt
			? isNaN(new Date(item.stoppedAt).getTime())
				? timeToDate(item.stoppedAt)
				: new Date(item.stoppedAt)
			: new Date(start.getTime() + (item.duration || 0) * 1000);

		// Фоллбэк на случай проблем с расчетом end
		if (!end) end = start;

		return { start, end };
	}

	function itemState(item: ScheduleApiItem, ignoreCanceled = false): ItemState {
		const currentTime = new Date();
		// const currentTime = timeToDate("13:14")!;
		// return ["cancelled", "live", "past", "upcoming"][item.id % 4] as ItemState;
		if (item.cancelled && !ignoreCanceled) return "cancelled";
		if (item.startedAt && !item.stoppedAt) return "live";
		if (item.startedAt && item.stoppedAt) return "past";

		const t = itemTiming(item);
		if (!t) return "upcoming";
		if (currentTime < t.start) return "upcoming";
		if (currentTime >= t.start && currentTime < t.end) return "live";
		return "past";
	}

	async function fetchSchedule(): Promise<void> {
		try {
			const res = await fetch(`${PUBLIC_TIMETABLE_API}?festId=${festId}&day=${currentDay}`, {
				credentials: "omit",
			});
			if (!res.ok) throw new Error(`HTTP ${res.status}`);

			const data: ScheduleApiItem[] = await res.json();
			const newItems: ScheduleItem[] = data
				.map(
					(item) =>
						({
							id: item.id,
							apiItem: item,
							pos: item.pos,
							type: item.showType == "section" || item.showType == "block" ? "title" : "entry",
							state: itemState(item),
							text: item.name?.replaceAll("ㅤ", "")?.trim() || "",
							subtext: item.nicknames != "-" ? item.nicknames || "" : "",
							time: [item.offlineStartAt || (item.predictedStartAt || "").slice(0, 5) || "--:--"],
						}) satisfies ScheduleItem,
				)
				.map((item) => ({
					...item,
					type: item.type == "title" && item.text == "" ? ("sep" as const) : item.type,
				}))
				.sort((a, b) => a.pos - b.pos);
			for (let i = 0; i < newItems.length; i++) {
				const item = newItems[i];
				if (item.type != "title") continue;
				if (!item.text.startsWith("!")) continue;
				item.text = item.text.slice(1);
				item.type = "block";
				item.blockEntries = [];
				for (let j = i + 1; j < newItems.length; j++) {
					if (newItems[j].type != "entry") {
						const count = j - i - 1;
						if (count > 2) item.blockEntries = newItems.splice(i + 1, count);
						break;
					}
				}
				if (item.blockEntries.length < 2) continue;
				const splitI = item.blockEntries.findIndex((v) => v.state == "live");
				if (splitI < 0) {
					const first = item.blockEntries.at(0)!;
					const last = item.blockEntries.at(-1)!;
					item.state = itemState(last.apiItem, true);
					item.time = [...first.time, ...last.time];
				} else {
					let insertI = i + 1;
					const entries = item.blockEntries;
					if (splitI <= 2) {
						item.type = "title";
						newItems.splice(insertI, 0, ...entries.slice(0, splitI));
						insertI += splitI;
					} else {
						item.blockEntries = entries.slice(0, splitI);
						const first = item.blockEntries.at(0)!;
						const last = item.blockEntries.at(-1)!;
						item.state = "past";
						item.time = [...first.time, ...last.time];
					}
					newItems.splice(insertI++, 0, entries[splitI]);
					if (splitI + 1 < entries.length) newItems.splice(insertI++, 0, entries[splitI + 1]);
					if (entries.length - splitI - 2 <= 2) {
						newItems.splice(insertI, 0, ...entries.slice(splitI + 2));
					} else {
						const blockEntries = entries.slice(splitI + 2);
						const first = blockEntries.at(0)!;
						const last = blockEntries.at(-1)!;
						const newItem = {
							id: -item.id,
							apiItem: item.apiItem,
							pos: first.pos - 0.5,
							type: "block",
							state: "upcoming",
							text: "",
							time: [...first.time, ...last.time],
							blockEntries,
							blockHeadless: true,
						} satisfies ScheduleItem;
						newItems.splice(insertI, 0, newItem);
					}
				}
			}
			items = newItems;
			isError = false;

			if (!data || !data.length) {
				statusText = "На этот день пока ничего не запланировано.";
			} else if (!hasScrolled) {
				// Автопрокрутка к текущему пункту при первой загрузке дня
				hasScrolled = true;
				await tick();
				const liveEl = listContainer?.querySelector(".item.item_live");
				if (liveEl) liveEl.scrollIntoView({ block: "center" });
			}
		} catch (err) {
			console.error("[indikon-schedule] ошибка загрузки:", err);
			isError = true;
			const errorMessage = err instanceof Error ? err.message : String(err);

			statusText = `Не удалось загрузить программу (${errorMessage}). Попробуйте обновить.`;
		}
	}

	$effect(() => {
		hasScrolled = false;
		items = [];
		statusText = "Загружаю программу…";
		isError = false;

		fetchSchedule();

		const intervalId = setInterval(fetchSchedule, refreshMs);

		return () => clearInterval(intervalId);
	});
</script>

<section>
	<div class="widget borderedCard">
		<h2 class="title">{title}</h2>
		{#if days.length > 1}
			<div class="days">
				{#each days as d (d.id)}
					<button type="button" class="dayBtn {d.id === currentDay ? 'active' : ''}" onclick={() => (currentDay = d.id)}>
						{d.label}
					</button>
				{/each}
			</div>
		{/if}

		<div class="body" bind:this={listContainer}>
			{#if items.length === 0}
				<div class="status {isError ? 'status_error' : ''}">
					{statusText}
				</div>
			{:else}
				{#each items as item (item.id)}
					{@render renderItem(item)}
				{/each}
			{/if}
		</div>
	</div>
</section>

{#snippet renderItem(item: ScheduleItem)}
	{#if item.type == "sep"}
		<div class="itemSep"></div>
	{:else if item.type == "title"}
		<div class="itemTitle"><span>{item.text}</span></div>
	{:else if item.type == "block"}
		{#if !item.blockHeadless}
			{#if expandedBlocks.has(item.id) || expandedBlocks.has(-item.id)}
				<div class="itemTitle">
					<span>{item.text}</span>
					<button
						class="item__expandBtn item__expandBtn_small"
						onclick={() => {
							expandedBlocks.delete(item.id);
							expandedBlocks.delete(-item.id);
						}}
					>
						{@render collapseIcon()}
						<span>Свернуть</span>
					</button>
				</div>
			{:else}
				<div class="itemTitle"><span>{item.text}</span></div>
			{/if}
		{/if}
		{#if expandedBlocks.has(item.id)}
			{#each item.blockEntries || [] as entry (entry.id)}
				{@render renderItem(entry)}
			{/each}
		{:else}
			<div class="item item_{item.state}">
				<div class="item__time">{@render renderTime(item.time)}</div>
				<div class="item__rail"><div class="item__dot item__dot_dash"></div></div>
				<div class="item__card">
					<div class="item__name">
						<button class="item__expandBtn" onclick={() => expandedBlocks.add(item.id)}>
							{@render expandIcon()}
							<span>Развернуть</span>
						</button>
						<span class="item__expandCount">
							{item.blockEntries?.length || 0}
							{numNoun(item.blockEntries?.length || 0, "выступление", "выступления", "выступлений")}
						</span>
					</div>
				</div>
			</div>
		{/if}
	{:else}
		<div class="item item_{item.state}">
			<div class="item__time">{@render renderTime(item.time)}</div>
			<div class="item__rail"><div class="item__dot"></div></div>
			<div class="item__card">
				<div class="item__name">
					{#if item.text.toLowerCase() == "скоро объявим"}
						<span use:textWave>{toCapitalCase(item.text)}</span>
					{:else}
						<span>{item.text || "Без названия"}</span>
					{/if}
					{#if item.state == "live"}
						<span class="item__badgeLive">в эфире</span>
					{/if}
					{#if item.state == "cancelled"}
						<span class="item__badgeCancelled">отменено</span>
					{/if}
				</div>
				{#if item.subtext}
					<div class="item__meta">{item.subtext}</div>
				{/if}
			</div>
		</div>
	{/if}
{/snippet}

{#snippet renderTime(time: string[])}
	{#each time as t, i (i)}
		{#if i > 0}
			<br />—<br />
		{/if}
		{t}
	{/each}
{/snippet}

{#snippet expandIcon()}
	<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 -960 960 960" width="1em" fill="currentColor"
		><path
			d="M280-280h120q17 0 28.5 11.5T440-240q0 17-11.5 28.5T400-200H240q-17 0-28.5-11.5T200-240v-160q0-17 11.5-28.5T240-440q17 0 28.5 11.5T280-400v120Zm400-400H560q-17 0-28.5-11.5T520-720q0-17 11.5-28.5T560-760h160q17 0 28.5 11.5T760-720v160q0 17-11.5 28.5T720-520q-17 0-28.5-11.5T680-560v-120Z"
		/></svg
	>
{/snippet}

{#snippet collapseIcon()}
	<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 -960 960 960" width="1em" fill="currentColor"
		><path
			d="M360-360H240q-17 0-28.5-11.5T200-400q0-17 11.5-28.5T240-440h160q17 0 28.5 11.5T440-400v160q0 17-11.5 28.5T400-200q-17 0-28.5-11.5T360-240v-120Zm240-240h120q17 0 28.5 11.5T760-560q0 17-11.5 28.5T720-520H560q-17 0-28.5-11.5T520-560v-160q0-17 11.5-28.5T560-760q17 0 28.5 11.5T600-720v120Z"
		/></svg
	>
{/snippet}

<style>
	@custom-media --bp-small (width <= 420px);

	section {
		padding: 0 1em;
	}

	.widget {
		--c-live-fg: red;
		--c-live-bg1: #ffa600a6;
		--c-live-bg2: #ffa6002e;
		max-width: 640px;
		margin: 4em auto;
		overflow: hidden;
	}

	:global(.dark) .widget {
		--c-live-fg: red;
		--c-live-bg1: #002ef7a6;
		--c-live-bg2: #002ef72e;
	}

	.title {
		text-align: center;
		padding-block: 0.5em;
		font-size: 1.5em;
		font-weight: 800;
	}

	.days {
		display: flex;
		gap: 6px;
		padding: 0 18px;
	}

	.dayBtn {
		font-size: 0.75em;
		font-weight: 600;
		letter-spacing: 0.04em;
		border: 2px solid var(--theme-main-text);
		background-color: var(--theme-main-bg);
		color: var(--theme-main-text);
		padding: 5px 10px;
		border-radius: 4px;
		cursor: pointer;
		transition: var(--theme-transition);
		outline-offset: 3px;
	}

	.dayBtn.active {
		background-color: var(--theme-secondary-bg);
		color: var(--theme-secondary-text);
	}

	.body {
		scrollbar-width: thin;
		scrollbar-color: var(--theme-main-text) transparent;
		/* max-height: 520px; */
		overflow-y: auto;
		padding: 6px 0 4px;
	}

	.body::-webkit-scrollbar {
		width: 7px;
		height: 7px;
	}
	.body::-webkit-scrollbar-track {
		background: transparent;
	}
	.body::-webkit-scrollbar-thumb {
		background: var(--theme-main-text);
		border-radius: 10px;
	}
	.body::-webkit-scrollbar-thumb:hover {
		background: var(--theme-main-text-muted);
	}

	.status {
		padding: 32px 18px;
		text-align: center;
		font-size: 0.9em;
		font-weight: 400;
	}
	.status_error {
		color: tomato;
	}

	.itemSep,
	.itemTitle {
		margin: 0 18px 0 4.25em;

		@media (--bp-small) {
			margin-left: 3.5em;
		}
	}

	.itemTitle {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 3px;
		border-bottom: 1px currentColor dashed;
		border-top: 1px currentColor dashed;
		border-left: 1px currentColor solid;
	}

	.itemTitle > span {
		font-size: 0.7em;
		margin: 4px 0;
		line-height: 1;
		font-weight: 650;
		text-transform: uppercase;
		transform: translateY(1px);
	}

	.itemSep {
		border-top: 1px currentColor dashed;
	}

	.item {
		display: grid;
		grid-template-columns: 4.25em 1px 1fr;
		gap: 0;
		padding: 9px 18px 9px 0;
		position: relative;

		@media (--bp-small) {
			grid-template-columns: 3.5em 3px 1fr;
		}
	}

	.item__time {
		font-variant-numeric: tabular-nums;
		font-size: 0.78em;
		font-weight: 700;
		line-height: 0.65;
		padding-right: 0.75em;
		align-self: center;
		justify-self: flex-end;
		text-align: center;
		transition: var(--theme-transition);
	}

	.item__rail {
		position: relative;
	}
	.item__rail::before {
		content: "";
		position: absolute;
		left: 0px;
		top: -9px;
		bottom: -9px;
		width: 1px;
		background: currentColor;
	}

	.item__dot {
		position: absolute;
		left: 0.5px;
		top: 50%;
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background: currentColor;
		transform: translate(-50%, -50%);
		transition: var(--theme-transition);
	}
	.item__dot_dash {
		height: 5px;
		border-radius: 0;
		background-color: transparent;
		border-top: 1px currentColor solid;
		border-bottom: 1px currentColor solid;
	}

	.item__card {
		padding: 2px 4px 2px 14px;
	}

	.item__name {
		font-size: 0.9em;
		font-weight: 400;
		line-height: 1.35;
		display: flex;
		align-items: center;
		gap: 0.5em;
	}

	.item__meta {
		font-size: 0.67em;
		font-weight: 400;
		margin-top: 0.2em;
	}

	/* current / live item */
	.item_live .item__card {
		background: linear-gradient(90deg, var(--c-live-bg1) 0%, var(--c-live-bg2) 44%, #0000);
		border-radius: 8px;
		padding-top: 8px;
		padding-bottom: 8px;
	}

	.item_live .item__dot {
		background: var(--c-live-fg);
		box-shadow:
			0 0 0 4px var(--c-live-bg1),
			0 0 12px var(--c-live-bg2);
		animation: live-dot 1.6s infinite;
	}

	@keyframes live-dot {
		0%,
		100% {
			box-shadow:
				0 0 0 4px var(--c-live-bg1),
				0 0 8px var(--c-live-bg2);
		}
		50% {
			box-shadow:
				0 0 0 7px var(--c-live-bg1),
				0 0 18px var(--c-live-bg2);
		}
	}

	.item__badgeLive {
		display: inline-flex;
		align-items: center;
		gap: 4px;
		font-size: 0.7em;
		font-weight: 600;
		line-height: 0.8;
		letter-spacing: 0.08em;
		color: var(--c-live-fg);
		margin-left: 0.75em;
		white-space: nowrap;
		transition: var(--theme-transition);
	}

	.item__badgeLive::before {
		content: "";
		width: 5px;
		height: 5px;
		border-radius: 50%;
		background: currentColor;
		transition: var(--theme-transition);
	}

	/* past items */
	.item_past .item__name,
	.item_past .item__time {
		color: var(--theme-main-text-muted);
	}
	.item_past .item__dot {
		background: var(--theme-main-text-muted);
	}

	/* cancelled */
	.item_cancelled .item__name :first-child,
	.item_cancelled .item__time {
		text-decoration: line-through;
		color: var(--theme-main-text-muted);
	}
	.item_cancelled .item__dot {
		background: var(--theme-main-text-muted);
		background: transparent;
	}

	.item__badgeCancelled {
		display: inline-block;
		text-decoration: none;
		font-size: 0.7em;
		font-weight: 600;
		color: var(--c-live-fg);
		margin-left: 0.75em;
		transition: var(--theme-transition);
	}

	.item__expandBtn {
		display: flex;
		align-items: center;
		flex-shrink: 0;
		gap: 0.25em;
		background-color: #80808033;
		border-radius: 0.3em;
		padding: 0 0.4em;
		transition: transform 100ms ease-in-out;

		@media (pointer: fine) {
			&:hover {
				transform: scale(1.05);
			}
		}
	}
	.item__expandBtn_small {
		font-size: 0.9em;
		background-color: transparent;

		@media (pointer: fine) {
			&:hover {
				transform: scale(0.95);
			}
		}
	}
	.item__expandBtn svg {
		font-size: 1.2em;
	}
	.item__expandBtn span {
		font-size: 0.8em;
		height: 1em;
		text-transform: uppercase;
	}

	.item__expandCount {
		font-size: 0.8em;
		height: 1em;
	}
</style>
