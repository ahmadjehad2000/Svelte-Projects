import { writable } from 'svelte/store';

const store = writable([
    {
        id: 1,
        question: 'Default Question?',
        answerA: 'Yes',
        answerB: 'No',
        votesA: 8,
        votesB: 10,
    },
]);

export default store;