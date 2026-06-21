<script>
  import { onMount } from 'svelte';

  let alerts = [];

  onMount(async () => {
    try {
      const response = await fetch('/json/alerts.json');
      if (response.ok) {
        alerts = await response.json();
      }
    } catch (error) {
      console.error("Error loading alerts.json:", error);
    }
  });

  function dismissAlert(indexToRemove) {
    alerts = alerts.filter((_, index) => index !== indexToRemove);
  }
</script>

{#if alerts.length > 0}
  <section class="alerts">
    {#each alerts as alert, i}
      <p 
        class="alert" 
        style:color={alert.color} 
        style:background-color={alert.backgroundColor || alert.background}
      >
        <span class="alert-message">{alert.message}</span>
        
        <button 
          type="button" 
          class="close-btn" 
          aria-label="Close alert"
          style:color={alert.color}
          on:click={() => dismissAlert(i)}
        >
          &times;
        </button>
      </p>
    {/each}
  </section>
{/if}

<style>
  .alerts {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: 100%;
    max-width: 600px;
    margin: 1rem auto;
  }

  .alert {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem 1rem;
    margin: 0;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    font-family: sans-serif;
  }

  .alert-message {
    flex-grow: 1;
    margin-right: 1rem;
  }

  .close-btn {
    background: none;
    border: none;
    font-size: 1.25rem;
    font-weight: bold;
    cursor: pointer;
    padding: 0 0.25rem;
    line-height: 1;
    opacity: 0.7;
    transition: opacity 0.2s;
  }

  .close-btn:hover {
    opacity: 1;
  }
</style>