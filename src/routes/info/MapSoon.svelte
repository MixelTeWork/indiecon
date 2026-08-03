<script>
	import { textWave } from "$lib/utils/textWave";
</script>

<section><div use:textWave>Скоро тут будет карта</div></section>

<style>
	section {
		height: 85vh;
		margin-top: clamp(4rem, 0.6rem + 13.6vw, 12.5rem);
		font-size: 3em;
		font-weight: 600;
		background-color: var(--theme-accent-bg);
		color: var(--theme-accent-text);
		display: flex;
		align-items: center;
		justify-content: center;
		clip-path: polygon(0 clamp(0px, -32px + 8vw, 64px), 100% 0, 100% 100%, 0 100%);
		overflow: hidden;
	}
	div {
		text-align: center;
	}
</style>
