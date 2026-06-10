<script>
	import { resolve } from "$app/paths";
	import logo from "$lib/assets/logo.svg";

	const email = "Indycon@gmail.com";
	const phone = "8-901-698-89-40";
</script>

<footer>
	<div class="info">
		<h2>Контакты</h2>
		<a href="mailto:{email}">{email}</a>
		<a href="tel:{phone.replace(/[^0-9+]/g, '')}">{phone}</a>
		<div class="mt">12+</div>
	</div>

	<a class="logo" href={resolve("/")}>
		<img src={logo} alt="Индикон" />
	</a>
</footer>

<style>
	footer {
		padding-inline: clamp(1.25rem, -0.75rem + 8vw, 6.25rem);
		padding-top: clamp(2.75rem, 1.65rem + 4.4vw, 5.5rem);
		padding-bottom: clamp(9rem, 10.7rem + -6.8vw, 4.75rem);
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.info {
		font-size: 1.125em;
		font-weight: 400;
		display: flex;
		flex-direction: column;
	}

	.info h2 {
		font-weight: 700;
	}

	.info a:hover {
		text-decoration: underline;
	}

	.mt {
		margin-top: 1.2em;
	}

	.logo img {
		height: 38px;
	}

	@media (max-width: 900px) {
		.info {
			font-size: inherit;
		}
		.logo img {
			height: 24px;
		}
	}
</style>
