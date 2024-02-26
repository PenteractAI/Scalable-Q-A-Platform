<script>
    import { toRelativeTime } from "../../utils/dateUtils.js";
    import UpvoteButton from "../UpvoteButton.svelte";

    export let answer;
</script>

<div class="bg-gradient-to-tr from-white to-gray-100 border border-gray-200 shadow overflow-hidden rounded-none px-8 md:rounded-lg">
    <div class="inline-block border-b border-gray-200 py-6">
        <p class="font-sans text-base text-gray-500">{ answer.content }</p>
    </div>
    <div class="flex justify-between py-6">
        <UpvoteButton type="answer" id={answer.id} upvoteCount={answer.upvoteCount} />
        <div>
            <span class="inline-block font-sans text-sm text-base text-gray-700 mr-2">{ answer.userUuid }</span>
            <span class="inline-block font-sans text-sm text-base text-gray-500">answered { toRelativeTime(answer.creationTime) }</span>
        </div>
    </div>
</div>
