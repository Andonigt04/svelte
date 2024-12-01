<script>
  /**
   * @type {any[]}
   */
  export let links = [];
</script>

<header class="border-b-2 text-center justify-between flex flex-row mb-8 p-4">
  <h1>APP</h1>
  <nav class="flex flex-row items-center">
    <ul class="flex">
      {#each links as link}
        <li class="mx-2"><a href={link.href}>{link.text}</a></li>
      {/each}
    </ul>
    <div class="toggle-container">
      <label for="toggle" class="flex items-center cursor-pointer">
        <div class="relative">
          <input
            type="checkbox"
            id="toggle"
            class="sr-only peer"
          />
          <div class="w-12 h-6 bg-gray-200 rounded-full peer-checked:bg-white"></div>
          <div class="dot absolute left-1 top-1 w-4 h-4 peer-checked:bg-black bg-white rounded-full peer-checked:translate-x-6 transition-transform"></div>
        </div>
        <span class="ml-3 text-gray-700 peer-checked:bg-white">Toggle</span>
      </label>
    </div>
  </nav>
</header>
