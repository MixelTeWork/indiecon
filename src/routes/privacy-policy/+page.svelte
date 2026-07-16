<script>
	import Document from "./text.md";
</script>

<div class="markdown">
	<Document />
</div>

<style>
	.markdown {
		width: 100%;
		max-width: 1024px;
		margin: 2rem auto 10rem;
		padding-inline: 2em;
	}
	.markdown :global(h1) {
		font-size: 2rem;
		text-align: center;
		font-weight: 700;
	}
	.markdown :global(h2) {
		font-size: 1.5rem;
		font-weight: 600;
		margin-top: 1.5em;
	}
	.markdown :global(p) {
		margin-top: 1rem;
	}
	.markdown :global(h2 ~ p::first-letter) {
		margin-left: 2em;
	}
	.markdown :global(ul) {
		list-style: disc;
		margin-left: 1em;
	}
	.markdown :global(p + ul) {
		margin-left: 3em;
	}
	.markdown :global(strong) {
		font-weight: 700;
	}
</style>
