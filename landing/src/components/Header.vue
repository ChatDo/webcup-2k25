<script setup>
import {Dialog, DialogPanel} from '@headlessui/vue'
import {Bars3Icon, XMarkIcon} from '@heroicons/vue/24/outline'
import Logo from "@/components/icons/Logo.vue";
import {ref} from "vue";

const mobileMenuOpen = ref(false)

</script>

<template>
  <header class="absolute inset-x-0 top-0 z-50">
    <nav class="flex items-center justify-between p-6 lg:px-8 bg-gray-700" aria-label="Global">
      <div class="flex lg:flex-1">
        <Logo/>
      </div>
      <div class="flex lg:hidden">
        <button type="button" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                @click="mobileMenuOpen = true">
          <span class="sr-only">Ouvrir le menu</span>
          <Bars3Icon class="size-6" aria-hidden="true"/>
        </button>
      </div>
    </nav>
    <Dialog class="lg:hidden" @close="mobileMenuOpen = false" :open="mobileMenuOpen">
      <div class="fixed inset-0 z-50"/>
      <DialogPanel
          class="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-gray-500 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
        <div class="flex items-center justify-between text-2xl font-bold">
          Menu
          <button type="button" class="-m-2.5 rounded-md p-2.5 text-gray-700" @click="mobileMenuOpen = false">
            <span class="sr-only">Close menu</span>
            <XMarkIcon class="size-6" aria-hidden="true"/>
          </button>
        </div>
        <div class="mt-6 flow-root">
          <div class="-my-6 divide-y divide-gray-500/10">
            <div class="py-6">
              <a href="#more" class="-mx-3 block rounded-lg px-3 py-2.5
                text-base/7 font-semibold text-gray-900 hover:bg-gray-50">
                En savoir plus</a>
            </div>
          </div>
        </div>
      </DialogPanel>
    </Dialog>
  </header>

</template>
