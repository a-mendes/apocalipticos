<template>
    <div class="pt-20 flex flex-col gap-5 h-screen">
        <div class="flex flex-col justify-center items-center gap-3">
            <h1 class="text-3xl text-center font-medium text-white p-3">Pessoas</h1>
        </div>

        <div class="relative overflow-x-auto shadow-md overflow-y-auto flex-1">
            <form @submit.prevent="submitForm">
                <table class="w-full text-sm text-left text-gray-400">
                    <thead class="text-xs uppercase bg-gray-700/70 text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                <p>Nome</p>
                                <input type="text" v-model="tag">
                                <button type="submit">Pesquisar</button>
                            </th>
                            <th scope="col" class="px-6 py-3">
                                <p>Registro Único</p>
                                <input type="text">
                            </th>
                            <th scope="col" class="px-6 py-3">
                                <p>Data de Nascimento</p>
                                <input type="text">
                            </th>
                            <th scope="col" class="px-6 py-3">
                                <p>Comunidade</p>
                                <input type="text">
                            </th>
                            <th scope="col" class="px-6 py-3">
                                <p>Tipo</p>
                                <input type="text">
                            </th>
                            <th scope="col" class="px-6 py-3">
                                <p>Profissão</p>
                                <input type="text">
                            </th>
                            <th scope="col" class="px-6 py-3">
                                <p>RAAF</p>
                                <input type="text">
                            </th>
                            <th scope="col" class="px-6 py-3">
                                <p>Ação</p>
                            </th>         
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="pessoa in pagination()" :key="pessoa.registrounico" class="bg-gray-900/70">
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
                            <td class="px-6 py-4">
                                <button @click="deleteperson(pessoa.registrounico)">
                                    <Trash2Icon/>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
        <div class="flex justify-center gap-6 p-3">
            <button @click="prevPage()" class="btn-circle btn flex justify-center items-center"><ArrowLeft/></button>
            <button @click="nextPage()" class="btn-circle btn flex justify-center items-center"><ArrowRight/></button>
        </div>
    </div>
</template>

<script lang="ts">
    import axios from 'axios'
import { AlertOctagonIcon } from 'lucide-vue-next';
import { Tag } from 'lucide-vue-next';
    
    import { ArrowRight } from 'lucide-vue-next';
    import { ArrowLeft } from 'lucide-vue-next';
    import { Trash2Icon } from 'lucide-vue-next';

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
                tag: '',
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
                    .then(res => {
                        this.pessoas = res.data;  
                    })
                    .catch(err => {
                        console.error(err.response);
                        window.location.reload();
                });
            },
            submitForm() {
                this.searchByTag(this.tag);
            },
            async searchByTag(tag) {
                try {
                    console.log({nome:tag});
                    const response = await axios.post(`http://localhost:3000/pessoas`, {nome:tag});
                    this.pessoas = response.data;
                    console.log(response.data);
                } catch (error) {
                    console.error(error);
                }
            }
        },
        components: { Trash2Icon, ArrowLeft, ArrowRight }
    }
</script>
