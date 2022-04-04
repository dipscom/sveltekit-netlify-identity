<script context="module">
  export async function load({ session }) {
    if (!session.user) {
      return {
        status: 302,
        redirect: "/"
      }
    }

    return {}
  }
</script>

<script>
  import { session } from "$app/stores";
  import { auth } from "$lib/stores";

  $: userEmail = $session.user ? $session.user.email : "nobody";

  async function handleLogout() {
    const user = $auth.currentUser();
  
    user
      .logout()
      .then(() => {        
        /**
         * this will trigger a redirect, because it
         * causes the `load` function to run again
        */
        $session.user = null;
      })
      .catch(error => {
        console.log("Failed to logout user:", error);

        throw error;
      });
  }
</script>

<h2>Protected route</h2>

<p>You are now logged in as <strong>{userEmail}</strong>.</p>

<form on:submit|preventDefault="{handleLogout}">
  <button type="submit">Logout</button>
</form>
