<script>
	import { resolve } from "$app/paths";
	import { theme } from "$lib/utils/ThemeManager.svelte";
	import logo from "$lib/assets/logo.svg";

	let open = $state(false);

	const navItems = [
		{ name: "Информация", href: resolve("/info") },
		{ name: "Билеты", href: resolve("/?p=tickets") },
		{ name: "Прошедшее", href: resolve("/?p=past") },
		{ name: "О нас", href: resolve("/?p=about") },
		{ name: "Квест", href: resolve("/?p=quest") },
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
		<button class="theme-toggle lg-hide" onclick={theme.toggle} aria-label="Переключение темы"> Светл/Темн </button>
	</nav>

	<button class="theme-toggle sm-hide" onclick={theme.toggle} aria-label="Переключение темы"> Светл/Темн </button>
	<button class="menu-toggle lg-hide" onclick={() => (open = !open)} aria-label="Переключение темы">
		<span></span>
		<span></span>
		<span></span>
	</button>
</header>

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
