<script>
  import { searchQuery } from "../stores/todoStore";
  let query = '';
  // Update the searchQuery store whenever the local query changes
  $: $searchQuery = query;
</script>

<div class="search-container">
  <input 
    type="text" 
    placeholder="Search..." 
    bind:value={query} 
    class="search-input"
  >
</div>

<style>
  .search-container {
    margin-bottom: 20px;
  }

  .search-input {
    width: 100%;
    padding: 8px;
    font-size: 16px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
</style>