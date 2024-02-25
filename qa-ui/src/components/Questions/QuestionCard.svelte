<script>
    import { toRelativeTime } from "../../utils/dateUtils.js";
    import QuestionUpvoteButton from "./QuestionUpvoteButton.svelte";

    export let question, courseId;
</script>

<div class="bg-gradient-to-tr from-white to-gray-100 border border-gray-200 shadow overflow-hidden rounded-none px-8 md:rounded-lg
           hover:border-cerise-red-200 hover:ring-1 hover:ring-cerise-red-600 hover:shadow-cerise-red-500 hover:shadow-inner hover:shadow-lg
           transition ease-in-out">
    <a  href={`/${question.courseId}/questions/${question.id}`} class="inline-block border-b border-gray-200 py-6">
        <div class="font-sans font-medium text-xl mb-2">{ question.title }</div>
        <p class="font-sans text-base text-gray-500">{ question.content }</p>
    </a>
    <div class="flex justify-between py-6">
        <QuestionUpvoteButton courseId={courseId} questionId={ question.id } upvoteCount={ question.upvoteCount } />
        <div>
            <span class="inline-block font-sans text-sm text-base text-gray-700 mr-2">{ question.userUuid }</span>
            <span class="inline-block font-sans text-sm text-base text-gray-500">asked { toRelativeTime(question.creationTime) }</span>
        </div>
    </div>
</div>
