import type { ImgData } from "$lib/api/api";

export default async function imagefileToData(file: File, name?: string)
{
	try
	{
		const imgBase64 = await new Promise((resolve: (a: { result: string | ArrayBuffer | null, error: string | DOMException | null }) => void) =>
		{
			const reader = new FileReader();
			reader.addEventListener("loadend", () =>
			{
				resolve({
					result: reader.result,
					error: reader.error,
				});
			});
			reader.readAsDataURL(file);
		});
		if (imgBase64.error)
		{
			console.error(imgBase64.error);
			return null;
		}
		return {
			data: imgBase64.result,
			name: name || file.name,
			error: "",
		} as ImgData
	}
	catch
	{
		return null;
	}
}