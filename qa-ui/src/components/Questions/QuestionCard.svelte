<script>
    export let question;

    const toRelativeTime = (timestamp) => {
        const timestampDate = new Date(timestamp);
        const now = new Date();
        const secondsPast = (now.getTime() - timestampDate.getTime()) / 1000;

        if (secondsPast < 60) return `${Math.round(secondsPast)}s ago`;
        if (secondsPast < 3600) return `${Math.round(secondsPast / 60)}m ago`;
        if (secondsPast <= 86400) return `${Math.round(secondsPast / 3600)}h ago`;
        if (secondsPast > 86400) return `on ${timestampDate.getDate()}-${timestampDate.getMonth()}-${timestampDate.getFullYear()}`;
    }
</script>

<a  href={`/${question.courseId}/questions/${question.id}`}
    class="border border-gray-200 overflow-hidden rounded-none md:rounded-lg hover:border-cerise-red-600 px-6 py-4"
>
    <div class="px-6 py-4">
        <div class="font-sans font-medium text-xl mb-2">{ question.title }</div>
        <p class="font-sans text-base text-gray-500">{ question.content }</p>
    </div>
    <div class="flex justify-end px-6 pt-4 pb-2">
        <span class="inline-block font-sans text-sm text-base text-gray-700 mr-2">{ question.userUuid }</span>
        <span class="inline-block font-sans text-sm text-base text-gray-500">asked { toRelativeTime(question.creationTime) }</span>
    </div>
</a>