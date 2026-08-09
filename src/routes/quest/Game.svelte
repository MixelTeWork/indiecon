<script lang="ts">
	import { getApiUrl } from "$lib/api/api";
	import { useGameState, useMutationGameSelectTeam, useMutationSendClick } from "$lib/api/game";
	import { characterById, useTourneyCharacters, type TourneyCharacter } from "$lib/api/tourney";
	import DisplayError from "$lib/components/DisplayError.svelte";
	import Spinner from "$lib/components/Spinner.svelte";
	import randomInt from "$lib/utils/randomInt";
	import { scale } from "svelte/transition";

	const stateQuery = useGameState();
	const charactersQuery = useTourneyCharacters();
	// $inspect(stateQuery)
	// $inspect(charactersQuery)

	let counter = $state(0);
	let clicks = $state(0);
	let sendDelay = $state(0);
	let lastClickSend = $state(Date.now());

	const sendClick = useMutationSendClick(
		() => (lastClickSend = Date.now()),
		() => (lastClickSend = Date.now()),
	);
	const selectTeam = useMutationGameSelectTeam();

	const stateData = $derived(stateQuery.data);
	const characters = $derived(charactersQuery.data);

	const characterLeft = $derived(characterById(characters, stateData?.opponent1Id));
	const characterRight = $derived(characterById(characters, stateData?.opponent2Id));
	const characterWinner = $derived(
		stateData?.winner == 1 ? characterLeft : stateData?.winner == 2 ? characterRight : null,
	);
	const characterTeam = $derived(stateData?.team == 1 ? characterLeft : stateData?.team == 2 ? characterRight : null);

	const characterTourneyWinner1 = $derived(characterById(characters, stateData?.tourneyWinner1));
	const characterTourneyWinner2 = $derived(characterById(characters, stateData?.tourneyWinner2));
	const characterTourneyWinner3 = $derived(characterById(characters, stateData?.tourneyWinner3));

	let clickBtnAnim = $state<HTMLDivElement>();
	let circles = $state([] as { id: string; x: number; y: number; transform: string; old: boolean }[]);
	let bigCircles = $state([] as { id: string }[]);

	const SINGLE_TRANSPARENT_PIXEL =
		"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAEElEQVR4AQEFAPr/AAAAAAAABQABZHiVOAAAAABJRU5ErkJggg==";

	// $effect(() => {
	// 	const t = setInterval(() => {
	// 		if (!stateQuery.isFetching) stateQuery.refetch();
	// 	}, 5000);

	// 	return () => clearInterval(t);
	// });

	$effect(() => {
		if (!stateData || stateData.counter <= 0) {
			counter = 0;
			return;
		}

		counter = stateData.counter;

		const timer = setInterval(() => {
			counter = Math.max(counter - 1, 0);
			if (counter == 0) {
				stateQuery.refetch();
			}
		}, 1000);

		return () => clearInterval(timer);
	});

	$effect(() => {
		if (stateData?.state != "going" || clicks == 0 || sendClick.isPending) return;

		const timeSinceLast = Date.now() - lastClickSend;
		const delayRemaining = Math.max(0, sendDelay - timeSinceLast);

		const t = setTimeout(() => {
			if (clicks > 0) {
				sendClick.mutate(clicks);
				clicks = 0;
				sendDelay = randomInt(1000, 3000);

				circles = circles
					.filter((c) => !c.old)
					.map((c) => {
						c.old = true;
						c.transform += " translateY(-100vh)";
						return c;
					});
				const id = crypto.randomUUID();
				bigCircles.push({ id });
				setTimeout(() => {
					bigCircles = bigCircles.filter((c) => c.id !== id);
				}, 1000);
			}
		}, delayRemaining);

		return () => clearTimeout(t);
	});
	$effect(() => {
		if (stateData?.state == "going") {
			window.scrollTo(0, 0);
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}
		return () => {
			document.body.style.overflow = "";
		};
	});
</script>

{#if stateQuery.isLoading || selectTeam.isPending}
	<Spinner />
{/if}
<DisplayError requestRes={stateQuery} />
<DisplayError requestRes={charactersQuery} />
<DisplayError requestRes={selectTeam} />
<DisplayError requestRes={sendClick} />

{#if stateQuery.isLoading || stateData?.state == "wait"}
	<div class="centeredText">
		{#if stateData}
			<p>{stateData.startPhrase.replaceAll("$", stateData.start)}</p>
		{:else}
			<p>Загрузка...</p>
		{/if}
	</div>
{:else if stateData?.team == 0 && (stateData?.state == "start" || stateData?.state == "going")}
	<div class="centeredText">
		<h2>Победить должен</h2>
		{#if charactersQuery.isLoading || selectTeam.isPending}
			<Spinner />
		{:else}
			<div class="teamSelect">
				<button onclick={() => selectTeam.mutate(1)} disabled={selectTeam.isPending || selectTeam.isSuccess}>
					{@render Character(characterLeft)}
				</button>
				<button onclick={() => selectTeam.mutate(2)} disabled={selectTeam.isPending || selectTeam.isSuccess}>
					{@render Character(characterRight)}
				</button>
			</div>
		{/if}
	</div>
{:else if stateData?.state == "start"}
	<div class="centeredText">
		<h2>Дождитесь начала</h2>
		<p>Ваш выбор: {characterTeam?.name || "N/A"}</p>
		<h1>{Math.floor(counter / 60)}:{(counter % 60).toString().padStart(2, "0")}</h1>
	</div>
{:else if stateData?.state == "going"}
	<button
		class="clickBtn"
		style:--_c={characterTeam?.color}
		onclick={(e) => {
			e.preventDefault();
			clicks += 1;
			if (!clickBtnAnim) return;

			const rectTo = clickBtnAnim.getBoundingClientRect();

			const x = e.clientX - rectTo.left;
			const y = e.clientY - rectTo.top;

			const i = circles.filter((c) => !c.old).length;
			const a = Math.PI * 2 * Math.pow(i / 6, 0.6);
			const d = (Math.pow(i / 4, 0.5) / Math.PI) * 2 * 32;

			const tx = rectTo.left + Math.cos(a) * d;
			const ty = rectTo.top + Math.sin(a) * d;

			const transform = `translate(-50%, -50%) translate(${tx - e.clientX}px, ${ty - e.clientY}px)`;

			const id = crypto.randomUUID();
			const circle = $state({ id, x, y, transform: "translate(-50%, -50%) translate(0px, 0px)", old: false });
			circles.push(circle);

			setTimeout(() => {
				if (!circle.old) circle.transform = transform;
			}, 200);
		}}
	>
		<p>Ваш выбор: {characterTeam?.name || "N/A"}</p>
		<div bind:this={clickBtnAnim} class="clickBtn__anim">
			{#each bigCircles as circle (circle.id)}
				<div class="clickBtn__bigCircle"></div>
			{/each}
			{#each circles as circle (circle.id)}
				<div
					in:scale={{ duration: 150 }}
					class="clickBtn__circle"
					style:left="{circle.x}px"
					style:top="{circle.y}px"
					style:transform={circle.transform}
				></div>
			{/each}
		</div>
		<h1>Жми!!!</h1>
	</button>
{:else if stateData?.state == "end"}
	<div class="centeredText">
		<h2>{stateData.winner == 0 ? "Игра завершена!" : stateData.team == stateData.winner ? "Победа!" : "Проигрыш!"}</h2>
		<p>{characterWinner?.name || "..."} побеждает!</p>
	</div>
{:else if stateData?.state == "tourneyEnd"}
	<div class="centeredText">
		<h1>Турнир завершён!</h1>
		<div class="tourneyResult">
			<h2>1 место</h2>
			{@render Character(characterTourneyWinner1)}
			<h2>2 место</h2>
			{@render Character(characterTourneyWinner2)}
			<h2>3 место</h2>
			{@render Character(characterTourneyWinner3)}
		</div>
	</div>
{/if}

{#snippet Character(character: TourneyCharacter | undefined)}
	<div class="character" style:--_c={character?.color || "transparent"}>
		<img src={character?.img ? getApiUrl(character.img) : SINGLE_TRANSPARENT_PIXEL} alt="" />
		<span>{character?.name || "N/A"}</span>
	</div>
{/snippet}

<style>
	p {
		font-size: 1.25em;
		font-weight: 400;
	}
	h1 {
		font-size: 1.7em;
		font-weight: 700;
	}
	h2 {
		font-size: 1.4em;
		font-weight: 600;
	}

	.centeredText {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		text-align: center;
		flex-direction: column;
		gap: 1em;
	}

	.teamSelect {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		gap: 1em;
		margin-top: 1em;
	}
	.teamSelect > * {
		width: 100%;
	}
	.character {
		width: 100%;
		min-width: 12em;
		border: 2px solid currentColor;
		padding: 0.5em;
		display: grid;
		grid-template-columns: 4em 1fr;
		grid-template-rows: 4em;
		gap: 0.5em;
		align-items: center;
		box-shadow:
			inset 0 0 4px 1px var(--_c),
			0 0 4px 1px var(--_c);
	}
	.character img {
		width: 100%;
		height: 100%;
		object-fit: scale-down;
	}

	.clickBtn {
		-webkit-tap-highlight-color: transparent;
		outline: none;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-around;
		user-select: none;
	}
	.clickBtn__anim {
		position: relative;
		width: 1px;
		height: 1px;
		pointer-events: none;
	}
	.clickBtn__circle {
		position: absolute;
		width: 2em;
		height: 2em;
		background-color: var(--_c, currentColor);
		border: 2px solid currentColor;
		border-radius: 50%;
		transition: transform 250ms ease;
	}
	.clickBtn__bigCircle {
		position: absolute;
		width: 10em;
		height: 10em;
		border: 2px solid currentColor;
		border-radius: 50%;
		animation: clickBtn__bigCircle 250ms ease;
		transform: translate(-50%, -50%) scale(0);
	}
	@keyframes clickBtn__bigCircle {
		0% {
			transform: translate(-50%, -50%) scale(0);
			opacity: 1;
		}
		50% {
			opacity: 1;
		}
		100% {
			transform: translate(-50%, -50%) scale(1);
			opacity: 0;
		}
	}

	.tourneyResult {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.25rem;
		overflow: auto;
	}
	.tourneyResult h2 {
		margin-top: 1rem;
	}
</style>
