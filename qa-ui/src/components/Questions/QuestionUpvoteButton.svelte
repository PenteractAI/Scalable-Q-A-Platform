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

<div class="flex font-mono text-xs rounded text-semibold">
    <button on:click={upvote}
            class="bg-cerise-red-400 text-white p-2"
    >Upvote</button>
    <div class="bg-cerise-red-100">
        <div class="text-gray-700 p-2">{ upvoteCount }</div>
    </div>

</div>
