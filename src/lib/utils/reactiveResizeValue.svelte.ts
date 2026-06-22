import { onMount } from "svelte";

class GlobalResizeManager {
	private static listeners = new Set<() => void>();
	private static isListening = false;

	private static handleResize = () => {
		for (const listener of this.listeners) {
			listener();
		}
	};

	public static add(listener: () => void) {
		this.listeners.add(listener);
		if (!this.isListening && typeof window !== "undefined") {
			window.addEventListener("resize", this.handleResize);
			this.isListening = true;
		}
	}

	public static remove(listener: () => void) {
		this.listeners.delete(listener);
		if (this.listeners.size === 0 && this.isListening && typeof window !== "undefined") {
			window.removeEventListener("resize", this.handleResize);
			this.isListening = false;
		}
	}
}

export class ReactiveResizeValue {
	public value = $state<string | number>();
	private getValue: () => string | number;

	constructor(getValue: () => string | number, fallback: string | number) {
		this.getValue = getValue;
		this.value = fallback;
	}

	public registerOnMount() {
		onMount(() => {
			this.value = this.getValue();

			const updater = () => {
				this.value = this.getValue();
			};

			GlobalResizeManager.add(updater);

			return () => {
				GlobalResizeManager.remove(updater);
			};
		});
	}
}
