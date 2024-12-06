<script>
  // @ts-nocheck

  import { onMount } from "svelte";
  import * as THREE from "three";
  import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js";
  import { links, models3d, games, main_slider } from "@components/utils.js";
  import Header from "@components/header.svelte";
  import Footer from "@components/footer.svelte";

  import right_arrow_img from "@img/right-arrow.svg";

  const imgW = "w-5";
  const row = "flex flex-row items-center hover:underline cursor-pointer";
  const modelcss = "flex flex-row";

  let models3d_currentSlide = 0;
  const models3d_totalSlides = models3d.length;

  let main_currentSlide = 0;
  const main_totalSlides = main_slider.length;

  let games_currentSlide = 0;
  const games_totalSlides = games.length;

  let container;

  function checkArrows(curr, totslid, where) {
    const slideTo = curr + where;
    return slideTo >= 0 && slideTo < totslid ? true : false;
  }

  function slide() {
    moveSlider(
      main_currentSlide,
      main_totalSlides,
      1,
      (value) => (main_currentSlide = value)
    );
  }

  async function moveSlider(curr, totslid, offset, setSlide) {
    const nextSlide = curr + offset;

    if (nextSlide >= 0 && nextSlide < totslid) {
      setSlide(nextSlide);
    } else {
      if (main_currentSlide === main_totalSlides - 1) {
        setSlide(0);
      }
    }
  }

  onMount(() => {
    models3d.forEach((model, idx) => {
      if (containers[idx]) {
        loadModel(containers[idx], model.href);
      }
    });

    const interval = setInterval(() => {
      slide();
    }, 5000);

    return () => clearInterval(interval);
  });

  function loadModel(container, src) {
    if (!container || container.loaded) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0x606060);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1).normalize();
    scene.add(ambientLight, directionalLight);

    const loader = new STLLoader();
    loader.load(
      src,
      (geometry) => {
        const material = new THREE.MeshStandardMaterial({ color: 0x0055ff });
        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        // Centrar y escalar el modelo
        geometry.computeBoundingBox();
        const center = geometry.boundingBox.getCenter(new THREE.Vector3());
        mesh.geometry.translate(-center.x, -center.y, -center.z);
        mesh.scale.setScalar(
          1 / geometry.boundingBox.getSize(new THREE.Vector3()).length()
        );

        render();
      },
      undefined,
      (error) => console.error("Error al cargar el modelo STL:", error)
    );

    camera.position.set(0, 0, 3);

    const render = () => {
      requestAnimationFrame(render);
      renderer.render(scene, camera);
    };

    render();
    container.loaded = true;
  }
</script>

<div
  class="justify-center bg-background-light light:bg-custom dark:text-text-dark dark:bg-background-dark"
>
  <Header {links} />
  <main class="min-h-lvh lg:mx-72 md:mx-32 justify-center overflow-hidden">
    <section class="my-10">
      <div class="flex flex-col items-center">
        <ul
          class="flex flex-row w-full"
          style="transform: translateX({-main_currentSlide *
            100}%); transition-timing-function: ease; transition-duration: .8s;"
        >
          {#each main_slider as slider}
            <li class="w-full min-w-full">
              <a href={slider.href}>
                <div>
                  <picture>
                    <source srcset={slider.img} media="(min-width: 640px)" />
                    <img
                      class="min-w-full"
                      src={slider.img || "default-image.jpg"}
                      alt={slider.img || "default-image"}
                    />
                  </picture>
                </div></a
              >
            </li>
          {/each}
        </ul>
        <div>
          {#each main_slider as slider, idx}
            <input
              type="radio"
              name="slider"
              id={idx}
              checked={idx === main_currentSlide ? true : false}
              on:click={() => {
                main_currentSlide = idx - 1;
                slide();
              }}
            />
          {/each}
        </div>
      </div>
    </section>
    <section class="my-10">
      <a href="/3DModels">
        <h2 class={row}>
          3D Models <picture>
            <source srcset={right_arrow_img} media="(min-width: 640px)" />
            <img src={right_arrow_img} alt="right-arrow" class={imgW} />
          </picture>
        </h2>
      </a>
      <div class="items-center grid">
        <ul class="{modelcss} slider">
          {#each models3d as model3d, idx}
            <li
              class="mx-5 slide"
              style="transform: translateX({-models3d_currentSlide *
                100}%); transition-timing-function: ease; transition-duration: .8s;"
            >
              <div>
                <h3 class="mb-4">{model3d.name}</h3>
                <div
                  class="w-96 h-52 rounded-2xl border-2 flex items-center justify-center"
                >
                  <div
                    class="model-container w-full h-full"
                    bind:this={containers[idx]}
                  ></div>
                </div>
              </div>
            </li>
          {/each}
          <div
            class="flex absolute h-52 w-4/6 mt-10 justify-between max-lg:hidden"
          >
            {#if checkArrows(models3d_currentSlide, models3d_totalSlides, -1)}
              <button
                on:click={() =>
                  moveSlider(
                    models3d_currentSlide,
                    models3d_totalSlides,
                    -1,
                    (value) => (models3d_currentSlide = value)
                  )}
              >
                <picture>
                  <source srcset={right_arrow_img} media="(min-width: 640px)" />
                  <img
                    src={right_arrow_img}
                    alt="right-arrow"
                    class="{imgW} rotate-180"
                  />
                </picture></button
              >
            {/if}
            {#if checkArrows(models3d_currentSlide, models3d_totalSlides, 1)}
              <button
                class="absolute right-0 self-center"
                on:click={() =>
                  moveSlider(
                    models3d_currentSlide,
                    models3d_totalSlides,
                    1,
                    (value) => (models3d_currentSlide = value)
                  )}
                ><picture>
                  <source srcset={right_arrow_img} media="(min-width: 640px)" />
                  <img src={right_arrow_img} alt="right-arrow" class={imgW} />
                </picture></button
              >
            {/if}
          </div>
        </ul>
      </div>
    </section>
    <section class="my-10">
      <a href="/Games">
        <h2 class={row}>
          Games
          <picture>
            <source srcset={right_arrow_img} media="(min-width: 640px)" />
            <img src={right_arrow_img} alt="right-arrow" class={imgW} />
          </picture>
        </h2>
      </a>
      <div class="items-center grid">
        <ul class="{modelcss} slider">
          {#each games as game}
            <li
              class="mx-5 slide"
              style="transform: translateX({-games_currentSlide *
                100}%); transition-timing-function: ease; transition-duration: .8s;"
            >
              <div>
                <h3 class="mb-4">{""}</h3>
                <div class="w-96 h-52 rounded-2xl border-2">
                  <picture>
                    <source srcset={""} media="(min-width: 640px)" />
                    <img src={""} alt="img" class={""} />
                  </picture>
                </div>
              </div>
            </li>
          {/each}
          <div
            class="flex absolute h-52 w-4/6 mt-10 justify-between max-lg:hidden"
          >
            {#if checkArrows(games_currentSlide, games_totalSlides, -1)}
              <button
                on:click={() =>
                  moveSlider(
                    games_currentSlide,
                    games_totalSlides,
                    -1,
                    (value) => (games_currentSlide = value)
                  )}
              >
                <picture>
                  <source srcset={right_arrow_img} media="(min-width: 640px)" />
                  <img
                    src={right_arrow_img}
                    alt="right-arrow"
                    class="{imgW} rotate-180"
                  />
                </picture></button
              >
            {/if}
            {#if checkArrows(games_currentSlide, games_totalSlides, 1)}
              <button
                class="absolute right-0 self-center"
                on:click={() =>
                  moveSlider(
                    games_currentSlide,
                    games_totalSlides,
                    1,
                    (value) => (games_currentSlide = value)
                  )}
                ><picture>
                  <source srcset={right_arrow_img} media="(min-width: 640px)" />
                  <img src={right_arrow_img} alt="right-arrow" class={imgW} />
                </picture></button
              >
            {/if}
          </div>
        </ul>
      </div>
    </section>
  </main>
  <Footer />
</div>
