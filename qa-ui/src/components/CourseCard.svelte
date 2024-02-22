<script>
    export let course;

    // const colors = [
    //     'gray',
    //     'red',
    //     'yellow',
    //     'green',
    //     'blue',
    //     'indigo',
    //     'purple',
    //     'pink'
    // ];
    //
    // TODO: I think that the class is added to the DOM before the script has ended
    // const selectedColor = colors[Math.floor(Math.random() * colors.length)];
    // const gradient = `to-${selectedColor}-950`;
    // Default: cerise-red-950
</script>

<a class="relative group"
   href={`/${course.id}`}>
    <div class="absolute -right-2 -bottom-2 h-full w-full bg-gradient-to-tr from-cinnabar-500 to-cerise-red-400 rounded-lg"></div>
    <div class="relative h-full w-full bg-gradient-to-tr from-black to-cerise-red-950 rounded-lg shadow-lg text-white px-6 py-10 transition ease-in-out delay-100
          group-hover:-translate-y-1 group-hover:-translate-x-1">
        <div class="font-mono text-xl mb-2 lg:text-2xl">{ course.title }</div>
        <p class="font-sans text-base lg:text-lg">{ course.description }</p>
    </div>
</a>