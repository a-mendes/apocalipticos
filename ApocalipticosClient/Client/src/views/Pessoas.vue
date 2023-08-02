<template>
    <div class="pt-20 flex flex-col gap-5 h-screen">
        <div class="flex flex-col justify-center items-center gap-3">
            <h1 class="text-3xl text-center font-medium text-white p-3">Pessoas</h1>
        </div>

        <div class="relative overflow-x-auto shadow-md overflow-y-auto flex-1">
            <table class="w-full text-sm text-left text-gray-400">
                <thead class="text-xs uppercase bg-gray-700/70 text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3">Nome</th>
                        <th scope="col" class="px-6 py-3">Registro Único</th>
                        <th scope="col" class="px-6 py-3">Data de Nascimento</th>
                        <th scope="col" class="px-6 py-3">Comunidade</th>
                        <th scope="col" class="px-6 py-3">Tipo</th>
                        <th scope="col" class="px-6 py-3">Profissão</th>
                        <th scope="col" class="px-6 py-3">RAAF</th>
                        <th scope="col" class="px-6 py-3">Ação</th>
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
                });
            },
        },
        components: { Trash2Icon, ArrowLeft, ArrowRight }
    }
</script>

<!-- Atualizar a pagina pós delete -->