<script>
    import store from "../stores/store.js";
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    import Button from "../shared/Button.svelte";
    let fields = {  question: '',
                    answerA: '',
                    answerB:'',
    };
    let errors = {
                    question: '',
                    answerA: '',
                    answerB:'',
    };
    let valid = false;
    const submitHandler = () => {
    
        valid = true;

        //validate question
        if (fields.question.trim().length < 5){
            valid = false
            errors.question = 'Question must be more than 5 characters';
        }
        else{
            errors.question = '';
        }

        //answer a
        if (fields.answerA.trim().length < 1){
            valid = false
            errors.answerA = 'Answer must not be empty';
        }
        else{
            errors.answerA = '';
        }

        //answer b
        if (fields.answerB.trim().length < 1){
            valid = false
            errors.answerB = 'Answer must not be empty';
        }
        else{
            errors.answerB = '';
        }

        //adding new polll
        if(valid){
            let poll = {...fields, votesA:0, votesB:0, id: Math.random()};
            store.update((pollData) => {
                return [poll, ...pollData];
            });
            dispatch('add')
        }
    };
</script>

<form on:submit|preventDefault={submitHandler}>
    <div class="form-field">
        <label for="question">Poll Question:</label>
        <input type="text" id="question" bind:value={fields.question}>
    </div>
    <div class="error">{errors.question}</div>
    <div class="form-field">
        <label for="question">Answer A:</label>
        <input type="text" id="answer-a" bind:value={fields.answerA}>
    </div>
    <div class="error">{errors.answerA}</div>
    <div class="form-field">
        <label for="question">Answer B:</label>
        <input type="text" id="answer-b" bind:value={fields.answerB}>
    </div>
    <div class="error">{errors.answerB}</div>
    <Button> Add Poll </Button>
</form>

<style>
    form{
        width: 480px;
        margin: 0 auto;
        text-align: center;
    }
    .form-field{
        margin: 18px auto;
    }

    input{
        width: 100%;
        border-radius: 6px;
    }
    label{
        margin: 10px auto;
        text-align: left;
    }
    .error{
        color: red;
        background-color: #f7f7f7;
        border-radius: 10px;
        margin: 1.2rem;
        font-weight: bold;
    }
</style>