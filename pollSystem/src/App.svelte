<script>
	import Header from "./components/Header.svelte";
	import Footer from "./components/Footer.svelte";
	import Tabs from "./shared/Tabs.svelte";
	import PollForm from "./components/PollForm.svelte";
	import PollList from "./components/PollList.svelte";


	let items = ['Current Polls', 'Add New Poll'];
	let activeItem = 'Current Polls';

	const tabHandler = (e) => {
		activeItem = e.detail;
	};
	
	// let polls = [ // we have built our central store for data
	// 	{
	// 	id: 1,
	// 	question: 'JS or Js?',
	// 	answerA: 'Js',
	// 	answerB: 'JS',
	// 	votesA: 9,
	// 	votesB: 8,
	// 	}
	// ];
	const handleAdd = (e) => {
		activeItem = 'Current Polls';
	}

</script>

<Header />
<main>
	<Tabs {activeItem} {items} on:tabChange={tabHandler}/>
	{#if activeItem == 'Current Polls'}
		<PollList />
	{:else if activeItem === 'Add New Poll'}
		<PollForm on:add={handleAdd}/>
	{/if}
</main>
<Footer />
<style>
	main{
	width: 100%;
    max-width: 960px;
    margin: 40px auto;
	}
</style>