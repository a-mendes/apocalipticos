<template>
    <Header/>
    <div class="pt-20 flex flex-col gap-5 h-screen">
        <div class="flex flex-col justify-center items-center gap-3">
            <h1 class="text-3xl text-center font-medium text-white p-3">Pessoas</h1>
        </div>

        <div class="relative overflow-x-auto shadow-md overflow-y-auto flex-1">
            <form @submit.prevent="submitForm">
                <table class="w-full text-sm text-left text-gray-400">
                    <thead class="text-xs uppercase bg-gray-700/80 text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                <p>Nome</p>
                                <input class="w-20 bg-gray-900/50 rounded focus:outline-none focus:ring focus:ring-slate-500" type="text" v-model="nome">
                                <button type="submit"></button>
                            </th>
                            <th scope="col" class="px-6 py-3">
                                <p>Registro Único</p>
                                <input class="w-28 bg-gray-900/50 rounded focus:outline-none focus:ring focus:ring-slate-500" type="text" v-model="registrounico">
                            </th>
                            <th scope="col" class="px-6 py-3">
                                <p>Data de Nascimento</p>
                                <input class="w-36 bg-gray-900/50 rounded focus:outline-none focus:ring focus:ring-slate-500" type="text" v-model="datanascimento">
                            </th>
                            <th scope="col" class="px-6 py-3">
                                <p>Comunidade</p>
                                <input class="w-24 bg-gray-900/50 rounded focus:outline-none focus:ring focus:ring-slate-500" type="text" v-model="comunidade">
                            </th>
                            <th scope="col" class="px-6 py-3">
                                <p>Tipo</p>
                                <input class="w-16 bg-gray-900/50 rounded focus:outline-none focus:ring focus:ring-slate-500" type="text" v-model="tipo">
                            </th>
                            <th scope="col" class="px-6 py-3">
                                <p>Profissão</p>
                                <input class="w-20 bg-gray-900/50 rounded focus:outline-none focus:ring focus:ring-slate-500" type="text" v-model="profissao">
                            </th>
                            <th scope="col" class="px-6 py-3">
                                <p>RAAF</p>
                                <input class="w-16 bg-gray-900/50 rounded focus:outline-none focus:ring focus:ring-slate-500" type="text" v-model="raaf">
                            </th>
                            <th scope="col" class="px-6 py-3">
                                <p>Ação</p>
                            </th>         
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="pessoa in pagination()" :key="pessoa.registrounico" class="bg-gray-900/80">
                            <th scope="row" class="px-6 py-4 font-medium text-white whitespace-nowrap">
                                {{ pessoa.nome }}
                            </th>
                            <td class="px-6 py-4">
                                {{ pessoa.registrounico }}
                            </td>
                            <td class="px-6 py-4">
                                {{ pessoa.datanascimento }}
                            </td>
                            <td class="px-6 py-4">
                                {{ pessoa.comunidade }}
                            </td>
                            <td class="px-6 py-4">
                                {{ pessoa.tipopessoa }}
                            </td>
                            <td class="px-6 py-4">
                                {{ pessoa.profissao }}
                            </td>
                            <td class="px-6 py-4">
                                {{ pessoa.raaf }}
                            </td>
                            <td class="px-6 py-4 flex gap-2">
                                <button @click="deleteperson(pessoa.registrounico)">
                                    <Trash2Icon/>
                                </button>
                                <RouterLink :to="{ name: 'PessoasUpdate', params: { id: pessoa.registrounico } }">
                                    <Edit/>
                                </RouterLink>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
        <div class="flex justify-center items-center">
            <div class="flex justify-center gap-6 p-3 items-center">
                <button @click="prevPage()" class="btn-circle btn flex justify-center items-center"><ArrowLeft/></button>
                <p class="text-white">{{ currentPage }}</p>
                <button @click="nextPage()" class="btn-circle btn flex justify-center items-center"><ArrowRight/></button>
            </div>
            <RouterLink :to="{name: 'PessoasAdd'}" class="absolute right-4">
                <button class="btn btn-circle">
                    <Plus/>
                </button>
            </RouterLink>
        </div>
    </div>
</template>

<script lang="ts">
    import Header from '../components/Header.vue'

    import axios from 'axios'
    
    import { RouterLink } from 'vue-router';

    import { Edit } from 'lucide-vue-next';
    import { ArrowRight } from 'lucide-vue-next';
    import { ArrowLeft } from 'lucide-vue-next';
    import { Trash2Icon } from 'lucide-vue-next';
    import { Plus } from 'lucide-vue-next';

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
                pessoas: [] as Pessoa[],
                itemsPerPage: 7,
                currentPage: 1,
                nome: '',
                registrounico: '',
                datanascimento: '',
                comunidade: '',
                tipo: '',
                profissao: '',
                raaf: '',
            };
        },
        mounted() {
            axios.post('http://localhost:3000/pessoas')
                .then(res => {
                this.pessoas = res.data;
            })
                .catch(err => {
                console.log(err);
            });
        },
        methods: {
            nextPage() {
                if (this.currentPage * this.itemsPerPage < this.pessoas.length) this.currentPage++;
            },
            prevPage() {
                if (this.currentPage > 1) this.currentPage--;
            },
            pagination() {   
                let start = (this.currentPage - 1) * this.itemsPerPage;
                let end = start + this.itemsPerPage;
                return this.pessoas.slice(start, end);
            },
            deleteperson(registrounico) {
                axios.delete(`http://localhost:3000/pessoas/delete?registrounico=${registrounico}`)
            },
            async submitForm() {
                try {
                    const response = await axios.post(`http://localhost:3000/pessoas`, {
                        nome: this.nome,
                        registrounico: this.registrounico,
                        datanascimento: this.datanascimento,
                        comunidade: this.comunidade,
                        tipopessoa: this.tipo,
                        profissao: this.profissao,
                        raaf: this.raaf,
                    });
                    this.pessoas = response.data;
                } catch (error) {
                    console.error(error);
                }
            },
        },
        components: { Trash2Icon, ArrowLeft, ArrowRight, Edit, RouterLink, Plus, Header }
    }
</script>
