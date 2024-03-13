<script>
    import {userUuid} from "../stores/stores.js";
    export let upvoteCount, id, type;
    export let userHasUpvoted = false;

    const upvote = async () => {

        upvoteCount++;
        userHasUpvoted = true;

        const data = {
            userUuid: $userUuid
        }

        const response = await fetch(`/api/${type}/${id}/upvote`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const json = await response.json();

        if(json.error) {
            upvoteCount--;
            console.warn(json.error);
        }
    }
</script>

<div class="flex font-mono text-xs rounded text-semibold">
    {#if userHasUpvoted}
        <div class="bg-malachite-400 text-white py-2 px-6 rounded-l-lg content-center">Upvoted</div>
    {:else}
        <button on:click={upvote}
            class="bg-cerise-red-400 text-white py-2 px-6 rounded-l-lg"
        >Upvote</button>
    {/if}

    <div class="{userHasUpvoted ? 'bg-malachite-100' : 'bg-cerise-red-100'} rounded-r-lg content-center">
        <div class="text-gray-700 py-2 px-4">{ upvoteCount }</div>
    </div>
</div>
