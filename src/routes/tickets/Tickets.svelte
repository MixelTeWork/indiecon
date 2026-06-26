<script lang="ts">
	const tickets = [
		{
			name: "Standard edition",
			price: "2 350 ₽",
			url: "https://vk.com/market/product/bilet-quotstandard-editionquot-220927851-13484258",
			features: ["Вход на мероприятие", "Физическая Билет-Открытка"],
		},
		{
			name: "Deluxe edition",
			price: "3 500 ₽",
			url: "https://vk.com/market/product/bilet-quotdeluxe-editionquot-220927851-13484276",
			features: [
				"Вход на мероприятие",
				"Физическая Билет-Открытка + Набор мерча (открытка перевёртыш, стикерпак, значок побольше, плакат) + Ранний вход в 11:00 + Участие в автограф сессиях",
			],
		},
		{
			name: "Ultimate edition",
			price: "5 250 ₽",
			url: "https://vk.com/market/product/bilet-quotultimate-editionquot-220927851-13484305",
			features: [
				"Вход на мероприятие",
				"Физическая Билет-Открытка",
				"Набор мерча (открытка перевёртыш, стикерпак, значок побольше, плакат) + брелок, блокнот, стенд, стикерпак вип, резиновый браслет",
				"Ранний вход",
				"Участие в автограф сессиях + Вип зона + Вип турниры",
			],
		},
		{
			name: "Спонсор",
			price: "10 000 ₽",
			url: "https://vk.com/market/product/bilet-quotsponsorquot-220927851-13484318",
			features: [
				"Благодарности с главной сцены на открытии",
				"Вход на мероприятие",
				"Физическая Билет-Открытка",
				"Набор мерча (открытка перевёртыш, стикерпак, значок побольше, плакат, брелок, блокнот, стенд, стикерпак вип, резиновый браслет) + Значок Биг Биг, кружка, шоппер, фигурка, ланьярд с бейджиком, набор сладостей",
				"Ранний вход",
				"Участие в автограф сессиях",
				"Вип зона",
				"Вип турниры + Контент для спонсоров на сцене",
			],
		},
		{
			name: "2.0 K",
			price: "20 000 ₽",
			url: "https://vk.com/market/product/bilet-quot20-kquot-220927851-13484328",
			features: [
				"Огромные благодарности с главной сцены на открытии",
				"Вход на мероприятие",
				"Набор мерча (открытка перевёртыш, стикерпак, значок побольше, плакат, брелок, блокнот, стенд, стикерпак вип, резиновый браслет, Значок Биг Биг, кружка, шоппер, фигурка, ланьярд с бейджиком, набор сладостей) + (Термос, футболка, носки, шарф от бабушки организатора)",
				"Ранний вход",
				"Участие в автограф сессиях",
				"Вип зона",
				"Вип турниры",
				"Контент для спонсоров на сцене + Главный организатор на открытии зачитает любое написанное вами предложение (в рамках регламента)",
			],
		},
	];
</script>

<section>
	{#each tickets as ticket (ticket.name)}
		<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
		<a class="borderedCard ticket" href={ticket.url} target="_blank">
			<h3 class="ticket__name">{ticket.name}</h3>
			<ul class="ticket__features">
				{#each ticket.features as feature, i (i)}
					{#if feature.includes("+")}
					{const parts = feature.split("+")}
						<li>
						<div>{parts[0]}</div>
							<ul>
								{#each parts.slice(1) as part, i (i)}
									<li>{part}</li>
								{/each}
							</ul>
						</li>
					{:else}
						<li>{feature}</li>
					{/if}
				{/each}
			</ul>
			<div class="ticket__price">{ticket.price}</div>
		</a>
	{/each}
</section>

<style>
	section {
		background-color: var(--theme-accent-bg);
		color: var(--theme-accent-text);
		transition: var(--theme-transition);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 4em;
		padding-inline: 1.25rem;
		padding-top: clamp(1.875rem, -0.175rem + 8.2vw, 7rem);
		padding-bottom: clamp(10rem, -3.5rem + 36vw, 28rem);
	}

	.ticket {
		--bbm: 4;
		width: 100%;
		max-width: 1200px;
		color: black;
		background-color: white;
		padding: 2em;
		display: grid;
		grid-template-columns: 1fr auto;
		grid-template-areas: "name price" "features price";
		align-items: center;
		gap: 1em;
		transition: filter 150ms;
	}
	.ticket:hover {
		filter: invert(1);
	}

	.ticket__name,
	.ticket__price {
		font-size: clamp(1.25rem, 0.75rem + 2vw, 2.5rem);
		font-weight: 700;
	}
	.ticket__name {
		grid-area: name;
	}
	.ticket__features {
		grid-area: features;
		max-width: 560px;
		font-size: 0.875rem;
		font-weight: 600;
	}
	.ticket__price {
		grid-area: price;
		margin-right: clamp(0.0625rem, -1.1125rem + 4.7vw, 3rem);
	}

	ul {
		list-style: disc;
		margin-left: 1em;
	}
	ul ul {
		list-style: "+";
		list-style-position: inside;
		margin-left: 0;
	}

	@media (max-width: 700px) {
		.ticket {
			grid-template-areas: "name price" "features features";
		}
	}
</style>
