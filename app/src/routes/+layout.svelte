<script lang="ts">
  import "../app.css";
  import { redirect } from '@sveltejs/kit';
  let { children } = $props();

  export function load({ url }) {
    if (url.pathname === '/') {
      // Redirige solo si la ruta es exactamente "/"
      throw redirect(302, '/Home');
    }
  }
</script>

{@render children()}
