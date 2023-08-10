<template>
    <Header/>
    <div class="pt-20 flex flex-col gap-5 h-screen">
        <div class="flex flex-col justify-center items-center gap-3">
            <h1 class="text-3xl text-center font-medium text-white p-3">Consumíveis</h1>
        </div>

        <div class="relative overflow-x-auto shadow-md overflow-y-auto flex-1">
            <form @submit.prevent="submitForm">
                <table class="w-full text-sm text-left text-gray-400">
                    <thead class="text-xs uppercase bg-gray-700/70 text-white">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                <p>Nome</p>
                                <input class="w-28 bg-gray-900/50 rounded focus:outline-none focus:ring focus:ring-slate-500" type="text" v-model="nome">
                                <button type="submit"></button>
                            </th>
                            <th scope="col" class="px-6 py-3">
                                <p>Data de Aquisição</p>
                                <input class="w-28 bg-gray-900/50 rounded focus:outline-none focus:ring focus:ring-slate-500" type="text" v-model="dataaquisicao">
                            </th>
                            <th scope="col" class="px-6 py-3">
                                <p>Validade</p>
                                <input class="w-28 bg-gray-900/50 rounded focus:outline-none focus:ring focus:ring-slate-500" type="text" v-model="validade">
                            </th>
                            <th scope="col" class="px-6 py-3">
                                <p>Quantidade</p>
                                <input class="w-28 bg-gray-900/50 rounded focus:outline-none focus:ring focus:ring-slate-500" type="text" v-model="quantidade">
                            </th>
                            <th scope="col" class="px-6 py-3">
                                <p>localização</p>
                                <input class="w-28 bg-gray-900/50 rounded focus:outline-none focus:ring focus:ring-slate-500" type="text" v-model="localizacao">
                            </th>
                            <th scope="col" class="px-6 py-3">
                                <p>Ação</p>
                            </th>         
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="consumiveis in pagination()" :key="consumiveis.localizacao && consumiveis.nome && consumiveis.dataaquisicao" class="bg-gray-900/70 ">
                            <th scope="row" class="px-6 py-4 font-medium text-white whitespace-nowrap">
                                {{ consumiveis.nome }}
                            </th>
                            <td class="px-6 py-4">
                                {{ consumiveis.dataaquisicao }}
                            </td>
                            <td class="px-6 py-4">
                                {{ consumiveis.validade }}
                            </td>
                            <td class="px-6 py-4">
                                {{ consumiveis.quantidade }}
                            </td>
                            <td class="px-6 py-4">
                                {{ consumiveis.localizacao }}
                            </td>
                            <td class="px-6 py-4">
                                <button @click="deleteconsumivel(consumiveis.localizacao, consumiveis.nome, consumiveis.dataaquisicao)">
                                    <Trash2Icon/>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
        <div class="flex justify-center gap-6 p-3 items-center">
            <button @click="prevPage()" class="btn-circle btn flex justify-center items-center"><ArrowLeft/></button>
            <p class="text-white">{{ currentPage }}</p>
            <button @click="nextPage()" class="btn-circle btn flex justify-center items-center"><ArrowRight/></button>
        </div>
    </div>
</template>

<script lang="ts">
    import Header from '../components/Header.vue'
    import axios from 'axios'  
    import { ArrowRight } from 'lucide-vue-next';
    import { ArrowLeft } from 'lucide-vue-next';
    import { Trash2Icon } from 'lucide-vue-next';

    interface Consumiveis {
        nome: string;
        dataaquisicao: string;
        validade: string;
        quantidade: string;
        localizacao: string;       
    }

 export default {
        data() {
            return {
                consumiveis: [] as Consumiveis[],
                itemsPerPage: 7,
                currentPage: 1,
                nome: '',
                dataaquisicao: '',
                validade: '',
                quantidade: '',
                localizacao: '',
            };
        },
        mounted() {
            axios.post('http://localhost:3000/consumiveis')
                .then(res => {
                this.consumiveis = res.data;
            })
                .catch(err => {
                console.log(err);
            });
        },
        methods: {
            nextPage() {
                if (this.currentPage * this.itemsPerPage < this.consumiveis.length) this.currentPage++;
            },
            prevPage() {
                if (this.currentPage > 1) this.currentPage--;
            },
            pagination() {   
                let start = (this.currentPage - 1) * this.itemsPerPage;
                let end = start + this.itemsPerPage;
                return this.consumiveis.slice(start, end);
            },
            deleteconsumivel(localizacao, nome, dataaquisicao) {
                axios.delete(`http://localhost:3000/consumiveis/delete`, {
                    data: {
                        localizacao: localizacao,
                        nome: nome,
                        dataaquisicao: dataaquisicao,
                    }
                })
                window.location.reload();
             },
            submitForm() {
                this.searchByTag();
            },
            async searchByTag() {
                try {
                    console.log(this.nome, this.dataaquisicao, this.validade, this.quantidade, this.localizacao)
                    const response = await axios.post(`http://localhost:3000/consumiveis`, {
                        nome: this.nome,
                        dataaquisicao: this.dataaquisicao,
                        validade: this.validade,
                        quantidade: this.quantidade,
                        localizacao: this.localizacao,
                    });
                    this.consumiveis = response.data;
                } catch (error) {
                    console.error(error);
                }
            }
        },
        components: { Trash2Icon, ArrowLeft, ArrowRight, Header }
    }
</script>
