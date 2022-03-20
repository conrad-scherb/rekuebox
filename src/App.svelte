<script lang="ts">
	import Content from "./components/Content.svelte";
	import HeaderMenu from "./components/HeaderMenu.svelte";

	const tabs = ["Autocue", "Collection", "Settings"];
	let selectedTab = "";

	const isXmlLoaded = true;
</script>

<main>
	<div class="flex flex-col h-full">
		<HeaderMenu {tabs} {selectedTab} disabled={!isXmlLoaded} />
		<Content />
	</div>
</main>

<style>
	main {
		height: 100vh;
		user-select: none;
	}
</style>
