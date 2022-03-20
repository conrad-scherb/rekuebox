<script lang="ts">
    export let name: string;
    export let disabled = false;
    export let select: (name: string) => void;
</script>

<div
    class:text-gray-500={disabled}
    class:hover-tab={!disabled}
    class="font-medium"
    on:click={() => select(name)}
>
    {name}
</div>

<style>
    .hover-tab:hover {
        color: rgb(14 165 233);
    }
</style>
