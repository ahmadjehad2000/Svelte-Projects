<script>
    import Card from '../shared/Card.svelte';
    import store from "../stores/store.js"
    import Button from '../shared/Button.svelte';
    import { prevent_default } from 'svelte/internal';
    export let poll;
    
  
    // reactive values
    $: totalVotes = poll.votesA + poll.votesB;
    $: percentA = Math.floor(100 / totalVotes * poll.votesA) || 0;
    $: percentB = Math.floor(100 / totalVotes * poll.votesB) || 0;
  
    // handling votes
    const handleVote = (option, id) => {
    
    store.update((pollData)=>{
    let cpolls = [...pollData];
		let votePoll = cpolls.find((poll) =>  poll.id == id)
		
    if (option === 'a'){
			votePoll.votesA++;
		}
		if (option === 'b'){
			votePoll.votesB++;
		}
		
		return cpolls;
    });
    };

    const handleDelete = (id) => {
      store.update((pollData) => {
        return pollData.filter(poll => poll.id != id);
      })
    };
  </script>
  
  <Card>
    <div class="poll">
      <h3>{ poll.question }</h3>
      <p>Total votes: { totalVotes }</p>
      <div class="answer" on:keypress={() => handleVote('a', poll.id)} on:click={() => handleVote('a', poll.id)}>
        <div class="percent percent-a" style="width: {percentA}%"></div>
        <span>{ poll.answerA } ({ poll.votesA } votes)</span>
      </div>
      <div class="answer" on:keypress={() => handleVote('b', poll.id)} on:click={() => handleVote('b', poll.id)}>
        <div class="percent percent-b" style="width: {percentB}%"></div>
        <span>{ poll.answerB } ({ poll.votesB } votes)</span>
      </div>
      <div class="delete">
        <Button flat={true} on:click={()=> handleDelete(poll.id)}>Delete</Button>
      </div>
    </div>
  </Card>
  
  <style>
    h3{
      margin: 0 auto;
      color: #555;
    }
    p{
      margin-top: 6px;
      font-size: 14px;
      color: #aaa;
      margin-bottom: 30px;
    }
    .answer{
      background: #fafafa;
      cursor: pointer;
      margin: 10px auto;
      position: relative;
    }
    .answer:hover{
      opacity: 0.6;
    }
    span{
      display: inline-block;
      padding: 10px 20px;
    }
    .percent{
      height: 100%;
      position: absolute;
      box-sizing: border-box;
    }
    .percent-a{
      background: rgba(226, 223, 6, 0.2);
      border-left: 4px solid #ff7;
    }
    .percent-b{
      background: rgba(87, 8, 212, 0.2);
      border-left: 4px solid #460ccc;
    }
    .delete{
      margin-top: 30px;
      text-align: center;
    }
  </style>