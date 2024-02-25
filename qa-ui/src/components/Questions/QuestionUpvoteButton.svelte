<script>
    import {userUuid} from "../../stores/stores.js";
    export let upvoteCount, questionId, courseId;

    const upvote = async () => {

        upvoteCount++;

        const data = {
            userUuid: $userUuid
        }

        const response = await fetch(`/api/courses/${courseId}/questions/${questionId}/upvote`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        return await response.json();
    }
</script>

<div class="flex font-mono text-sm rounded text-semibold">
    <button on:click={upvote}
            class="bg-cerise-red-400 inline-block text-white p-2"
    >
        <span>Upvote</span>
    </button>
    <div class="bg-cerise-red-100">
        <span class="inline-block text-base text-gray-700 p-2">{ upvoteCount }</span>
    </div>

</div>
