<!--Html -->
<template> 
    <div class="fixed navbar bg-gray-900/80 z-50">
        <div class="flex-1">
            <RouterLink to="/">
                <a class="btn btn-ghost normal-case text-xl">Gerenciamento de Recurso</a>
            </RouterLink>
        </div>
        <div class="flex-none">
            <div class="dropdown dropdown-end">
                <label tabindex="0" class="btn btn-ghost btn-circle avatar">
                    <div class="w-10 rounded-full">
                        <img src="../../profile/death.jpg" />
                    </div>
                </label>
                <ul tabindex="0" class="bg-black/80 menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 text-gray-400">
                    <li>
                        <a class="justify-between">
                            Pessoa
                        </a>
                    </li>

                    <RouterLink to="/login">
                        <li><a>Logout</a></li>
                    </RouterLink>
                </ul>
            </div>
        </div>
    </div>
</template>

<!--Importações -->
<script>

import { ShowerHead } from 'lucide-vue-next';
import { UserCircle2 } from 'lucide-vue-next';
import { RouterLink, RouterView } from 'vue-router'


export default {
  name: 'Header',
    components: {
        UserCircle2
    },
  }

</script>