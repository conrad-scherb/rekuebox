<script lang="ts">
	import Content from "./components/Content.svelte";
	import HeaderMenu from "./components/HeaderMenu.svelte";
	import { userStore } from "./utils/store";
	import type { Store } from "./utils/store";

	const tabs = ["Autocue", "Collection", "Settings"];

	let selectedTab = "";
	let isXmlLoaded = false;

	userStore.subscribe((storeValue: Store) => {
		isXmlLoaded = storeValue.xml !== undefined;
	});
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
