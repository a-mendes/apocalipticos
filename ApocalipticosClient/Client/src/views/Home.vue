<!--Html -->
<template>
  <div class="h-screen">
    <div class="mx-auto grid grid-cols-1 gap-6 p-6 auto-cols- sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 pt-20">
      <RouterLink :to="routes[index]" v-for="(name, index) in names" :key="index">
        <article class="bg-gray-900/80 p-3 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300 border border-gray-700">
          <div class="p-4 items-center relative flex overflow-hidden rounded-xl object-fill h-auto">
            <component :is="icons[index]" class="m-auto h-16 w-16"/>
          </div>

          <div class="mt-1 p-3">
              <div class="flex justify-between">
                  <h2 class="text-white font-medium text-lg truncate">{{ name }}</h2>
              </div>
              <p class="mt-1 text-sm font-thin text-gray-400"> pertencentes a uma determinada comunidade</p>
          </div>
        </article>
      </RouterLink>
    </div> 
  </div>
</template>


<!--Importações -->
<script setup>
  import { Users } from 'lucide-vue-next';
  import { Car } from 'lucide-vue-next';
  import { Building2 } from 'lucide-vue-next';
  import { Drumstick } from 'lucide-vue-next';
  import { ShirtIcon } from 'lucide-vue-next';
  import { Wrench } from 'lucide-vue-next';

  const names = ['Pessoas', 'Veiculos', 'Construções', 'Consumíveis', 'Roupas', 'Ferramentas']
  const icons = [Users, Car, Building2, Drumstick, ShirtIcon, Wrench]
  const routes = ['/pessoas', '/veiculos', '/construcoes', '/consumiveis', '/roupas', '/ferramentas']
</script>