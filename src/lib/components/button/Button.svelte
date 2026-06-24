<script module>
	import { clamp } from "$lib/utils/clamp";
	import { ReactiveResizeValue } from "$lib/utils/reactiveResizeValue.svelte";
	const scale = new ReactiveResizeValue(() => clamp(0.7, window.innerWidth / 600, 1), 0.7);
</script>

<script lang="ts">
	/* eslint-disable svelte/no-navigation-without-resolve */
	import back from "./back.svg";
	import back2 from "./back2.svg";
	import arrow from "./arrow.svg";
	import type { HTMLButtonAttributes, HTMLAnchorAttributes } from "svelte/elements";
	scale.registerOnMount();

	const {
		children,
		size = 1,
		small,
		arrow: addArrow = false,
		white_arrow = false,
		href,
		class: className,
		...props
	}: HTMLButtonAttributes &
		HTMLAnchorAttributes & {
			size?: number;
			small?: boolean;
			arrow?: boolean;
			white_arrow?: boolean;
		} = $props();

	const backUrl = $derived(`url("${small ? back2 : back}")`);
</script>

{#if href}
	<a
		{href}
		{...props}
		style:--button-scale={scale.value}
		style:--back={backUrl}
		style:--size={size}
		class={[className, "btn", addArrow && "btn_arrow", small && "btn_small"]}
	>
		{@render children?.()}
		{#if addArrow}
			<img src={arrow} alt="" class={["arrow", white_arrow && "white_arrow"]} />
		{/if}
	</a>
{:else}
	<button
		{...props}
		style:--button-scale={scale.value}
		style:--back={backUrl}
		style:--size={size}
		class={[className, "btn", addArrow && "btn_arrow", small && "btn_small"]}
	>
		{@render children?.()}
		{#if addArrow}
			<img src={arrow} alt="" class={["arrow", white_arrow && "white_arrow"]} />
		{/if}
	</button>
{/if}

<style>
	.btn {
		/* --_s: clamp(0.7, 100vw / 600px, 1); */
		--_s: var(--button-scale);
		position: relative;
		display: inline-block;
		border: 30px solid transparent;
		border-width: 16px 20px 32px 16px;
		border-image: var(--back) 16 20 32 16 fill / 16px 20px 32px 16px repeat;
		padding: 0.1em 0.5em;
		color: black;
		font-family: "Zero Cool", Arial, Helvetica, sans-serif;
		/* font-size: 1.8rem; */
		font-size: calc(clamp(1.75rem, 0.8281rem + 1.75vw, 2.1875rem) * var(--size, 1));
		transition: filter 100ms;
		white-space: nowrap;
	}
	.btn:hover,
	.btn:focus-visible {
		filter: invert(1);
	}
	.btn_arrow {
		margin-right: calc(7rem * var(--_s));
	}
	.btn_small {
		padding: 0.5rem 1rem;
		border-width: 8px 12px 22px 8px;
		border-image: var(--back) 8 12 22 8 fill / 8px 12px 22px 8px repeat;
	}
	.arrow {
		position: absolute;
		top: 50%;
		right: -20px;
		transform: translate(100%, -50%) scale(var(--_s));
		transform-origin: left;
	}
	:global(.dark) .arrow,
	.white_arrow {
		filter: invert(1);
	}
</style>
