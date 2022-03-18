<script lang="ts">
	import { onMount } from "svelte";
	import { createDatabase } from "../utils/database";
	export let name: string;

	onMount(() => {
		createDatabase();
	});
</script>

<main>
	<h1 class="text-slate-400">Hello {name}!</h1>
	<p>
		Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn
		how to build Svelte apps.
	</p>
</main>
