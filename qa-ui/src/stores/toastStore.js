import { writable } from 'svelte/store';

export const toasts = writable([]);

export const showToast = (message) => {
    const id = Date.now();
    toasts.update(toasts => [...toasts, { id, message }]);
    setTimeout(() => removeToast(id), 5000);
}

export const removeToast = (id) => {
    toasts.update(toasts => toasts.filter(toast => toast.id !== id));
}
