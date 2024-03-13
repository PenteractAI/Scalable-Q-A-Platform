<script>
    import NewQuestionButton from "../Questions/NewQuestionButton.svelte";

    export let courseId;

    const getCourse = async () => {
        const response = await fetch(`/api/courses/${courseId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        return await response.json();
    }

    let promise = getCourse();
</script>

{#await promise}
    <p>Loading course...</p>
{:then course}
    <div class="flex flex-col pt-12 lg:mx-40">
        <div class="flex items-center justify-between">
            <h1 class="text-3xl font-mono flex-grow">{course.title}</h1>
            <NewQuestionButton bind:courseId />
        </div>
        <p class="mt-4 font-sans text-base font-light text-justify lg:text-lg">{course.description}</p>
    </div>
{/await}