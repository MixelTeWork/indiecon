<script>
	import { resolve } from "$app/paths";
	import logo from "$lib/assets/logo.svg";
	import logo_viviash_light from "$lib/assets/partners/logo_viviash_light.webp";
	import logo_viviash_dark from "$lib/assets/partners/logo_viviash_dark.webp";
	import logo_max_extreme_light from "$lib/assets/partners/logo_max_extreme_light.webp";
	import logo_max_extreme_dark from "$lib/assets/partners/logo_max_extreme_dark.webp";
	import logo_o2_books_light from "$lib/assets/partners/logo_o2_books_light.webp";
	import logo_o2_books_dark from "$lib/assets/partners/logo_o2_books_dark.webp";
	import logo_lb_group_light from "$lib/assets/partners/logo_lb_group_light.webp";
	import logo_lb_group_dark from "$lib/assets/partners/logo_lb_group_dark.webp";
	import logo_polka_chudes_light from "$lib/assets/partners/logo_polka_chudes_light.webp";
	import logo_polka_chudes_dark from "$lib/assets/partners/logo_polka_chudes_dark.webp";
	import logo_locus_solus_light from "$lib/assets/partners/logo_locus_solus_light.webp";
	import logo_locus_solus_dark from "$lib/assets/partners/logo_locus_solus_dark.webp";
	import logo_game4art_light from "$lib/assets/partners/logo_game4art_light.webp";
	import logo_game4art_dark from "$lib/assets/partners/logo_game4art_dark.webp";
	import logo_donatov_net_light from "$lib/assets/partners/logo_donatov_net_light.webp";
	import logo_donatov_net_dark from "$lib/assets/partners/logo_donatov_net_dark.webp";
	import logo_shiba_light from "$lib/assets/partners/logo_shiba_light.webp";
	import logo_shiba_dark from "$lib/assets/partners/logo_shiba_dark.webp";
	import logo_festq_light from "$lib/assets/partners/logo_festq_light.webp";
	import logo_festq_dark from "$lib/assets/partners/logo_festq_dark.webp";
	import logo_rusanimefest_light from "$lib/assets/partners/logo_rusanimefest_light.webp";
	import logo_rusanimefest_dark from "$lib/assets/partners/logo_rusanimefest_dark.webp";

	const email = "event.determination@gmail.com";
	// const phone = "";
	const partners = [
		{ light: logo_viviash_light, dark: logo_viviash_dark, alt: "VIVIASH", url: "https://viviash.com/" },
		{ light: logo_max_extreme_light, dark: logo_max_extreme_dark, alt: "Футболки Макс Экстрим", url: "https://max-extreme.ru/" },
		{ light: logo_o2_books_light, dark: logo_o2_books_dark, alt: "О2 young adult книги", url: "https://o2books.ru/" },
		{ light: logo_lb_group_light, dark: logo_lb_group_dark, alt: "LB Group", url: "https://lb.group/" },
		{ light: logo_polka_chudes_light, dark: logo_polka_chudes_dark, alt: "Полка Чудес", url: "https://polkachudes.ru/" },
		{ light: logo_locus_solus_light, dark: logo_locus_solus_dark, alt: "Антикафе Locus Solus", url: "https://vk.ru/locus_solus" },
		{ light: logo_game4art_light, dark: logo_game4art_dark, alt: "Game4Art", url: "https://game4art.ru/" },
		{ light: logo_donatov_net_light, dark: logo_donatov_net_dark, alt: "Donatov.net", url: "https://donatov.net/" },
		{ light: logo_shiba_light, dark: logo_shiba_dark, alt: "Shiba", url: "https://shiba-store.ru/" },
		{ light: logo_festq_light, dark: logo_festq_dark, alt: "Festq", url: "https://festq.ru/" },
		{ light: logo_rusanimefest_light, dark: logo_rusanimefest_dark, alt: "RusAnimeFest", url: "https://rusanimefest.ru/" },
	];
</script>

<footer>
	<div class="info">
		<h2>Контакты</h2>
		<a href="mailto:{email}">{email}</a>
		<!-- <a href="tel:{phone.replace(/[^0-9+]/g, '')}">{phone}</a> -->
		<div class="mt">14+</div>
		<p class="mt sm">ИП Липатов Андрей Дмитриевич<br />ИНН: 972900101036</p>
		<a class="mt sm" href={resolve("/privacy-policy")}>Политика в отношении обработки персональных данных</a>
		<h2 class="mt">Партнёры</h2>
		<div class="partners">
			{#each partners as partner, i (i)}
				<a href={partner.url} target="_blank" rel="external noopener" title={partner.alt}>
					<img class="dark-hide" src={partner.light} alt={partner.alt} />
					<img class="light-hide" src={partner.dark} alt={partner.alt} />
				</a>
			{/each}
		</div>
	</div>

	<div class="br"></div>

	<a class="logo" href={resolve("/")}>
		<img src={logo} alt="Индикон" />
	</a>
</footer>

<style>
	@custom-media --bp-mobile (width <= 900px);

	footer {
		padding-inline: clamp(1.25rem, -0.75rem + 8vw, 6.25rem);
		padding-top: clamp(2.75rem, 1.65rem + 4.4vw, 5.5rem);
		padding-bottom: clamp(9rem, 10.7rem + -6.8vw, 4.75rem);
		display: flex;
		justify-content: space-between;
		justify-self: flex-start;
		align-items: flex-start;

		@media (width <= 380px) {
			flex-direction: column;
			align-items: center;
			gap: 2em;
		}
	}

	.br {
		width: 4rem;
		border-top: 1px solid currentColor;
		display: none;

		@media (width <= 380px) {
			display: block;
		}
	}

	footer > a {
		flex-shrink: 0;
	}

	.info {
		font-size: 1.125em;
		font-weight: 400;
		display: flex;
		flex-direction: column;

		@media (--bp-mobile) {
			font-size: inherit;
		}
	}

	.info h2 {
		font-weight: 700;
	}

	.info a {
		display: inline-block;
		width: fit-content;
	}
	.info a:hover {
		text-decoration: underline;
	}

	.mt {
		margin-top: 1.2em;
	}

	.sm {
		font-size: 0.875em;
	}

	.logo img {
		height: 38px;

		@media (--bp-mobile) {
			height: 24px;
		}
	}

	.partners {
		margin-top: 1rem;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
		gap: 1rem;
	}
	.partners > * {
		transition: transform 150ms ease-in-out;
	}
	.partners img {
		height: 80px;
		max-width: 200px;
		width: auto;
		object-fit: scale-down;

		@media (--bp-mobile) {
			height: 40px;
			max-width: 100px;
		}
	}
	@media (pointer: fine) {
		.partners > *:hover {
			transform: scale(1.05);
		}
	}
</style>
