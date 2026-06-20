<script lang="ts">
	import { resolve } from "$app/paths";
	import { theme } from "$lib/utils/ThemeManager.svelte";
	import logo from "$lib/assets/logo.svg";
	// import { showImgsAlt } from "$lib/utils/showImgsAlt";

	// $effect(() => {
	// 	const i = setInterval(showImgsAlt, 200);
	// 	return () => clearInterval(i);
	// });

	let open = $state(false);

	const navItems = [
		{ name: "Информация", href: resolve("/info") },
		{ name: "Билеты", href: resolve("/tickets") },
		{ name: "Прошедшее", href: resolve("/past_festivals") },
		{ name: "О нас", href: resolve("/about") },
		{ name: "Квест", href: resolve("/quest") },
	];
</script>

<header class={{ open }}>
	<a class="logo" href={resolve("/")} onclick={() => (open = false)}>
		<img src={logo} alt="Индикон" />
	</a>

	<nav>
		{#each navItems as { name, href } (href)}
			<a {href} class="nav-item" onclick={() => (open = false)}>{name}</a>
		{/each}
	</nav>

	<div class="right-block">
		<button class="theme-toggle" onclick={theme.toggle} aria-label="Переключение темы">
			{@render sun()}
			{@render moon()}
		</button>
		<button class="menu-toggle lg-hide" onclick={() => (open = !open)} aria-label="Открыть меню">
			<span></span>
			<span></span>
			<span></span>
		</button>
	</div>
</header>

{#snippet sun()}
	<svg
		class="sun"
		xmlns="http://www.w3.org/2000/svg"
		height="1em"
		viewBox="0 -960 960 960"
		width="1em"
		fill="currentColor"
		><path
			d="M565-395q35-35 35-85t-35-85q-35-35-85-35t-85 35q-35 35-35 85t35 85q35 35 85 35t85-35Zm-226.5 56.5Q280-397 280-480t58.5-141.5Q397-680 480-680t141.5 58.5Q680-563 680-480t-58.5 141.5Q563-280 480-280t-141.5-58.5ZM80-440q-17 0-28.5-11.5T40-480q0-17 11.5-28.5T80-520h80q17 0 28.5 11.5T200-480q0 17-11.5 28.5T160-440H80Zm720 0q-17 0-28.5-11.5T760-480q0-17 11.5-28.5T800-520h80q17 0 28.5 11.5T920-480q0 17-11.5 28.5T880-440h-80ZM451.5-771.5Q440-783 440-800v-80q0-17 11.5-28.5T480-920q17 0 28.5 11.5T520-880v80q0 17-11.5 28.5T480-760q-17 0-28.5-11.5Zm0 720Q440-63 440-80v-80q0-17 11.5-28.5T480-200q17 0 28.5 11.5T520-160v80q0 17-11.5 28.5T480-40q-17 0-28.5-11.5ZM226-678l-43-42q-12-11-11.5-28t11.5-29q12-12 29-12t28 12l42 43q11 12 11 28t-11 28q-11 12-27.5 11.5T226-678Zm494 495-42-43q-11-12-11-28.5t11-27.5q11-12 27.5-11.5T734-282l43 42q12 11 11.5 28T777-183q-12 12-29 12t-28-12Zm-42-495q-12-11-11.5-27.5T678-734l42-43q11-12 28-11.5t29 11.5q12 12 12 29t-12 28l-43 42q-12 11-28 11t-28-11ZM183-183q-12-12-12-29t12-28l43-42q12-11 28.5-11t27.5 11q12 11 11.5 27.5T282-226l-42 43q-11 12-28 11.5T183-183Zm297-297Z"
		/></svg
	>
{/snippet}
{#snippet moon()}
	<svg
		class="moon"
		xmlns="http://www.w3.org/2000/svg"
		height="1em"
		viewBox="0 -960 960 960"
		width="1em"
		fill="currentColor"
		><path
			d="M480-120q-151 0-255.5-104.5T120-480q0-138 90-239.5T440-838q13-2 23 3.5t16 14.5q6 9 6.5 21t-7.5 23q-17 26-25.5 55t-8.5 61q0 90 63 153t153 63q31 0 61.5-9t54.5-25q11-7 22.5-6.5T819-479q10 5 15.5 15t3.5 24q-14 138-117.5 229T480-120Zm0-80q88 0 158-48.5T740-375q-20 5-40 8t-40 3q-123 0-209.5-86.5T364-660q0-20 3-40t8-40q-78 32-126.5 102T200-480q0 116 82 198t198 82Zm-10-270Z"
		/></svg
	>
{/snippet}

<style>
	header {
		position: sticky;
		top: 0;
		z-index: 10;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem clamp(2rem, 5.5vw, 6rem);
		height: 90px;
		background-color: var(--theme-main-bg);
		transition: var(--theme-transition);
	}

	.right-block {
		display: flex;
		gap: 2em;
	}

	.logo img {
		height: 38px;
	}

	nav {
		display: flex;
		flex-grow: 1;
		justify-content: space-between;
		font-weight: 700;
		padding: 0 3rem;
		max-width: 800px;
	}

	.theme-toggle {
		font-weight: 700;
		font-size: 2rem;
		display: flex;
	}
	.sun {
		display: none;
	}
	:global(.dark) .sun {
		display: unset;
	}
	:global(.dark) .moon {
		display: none;
	}

	.menu-toggle {
		display: flex;
		align-items: center;
		flex-direction: column;
		gap: 0.5rem;
		padding: 0.5rem 0;
	}
	.menu-toggle span {
		width: 2.3rem;
		height: 1px;
		background-color: currentColor;
	}

	@media screen and (max-width: 900px) {
		header {
			height: 80px;
		}
		.logo img {
			height: 24px;
		}
		nav {
			display: none;
		}
		.open nav {
			display: flex;
			flex-direction: column;
			justify-content: space-evenly;
			align-items: center;
			position: absolute;
			left: 0;
			top: 100%;
			width: 100%;
			height: calc(100vh - 80px);
			font-size: 1.25rem;
			max-width: none;
			background-color: var(--theme-main-bg);
			transition: var(--theme-transition);
		}
	}
</style>
