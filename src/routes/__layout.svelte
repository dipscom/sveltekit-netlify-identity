<script>
  import { browser } from "$app/env";
  import { session } from "$app/stores";

  if(browser) {
    const localUser = JSON.parse(localStorage.getItem('gotrue.user'));
    
    if (localUser) {
      $session.user = localUser;
    }
  }
</script>

<h1>SvelteKit &amp; Netlify identity (GotTrue-JS)</h1>

<slot></slot>

<p>Visit <a href="https://kit.svelte.dev" rel="external" target="_blank">kit.svelte.dev</a> to read SvelteKit's documentation.</p>

<p>Visit <a href="https://github.com/netlify/gotrue-js" rel="external" target="_blank">github.com/netlify/gotrue-js</a> to read GotTrue documentation.</p>

<p>See the <a href="https://github.com/dipscom/sveltekit-netlify-identity" rel="external" target="_blank">Github repository</a>.</p>
