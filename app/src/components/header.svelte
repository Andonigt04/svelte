<script>
  import { onMount } from "svelte";

  export let links = [];

  let isDarkMode = false;

  onMount(() => {
    const savedTheme =
      localStorage.getItem("theme") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light");
    isDarkMode = savedTheme === "dark";
    document.documentElement.classList.toggle("dark", isDarkMode);

    document.getElementById("toggle").checked = isDarkMode;
  });

  // Alternar tema
  function toggleTheme() {
    isDarkMode = !isDarkMode;
    document.documentElement.classList.toggle("dark", isDarkMode);
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }
</script>

<header
  class="border-b-2 text-center justify-between flex flex-row mb-8 p-4 bg-white dark:bg-black"
>
  <h1>APP</h1>
  <nav class="flex flex-row items-center peer-checked:c-white">
    <ul class="flex">
      {#each links as link}
        <li class="mx-2"><a href={link.href}>{link.text}</a></li>
      {/each}
    </ul>
    <div class="toggle-container">
      <label for="toggle" class="flex items-center cursor-pointer">
        <div class="relative">
          <input
            on:change={toggleTheme}
            type="checkbox"
            id="toggle"
            class="sr-only peer"
          />
          <div
            class="w-12 h-6 bg-gray-500 rounded-full peer-checked:bg-blue-400"
          ></div>
          <div
            class="dot absolute left-1 top-1 w-4 h-4 bg-white rounded-full peer-checked:translate-x-6 transition-transform"
          ></div>
        </div>
      </label>
    </div>
  </nav>
</header>
