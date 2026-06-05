<script lang="ts">
	import type { Snippet } from "svelte";

	const {
		children,
		secondary,
		reverse,
		top,
		bottom,
	}: {
		children: Snippet;
		secondary?: boolean;
		reverse?: boolean;
		top?: string;
		bottom?: string;
	} = $props();
</script>

<h2 class={{ reverse, secondary, h3: 1 }} style:top style:bottom>
	<span>{@render children()}</span>
</h2>

<style>
	h2 {
		--_rot: 2.42deg;
		position: absolute;
		width: 120%;
		background-color: var(--theme-accent-bg);
		color: var(--theme-accent-text);
		padding: min(0.75em, 2rem);
		padding-left: calc(min(0.75em, 2rem) + 0.5em);
		text-transform: uppercase;
		text-align: center;
		transition: var(--theme-transition);
		transform: translateX(-10%) rotate(var(--_rot));
	}
	.reverse {
		transform: translateX(-10%) rotate(calc(-1 * var(--_rot)));
	}
	.secondary {
		--_rot: 3.12deg;
		background-color: var(--theme-secondary-bg);
		color: var(--theme-secondary-text);
		padding: min(0.5em, 1.8rem);
		padding-left: calc(min(0.5em, 1.8rem) + 0.5em);
	}
	.secondary span {
		font-size: calc(1.2em - 0.2em * clamp(0, (100vw - 700px) / 400px, 1));
	}
</style>
