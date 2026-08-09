<script lang="ts">
	import { useMutationAuthByTicket } from "$lib/api/user";
	import Spinner from "$lib/components/Spinner.svelte";
	import imagefileToData from "$lib/utils/imagefileToData";
	import { QrcodeDecoder } from "qrcode-decoder/dist/index";

	let error = $state("");
	const mutation = useMutationAuthByTicket((msg) => (error = msg));
	let inp: HTMLInputElement;
</script>

<div class="auth">
	{#if mutation.isPending}
		<Spinner />
	{/if}
	<h2>Вход</h2>
	<p>Чтобы подключится загрузите ваш билет</p>
	<label class="ticket">
		<div>Билет</div>
		<div>{@render qrIcon()}</div>
		<div class="ticket__body">
			<p>Гость</p>
			<p>Загрузить билет</p>
			<p>15.08.2026</p>
		</div>
		<input
			bind:this={inp}
			type="file"
			style:display="none"
			accept="image/png, image/jpeg, image/gif"
			disabled={mutation.isPending}
			onchange={async () => {
				error = "";
				const file = inp.files?.[0];
				if (!file) return;
				const imgData = await imagefileToData(file);
				inp.value = "";
				if (!imgData) return;

				const qr = new QrcodeDecoder();
				const r = await qr.decodeFromImage(imgData.data);
				const code = r?.data;
				if (!code || !code.match(/\d+-\d+-\d+-\d+-\d+/)) {
					error = "Изображение не содержит QR-кода или он некорректный.";
					fetch("/api/auth_ticket_err", {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify(code || ""),
					});
					return;
				}
				mutation.mutate({ code });
			}}
		/>
	</label>
	<p class="error">{error}</p>
</div>

{#snippet qrIcon()}
	<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 -960 960 960" width="1em" fill="currentColor"
		><path
			d="M120-560v-240q0-17 11.5-28.5T160-840h240q17 0 28.5 11.5T440-800v240q0 17-11.5 28.5T400-520H160q-17 0-28.5-11.5T120-560Zm80-40h160v-160H200v160Zm-80 440v-240q0-17 11.5-28.5T160-440h240q17 0 28.5 11.5T440-400v240q0 17-11.5 28.5T400-120H160q-17 0-28.5-11.5T120-160Zm80-40h160v-160H200v160Zm320-360v-240q0-17 11.5-28.5T560-840h240q17 0 28.5 11.5T840-800v240q0 17-11.5 28.5T800-520H560q-17 0-28.5-11.5T520-560Zm80-40h160v-160H600v160Zm160 480v-80h80v80h-80ZM520-360v-80h80v80h-80Zm80 80v-80h80v80h-80Zm-80 80v-80h80v80h-80Zm80 80v-80h80v80h-80Zm80-80v-80h80v80h-80Zm0-160v-80h80v80h-80Zm80 80v-80h80v80h-80Z"
		/></svg
	>
{/snippet}

<style>
	.auth {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 1em;
	}

	.auth h2 {
		font-size: 2rem;
		font-weight: 600;
	}
	.auth > p {
		font-weight: 400;
		text-align: center;
	}
	.error {
		color: tomato;
		height: 1em;
	}
	.ticket {
		width: 15rem;
		height: 6rem;
		border: 2px solid currentColor;
		display: grid;
		grid-template-columns: auto 1fr;
		grid-template-rows: 1fr auto;
		cursor: pointer;
	}
	.ticket > div {
		border: 1px solid currentColor;
	}
	.ticket > :nth-child(1) {
		grid-column: 1/3;
		text-align: center;
		text-transform: uppercase;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 700;
	}
	.ticket > :nth-child(2) {
		font-size: 4rem;
		width: 4rem;
		height: 4rem;
	}
	.ticket__body {
		padding: 0.2rem;
		font-size: 0.75rem;
		display: flex;
		flex-direction: column;
		font-weight: 400;
	}
	.ticket__body > :nth-child(2) {
		flex-grow: 1;
		display: flex;
		align-items: center;
		font-size: 1rem;
		font-weight: 500;
	}
	.ticket__body > :last-child {
		align-self: flex-end;
	}
</style>
