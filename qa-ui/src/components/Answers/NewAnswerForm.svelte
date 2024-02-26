<script>
    import {userUuid} from "../../stores/stores.js";

    export let questionId;

    // Answer data
    let content = '';
    let isCreating = false;

    const createAnswer = async () => {

        isCreating = true;

        const data = {
            questionId: questionId,
            content: content,
            userUuid: $userUuid
        }

        const response = await fetch(`/api/questions/${questionId}/answers`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        // TODO: Check status : 201 success, 500 error

        isCreating = false;

        if (response.status == 201) {

            // TODO: Implement a feedback for the user

        }
    }

</script>

<div class="font-sans">
    <div>
        <label for="content" class="block text-sm font-medium leading-6 text-gray-900">Write an answer</label>
        <div class="mt-2">
                    <textarea
                            bind:value={content}
                            class="block w-full rounded-md py-1.5 pl-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400
                                   focus:ring-2 focus:ring-inset focus:ring-indigo-600
                                   sm:text-sm sm:leading-6"
                            id="content"
                            name="content"
                            placeholder="Write your answer here"
                            rows="3"
                            minlength="1"
                            disabled="{isCreating ? 'disabled' : ''}"
                    ></textarea>
        </div>
    </div>
    <button class="bg-black text-white py-4 px-2" on:click={createAnswer}>Submit</button>
</div>