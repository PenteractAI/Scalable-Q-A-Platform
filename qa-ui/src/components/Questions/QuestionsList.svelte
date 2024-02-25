<script>
    import QuestionCard from "./QuestionCard.svelte";

    export let courseId;

    const getQuestions = async () => {
        const response = await fetch(`/api/courses/${courseId}/questions`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });

        return await response.json();
    }

    let promise = getQuestions();
</script>

{#await promise}
    <p>Loading questions...</p>
{:then questions}
    <div class="flex flex-col gap-0 md:gap-6 lg:mx-40">
        {#each questions as question}
            <QuestionCard courseId={courseId} bind:question/>
        {/each}
    </div>
{/await}