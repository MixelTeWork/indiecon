<script>
	import { asset, resolve } from "$app/paths";
	import Button from "$lib/components/button/Button.svelte";

	const team = [
		{ id: "p1", name: "ANDREY LIPA", bg: "#002ff7", img: "/imgs/team/andrey.webp" },
		{ id: "p2", name: "САВВАТИЙ SAVVATOZ", bg: "#ff3f25", img: "/imgs/team/savvatiy.webp" },
		{ id: "p3", name: "MINI WOLFI", bg: "#ffbf00", img: "/imgs/team/wolfi.webp" },
		{ id: "p4", name: "МИША UVB", bg: "#000000", img: "/imgs/team/misha.webp" },
		{ id: "p5", name: "КСЕНИЯ МАЗУР", bg: "#d81fff", img: "/imgs/team/ksenia_v2.webp" },
		{ id: "p6", name: "СВЕТА SV_PAK", bg: "#00c3ff", img: "/imgs/team/sveta.webp" },
	];
</script>

<section>
	<h2 class="h3 title">Организаторы</h2>

	<div class="grid-wrapper">
		<div class="logo-overlay">
			<img src={asset("/imgs/team/logo.svg")} alt="Determination Event Team" />
		</div>

		<div class="grid">
			{#each team as member (member.id)}
				<div class={["grid__card", member.id]} style:--bg={member.bg} style:grid-area={member.id}>
					<img src={asset(member.img)} alt={member.name} loading="lazy" />
				</div>
			{/each}

			<div class="grid__card grid__decor_left" style:--bg="#b5ff00" style:grid-area="bg-left"></div>
			<div class="grid__card grid__decor_right" style:--bg="#ffec00" style:grid-area="bg-right"></div>
		</div>
	</div>

	<div class="info">
		<p class="description">
			Determination Event Team — это наша дружная команда. В первую очередь мы друзья, а во вторую (хоть и не менее
			важную) — мы коллеги, которые совместными усилиями хотят создавать интересные, запоминающиеся фестивали,
			объединяющие сообщества людей, которые мы так сильно любим.
		</p>
		<Button href={resolve("/about")} arrow size={0.8}>ОРГАНИЗАТОРЫ</Button>
	</div>
</section>

<style>
	section {
		max-width: 1920px;
		width: 100%;
		margin: 0 auto;
		margin-bottom: clamp(10rem, -3.5rem + 36vw, 28rem);
	}

	.title {
		background-color: var(--theme-secondary-bg);
		color: var(--theme-secondary-text);
		transition: var(--theme-transition);
		text-align: center;
		text-transform: uppercase;
		padding: 0.5em 0;
	}

	.grid-wrapper {
		position: relative;
		width: 100%;
	}

	.logo-overlay {
		position: absolute;
		top: 8%;
		left: 50%;
		transform: translateX(-50%);
		width: max(min(100%, 21rem), 50%);
		z-index: 1;
	}

	.grid {
		display: grid;
		width: 100%;
		grid-template-columns: repeat(4, 1fr);
		grid-template-rows: repeat(2, auto);
		grid-template-areas:
			"p1 p2 p3 p4"
			"bg-left p5 p6 bg-right";
	}
	.p1,
	.p2,
	.p3,
	.p4 {
		padding-top: 100%;
	}

	.grid__card {
		min-width: 0;
		min-height: 0;
		width: 100%;
		background-color: var(--bg);
		overflow: hidden;
	}

	.grid__card img {
		height: 100%;
		width: fit-content;  /* fix issue in webkit browsers */
		aspect-ratio: 0.723;
		object-fit: cover;
	}

	.grid__decor_left {
		clip-path: polygon(0 0, 100% 0, 100% 100%);
	}
	.grid__decor_right {
		clip-path: polygon(0 0, 100% 0, 0% 100%);
	}

	.info {
		max-width: calc(1200px + 2 * 3rem);
		margin: clamp(4rem, -2rem + 16vw, 12rem) auto;
		padding: 0 3rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 4rem;
	}

	.description {
		max-width: 680px;
	}

	@media screen and (max-width: 900px) {
		.grid {
			grid-template-columns: repeat(2, 1fr);
			grid-template-rows: repeat(3, auto);
			grid-template-areas:
				"p1 p2"
				"p3 p4"
				"p5 p6";
		}
		.grid__card {
			padding-top: 20%;
		}
		.p1,
		.p2 {
			padding-top: 80%;
		}

		.grid__decor_left,
		.grid__decor_right {
			display: none;
		}

		.logo-overlay {
			top: 5%;
			width: 80%;
		}

		.info {
			flex-direction: column;
			padding: 0 1.5rem;
		}
	}
</style>
