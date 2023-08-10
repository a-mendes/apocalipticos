<template>
    <div class="pt-20 flex flex-col gap-5 h-screen">
        <div class="flex flex-col justify-center items-center gap-3">
            <h1 class="text-3xl text-center font-medium text-white p-3">Atualizar dados cadastrais</h1>
            
            <form @submit.prevent="submitForm" class="w-1/2 bg-gray-900/70 p-12 rounded grid grid-cols-2 gap-x-9 justify-center items-center" v-for="p in pessoa">
                <div class="mb-6">
                    <label class="block mb-2 text-sm font-mediumtext-white">Nome</label>
                    <input class="border text-sm rounded-lg block w-full p-2.5 bg-gray-700/70 border-gray-600 placeholder-gray-400 text-white" :placeholder="p.nome" v-model="nome" required>
                </div>
                <div class="mb-6">
                    <label class="block mb-2 text-sm font-mediumtext-white">Data de Nascimento</label>
                    <input type="date" class="border text-sm rounded-lg block w-full p-2.5 bg-gray-700/70 border-gray-600 placeholder-gray-400 text-white" v-model="datanascimento" required>
                </div>
                <div class="mb-6">
                    <label class="block mb-2 text-sm font-mediumtext-white">Comunidade</label>
                    <input class="border text-sm rounded-lg block w-full p-2.5 bg-gray-700/70 border-gray-600 placeholder-gray-400 text-white" :placeholder="p.comunidade" v-model="comunidade" :disabled="true" required>
                </div>
                <div class="mb-6">
                    <label class="block mb-2 text-sm font-mediumtext-white">Tipo de Pessoa</label>
                    <select v-model="selectType" @change="$event.handleTypeChange" class="border text-sm rounded-lg block w-full p-2.5 bg-gray-700/70 border-gray-600 placeholder-gray-400 text-white" :disabled="p.profissao == 'Líder'" required>
                        <option value="civil">Civil</option>
                        <option value="guardião">Guardião</option>
                    </select>
                </div>
                <div class="mb-6">
                    <label class="block mb-2 text-sm font-mediumtext-white">Profissão</label>
                    <input class="border text-sm rounded-lg block w-full p-2.5 bg-gray-700/70 border-gray-600 placeholder-gray-400 text-white" :placeholder="p.profissao" :disabled="selectType == 'guardião' || p.profissao == 'Líder'" v-model="profissao" >
                </div>
                <div class="mb-6">
                    <label class="block mb-2 text-sm font-mediumtext-white">RAAF</label>
                    <input class="border text-sm rounded-lg block w-full p-2.5 bg-gray-700/70 border-gray-600 placeholder-gray-400 text-white" :placeholder="p.raaf" :disabled="selectType == 'civil'" v-model="raaf" required>
                </div>
                <button type="submit" class="col-span-2 text-white focus:ring-2 focus:outline-none font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center bg-gray-900 hover:bg-gray-800 focus:ring-slate-700">Atualizar</button>
            </form>
        </div>      
    </div>
</template>


<script lang="ts">
    import axios from 'axios'

    interface Pessoa {
        registrounico: string,
        nome: string,
        datanascimento: string,
        comunidade: string,
        tipopessoa: string,
        profissao: string,
        raaf: string,
    }

    export default {
        data() {
            return {
                pessoa: {} as Pessoa[],
                selectType: 'civil',

                nome: '',
                datanascimento: '',
                comunidade: '',
                tipopessoa: '',
                profissao: '',
                raaf: '',
            }
        },
        mounted() {
            axios.post('http://localhost:3000/pessoas', {
                registrounico: this.$route.params.id,
            })
            .then(res => {
                this.pessoa = res.data;
            })
            .catch(err => {
                console.log(err);
            });
        },

        methods: {
            async submitForm() {
                try {
                    const response = await axios.put(`http://localhost:3000/pessoas/update/`, {
                        nome: this.nome,
                        registrounico: this.$route.params.id,
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