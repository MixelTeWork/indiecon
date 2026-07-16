declare module '*.md' {
	import type { Component } from 'svelte';

	// Defines the default export as a standard Svelte component
	const component: Component<any>;
	export default component;

	// Defines named exports for frontmatter metadata fields
	export const metadata: Record<string, any>;
	// export const title: string;
	// export const date: string;
	// Add any other specific frontmatter fields you use regularly here
}
