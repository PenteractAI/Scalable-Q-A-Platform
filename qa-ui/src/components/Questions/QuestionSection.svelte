<script>
    import { toRelativeTime } from "../../utils/dateUtils.js";
    import QuestionUpvoteButton from "./QuestionUpvoteButton.svelte";

    export let questionId, courseId;

    const getQuestion = async ()  => {

        const response = await fetch(`/api/courses/${courseId}/questions/${questionId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });

        return await response.json();
    }

    let promise = getQuestion();
</script>

{#await promise}
    <p>Loading question...</p>
{:then question}
    <div class="flex flex-col gap-4 lg:mx-40 font-sans px-6 py-8 bg-white border border-gray-200">
        <div class="flex justify-between py-6">
            <QuestionUpvoteButton courseId={courseId} questionId={ questionId } upvoteCount={ question.upvoteCount } />
            <div>
                <span class="inline-block font-sans text-sm text-base text-gray-700 mr-2">{ question.userUuid }</span>
                <span class="inline-block font-sans text-sm text-base text-gray-500">asked { toRelativeTime(question.creationTime) }</span>
            </div>
        </div>
        <h2 class="text-2xl font-semibold leading-7 text-black">{ question.title }</h2>
        <p>{ question.content }</p>
    </div>
{/await}