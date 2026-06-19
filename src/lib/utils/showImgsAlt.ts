export function showImgsAlt() {
	document.querySelectorAll("img").forEach((img) => {
		const shown = document.body.dataset.showImgsAlt != "false";
		{
			const text = img.parentNode?.querySelector(".showImgsAlt") as HTMLElement;
			if (text) {
				text.style.opacity = shown ? "1" : "0";
				return;
			}
		}
		if (img.alt == "") return;
		if (img.alt == "Логотип Индикон") return;
		if (img.alt == "Индикон") return;
		if (img.alt == "DETERMINATION") return;
		if (img.closest(".image")) return;
		const container = document.createElement("div");
		container.style.position = "relative";
		container.style.flexShrink = "0";
		if (img.closest(".card__image")) {
			container.style.width = "100%";
			container.style.height = "100%";
		}
		const el = document.createElement("div");
		el.classList.add("showImgsAlt");
		el.innerHTML = img.alt;
		el.style.position = "absolute";
		el.style.bottom = "0";
		el.style.left = "50%";
		el.style.transform = "translateX(-50%)";
		el.style.width = "100%";
		el.style.minWidth = "fit-content";
		el.style.maxWidth = "max-content";
		el.style.color = "#fff";
		el.style.fontFamily = `"Montserrat", Arial, Helvetica, sans-serif`;
		el.style.fontSize = "14px";
		el.style.fontWeight = "500";
		el.style.padding = "0.5rem 1rem";
		el.style.background = "rgba(0, 0, 0,.7)";
		el.style.borderRadius = ".5rem";
		el.style.opacity = shown ? "1" : "0";
		if (img.closest(".gallery")) {
			el.style.bottom = "";
			el.style.top = "0";
		}
		if (img.src.includes("imgs/past_fest/hero_2025.webp")) {
			el.style.zIndex = "2";
			img.parentNode?.insertBefore(el, img);
		} else {
			img.parentNode?.insertBefore(container, img);
			container.appendChild(img);
			container.appendChild(el);
		}
	});
	if (document.getElementById("showImgsAltBtn")) return;
	const btn = document.createElement("button");
	btn.id = "showImgsAltBtn";
	const shown = document.body.dataset.showImgsAlt != "false";
	btn.innerHTML = `${shown ? "Hide" : "Show"} images alt`;
	btn.style.position = "fixed";
	btn.style.top = "0";
	btn.style.left = "0";
	btn.style.zIndex = "999";
	btn.onclick = () => {
		const shown = document.body.dataset.showImgsAlt != "false";
		document.body.dataset.showImgsAlt = shown ? "false" : "true";
		btn.innerHTML = `${shown ? "Show" : "Hide"} images alt`;
		document.querySelectorAll("img").forEach((img) => {
			const text = img.parentNode?.querySelector(".showImgsAlt") as HTMLElement;
			if (!text) return;
			text.style.opacity = shown ? "0" : "1";
		});
	};
	document.body.appendChild(btn);
}
