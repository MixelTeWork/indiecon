import { browser } from "$app/environment";

class ThemeManager {
	private _current = $state<"light" | "dark">("light");

	constructor() {
		if (browser) {
			this._current = document.documentElement.classList.contains("dark") ? "dark" : "light";
		}
	}

	get current() {
		return this._current;
	}

	toggle = () => {
		this._current = this._current == "light" ? "dark" : "light";
		if (!browser) return;

		localStorage.setItem("theme", this._current);
		const root = document.documentElement;
		if (this._current == "dark") {
			root.classList.add("dark");
		} else {
			root.classList.remove("dark");
		}
	}
}

export const theme = new ThemeManager();
