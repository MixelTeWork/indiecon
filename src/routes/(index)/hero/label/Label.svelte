<script lang="ts">
	import back from "./back.svg";
</script>

<div>
	<img src={back} alt="" />
	<span>Билеты!!</span>
</div>

<style>
	div {
		position: relative;
		display: inline-block;
		color: black;
		font-family: "Zero Cool", Arial, Helvetica, sans-serif;
		white-space: nowrap;
		aspect-ratio: 2.1037344398;
		padding: 5%;
	}
	img {
		position: absolute;
		top: 0;
		left: 0;
		z-index: -1;
		width: 100%;
	}
	span {
		display: block;
		padding: 0 0.5em;
	}
</style>
