<script lang="ts">
    import XmlUpload from "./XMLUpload.svelte";
    import { userStore } from "../utils/renderer/store";
    import Toggle from "svelte-toggle";
    import AutocueSection from "./AutocueSection.svelte";

    let memoryCuesEnabled: boolean;
    let memoryCueSpacing: string = "0";

    $: isXmlLoaded = $userStore.xml !== undefined;
</script>

<div class="h-full">
    {#if !isXmlLoaded}
        <XmlUpload />
    {:else}
        <AutocueSection>
            <div slot="header">
                <div class="w-full flex flex-row content-center">
                    <div class="text-bold mr-auto text-lg">Memory Cues</div>
                    <Toggle label="" bind:toggled={memoryCuesEnabled} />
                </div>

                <div class="text-sm">
                    Memory Cue Spacing:
                    <input
                        class="border-blue-200 border-2 h-6 w-6 rounded-sm text-center"
                        bind:value={memoryCueSpacing}
                    />
                </div>
            </div>

            <div slot="content" />
        </AutocueSection>
    {/if}
</div>
