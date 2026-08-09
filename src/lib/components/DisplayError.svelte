<script lang="ts">
	import { ApiError } from "$lib/api/api";
	import type { CreateMutationResult, CreateQueryResult } from "@tanstack/svelte-query";
	import type { Snippet } from "svelte";

	export type RequestResult = CreateMutationResult<any, any, any, any> | CreateQueryResult<any, any>;

	export function formatError(error: any, messageFormatter?: (error: string) => string): string {
		const err = error instanceof ApiError ? error.message : "Ошибка";
		return messageFormatter ? messageFormatter(err) : err;
	}

	let {
		requestRes,
		messageFormatter,
		children,
	}: {
		requestRes: RequestResult;
		messageFormatter?: (error: string) => string;
		children?: Snippet<[string]>;
	} = $props();
</script>

{#if requestRes.isError}
	{@const errorMsg = formatError(requestRes.error, messageFormatter)}

	{#if children}
		{@render children(errorMsg)}
	{:else}
		<h3 style="color: tomato; text-align: center;">{errorMsg}</h3>
	{/if}
{/if}
