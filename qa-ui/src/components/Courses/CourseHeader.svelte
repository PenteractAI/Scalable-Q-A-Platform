<script>
    import NewQuestionButton from "../Questions/NewQuestionButton.svelte";

    export let courseId;
</script>

<div class="flex flex-row py-16 lg:mx-40">
    <div class="flex-grow">
        <h1 class="text-4xl font-mono">Title of the course</h1>
        <p class="font-sans text-base lg:text-lg">Description of the course</p>
    </div>
    <NewQuestionButton bind:courseId />
</div>