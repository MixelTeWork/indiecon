export function textWave(
	node: HTMLElement,
	{ magnitude = 0.15, duration = 2, delay = 500 }: { magnitude?: number; duration?: number; delay?: number } = {},
) {
	if (node.firstElementChild) {
		console.error("textWave() can be used only on a node with text");
		return;
	}
	node.style.setProperty("--m", `${magnitude}`);
	node.style.setProperty("--dur", `${duration}`);
	node.style.setProperty("--d", `${delay}`);
	let i = 0;
	node.innerHTML = node.innerHTML
		.split(" ")
		.map((word) => word.replace(/(.)/g, (ch) => `<span style="--d:${i++ * delay}">${ch}</span>`))
		.map((word) => `<span>${word}</span>`)
		.join(" ");
	node.classList.add("textWave");
}
