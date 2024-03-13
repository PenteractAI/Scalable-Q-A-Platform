<script>

    import CourseCard from "./CourseCard.svelte";

    const getCourses = async ()  => {
        const response = await fetch("/api/courses", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });

        return await response.json();
    }

    let promise = getCourses();
</script>

{#await promise}
    <p>Loading courses...</p>
{:then courses}
    <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {#each courses as course}
            <CourseCard bind:course/>
        {/each}
    </div>
{/await}