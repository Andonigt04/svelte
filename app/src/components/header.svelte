<script>
  import { onMount } from "svelte";
  import menuImg from "@img/menu-svgrepo-com.svg";

  // @ts-ignore
  export let links = [];

  let isDarkMode = false;

  onMount(() => {
    const savedTheme =
      localStorage.getItem("theme") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light");
    isDarkMode = savedTheme === "dark";
    document.documentElement.classList.remove("light");
    document.documentElement.classList.remove("dark");
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.add("light");
    }

    // @ts-ignore
    document.getElementById("toggle").checked = isDarkMode;
  });

  function toggleTheme() {
    isDarkMode = !isDarkMode;
    document.documentElement.classList.remove("light");
    document.documentElement.classList.remove("dark");
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.add("light");
    }
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }

  let isShowed = false;

  function showMenu() {
    // @ts-ignore
    const header = document.querySelector("header");
    const menu = document.querySelector("nav");
    const menuUl = document.querySelector("nav ul");

    isShowed = !isShowed;

    if (isShowed) {
      menu?.classList.add("max-md:hidden");
      menu?.classList.remove("flex-col");
      header?.classList.remove("flex-col");
      menuUl?.classList.remove("flex-col", "my-4");
    } else {
      menu?.classList.remove("max-md:hidden");
      menu?.classList.add("flex-col");
      header?.classList.add("flex-col");
      menuUl?.classList.add("flex-col", "my-4");
    }
  }
</script>

<header class="border-b-2 text-center justify-between flex flex-row mb-8 p-4">
  <div class="flex flex-row justify-between items-center">
    <h1>APP</h1>
    <div class="md:hidden">
      <button on:click={showMenu} type="button">
        <picture>
          <source media="(max-width: 128px)" srcset={menuImg} />
          <img class="w-8" src={menuImg} alt={menuImg} srcset={menuImg} />
        </picture>
      </button>
    </div>
  </div>
  <nav class="flex flex-row items-center peer-checked:c-white max-md:hidden">
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
