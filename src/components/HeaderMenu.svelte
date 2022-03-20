<script lang="ts">
    import HeaderTabItem from "./HeaderTabItem.svelte";

    export let tabs: string[];
    export let selectedTab: string = "";
    export let disabled = false;

    function selectTab(name: string): void {
        selectedTab = name;
    }
</script>

<div class="h-12 p-4 flex items-center border-b border-slate-300">
    <div class="text-2xl px-10 font-semibold">rekuebox</div>

    <div class="flex w-full justify-around">
        {#each tabs as tab}
            <HeaderTabItem name={tab} {disabled} select={selectTab} />
        {/each}
    </div>
</div>
