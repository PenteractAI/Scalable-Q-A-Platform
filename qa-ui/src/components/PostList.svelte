<script>
    import {userUuid} from "../stores/stores.js";
    import {onDestroy, onMount} from "svelte";
    import Card from "./Card.svelte";

    export let parentId, type;

    const pageSize = 20;
    let page = 1;
    let posts = [];
    let isLoading = false;
    let hasMore = true;

    // WebSocket connection
    let ws;

    const getPosts = async () => {
        if(isLoading || !hasMore) return;

        isLoading = true;
        const endpoint = type === 'questions' ? `/api/courses/${parentId}/questions` : `/api/questions/${parentId}/answers`

        const response = await fetch(`${endpoint}?page=${page}&pageSize=${pageSize}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "User-UUID": $userUuid
            }
        });

        const newPosts = await response.json();

        if(newPosts.length > 0) {
            posts = [...posts, ...newPosts];
            hasMore = newPosts.length == pageSize;
            page += 1;
        }

        isLoading = false;
    }

    const handleScroll = () => {
        const isInLoadingZone = window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;
        if(isInLoadingZone) getPosts();
    }

    const getNewPosts = async () => {

        const host = window.location.hostname;
        const endpoint = type === 'questions' ? `/api/ws/courses/${parentId}/questions` : `/api/ws/questions/${parentId}/answers`;
        ws = new WebSocket(`ws://${host}:7800${endpoint}`);

        ws.onopen = () => {
            console.log('WebSocket is opened.');
        }

        ws.onmessage = async (message) => {
            console.log('Message received.');

            const data = JSON.parse(message.data);
            console.log(data);
            posts = [data, ...posts];
        }

        ws.onerror = (error) => {
            console.error('WebSocket Error:', error);
        };

        ws.onclose = (event) => {
            console.log('WebSocket is closed now.', event);
        };
    }

    onMount(() => {
        window.addEventListener('scroll', handleScroll);
        getPosts();
        getNewPosts();
        return () => window.removeEventListener('scroll', handleScroll);
    })

    onDestroy(() => {
        if(ws) {
            ws.onclose();
        }
    })
</script>

<div class="flex flex-col py-8 gap-0 md:gap-4 lg:mx-40">
    {#each posts as post}
        <Card bind:post bind:type/>
    {/each}
</div>