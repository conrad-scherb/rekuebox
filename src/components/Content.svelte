<script lang="ts">
    import XmlUpload from "./XMLUpload.svelte";
    import { userStore } from "../utils/store";

    $: isXmlLoaded = $userStore.xml !== undefined;
</script>

<div class="h-full">
    {#if !isXmlLoaded}
        <XmlUpload />
    {/if}
</div>
