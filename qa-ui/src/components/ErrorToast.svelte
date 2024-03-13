<script>
    import { toasts, removeToast } from "../stores/toastStore.js";
</script>

<div class="fixed flex flex-col-reverse ease-in-out delay-100 transition flex-grow overflow-y-auto gap-5 right-5 bottom-5">
    {#each $toasts as {id, message}}
        <div class="flex items-center w-full max-w-xs p-4 space-x-4 text-cinnabar-10 bg-gradient-to-tr from-cinnabar-700 to-cerise-red-600 rounded-lg shadow space-x" role="alert">
            <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
                <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z"/>
                </svg>
                <span class="sr-only">Error icon</span>
            </div>
            <div class="ms-3 text-sm font-sans text-cerise-red-50">{message}</div>
            <button type="button"
                    class="ms-auto -mx-1.5 -my-1.5 text-cinnabar-400 rounded-lg p-1.5  inline-flex items-center justify-center h-8 w-8
                    hover:bg-cinnabar-100 hover:text-cinnabar-900
                    focus:ring-2 focus:ring-cinnabar-300"
                    data-dismiss-target="#toast-default"
                    aria-label="Close"
                    on:click={() => removeToast(id)}
            >
                <span class="sr-only">Close</span>
                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
            </button>
        </div>
    {/each}
</div>