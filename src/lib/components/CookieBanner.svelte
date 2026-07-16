<script>
	import { resolve } from "$app/paths";
	import { onMount } from "svelte";

	let showBanner = $state(false);

	onMount(() => {
		const consent = localStorage.getItem("cookie-consent");
		if (!consent) {
			showBanner = true;
		} else if (consent == "accepted") {
			enableMetrica();
		}
	});

	function enableMetrica() {
		if (typeof window !== "undefined" && "initYM" in window && typeof window.initYM == "function") {
			window.initYM();
		}
	}

	function acceptCookies() {
		localStorage.setItem("cookie-consent", "accepted");
		showBanner = false;
		enableMetrica();
	}

	function declineCookies() {
		localStorage.setItem("cookie-consent", "declined");
		showBanner = false;
	}
</script>

{#if showBanner}
	<div class="banner">
		<div class="content">
			<p>
				Мы используем cookies для улучшения работы сайта. Подробности в
				<a href={resolve("/privacy-policy")}>Политике конфиденциальности</a>.
			</p>
			<div class="buttons">
				<button onclick={declineCookies} class="btn-decline">Отклонить</button>
				<button onclick={acceptCookies} class="btn-accept">Принять</button>
			</div>
		</div>
	</div>
{/if}

<style>
	.banner {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: var(--theme-main-bg);
		color: var(--theme-main-text);
		transition: var(--theme-transition);
		padding: 1rem;
		box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.3);
		z-index: 9999;
	}

	.content {
		max-width: 1200px;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
		gap: 1rem;
	}

	p {
		font-size: 0.9rem;
	}

	a {
		color: var(--theme-main-link);
		transition: var(--theme-transition);
		text-decoration: underline;
	}

	.buttons {
		display: flex;
		gap: 0.5rem;
	}

	button {
		padding: 0.5rem 1rem;
		border-radius: 4px;
		font-weight: 600;
	}

	.btn-accept {
		background-color: #22c828;
		color: white;
	}

	.btn-decline {
		background-color: #ff6347;
		color: white;
	}
</style>
