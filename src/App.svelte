<script lang="ts">
	import Content from "./components/Content.svelte";
	import HeaderMenu from "./components/HeaderMenu.svelte";

	const tabs = ["Autocue", "Collection", "Settings"];
	let selectedTab = "";

	const isXmlLoaded = true;
</script>

<main>
	<div class="flex flex-col">
		<HeaderMenu {tabs} {selectedTab} disabled={!isXmlLoaded} />
		<Content />
	</div>
</main>

<style>
	main {
		user-select: none;
	}
</style>
