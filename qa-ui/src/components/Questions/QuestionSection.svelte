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
    <div class="bg-gradient-to-tr from-white to-gray-100 border border-gray-200 shadow overflow-hidden rounded-none px-8 py-6 md:rounded-lg lg:mx-40">
        <div class="flex justify-between border-b border-gray-200">
            <QuestionUpvoteButton courseId={courseId} questionId={ questionId } upvoteCount={ question.upvoteCount } />
            <div class="flex justify-between">
                <span class="inline-block font-sans text-sm text-base text-gray-700 mr-2">{ question.userUuid }</span>
                <span class="inline-block font-sans text-sm text-base text-gray-500">asked { toRelativeTime(question.creationTime) }</span>
            </div>
        </div>
        <div class="inline-block py-6">
            <div class="font-sans font-medium text-xl mb-2">{ question.title }</div>
            <p class="font-sans text-base text-gray-500">{ question.content }</p>
        </div>
    </div>
{/await}