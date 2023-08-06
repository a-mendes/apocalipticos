<template>
    <div class="pt-20 flex flex-col gap-5 h-screen">
        <div class="flex flex-col justify-center items-center gap-3">
            <h1 class="text-3xl text-center font-medium text-white p-3">Adicionar uma pessoa</h1>
            
            <form @submit.prevent="submitForm" class="w-1/2 bg-gray-900/70 p-12 rounded grid grid-cols-2 gap-x-9 justify-center items-center">
                <div class="mb-6">
                    <label class="block mb-2 text-sm font-mediumtext-white">Nome</label>
                    <input class="border text-sm rounded-lg block w-full p-2.5 bg-gray-700/70 border-gray-600 placeholder-gray-400 text-white" placeholder="Nome completo" v-model="nome" required>
                </div>
                <div class="mb-6">
                    <label class="block mb-2 text-sm font-mediumtext-white">Registro Único</label>
                    <input class="border text-sm rounded-lg block w-full p-2.5 bg-gray-700/70 border-gray-600 placeholder-gray-400 text-white" placeholder="Registro único"  v-model="registrounico" required>
                </div>
                <div class="mb-6">
                    <label class="block mb-2 text-sm font-mediumtext-white">Data de Nascimento</label>
                    <input type="date" class="border text-sm rounded-lg block w-full p-2.5 bg-gray-700/70 border-gray-600 placeholder-gray-400 text-white" v-model="datanascimento" required>
                </div>
                <div class="mb-6">
                    <label class="block mb-2 text-sm font-mediumtext-white">Comunidade</label>
                    <input class="border text-sm rounded-lg block w-full p-2.5 bg-gray-700/70 border-gray-600 placeholder-gray-400 text-white" placeholder="Localização"  v-model="comunidade" required>
                </div>
                <div class="mb-6">
                    <label class="block mb-2 text-sm font-mediumtext-white">Tipo de Pessoa</label>
                    <select v-model="selectType" @change="$event.handleTypeChange" class="border text-sm rounded-lg block w-full p-2.5 bg-gray-700/70 border-gray-600 placeholder-gray-400 text-white" required>
                        <option value="civil">Civil</option>
                        <option value="guardião">Guardião</option>
                    </select>
                </div>
                <div class="mb-6">
                    <label class="block mb-2 text-sm font-mediumtext-white">Profissão</label>
                    <input class="border text-sm rounded-lg block w-full p-2.5 bg-gray-700/70 border-gray-600 placeholder-gray-400 text-white" placeholder="Profissão" :disabled="selectType == 'guardião'"  v-model="profissao">
                </div>
                <div class="mb-6">
                    <label class="block mb-2 text-sm font-mediumtext-white">RAAF</label>
                    <input class="border text-sm rounded-lg block w-full p-2.5 bg-gray-700/70 border-gray-600 placeholder-gray-400 text-white" placeholder="R.a.a.f" :disabled="selectType == 'civil'" v-model="raaf">
                </div>
                <button type="submit" class="text-white focus:ring-2 focus:outline-none font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center bg-gray-900 hover:bg-gray-800 focus:ring-slate-700 h-1/2">Adicionar</button>
            </form>
        </div>      
    </div>
</template>


<script lang="ts">
    import axios from 'axios'
    
    export default {
        data() {
            return {
                selectType: 'civil',

                nome: '',
                registrounico: '',
                datanascimento: '',
                comunidade: '',
                tipopessoa: '',
                profissao: '',
                raaf: '',
            }
        },
        methods: {
            async submitForm() {
                try {
                    const response = await axios.put(`http://localhost:3000/pessoas/insert/`, {
                        registrounico: this.registrounico,
                        nome: this.nome,
                        datanascimento: this.datanascimento,
                        comunidade: this.comunidade,
                        tipopessoa: this.selectType,
                        profissao: this.profissao,
                        raaf: this.raaf,
                    });
                    this.$router.push('/pessoas');
                } catch (error) {
                    console.error(error);
                }
            },
        },

        handleTypeChange() {
            if (this.selectType == 'civil') {
                this.pessoa.raaf = '';
            } else {
                this.pessoa.profissao = '';
            }
        }
    }
</script>
