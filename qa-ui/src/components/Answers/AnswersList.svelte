<script>
    import AnswerCard from "./AnswerCard.svelte";

    export let courseId, questionId;

    const getAnswers = async () => {
        const response = await fetch(`/api/courses/${courseId}/questions/${questionId}/answers`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });

        return await response.json();
    }

    let promise = getAnswers();
</script>

{#await promise}
    <p>Loading answers...</p>
{:then answers}
    <div class="flex flex-col py-8 gap-0 md:gap-4 lg:mx-40">
        {#each answers as answer}
            <AnswerCard courseId={courseId} questionId={questionId} bind:answer/>
        {/each}
    </div>
{/await}