<template>
  <div class="bg-gray-500 max-h-full">

    <div class="relative isolate px-6 pt-14 lg:px-8">
      <Header />
      <!-- BACKGROUND BLURRED - TOP -->
      <div class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
           aria-hidden="true">
        <div class="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg]
        bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem] shape-blurred-top "/>
      </div>
      <!-- BACKGROUND BLURRED - TOP -->

      <div class="mx-auto max-w-2xl py-40 ">
        <div class="text-center">
          <h1 class="text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">En attendant mon
            départ...</h1>
          <p class="mt-8 text-pretty text-xl font-medium text-gray-900 sm:text-xl/8">voici mon "au revoir".</p>
          <div class="mt-10 flex justify-center gap-x-6">
            <a href="editor" class="rounded-md bg-blue-800 px-3.5 py-2.5 font-semibold text-white shadow-sm hover:bg-blue-500
            focus-visible:outline focus-visible:outline-offset-2 text-xl
            focus-visible:outline-indigo-600">Je suis prêt</a>
            <a href="game" class="rounded-md bg-red-800 px-3.5 py-2.5 font-semibold text-white shadow-sm hover:bg-red-500
            focus-visible:outline focus-visible:outline-offset-2 text-xl
            focus-visible:outline-indigo-600">J'ai besoin de temps</a>
          </div>
        </div>
      </div>

      <div class="relative mt-12">
        <div aria-hidden="true" class="absolute inset-0 flex items-center">
          <div class="w-full border-t border-gray-300"/>
        </div>
        <div id="more" class="relative flex justify-center">
          <span class="bg-gray-300 px-2 text-xl font-bold text-gray-500">En savoir plus</span>
        </div>
      </div>
      <div class="max-w-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div class="flex-1/2 max-w-1/2">
          <div class="mt-10 text-2xl font-semibold flex justify-center text-gray-900 sm:text-7xl">
            TheEnd.page
          </div>
          <div class="mt-3 text-xl flex justify-center font-bold text-gray-900 sm:text-xl">
            La page de départ qu’on oublie pas.
          </div>
          <div class="mt-10 text-xl font-medium text-gray-900 sm:text-xl">
            Peut importe la raison:
          </div>
          <ul class="list-disc pl-5 font-medim ml-12 ">
            <li>
              Un job quitté ?
            </li>
            <li>
              Un projet terminé ?
            </li>
            <li>
              Une rupture ?
            </li>
            <li>
              Un canal Discord déserté ?
            </li>
          </ul>
          <br>
          Crée ta page de sortie : stylée, dramatique, ironique, touchante ou complètement absurde.
          <br>
          Ajoute des GIFs, des sons, des larmes (ou pas) et raconte ta version de l’histoire.
          <br>

          <ul>
            <li>
              👉 Une page unique à partager.
            </li>
            <li>
              👉 Un dernier mot qui claque.
            </li>
            <li>
              👉 Un adieu qui se transforme en légende.
            </li>
          </ul>
          Parce que si c’est la fin…
          <br>
          Autant la rendre inoubliable. 💥
          <br>
        </div>
      </div>
      <!--BACKGROUND BLURRED - BOTTOM -->
    </div>
    <Footer />
  </div>

</template>

<script setup>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
</script>

<style scoped>

.shape-blurred-bottom {
  clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)
}

.shape-blurred-top {
  clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)
}

</style>