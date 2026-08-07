<script lang="ts">
	import { resolve } from "$app/paths";
	import { page } from "$app/state";
	import Button from "$lib/components/button/Button.svelte";
	import { getTitle } from "$lib/utils/getTtile";

	const props: { status?: number } = $props();
	const status = $derived(props.status ?? page.status);
</script>

<svelte:head>
	<title>{getTitle(`${status}`)}</title>
</svelte:head>

<section>
	{#if status == 404}
		<h1 class="h2">Вы забрели не туда</h1>
		<p class="h4">Такой страницы не существует</p>
	{:else}
		<h1 class="h2">{status}</h1>
	{/if}
	<Button href={resolve("/")}>На главную</Button>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding-top: 2rem;
		gap: 2rem;
		min-height: calc(100dvh - var(--header-height) - 3em);
	}

	h1 {
		text-transform: uppercase;
		text-align: center;
	}
</style>
