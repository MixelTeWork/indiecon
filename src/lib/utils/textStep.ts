export function textStep(node: HTMLElement, options = { speed: 150 })
{
	const originalText = node.textContent.trim();
	const letters = originalText.split("");
	node.textContent = "";

	const spans = letters.map(char =>
	{
		const span = document.createElement("span");
		span.textContent = char;
		span.style.textTransform = "lowercase";
		node.appendChild(span);
		return span;
	});

	let currentIndex = 0;
	function step()
	{
		spans[currentIndex].style.textTransform = (spans[currentIndex].style.textTransform == "uppercase" ? "lowercase" : "uppercase");
		// spans[currentIndex].style.textTransform = "lowercase";
		// spans[currentIndex].style.fontWeight = "normal";

		currentIndex = (currentIndex + 1) % spans.length;

		// spans[currentIndex].style.textTransform = "uppercase";
		// spans[currentIndex].style.fontWeight = "bold";
	}

	const intervalId = setInterval(step, options.speed);

	return {
		destroy()
		{
			clearInterval(intervalId);
		}
	}
}