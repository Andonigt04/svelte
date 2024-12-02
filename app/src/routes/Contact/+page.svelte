<script>
    // @ts-nocheck
  
    import { onMount } from "svelte";
    import { links, models3d, games, main_slider } from "@components/utils.js";
    import Header from "@components/header.svelte";
    import Footer from "@components/footer.svelte";
  </script>
  
  <div
    class="justify-center bg-background-light light:bg-custom dark:text-text-dark dark:bg-background-dark"
  >
    <Header {links} />
    <main></main>
    <Footer />
  </div>
  