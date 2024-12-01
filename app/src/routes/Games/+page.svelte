<script>
  // @ts-nocheck

  import { links } from "@components/utils.js";
  import Header from "@components/header.svelte";
  import Footer from "@components/footer.svelte";

  import right_arrow from "@img/right-arrow.svg";

  const imgW = "w-5";
  const row = "flex flex-row items-center hover:underline cursor-pointer";
</script>

<div class="light:bg-gray-900">
  <Header {links} />
  <main class="min-h-lvh mx-96">
  </main>
  <Footer />
</div>
