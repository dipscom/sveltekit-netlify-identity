<script context="module">
  export async function load({ session }) {
    if (session.user) {
      return {
        status: 302,
        redirect: "/protected"
      }
    }

    return {}
  }
</script>

<script>
  import { browser } from "$app/env";
  /**
   * Whenever $session is updated,
   * the 'load' function runs again
   * thus, redirecting the user after login for example.
  */
  import { session } from "$app/stores";
  import { auth } from "$lib/stores"

  const tokenName = "#confirmation_token";

  let confirming = false;
  let email;
  let error;
  let loading = false;
  let password;

  /**
   * Confirm new account, when a token is present
  */ 
  if (browser && location.hash && location.hash.startsWith(tokenName)) {
		const token = location.hash.slice(tokenName.length + 1);
		
    checkConfirmationToken(token);
	}

  async function checkConfirmationToken (token) {
    confirming = true;
    error = undefined;

    try {
      const data = await $auth.confirm(token);

      console.log("check confirmation token", data);

      $session.user = data.user || null;
    } catch (err) {
      console.log("Confirming token ERROR:", err);

      error = err;
    }

    confirming = false;
  }

  function handleSubmit() {
    loading = true;

    $auth.login(email, password, true)
    .then((response) => {
      $session.user = response;

      loading = false;
    })
    .catch((err) => {
      console.log("Login ERROR:", err);

      error = err;

      loading = false;
    });
  }
</script>

{#if confirming}
  <h2>Confirming user sign up</h2>

  <p>Please wait...</p>
{:else if loading}
  <h2>Checking credentials</h2>

  <p>Please wait...</p>
{:else if $session.user}
  <h2>User confirmed</h2>

  <p>{$session.user.email}</p>
{:else}
  <h2>Log in form</h2>

  {#if error}
    <p><strong>{error}</strong></p>
  {/if}

  <form on:submit|preventDefault="{handleSubmit}">
    <label>
      <span>Email:</span>
      
      <input type="email" bind:value="{email}" />
    </label>

    <label>
      <span>Password:</span>

      <input type="password" bind:value="{password}">
    </label>

    <button type="submit">
      Log in
    </button>
  </form>

  <p>No account? <a href="/sign-up">Sign up</a>.</p>
{/if}