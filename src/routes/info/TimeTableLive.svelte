<script lang="ts">
	import { tick } from "svelte";
	// import { dev } from "$app/environment";

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
	const refreshMs = 5000;
	// const apiBase = !dev ? "/api/v1/shows" : "https://indiecon-shedule-proxy.artyombkru048.workers.dev/";
	const apiBase = "https://indiecon-shedule-proxy.artyombkru048.workers.dev/";

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
			const res = await fetch(`${apiBase}?festId=${festId}&day=${currentDay}`);
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
		statusText = "загружаю программу…";
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
						<div class={isSection ? "ind-section" : "ind-block"}>
							<span class={isSection ? "ind-section-name" : "ind-block-name"}>
								{item.name || ""}
							</span>
						</div>
					{:else}
						{@const state = itemState(item, now)}
						{@const timeLabel = item.offlineStartAt || (item.predictedStartAt || "").slice(0, 5) || "--:--"}

						<div class="ind-item is-{state}">
							<div class="ind-item-time">{timeLabel}</div>
							<div class="ind-item-rail"><div class="ind-item-dot"></div></div>
							<div class="ind-item-card">
								<div class="ind-item-name">
									{item.name || "Без названия"}
									{#if state === "live" && !item.cancelled}
										<span class="ind-badge-live">в эфире</span>
									{/if}
									{#if item.cancelled}
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
		--ind-bg: #ffee8c;
		/* --ind-panel: #4d301b;
		--ind-line: #4d301b;
		--ind-text: #4d301b; */
		--ind-panel: #000000;
		--ind-line: #000000;
		--ind-text: #000000;
		--ind-muted: #8a8a8a;
		--ind-cyan: #0091d6;
		--ind-magenta: #ff0000;
		/* --ind-amber: #4d301b; */
		--ind-amber: #000000;
		--c1: #ffa600a6;
		--c2: #ffa6002e;
		--ind-mono: "JetBrains Mono", "Space Mono", ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
		--ind-sans: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;

		/* background: var(--ind-bg); */
		/* color: var(--ind-text); */
		font-family: var(--ind-sans);
		/* border-radius: 14px; */
		/* border: 1px solid var(--ind-line); */
		max-width: 640px;
		margin: 4em auto;
		overflow: hidden;
		transition: var(--theme-transition);
	}

	:global(.dark) .ind-widget {
		--ind-bg: #1f066b;
		--ind-panel: #ffffff;
		--ind-line: #ffffff;
		--ind-text: #ffffff;
		--ind-muted: #8a8a8a;
		--ind-cyan: #4fc3ff;
		--ind-magenta: #ff0000;
		--ind-amber: #ffffff;
		--c1: #002ef7a6;
		--c2: #002ef72e;
	}

	.ind-title {
		text-align: center;
		padding-block: 0.5em;
		font-size: 1.5em;
		font-weight: 700;
	}

	.ind-head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 16px 18px;
		border-bottom: 1px solid var(--ind-line);
		background: linear-gradient(180deg, rgba(79, 195, 255, 0.08), transparent);
	}

	.ind-head-title {
		display: flex;
		align-items: center;
		gap: 9px;
	}

	.ind-pulse {
		width: 9px;
		height: 9px;
		border-radius: 50%;
		background: var(--ind-magenta);
		box-shadow: 0 0 0 0 rgba(47, 155, 255, 0.6);
		animation: ind-pulse 1.8s infinite;
		flex: none;
	}

	@keyframes ind-pulse {
		0% {
			box-shadow: 0 0 0 0 rgba(47, 155, 255, 0.55);
		}
		70% {
			box-shadow: 0 0 0 8px rgba(47, 155, 255, 0);
		}
		100% {
			box-shadow: 0 0 0 0 rgba(47, 155, 255, 0);
		}
	}

	.ind-head-label {
		font-family: var(--ind-mono);
		font-size: 11px;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--ind-muted);
	}

	.ind-days {
		display: flex;
		gap: 6px;
		padding: 10px 18px 0;
	}

	.ind-day-btn {
		font-family: var(--ind-mono);
		font-size: 11px;
		letter-spacing: 0.04em;
		background: transparent;
		border: 1px solid var(--ind-line);
		color: var(--ind-muted);
		padding: 5px 10px;
		border-radius: 999px;
		cursor: pointer;
	}

	.ind-day-btn.active {
		color: var(--ind-bg);
		background: var(--ind-cyan);
		border-color: var(--ind-cyan);
	}

	.ind-body {
		scrollbar-width: thin;
		scrollbar-color: var(--ind-line) transparent;
		/* max-height: 520px; */
		overflow-y: auto;
		padding: 6px 0 4px;
	}

	.ind-body::-webkit-scrollbar {
		width: 7px;
	}
	.ind-body::-webkit-scrollbar-track {
		background: transparent;
	}
	.ind-body::-webkit-scrollbar-thumb {
		background: var(--ind-line);
		border-radius: 999px;
		border: 2px solid transparent;
		background-clip: padding-box;
	}
	.ind-body::-webkit-scrollbar-thumb:hover {
		background: var(--ind-muted);
		border: 2px solid transparent;
		background-clip: padding-box;
	}

	.ind-status {
		padding: 32px 18px;
		text-align: center;
		color: var(--ind-muted);
		font-size: 14px;
	}
	.ind-status.error {
		color: var(--ind-magenta);
	}

	.ind-section,
	.ind-block {
		display: flex;
		align-items: center;
		gap: 10px;
		margin: 14px 18px 6px;
		padding-bottom: 6px;
		border-bottom: 1px dashed var(--ind-line);
	}

	.ind-section-name,
	.ind-block-name {
		font-family: var(--ind-mono);
		font-size: 0.7em;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--ind-amber);
	}

	.ind-item {
		display: grid;
		grid-template-columns: 4.25em 1px 1fr;
		gap: 0;
		padding: 9px 18px 9px 0;
		position: relative;
	}

	.ind-item-time {
		font-family: var(--ind-mono);
		font-size: 0.75em;
		color: var(--ind-muted);
		padding-top: 2px;
		padding-right: 0.75em;
		align-self: center;
		justify-self: flex-end;
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
		background: var(--ind-line);
	}

	.ind-item-dot {
		position: absolute;
		left: 0.5px;
		/* top: 6px; */
		top: 50%;
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background: var(--ind-line);
		/* transform: translateX(-50%); */
		transform: translate(-50%, -50%);
	}

	.ind-item-card {
		padding: 2px 4px 2px 14px;
	}

	.ind-item-name {
		font-size: 0.9em;
		font-weight: 500;
		line-height: 1.35;
		display: flex;
		align-items: center;
	}

	.ind-item-meta {
		font-family: var(--ind-mono);
		font-size: 11px;
		color: var(--ind-muted);
		margin-top: 2px;
	}

	/* current / live item */
	.ind-item.is-live .ind-item-card {
		/* background: linear-gradient(90deg, rgba(47, 155, 255, 0.16), rgba(47, 155, 255, 0.04), transparent); */
		background: linear-gradient(90deg, var(--c1) 0%, var(--c2) 44%, #0000);
		border-radius: 8px;
		padding-top: 8px;
		padding-bottom: 8px;
		transition: var(--theme-transition);
	}

	.ind-item.is-live .ind-item-dot {
		background: var(--ind-magenta);
		box-shadow:
			0 0 0 4px var(--c1),
			0 0 12px var(--c2);
		animation: ind-live-dot 1.6s infinite;
	}

	@keyframes ind-live-dot {
		0%,
		100% {
			box-shadow:
				0 0 0 4px var(--c1),
				0 0 8px var(--c2);
		}
		50% {
			box-shadow:
				0 0 0 7px var(--c1),
				0 0 18px var(--c2);
		}
	}

	.ind-badge-live {
		display: inline-flex;
		align-items: center;
		gap: 4px;
		font-family: var(--ind-mono);
		font-size: 0.7em;
		line-height: 0.8;
		letter-spacing: 0.08em;
		color: var(--ind-magenta);
		margin-left: 0.75em;
		white-space: nowrap;
	}

	.ind-badge-live::before {
		content: "";
		width: 5px;
		height: 5px;
		border-radius: 50%;
		background: var(--ind-magenta);
	}

	/* past items */
	.ind-item.is-past .ind-item-name,
	.ind-item.is-past .ind-item-time {
		color: var(--ind-muted);
	}
	.ind-item.is-past .ind-item-dot {
		background: var(--ind-line);
	}

	/* cancelled */
	.ind-item.is-cancelled .ind-item-name {
		text-decoration: line-through;
		color: var(--ind-muted);
	}

	.ind-cancel-tag {
		font-family: var(--ind-mono);
		font-size: 0.7em;
		color: var(--ind-magenta);
		margin-left: 6px;
	}

	.ind-foot {
		display: flex;
		align-items: center;
		padding: 10px 18px;
		border-top: 1px solid var(--ind-line);
		font-family: var(--ind-mono);
		font-size: 0.7em;
		color: var(--ind-muted);
	}

	@media (max-width: 420px) {
		.ind-item {
			grid-template-columns: 3.5em 3px 1fr;
		}
	}
</style>
