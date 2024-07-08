<script>
    import { marked } from 'marked';
    import { onMount } from 'svelte';
  
    let editableDiv;
    let isFocused = false;
    let content = '';
    const placeholder = 'Click here to start typing...';
    let htmlContent = null;
    $: isEmpty = !content.trim();
  
    const handleInput = (event) => {
      content = event.target.innerText;
      htmlContent = marked.parse(content);
    };
  
    const handleFocus = () => {
      isFocused = true;
    };
  
    const handleBlur = () => {
      isFocused = false;
    };
  
    onMount(() => {
      editableDiv.focus();
    });
  </script>
  
  <div class="container">
    <h1 class="title">Markup Parser</h1>
    <div class="content">
      <div class="input-container">
        <div
          class="editable-div"
          class:empty={isEmpty}
          class:focused={isFocused}
          contenteditable="true"
          bind:this={editableDiv}
          on:input={handleInput}
          on:focus={handleFocus}
          on:blur={handleBlur}
        >
          {#if isEmpty && !isFocused}
            <span class="placeholder">{placeholder}</span>
          {/if}
        </div>
      </div>
      <div class="preview-container">
        <div class="preview">
          {@html htmlContent}
        </div>
      </div>
    </div>
  </div>
  
  <style>
    .container {
      font-family: Arial, sans-serif;
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
    }
  
    .title {
      text-align: center;
      color: rgb(185, 184, 184)    }
  
    .content {
      display: flex;
      gap: 20px;
      margin-top: 20px;
    }
  
    .input-container, .preview-container {
      flex: 1;
      width: 1000rem;
      align-items: center;
      flex-direction: row;
      margin: 20px 20px;
    }
  
    .editable-div {
      width: 100%;
      min-height: 300px;
      border: 1px solid #ccc;
      border-radius: 4px;
      padding: 10px;
      font-size: 16px;
      line-height: 1.5;
      position: relative;
      overflow-y: auto;
      white-space: pre-wrap;
    }
  
    .editable-div:focus {
      outline: none;
      border-color: #007bff;
      box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
    }
  
    .placeholder {
      color: #999;
      position: absolute;
      pointer-events: none;
      top: 10px;
      left: 10px;
    }

    .preview-container h2 {
      margin: -17px 0;
      color: #333;
    }
  
    .preview {
      border: 1px solid #ccc;
      border-radius: 4px;
      padding: 10px;
      min-height: 300px;
      overflow-y: auto;
    }
  
    .empty:not(.focused)::after {
      content: '|';
      position: absolute;
      top: 10px;
      left: 10px;
      animation: cursor-blink 1s step-end infinite;
    }
  
    @keyframes cursor-blink {
      0%, 100% { opacity: 1; }
      50% { opacity: 0; }
    }
  </style>