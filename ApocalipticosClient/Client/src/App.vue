<!--Html -->
<template> 
    <Header/>
    <router-view/>
    <audio src="audio/TWD.mp3" autoplay="autoplay" controls></audio>
</template>

<!--Importações -->
<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Header from './components/Header.vue'

</script>

