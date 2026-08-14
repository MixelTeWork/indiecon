<script lang="ts">
	import { fade } from "svelte/transition";
	import Game from "./Game.svelte";
	import { useMutationLogout, useUser } from "$lib/api/user";
	import { useTicketLoginEnabled } from "$lib/api/other";
	import { getTitle } from "$lib/utils/getTtile";
	import Spinner from "$lib/components/Spinner.svelte";
	import Auth from "./Auth.svelte";
	import { useGameState } from "$lib/api/game";
	import { useTourneyCharacters } from "$lib/api/tourney";

	useTourneyCharacters(); // preload
	const user = useUser();
	const gstate = useGameState();
	const ticketLoginEnabled = useTicketLoginEnabled();
	const logout = useMutationLogout();

	// eslint-disable-next-line svelte/prefer-writable-derived
	let DEV_isGameTestEnabled = $state(false);
	$effect(() => {
		DEV_isGameTestEnabled = localStorage.getItem("DEV_isGameTestEnabled") == "1";
	})

	let isintroVisible = $state(true);
	// let isintroVisible = $state(false);
	let isStartCircleExpanded = $state(false);
	let isRectsShrinked = $state(false);
	async function start() {
		if (!ticketLoginEnabled.data?.value) return;
		if (isStartCircleExpanded) return;
		isStartCircleExpanded = true;
		await new Promise((r) => setTimeout(r, 1000));
		isRectsShrinked = true;
		gstate.refetch();
		await new Promise((r) => setTimeout(r, 500));
		isintroVisible = false;
	}

	$effect(() => {
		if (ticketLoginEnabled.data?.value) return;
		if (ticketLoginEnabled.isFetching) return;
		const timeout = setTimeout(() => {
			ticketLoginEnabled.refetch();
		}, 60 * 1000);
		return () => clearTimeout(timeout);
	});

	$effect(() => {
		const t = setInterval(() => {
			if (!gstate.isFetching) gstate.refetch();
		}, 5000);

		return () => clearInterval(t);
	});
</script>

<svelte:head>
	<title>{getTitle("Голосование")}</title>
</svelte:head>

<section class="borderedCard">
	{#if isintroVisible}
		{#if user.data?.auth}
			{#if logout.isPending}
				<Spinner />
			{/if}
			<button class="user" onclick={() => logout.mutate()} disabled={logout.isPending || logout.isSuccess}>
				{@render logoutIcon()}
				<span>{user.data.name}</span>
			</button>
		{/if}
		<div class="introBox" transition:fade>
			<h1>Голосование</h1>
			{#if (DEV_isGameTestEnabled && ticketLoginEnabled.isLoading) || ticketLoginEnabled.data?.value}
				<button class="playBtn" onclick={start}>
					{#if ticketLoginEnabled.isLoading}
						{@render loadingIcon()}
					{:else}
						{@render playIcon()}
					{/if}
					<div class={["playBtnCircle", isStartCircleExpanded && "playBtnCircle_expanded"]}></div>
				</button>
			{:else if DEV_isGameTestEnabled && ticketLoginEnabled.error}
				<p style:color="tomato">Произошла ошибка :(</p>
			{:else}
				<p>Время ещё не пришло</p>
				{#if gstate.data}
					<p>{gstate.data.startPhrase.replaceAll("$", gstate.data.start)}</p>
				{/if}
			{/if}
			<div class={["rects", isStartCircleExpanded && "rects_expanded", isRectsShrinked && "rects_shrinked"]}>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</div>
	{:else if user.isLoading}
		<Spinner />
	{:else if !user.data?.auth}
		<Auth />
	{:else}
		<Game />
	{/if}

	<input
		class={["dev_hiddenTogle", DEV_isGameTestEnabled && "dev_hiddenTogle_enabled"]}
		type="text"
		oninput={(e) => {
			const target = e.currentTarget as HTMLInputElement;
			const v = target.value.toLowerCase().trim();
			if (v == "тыква"){
				const wasEnabled = localStorage.getItem("DEV_isGameTestEnabled") == "1";
				const enabled = !wasEnabled;
				localStorage.setItem("DEV_isGameTestEnabled", enabled ? "1" : "0");
				DEV_isGameTestEnabled = enabled;
				target.value = "";
			}
		}}
	/>
</section>

{#snippet playIcon()}
	<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 -960 960 960" width="1em" fill="currentColor"
		><path
			d="M320-273v-414q0-17 12-28.5t28-11.5q5 0 10.5 1.5T381-721l326 207q9 6 13.5 15t4.5 19q0 10-4.5 19T707-446L381-239q-5 3-10.5 4.5T360-233q-16 0-28-11.5T320-273Z"
		/></svg
	>
{/snippet}
{#snippet logoutIcon()}
	<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 -960 960 960" width="1em" fill="currentColor"
		><path
			d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h240q17 0 28.5 11.5T480-800q0 17-11.5 28.5T440-760H200v560h240q17 0 28.5 11.5T480-160q0 17-11.5 28.5T440-120H200Zm487-320H400q-17 0-28.5-11.5T360-480q0-17 11.5-28.5T400-520h287l-75-75q-11-11-11-27t11-28q11-12 28-12.5t29 11.5l143 143q12 12 12 28t-12 28L669-309q-12 12-28.5 11.5T612-310q-11-12-10.5-28.5T613-366l74-74Z"
		/></svg
	>
{/snippet}
{#snippet loadingIcon()}
	<svg class="loadingIcon" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 -960 960 960" width="1em" fill="currentColor"
		><path
			d="M240-478q0 16 2 31.5t7 30.5q5 17-1 32.5T227-361q-16 8-31.5 1.5T175-383q-8-23-11.5-47t-3.5-48q0-134 93-228t227-94h7l-36-36q-11-11-11-28t11-28q11-11 28-11t28 11l104 104q12 12 12 28t-12 28L507-628q-11 11-28 11t-28-11q-11-11-11-28t11-28l36-36h-7q-100 0-170 70.5T240-478Zm480-4q0-16-2-31.5t-7-30.5q-5-17 1-32.5t21-22.5q16-8 31.5-1.5T785-577q8 23 11.5 47t3.5 48q0 134-93 228t-227 94h-7l36 36q11 11 11 28t-11 28q-11 11-28 11t-28-11L349-172q-12-12-12-28t12-28l104-104q11-11 28-11t28 11q11 11 11 28t-11 28l-36 36h7q100 0 170-70.5T720-482Z"
		/></svg
	>
{/snippet}

<style>
	section {
		margin: 1em;
		padding: 1em;
		height: calc(100dvh - var(--header-height) - 3em);
		display: flex;
		overflow: hidden;
		position: relative;
	}
	.user {
		position: absolute;
		left: 1em;
		top: 1em;
		font-size: 0.8em;
		display: flex;
		gap: 0.25em;
		font-weight: 400;
		z-index: 2;
	}
	.user svg {
		flex-shrink: 0;
	}
	.introBox {
		position: absolute;
		inset: 0;
		padding: 1em;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
		gap: 1rem;
	}
	h1 {
		font-size: 2rem;
		font-weight: 600;
		text-transform: uppercase;
	}
	.playBtn {
		font-size: 3rem;
		color: var(--theme-accent-text);
		background-color: var(--theme-accent-bg);
		width: 5rem;
		height: 5rem;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 150ms ease-out;
		box-shadow: 0 0 0 0px var(--theme-accent-bg);
	}
	@media (pointer: fine) {
		.playBtn:hover {
			box-shadow: 0 0 0 0.5rem var(--theme-accent-bg);
		}
	}
	.loadingIcon {
		animation: loadingIcon 1s infinite;
	}
	@keyframes loadingIcon {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
	.playBtnCircle {
		content: "";
		position: absolute;
		z-index: 3;
		background-color: var(--theme-accent-bg);
		border-radius: 50%;
		width: 0em;
		height: 0em;
		transition: all 250ms ease-in;
	}
	.playBtnCircle_expanded {
		width: 200vmax;
		height: 200vmax;
	}
	.rects {
		pointer-events: none;
	}
	.rects > div {
		position: absolute;
		z-index: 4;
		border: 0.2rem solid var(--theme-accent-text);
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		transition: all 250ms ease-in;
		transition-delay: calc(250ms + var(--_d) * 250ms);
	}
	.rects > div:nth-child(1) {
		--_d: 0;
		--_s: 1.6rem;
	}
	.rects > div:nth-child(2) {
		--_d: 1;
		--_s: 3.2rem;
	}
	.rects > div:nth-child(3) {
		--_d: 2;
		--_s: 4.8rem;
	}
	.rects > div:nth-child(4) {
		--_d: 3;
		--_s: 6.4rem;
	}
	.rects_expanded > div {
		left: var(--_s);
		top: var(--_s);
		width: calc(100% - var(--_s) * 2);
		height: calc(100% - var(--_s) * 2);
	}
	.rects_shrinked > div {
		left: -1rem;
		top: -1rem;
		width: calc(100% + 2rem);
		height: calc(100% + 2rem);
		transition-delay: 0ms;
		transition-duration: 500ms;
		transition-timing-function: cubic-bezier(1, -2.14, 0.93, 0.47);
	}

	.dev_hiddenTogle {
		position: absolute;
		background-color: transparent;
		border-radius: 0.25em;
		border: none;
		top: 4px;
		right: 4px;
		width: 4em;
	}
	.dev_hiddenTogle_enabled {
		border: 1px solid red;
	}
</style>
