<script>
    import QuestionCard from "./QuestionCard.svelte";
    import {userUuid} from "../../stores/stores.js";
    import {onMount} from "svelte";

    export let courseId;

    const pageSize = 20;
    let page = 1;
    let questions = [];
    let isLoading = false;
    let hasMore = true;

    const getQuestions = async () => {
        if(isLoading || !hasMore) return;

        isLoading = true;

        const response = await fetch(`/api/courses/${courseId}/questions?page=${page}&pageSize=${pageSize}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "User-UUID": $userUuid,
            }
        });

        const newQuestions = await response.json();

        if(newQuestions.length > 0) {
            questions = [...questions, ...newQuestions];
            hasMore = newQuestions.length == pageSize;
            page += 1;
        }

        isLoading = false;
    }

    const handleScroll = () => {
        const isInLoadingZone = window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;
        if(isInLoadingZone) getQuestions();
    }

    onMount(() => {
        window.addEventListener('scroll', handleScroll);
        getQuestions();
        return () => window.removeEventListener('scroll', handleScroll);
    })
</script>

<!--{#await promise}-->
<!--    <p>Loading questions...</p>-->
<!--{:then questions}-->
<!--    <div class="flex flex-col gap-0 md:gap-6 lg:mx-40">-->
<!--        {#each questions as question}-->
<!--            <QuestionCard courseId={courseId} bind:question/>-->
<!--        {/each}-->
<!--    </div>-->
<!--{/await}-->

<div class="flex flex-col gap-0 md:gap-6 lg:mx-40">
    {#each questions as question}
        <QuestionCard courseId={courseId} bind:question/>
    {/each}
</div>