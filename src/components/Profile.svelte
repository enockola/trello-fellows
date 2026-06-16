<script lang="ts">
  import { onMount } from "svelte";
  import { userStore, logout } from "../js/auth.svelte.ts";

  const baseURL = import.meta.env.PUBLIC_SERVER_URL;
  let profile = $state({ message: "" });

  async function getProfile() {
    // If there's no token at all, handle it immediately before making a request
    if (!userStore.token) {
      logout();
      window.location.href = `/login/?redirect=${window.location.pathname}`;
      return;
    }

    try {
      const res = await fetch(`${baseURL}users/protected`, {
        method: "GET",
        headers: {
          // Pass our JWT token to the server for authentication validation
          Authorization: `Bearer ${userStore.token}`
        }
      });

      if (res.ok) {
        return await res.json();
      } else {
        // If the server rejects the token (e.g., expired or malformed), clear session and redirect
        logout();
        window.location.href = `/login/?redirect=${window.location.pathname}`;
      }
    } catch (error) {
      console.error("Failed to fetch protected profile data:", error);
    }
  }

  async function init() {
    const data = await getProfile();
    if (data) {
      profile = data;
    }
  }

  onMount(init);
</script>

{#if userStore.isLoggedIn}
  <div class="profile-container">
    <h2>User Profile</h2>
    <p>{profile.message}</p>
  </div>
{:else}
  <p>You must login to see this page</p>
{/if}

<style>
  .profile-container {
    max-width: 400px;
    margin: 2rem auto;
    padding: 2rem;
    border: 1px solid #ccc;
    border-radius: 8px;
    text-align: center;
  }
</style>