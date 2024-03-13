<script>
    import { toRelativeTime } from "../utils/strUtils.js";
    import UpvoteButton from "./UpvoteButton.svelte";

    export let post, type;
</script>

<div class="bg-gradient-to-tr from-white {post.userUuid === 'Doctor Robotnik' ? 'to-blue-100 border-blue-200 shadow-blue-400' : 'to-gray-100 border border-gray-200'} border border-gray-200 shadow overflow-hidden rounded-none md:rounded-lg
           {type === 'questions' ? 'hover:border-cerise-red-200 hover:ring-1 hover:ring-cerise-red-600 hover:shadow-cerise-red-500 hover:shadow-inner hover:shadow-lg transition ease-in-out' : ''}">
    <div class="px-8">
        {#if type === 'questions'}
            <a href={`/${post.courseId}/questions/${post.id}`} class="inline-block py-6 w-full">
                <div class="font-sans font-medium text-xl mb-2">{ post.title }</div>
                <p class="font-sans text-base text-gray-500 line-clamp-1 text-justify">{ post.content }</p>
            </a>
        {:else}
            <div class="inline-block py-6">
                <p class="font-sans text-base text-gray-500 text-justify">{ post.content }</p>
            </div>
        {/if}
    </div>
    <div class="flex justify-between py-6 px-8">
        <UpvoteButton type={type} id={post.id} upvoteCount={post.upvoteCount} userHasUpvoted={post.userHasUpvoted} />
        <div class="flex justify-between">
            <span class="inline-block font-sans text-right text-sm text-base text-gray-700 mr-2">{ post.userUuid }</span>
            <span class="inline-block font-sans text-sm text-base text-gray-500">{type === 'questions' ? 'asked' : 'answered'} { toRelativeTime(post.creationTime) }</span>
        </div>
    </div>
</div>
