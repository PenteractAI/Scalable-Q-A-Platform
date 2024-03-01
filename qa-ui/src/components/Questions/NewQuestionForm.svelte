<script>
    import { userUuid } from "../../stores/stores.js";
    export let courseId;

    // Question data
    let title = '';
    let content = '';
    let isCreating = false;

    const createQuestion = async () => {

        isCreating = true;

        const data = {
            courseId: courseId,
            title: title,
            content: content,
            userUuid: $userUuid
        }

        const response = await fetch(`/api/courses/${courseId}/questions`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        // TODO: Check status : 201 success, 500 error

        isCreating = false;

        if (response.status == 201) {

            const question = await response.json();

            window.location.href = `/${courseId}/questions/${question.id}`
        }
    }
</script>

<div class="font-sans py-16 lg:mx-40">
    <h2 class="text-xl font-semibold leading-7 text-gray-900">Ask a new question</h2>
    <div class="flex flex-col gap-6 mt-10">
        <div>
            <label for="title" class="block text-sm font-medium leading-6 text-gray-900">Title</label>
            <input
                    autocomplete="title"
                    bind:value={title}
                    class="block w-full py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    id="title"
                    name="title"
                    placeholder="How to..?"
                    type="text"
                    disabled="{isCreating ? 'disabled' : ''}"
                    minlength="1"
                    maxlength="200"
            />
        </div>
        <div>
            <label for="content" class="block text-sm font-medium leading-6 text-gray-900">Content</label>
            <div class="mt-2">
                <textarea
                        bind:value={content}
                        class="block w-full rounded-md py-1.5 pl-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400
                               focus:ring-2 focus:ring-inset focus:ring-indigo-600
                               sm:text-sm sm:leading-6"
                        id="content"
                        name="content"
                        placeholder="Explain your issue here"
                        rows="3"
                        minlength="1"
                        disabled="{isCreating ? 'disabled' : ''}"
                ></textarea>
            </div>
        </div>
        <button class="bg-black text-white py-4 px-2" on:click={createQuestion} data-testid="submit-question-button">Submit</button>
    </div>
</div>