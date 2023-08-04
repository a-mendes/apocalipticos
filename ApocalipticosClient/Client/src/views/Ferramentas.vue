<template>
    <div class="pt-20 h-screen">
        <div class="flex justify-center">
            <ConstructionIcon class="text-black/90 h-96 w-96"/>
        </div>
        <h2 class="flex justify-center text-gray-100">Em Construção...</h2>
    </div>
</template>

<script lang="ts">
    import { ConstructionIcon } from 'lucide-vue-next';

    export default {
        name: 'Ferramentas',
        components: {
            ConstructionIcon
        }
    }
</script>