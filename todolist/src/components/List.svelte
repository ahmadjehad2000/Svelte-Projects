<script>
    import { todo, filteredTodos } from "../stores/todoStore.js";
    import Search from "./Search.svelte";
    import { fade, scale, fly } from "svelte/transition";

    let text = '';
    let priority = "Medium";
    let editingItem = null;
    let editText = '';
    let editPriority = '';
    let showModal = false;

    const priorityColors = {
        Low: '#28a745',
        Medium: '#ffc107',
        High: '#dc3545',
    };

    const handleSubmission = () => {
        if (text.trim()) {
            todo.update(data => [...data, { id: Math.random(), text, finished: false, priority }]);
            text = '';
            priority = "Medium";
        }
    };

    const handleFinished = (item) => {
        todo.update(items => items.map(i => i.id === item.id ? {...i, finished: !i.finished} : i));
    }

    const handleDelete = (id) => {
        todo.update(data => data.filter(todoTXT => todoTXT.id != id));
    }

    const handleEdit = (item) => {
        editingItem = item;
        editText = item.text;
        editPriority = item.priority;
        showModal = true;
    }

    const handleSaveEdit = () => {
        if (editText.trim()) {
            todo.update(items =>
                items.map(item =>
                    item.id === editingItem.id
                        ? { ...item, text: editText, priority: editPriority }
                        : item
                )
            );
            closeModal();
        }
    }

    const closeModal = () => {
        showModal = false;
        editingItem = null;
        editText = '';
        editPriority = '';
    };
</script>

<div class="container">
    <Search/>
    <h1 class="title">A Simple Todo List</h1>

    <div class="text-preview" transition:fade>
        {text}
    </div>

    <div class="list-form">
        <form on:submit|preventDefault={handleSubmission}>
            <input 
                type="text" 
                placeholder="What you want to do?" 
                class="text-input" 
                bind:value={text}
            >
            <div class="priority-selection">
                {#each Object.keys(priorityColors) as key}
                    <label>
                        <input type="radio" bind:group={priority} value={key}>
                        <span class="priority-label" style="background-color: {priorityColors[key]}">{key}</span>
                    </label>
                {/each}
            </div>
            <button class="submit-btn">Add Task</button>
        </form>
    </div>

    <div class="todo-list">
        <h2>Tasks:</h2>
        <ul>
            {#each $filteredTodos as item (item.id)}
                <li transition:scale>
                    <label class="todo-item">
                        <input 
                            type="checkbox" 
                            checked={item.finished} 
                            on:change={() => handleFinished(item)}
                        />
                        <span class="checkmark"></span>
                        <span class="todo-text" class:finished={item.finished}>
                            {item.text}
                        </span>
                        <span class="priority-indicator" style="color: {priorityColors[item.priority]}">
                            {item.priority}
                        </span>
                    </label>
                    <div class="options">
                        <button class="del-btn" on:click={() => handleDelete(item.id)}>Delete</button>
                        <button class="edit-btn" on:click|preventDefault={() => handleEdit(item)}>Edit</button>
                    </div>
                </li>
            {/each}
        </ul>
    </div>

    {#if showModal}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div class="modal-backdrop" on:click={closeModal} transition:fade></div>
        <div class="modal" transition:fly="{{ y: 200, duration: 300 }}">
            <h2>Edit Todo</h2>
            <input 
                type="text" 
                bind:value={editText} 
                class="edit-input"
                placeholder="Edit your todo"
            />
            <div class="priority-selector">
                {#each Object.keys(priorityColors) as key}
                    <label>
                        <input type="radio" bind:group={editPriority} value={key}>
                        <span class="priority-label" style="background-color: {priorityColors[key]}">{key}</span>
                    </label>
                {/each}
            </div>
            <div class="button-group">
                <button class="btn btn-apply" on:click={handleSaveEdit}>Apply</button>
                <button class="btn btn-cancel" on:click={closeModal}>Cancel</button>
            </div>
        </div>
    {/if}
</div>

<style>
    :global(body) {
        background-color: #f5f5f5;
        font-family: 'Roboto', Arial, sans-serif;
        color: #333;
        margin: 0;
        padding: 0;
    }

    .container {
        max-width: 600px;
        margin: 2rem auto;
        padding: 2rem;
        background-color: white;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .title {
        text-align: center;
        color: #2c3e50;
        margin-bottom: 2rem;
    }

    .text-preview {
        text-align: center;
        font-size: 1.2rem;
        font-weight: 500;
        color: #3498db;
        min-height: 1.5em;
        margin-bottom: 1rem;
    }

    .list-form {
        margin-bottom: 2rem;
    }

    .text-input {
        width: 100%;
        padding: 0.8rem;
        font-size: 1rem;
        border: 1px solid #ddd;
        border-radius: 4px;
        margin-bottom: 1rem;
    }

    .submit-btn {
        width: 100%;
        padding: 0.8rem;
        font-size: 1rem;
        background-color: #3498db;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.3s;
    }

    .submit-btn:hover {
        background-color: #2980b9;
    }

    .todo-list h2 {
        color: #2c3e50;
        margin-bottom: 1rem;
    }

    ul {
        list-style: none;
        padding: 0;
    }

    .todo-item {
        display: flex;
        align-items: center;
        margin-bottom: 0.5rem;
        cursor: pointer;
    }

    .todo-item input[type="checkbox"] {
        display: none;
    }

    .checkmark {
        width: 20px;
        height: 20px;
        border: 2px solid #3498db;
        border-radius: 50%;
        margin-right: 10px;
        position: relative;
    }

    .todo-item input[type="checkbox"]:checked + .checkmark::after {
        content: '✓';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: #3498db;
    }

    .todo-text {
        flex-grow: 1;
    }

    .finished {
        text-decoration: line-through;
        color: #7f8c8d;
    }

    .options {
        display: flex;
        flex-direction: row;
    }

    .del-btn, .edit-btn {
        color: white;
        margin: 8px 5px;
        border-radius: 5px;
        cursor: pointer;
        padding: 8px;
        border: none;
        width: auto;
    }

    .del-btn {
        background-color: #dc3545;
    }

    .del-btn:hover {
        background-color: #c82333;
    }

    .edit-btn {
        background-color: green;
    }

    .edit-btn:hover {
        background-color: rgb(6, 161, 27);
    }

    .modal-backdrop {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 1000;
    }

    .modal {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: white;
        padding: 2rem;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 1001;
        width: 90%;
        max-width: 500px;
    }

    .modal h2 {
        margin-top: 0;
        margin-bottom: 1rem;
    }

    .edit-input {
        width: 100%;
        padding: 0.5rem;
        margin-bottom: 1rem;
        border: 1px solid #ced4da;
        border-radius: 4px;
    }

    .priority-selector {
        display: flex;
        justify-content: space-between;
        margin-bottom: 1rem;
    }

.priority-selector label {
    flex: 1;
    text-align: center;
}

.priority-selector input[type="radio"] {
    display: none;
}

.priority-label {
    display: inline-block;
    padding: 0.5rem;
    width: 100%;
    border-radius: 4px;
    color: white;
    cursor: pointer;
    width: 3.6rem;
    margin: 3px 3px;
}

.priority-selector input[type="radio"]:checked + .priority-label {
    box-shadow: 0 0 0 2px #333;
}

.button-group {
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;
}

.btn {
    padding: 0.8rem 1.2rem;
    border-radius: 4px;
    cursor: pointer;
    border: none;
    transition: background-color 0.3s;
}

.btn-apply {
    background-color: #28a745;
    color: white;
}

.btn-apply:hover {
    background-color: #218838;
}

.btn-cancel {
    background-color: #dc3545;
    color: white;
}

.btn-cancel:hover {
    background-color: #c82333;
}
</style>