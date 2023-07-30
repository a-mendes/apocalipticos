<!--Html -->
<template> 
    <div class="fixed navbar bg-slate-700 z-50">
        <div class="flex-1">
            <RouterLink to="/">
                <a class="btn btn-ghost normal-case text-xl">Gerenciamento de Recurso</a>
            </RouterLink>
        </div>
        <div class="flex-none">
            <div class="dropdown dropdown-end">
                <label tabindex="0" class="btn btn-ghost btn-circle avatar">
                    <div class="w-10 rounded-full">
                        <img src="https://occ-0-768-769.1.nflxso.net/dnm/api/v6/E8vDc_W8CLv7-yMQu8KMEC7Rrr8/AAAABYxJFBDckfZw1YUEIPwyuIg43Kw_HUBLvnCcgdOlvvf5Nc90SF3HSAi5L8uLyBqjziKBY-kGD2wu2JAqVsdHVR0frb6qG26I_U5v.jpg?r=77f" />
                    </div>
                </label>
                <ul tabindex="0" class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                    <li>
                        <a class="justify-between">
                            Name
                        </a>
                    </li>
        
                    <RouterLink to="/logout">
                        <li><a>Logout</a></li>
                    </RouterLink>
                </ul>
            </div>
        </div>
    </div>
</template>

<!--Importações -->
<script>

import { UserCircle2 } from 'lucide-vue-next';
import { RouterLink, RouterView } from 'vue-router'

export default {
  name: 'Header',
    components: {
        UserCircle2
    },
  }

</script>
