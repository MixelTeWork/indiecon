let titlePrefix = "";

export function setTitlePrefix(title: string)
{
	titlePrefix = title;
}

export function getTitle(title: string | (string | undefined | null | false)[], prefix?: string)
{
	if (prefix == undefined) prefix = titlePrefix;
	const t = typeof title != "object" ? [title] : title;
	return [prefix, ...t].filter(v => !!v).join(" | ");
}
