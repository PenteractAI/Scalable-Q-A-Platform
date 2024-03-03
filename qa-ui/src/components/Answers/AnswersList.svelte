<script>
    import AnswerCard from "./AnswerCard.svelte";
    import {userUuid} from "../../stores/stores.js";
    import {onMount} from "svelte";

    export let questionId;

    const pageSize = 20;
    let page = 1;
    let answers = [];
    let isLoading = false;
    let hasMore = true;

    const getAnswers = async () => {
        if(isLoading || !hasMore) return;

        isLoading = true;

        const response = await fetch(`/api/questions/${questionId}/answers?page=${page}&pageSize=${pageSize}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "User-UUID": $userUuid
            }
        });

        const newAnswers = await response.json();

        if(newAnswers.length > 0) {
            answers = [...answers, ...newAnswers];
            hasMore = newAnswers.length == pageSize;
            page += 1;
        }

        isLoading = false;
    }

    const handleScroll = () => {
        const isInLoadingZone = window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;
        if(isInLoadingZone) getAnswers();
    }

    onMount(() => {
        window.addEventListener('scroll', handleScroll);
        getAnswers();
        return () => window.removeEventListener('scroll', handleScroll);
    })
</script>

<div class="flex flex-col py-8 gap-0 md:gap-4 lg:mx-40">
    {#each answers as answer}
        <AnswerCard questionId={questionId} bind:answer/>
    {/each}
</div>