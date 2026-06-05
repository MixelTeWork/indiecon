<script>
	import Stripe from "$lib/components/Stripe.svelte";
</script>

<section>
	<div class="clip">
		<div class="text h3">
			<div class="text__left"></div>
			<div class="text__center">
				<div class="text__center__left">
					<p>
						<span>ТУТ СКОРО <br />БУДЕТ КОЕ-ЧТО <br />ИНТЕРЕСНОЕ</span>
						<span class="sm-hide text_elipsis">...</span>
					</p>
				</div>
				<div class="text__center__right"></div>
			</div>
			<div class="text__right"></div>
		</div>
		<div class="circle circle_main">
			<div class="circle circle__inner1">
				<div class="circle circle__inner1__inner"></div>
			</div>
			<div class="circle circle__inner2">
				<div class="circle circle__inner2__inner"></div>
			</div>
		</div>
	</div>
	<Stripe secondary top="2.5rem" reverse>Кое-что интересное</Stripe>
	<Stripe secondary bottom="2.5rem">Кое-что интересное</Stripe>
</section>

<style>
	section {
		position: relative;
		padding-block: 4rem;
		overflow: hidden;
		--m: (1 - clamp(0, (100vw - 400px) / 400px, 1));
	}
	.clip {
		position: relative;
		height: 100%;
		width: 100%;
		height: clamp(330px, 150px + 45vw, 800px);
		clip-path: polygon(0% 8%, 100% 0%, 100% 100%, 0 92%);
		background-color: var(--theme-secondary-bg);
		background-color: black;
		transition: var(--theme-transition);
	}
	.circle_main {
		clip-path: circle(50% at 50% 50%);
		transition: var(--theme-transition);
	}
	.circle {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%) translateX(calc(59% - 10% * var(--m)));
		height: 130%;
		aspect-ratio: 1;
		background-color: var(--theme-accent-bg);
		border-radius: 50%;
	}
	.circle__inner1,
	.circle__inner2 {
		background-color: var(--theme-accent-text);
		background-color: white;
		height: calc(45% - 5% * var(--m));
	}
	.circle__inner1__inner,
	.circle__inner2__inner {
		background-color: var(--theme-secondary-bg);
		background-color: black;
		height: calc(50% - 8% * var(--m));
	}
	.circle__inner1 {
		transform: translate(-50%, -50%) translateX(calc(-25% * var(--m)));
	}
	.circle__inner1__inner {
		transform: translate(-50%, -50%);
		aspect-ratio: 0.5;
	}
	.circle__inner2 {
		left: 0%;
		transform: translate(-10%, -50%);
		aspect-ratio: 0.33;
	}
	.circle__inner2__inner {
		left: 0%;
		transform: translate(10%, -50%);
		aspect-ratio: 0.25;
	}

	.text {
		height: 100%;
		width: 100%;
		display: flex;
		align-items: center;
		font-size: clamp(1rem, -0.3rem + 5.2vw, 4.25rem);
	}
	.text__left {
		flex-grow: 1;
		height: 100%;
		background-color: var(--theme-accent-bg);
		transition: var(--theme-transition);
	}
	.text__right {
		flex-grow: 1;
	}
	.text__center {
		width: 100%;
		height: 100%;
		max-width: 1200px;
		display: grid;
		grid-template-columns: 1.2fr 1fr;
		align-items: center;
		background-color: var(--theme-accent-bg);
		clip-path: polygon(0% 15%, 60% calc(37% + 8% * var(--m)), 60% calc(64% - 8% * var(--m)), 0 85%);
		transition: var(--theme-transition);
	}
	.text__center__left {
		color: var(--theme-accent-text);
		font-size: 0.9em;
		padding-left: 1.2em;
		transition: var(--theme-transition);
	}
	.text_elipsis {
		display: block;
		height: 0;
	}
</style>
