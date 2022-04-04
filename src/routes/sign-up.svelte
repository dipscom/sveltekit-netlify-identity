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
  import { getContext } from "svelte";

  const auth = getContext("auth");

  let email;
  let error;
  let password;
  let passwordConfirm;
  let signUpRequested = false;

  async function handleSubmit() {
    error = undefined;
    signUpRequested = false;

    if (password !== passwordConfirm) {
      error = "Password does not match."

      return;
    }

    auth.signup(email, password)
    .then(() => {
      signUpRequested = true;
    })
    .catch((err) => {
      console.log("ERROR:", err);

      error = err;
    });
  }
</script>

<h2>Sign up form</h2>

{#if error}
  <p><strong>{error}</strong></p>
{/if}

{#if signUpRequested}
  <p>Email confirmation sent.</p>

  <p><a href="/">Go to the homepage</a>.</p>
{:else}
  <form on:submit|preventDefault="{handleSubmit}">
    <label>
      <span>Email:</span>

      <input type="email" bind:value="{email}" />
    </label>

    <label>
      <span>Password:</span>

      <input type="password" bind:value="{password}" />
    </label>

    <label>
      <span>Confirm password:</span>

      <input type="password" bind:value="{passwordConfirm}" />
    </label>

    <button type="submit">
      Create account
    </button>
  </form>

  <p>Already have an account? <a href="/">Log in</a>.</p>
{/if}
