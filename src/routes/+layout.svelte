<script lang="ts">
	import { PUBLIC_BASE_URL } from "$env/static/public";
	import favicon from "$lib/assets/favicon.svg";
	import og_image from "$lib/assets/og_image.jpg";
	import "../app.css";
	import "$lib/fonts/fonts.css";
	import Header from "$lib/components/Header.svelte";
	import Footer from "$lib/components/Footer.svelte";
	import { page } from "$app/state";

	let { children } = $props();
	const url = $derived(new URL(page.url.pathname, PUBLIC_BASE_URL).href);
	const title = "ИНДИКОН 2.0 ӏ 14+ ӏ 15.08 Москва";
	const description =
		"Любите инди игры и инди анимацию? Хотели бы встретить единомышленников, посмотреть на интересный мерч и поучаствовать в разнообразных активностях? Тогда добро пожаловать на наш фестиваль!";
	const imgWidth = "1822";
	const imgHeight = "728";
	const img = $derived(new URL(og_image, PUBLIC_BASE_URL).href);
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={url} />
	<!-- <meta name="theme-color" content="#a52a2a" /> -->

	<meta property="og:title" content={title} />
	<meta property="og:type" content="website" />
	<meta property="og:image" content={img} />
	<meta property="og:url" content={url} />

	<meta property="og:description" content={description} />
	<meta property="og:locale" content="ru_RU" />

	<meta property="og:image:type" content="image/jpeg" />
	<meta property="og:image:width" content={imgWidth} />
	<meta property="og:image:height" content={imgHeight} />

	<meta name="twitter:site" content={url} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={img} />
</svelte:head>

<div class="app">
	<Header />

	<main>
		{@render children()}
	</main>

	<Footer />
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}
	main {
		flex-grow: 1;
	}
</style>
