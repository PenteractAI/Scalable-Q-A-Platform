<script>
    export let question;
</script>

<a  href={`/${question.courseId}/${question.id}`}
    class="border border-gray-200 rounded-none md:rounded-lg hover:border-cerise-red-600 px-6 py-4"
>
    <div class="font-sans font-medium text-xl">{ question.title }</div>
    <p class="font-sans text-gray-500">{ question.content }</p>
</a>