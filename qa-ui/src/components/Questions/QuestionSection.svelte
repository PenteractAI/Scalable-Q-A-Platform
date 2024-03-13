<script>
    import { toRelativeTime } from "../../utils/strUtils.js";
    import {userUuid} from "../../stores/stores.js";
    import UpvoteButton from "../UpvoteButton.svelte";
    import NewAnswerForm from "../Answers/NewAnswerForm.svelte";

    export let questionId, courseId, type;

    const getQuestion = async ()  => {

        const response = await fetch(`/api/courses/${courseId}/questions/${questionId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "User-UUID": $userUuid
            }
        });

        return await response.json();
    }

    let promise = getQuestion();
</script>

{#await promise}
    <p>Loading question...</p>
{:then question}
    <div class="bg-gradient-to-tr from-white to-gray-100 shadow overflow-hidden rounded-none px-8 py-6 md:rounded-lg lg:mx-40">
        <div class="flex justify-between pb-6">
            <UpvoteButton type={type} id={question.id} upvoteCount={question.upvoteCount} userHasUpvoted={question.userHasUpvoted}/>
            <div class="flex justify-between">
                <span class="inline-block font-sans text-sm text-base text-gray-700 mr-2 text-right">{ question.userUuid }</span>
                <span class="inline-block font-sans text-sm text-base text-gray-500">asked { toRelativeTime(question.creationTime) }</span>
            </div>
        </div>
        <div class="py-6">
            <div class="font-sans font-medium text-xl mb-2">{ question.title }</div>
            <p class="font-sans text-base text-gray-500">{ question.content }</p>
        </div>
        <NewAnswerForm questionId={questionId} />
    </div>
{/await}