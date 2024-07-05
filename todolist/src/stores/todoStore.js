// todoStore.js
import { writable, derived } from 'svelte/store';

export const todo = writable([{
    id:1,
    text:'Implementing Svelte Basics',
    finished:false,
    priority:'High',

},
{
    id:2,
    text:'Learning SvelteKit',
    finished:false,
    priority:'Medium',

}
]);

// Create a store for the search query
export const searchQuery = writable('');

// Create a derived store for filtered todos
export const filteredTodos = derived(
  [todo, searchQuery],
  ([$todo, $searchQuery]) => {
    return $todo.filter(todoTXT =>
      todoTXT.text.toLowerCase().includes($searchQuery.toLowerCase())
    );
  }
);