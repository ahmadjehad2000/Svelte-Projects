<script>
    //importing store
    import { fade, scale, slide } from "svelte/transition";
    import store from "../stores/store.js"
    import PollDetail from "./PollDetail.svelte";

</script>

<div class="poll-list">
    {#each $store as poll (poll.id)}
        <div transition:fade|local >
            <PollDetail {poll} />
        </div>
    {/each}
</div>

<style>
    .poll-list{
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 20px;
    }
</style>