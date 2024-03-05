<script>
    import { toRelativeTime } from "../utils/dateUtils.js";
    import UpvoteButton from "./UpvoteButton.svelte";

    export let post, type;
</script>

<div class="bg-gradient-to-tr from-white {post.userUuid === 'Doctor Robotnik' ? 'to-blue-100 border-blue-200 shadow-blue-400' : 'to-gray-100 border border-gray-200'} border border-gray-200 shadow overflow-hidden rounded-none px-8 md:rounded-lg
           {type === 'questions' ? 'hover:border-cerise-red-200 hover:ring-1 hover:ring-cerise-red-600 hover:shadow-cerise-red-500 hover:shadow-inner hover:shadow-lg transition ease-in-out' : ''}">
    {#if type === 'questions'}
        <a href={`/${post.courseId}/questions/${post.id}`} class="inline-block border-b border-gray-200 py-6">
            <div class="font-sans font-medium text-xl mb-2">{ post.title }</div>
            <p class="font-sans text-base text-gray-500">{ post.content }</p>
        </a>
    {:else}
        <div class="inline-block border-b border-gray-200 py-6">
            <p class="font-sans text-base text-gray-500">{ post.content }</p>
        </div>
    {/if}
    <div class="flex justify-between py-6">
        <UpvoteButton type={type} id={post.id} upvoteCount={post.upvoteCount} userHasUpvoted={post.userHasUpvoted} />
        <div>
            <span class="inline-block font-sans text-sm text-base text-gray-700 mr-2">{ post.userUuid }</span>
            <span class="inline-block font-sans text-sm text-base text-gray-500">{type === 'questions' ? 'asked' : 'answered'} { toRelativeTime(post.creationTime) }</span>
        </div>
    </div>
</div>
