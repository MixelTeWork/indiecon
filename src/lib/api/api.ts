import { PUBLIC_API_URL } from "$env/static/public";
import { fetchJsonGet, fetchDelete, fetchJsonPost, fetchPost } from "$lib/utils/fetch";
import { createMutation, createQuery, useQueryClient, type QueryClient, type QueryKey } from "@tanstack/svelte-query";


export class ApiError extends Error { }

export type Modify<T, R> = Omit<T, keyof R> & R;
export interface ResponseMsg
{
	msg: string,
}

export interface ImgData
{
	data: string,
	name: string,
}

export function getApiUrl(path: string)
{
	return PUBLIC_API_URL.trim().replace(/[/]+$/, "") + "/" + path.trim().replace(/^[/]+/, "");
}

export function stdQuery<T>(queryKey: QueryKey, url: string)
{
	return () => createQuery(() => ({
		queryKey: queryKey,
		queryFn: async () => await fetchJsonGet<T>(url),
	}));
}
export function itemQuery<T>(queryKey: (id: number) => QueryKey, url: TItemUrl)
{
	return (id: number, enabled = true) => createQuery(() => ({
		queryKey: queryKey(id),
		queryFn: async () => await fetchJsonGet<T>(itemUrl(url, id)),
		enabled: enabled && id >= 0,
	}));
}

type TItemUrl = string | ((id: number) => string);
function itemUrl(url: TItemUrl, id: number)
{
	return typeof url == "function" ? url(id) : `${url}/${id}`;
}


export function queryInvalidate(queryClient: QueryClient, queryKey: QueryKey, exact = true)
{
	queryClient.invalidateQueries({ queryKey, exact });
}

export function queryListAddItem<T>(queryClient: QueryClient, queryKey: QueryKey, item: T)
{
	if (queryClient.getQueryState(queryKey)?.status == "success")
		queryClient.setQueryData(queryKey, (items?: T[]) => items ? [...items, item] : undefined);
}

export function queryListUpdateItem<T extends ObjWithId>(queryClient: QueryClient, queryKey: QueryKey, item: T)
{
	if (queryClient.getQueryState(queryKey)?.status == "success")
		queryClient.setQueryData(queryKey, (items?: T[]) => items?.map(v => v.id == item.id ? item : v));
}

export function queryListDeleteItem<T extends ObjWithId>(queryClient: QueryClient, queryKey: QueryKey, itemId: number | string)
{
	if (queryClient.getQueryState(queryKey)?.status == "success")
		queryClient.setQueryData(queryKey, (items?: T[]) => items?.filter(v => v.id != itemId));
}

interface ObjWithId
{
	id: number | string,
}

export function stdMutation<TData, TRes>(url: TUrl<TData>, onSuccessM?: (queryClient: QueryClient, data: TRes) => void, preprocessReqData: (data: TData) => any = d => d)
{
	return (onSuccess?: (data: TRes) => void, onError?: (err: any) => void) =>
	{
		const queryClient = useQueryClient();
		const mutation = createMutation(() => ({
			mutationFn: async (data: TData) =>
				await fetchJsonPost<TRes>(getUrl(url, data), preprocessReqData(data)),
			onSuccess: (data: TRes) =>
			{
				onSuccessM?.(queryClient, data);
				onSuccess?.(data);
			},
			onError: onError,
		}));
		return mutation;
	}
}

export function stdMutationNoRes<TData>(url: TUrl<TData>, onSuccessM?: (queryClient: QueryClient, data: TData) => void, preprocessReqData: (data: TData) => any = d => d)
{
	return (onSuccess?: () => void, onError?: (err: any) => void) =>
	{
		const queryClient = useQueryClient();
		const mutation = createMutation(() => ({
			mutationFn: async (data: TData) =>
			{
				await fetchPost(getUrl(url, data), preprocessReqData(data));
				return data;
			},
			onSuccess: (data: TData) =>
			{
				onSuccessM?.(queryClient, data);
				onSuccess?.();
			},
			onError: onError,
		}));
		return mutation;
	}
}

type TUrl<T> = string | ((data: T) => string);
function getUrl<T>(url: TUrl<T>, data: T)
{
	return typeof url == "function" ? url(data) : url;
}

export function itemMutation<TData, TRes>(url: TItemUrl, onSuccessM?: (queryClient: QueryClient, data: TRes) => void, preprocessReqData: (data: TData, id: number) => any = d => d)
{
	return (id: number, onSuccess?: (data: TRes) => void, onError?: (err: any) => void) =>
	{
		const queryClient = useQueryClient();
		const mutation = createMutation(() => ({
			mutationFn: async (data: TData) =>
				await fetchJsonPost<TRes>(itemUrl(url, id), preprocessReqData(data, id)),
			onSuccess: (data: TRes) =>
			{
				onSuccessM?.(queryClient, data);
				onSuccess?.(data);
			},
			onError: onError,
		}));
		return mutation;
	}
}

export function itemDeleteMutation(url: TItemUrl, onSuccessM?: (queryClient: QueryClient, id: number) => void)
{
	return (id: number, onSuccess?: () => void, onError?: (err: any) => void) =>
	{
		const queryClient = useQueryClient();
		const mutation = createMutation(() => ({
			mutationFn: async () =>
				await fetchDelete(itemUrl(url, id)),
			onSuccess: () =>
			{
				onSuccessM?.(queryClient, id);
				onSuccess?.();
			},
			onError: onError,
		}));
		return mutation;
	}
}
