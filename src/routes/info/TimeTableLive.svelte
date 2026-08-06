<script lang="ts">
	import { textWave } from "$lib/utils/textWave";
	import { toCapitalCase } from "$lib/utils/toCapitalCase";
	import { tick } from "svelte";
	import { PUBLIC_TIMETABLE_API } from "$env/static/public";

	interface ScheduleItem {
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
	let statusText = $state("загружаю программу…");
	let isError = $state(false);
	let now = $state(new Date());

	let listContainer = $state<HTMLElement | undefined>();
	let hasScrolled = $state<boolean>(false);

	let sortedItems = $derived([...items].sort((a, b) => a.pos - b.pos));

	function timeToDate(hms: string | null): Date | null {
		if (!hms) return null;
		const dateParts = scheduleDate.split("-").map(Number);
		const timeParts = hms.split(":").map(Number);
		return new Date(
			dateParts[0],
			dateParts[1] - 1,
			dateParts[2],
			timeParts[0] || 0,
			timeParts[1] || 0,
			timeParts[2] || 0,
			0,
		);
	}

	function itemTiming(item: ScheduleItem): { start: Date; end: Date } | null {
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

	type ItemState = "cancelled" | "live" | "past" | "upcoming";

	function itemState(item: ScheduleItem, currentTime: Date): ItemState {
		// return ["cancelled", "live", "past", "upcoming"][item.id % 4] as ItemState;
		if (item.cancelled) return "cancelled";
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

			const data: ScheduleItem[] = await res.json();
			items = data;
			isError = false;

			if (!data || !data.length) {
				statusText = "На этот день пока ничего не запланировано.";
			} else if (!hasScrolled) {
				// Автопрокрутка к текущему пункту при первой загрузке дня
				hasScrolled = true;
				await tick();
				const liveEl = listContainer?.querySelector(".ind-item.is-live");
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

		const intervalId = setInterval(() => {
			now = new Date();
			fetchSchedule();
		}, refreshMs);

		return () => clearInterval(intervalId);
	});
</script>

<section>
	<div class="ind-widget borderedCard">
		<h2 class="ind-title">{title}</h2>
		{#if days.length > 1}
			<div class="ind-days">
				{#each days as d (d.id)}
					<button
						type="button"
						class="ind-day-btn {d.id === currentDay ? 'active' : ''}"
						onclick={() => (currentDay = d.id)}
					>
						{d.label}
					</button>
				{/each}
			</div>
		{/if}

		<div class="ind-body" bind:this={listContainer}>
			{#if items.length === 0}
				<div class="ind-status {isError ? 'error' : ''}">
					{statusText}
				</div>
			{:else}
				{#each sortedItems as item (item.id)}
					{#if item.showType === "section" || item.showType === "block"}
						{@const isSection = item.showType === "section"}
						{@const name = item.name?.replaceAll("ㅤ", "")?.trim() || ""}
						<div class={[isSection ? "ind-section" : "ind-block", !name && "ind-section-block-empty"]}>
							<span class={isSection ? "ind-section-name" : "ind-block-name"}>
								{name}
							</span>
						</div>
					{:else}
						{@const state = itemState(item, now)}
						{@const timeLabel = item.offlineStartAt || (item.predictedStartAt || "").slice(0, 5) || "--:--"}
						{@const name = item.name?.replaceAll("ㅤ", "")?.trim() || ""}

						<div class="ind-item is-{state}">
							<div class="ind-item-time">{timeLabel}</div>
							<div class="ind-item-rail"><div class="ind-item-dot"></div></div>
							<div class="ind-item-card">
								<div class="ind-item-name">
									{#if name.toLowerCase() == "скоро объявим"}
										<span use:textWave>{toCapitalCase(name)}</span>
									{:else}
										<span>{name || "Без названия"}</span>
									{/if}
									{#if state === "live"}
										<span class="ind-badge-live">в эфире</span>
									{/if}
									{#if state === "cancelled"}
										<span class="ind-cancel-tag">отменено</span>
									{/if}
								</div>
								{#if item.nicknames && item.nicknames !== "-"}
									<div class="ind-item-meta">{item.nicknames}</div>
								{/if}
							</div>
						</div>
					{/if}
				{/each}
			{/if}
		</div>
	</div>
</section>

<style>
	section {
		padding: 0 1em;
	}

	.ind-widget {
		--c-live-fg: red;
		--c-live-bg1: #ffa600a6;
		--c-live-bg2: #ffa6002e;
		max-width: 640px;
		margin: 4em auto;
		overflow: hidden;
	}

	:global(.dark) .ind-widget {
		--c-live-fg: red;
		--c-live-bg1: #002ef7a6;
		--c-live-bg2: #002ef72e;
	}

	.ind-title {
		text-align: center;
		padding-block: 0.5em;
		font-size: 1.5em;
		font-weight: 800;
	}

	.ind-days {
		display: flex;
		gap: 6px;
		padding: 0 18px;
	}

	.ind-day-btn {
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

	.ind-day-btn.active {
		background-color: var(--theme-secondary-bg);
		color: var(--theme-secondary-text);
	}

	.ind-body {
		scrollbar-width: thin;
		scrollbar-color: var(--theme-main-text) transparent;
		/* max-height: 520px; */
		overflow-y: auto;
		padding: 6px 0 4px;
	}

	.ind-body::-webkit-scrollbar {
		width: 7px;
		height: 7px;
	}
	.ind-body::-webkit-scrollbar-track {
		background: transparent;
	}
	.ind-body::-webkit-scrollbar-thumb {
		background: var(--theme-main-text);
		border-radius: 10px;
	}
	.ind-body::-webkit-scrollbar-thumb:hover {
		background: var(--theme-main-text-muted);
	}

	.ind-status {
		padding: 32px 18px;
		text-align: center;
		font-size: 0.9em;
		font-weight: 400;
	}
	.ind-status.error {
		color: tomato;
	}

	.ind-section,
	.ind-block {
		margin: 0 18px 0 4.25em;
		padding: 3px;
		border-bottom: 1px currentColor dashed;
		border-top: 1px currentColor dashed;
		border-left: 1px currentColor solid;
	}

	.ind-section-name,
	.ind-block-name {
		font-size: 0.7em;
		font-weight: 650;
		text-transform: uppercase;
	}

	.ind-section-block-empty {
		padding: 0;
		border: none;
		border-top: 1px currentColor dashed;
	}

	.ind-item {
		display: grid;
		grid-template-columns: 4.25em 1px 1fr;
		gap: 0;
		padding: 9px 18px 9px 0;
		position: relative;
	}

	.ind-item-time {
		font-variant-numeric: tabular-nums;
		font-size: 0.78em;
		font-weight: 700;
		padding-right: 0.75em;
		align-self: center;
		justify-self: flex-end;
		transition: var(--theme-transition);
	}

	.ind-item-rail {
		position: relative;
	}
	.ind-item-rail::before {
		content: "";
		position: absolute;
		left: 0px;
		top: -9px;
		bottom: -9px;
		width: 1px;
		background: currentColor;
	}

	.ind-item-dot {
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

	.ind-item-card {
		padding: 2px 4px 2px 14px;
	}

	.ind-item-name {
		font-size: 0.9em;
		font-weight: 400;
		line-height: 1.35;
		display: flex;
		align-items: center;
		transition: var(--theme-transition);
	}

	.ind-item-meta {
		font-size: 0.67em;
		font-weight: 400;
		margin-top: 0.2em;
	}

	/* current / live item */
	.ind-item.is-live .ind-item-card {
		background: linear-gradient(90deg, var(--c-live-bg1) 0%, var(--c-live-bg2) 44%, #0000);
		border-radius: 8px;
		padding-top: 8px;
		padding-bottom: 8px;
	}

	.ind-item.is-live .ind-item-dot {
		background: var(--c-live-fg);
		box-shadow:
			0 0 0 4px var(--c-live-bg1),
			0 0 12px var(--c-live-bg2);
		animation: ind-live-dot 1.6s infinite;
	}

	@keyframes ind-live-dot {
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

	.ind-badge-live {
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

	.ind-badge-live::before {
		content: "";
		width: 5px;
		height: 5px;
		border-radius: 50%;
		background: currentColor;
		transition: var(--theme-transition);
	}

	/* past items */
	.ind-item.is-past .ind-item-name,
	.ind-item.is-past .ind-item-time {
		color: var(--theme-main-text-muted);
	}
	.ind-item.is-past .ind-item-dot {
		background: var(--theme-main-text-muted);
	}

	/* cancelled */
	.ind-item.is-cancelled .ind-item-name :first-child,
	.ind-item.is-cancelled .ind-item-time {
		text-decoration: line-through;
		color: var(--theme-main-text-muted);
	}
	.ind-item.is-cancelled .ind-item-dot {
		background: var(--theme-main-text-muted);
		background: transparent;
	}

	.ind-cancel-tag {
		display: inline-block;
		text-decoration: none;
		font-size: 0.7em;
		font-weight: 600;
		color: var(--c-live-fg);
		margin-left: 0.75em;
		transition: var(--theme-transition);
	}

	@media (max-width: 420px) {
		.ind-item {
			grid-template-columns: 3.5em 3px 1fr;
		}
	}
</style>
