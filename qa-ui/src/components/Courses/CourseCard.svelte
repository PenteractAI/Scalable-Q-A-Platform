<script>
    export let course;
</script>

<a class="relative group"
   href="/{course.id}/questions">
    <div class="absolute -right-2 -bottom-2 h-full w-full bg-gradient-to-tr from-cinnabar-500 to-cerise-red-400 rounded-lg"></div>
    <div class="relative h-full w-full bg-gradient-to-tr from-black to-cerise-red-950 rounded-lg shadow-lg text-white px-6 py-10 transition ease-in-out delay-100
          group-hover:-translate-y-1 group-hover:-translate-x-1">
        <div class="font-mono text-xl mb-2">{ course.title }</div>
        <p class="font-sans text-base text-justify line-clamp-3">{ course.description }</p>
    </div>
</a>