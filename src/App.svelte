<script lang="ts">
	import { onMount } from "svelte";

	import Content from "./components/Content.svelte";
	import HeaderMenu from "./components/HeaderMenu.svelte";
	import { ipcLoadJsonFromDb } from "./utils/renderer/ipc-renderer";
	import { userStore } from "./utils/renderer/store";

	const tabs = ["Autocue", "Collection", "Settings"];

	let selectedTab = "";

	$: isXmlLoaded = $userStore.xml !== undefined;

	onMount(async () => {
		let xml = await ipcLoadJsonFromDb();
		if (xml) {
			userStore.set({ xml: xml });
		}
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
