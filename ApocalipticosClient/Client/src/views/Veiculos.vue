<template>
    <div class="pt-20 flex flex-col gap-5 h-screen">
        <div class="flex flex-col justify-center items-center gap-3">
            <h1 class="text-3xl text-center font-medium text-white p-3">Veiculos</h1>
        </div>

        <div class="relative overflow-x-auto shadow-md overflow-y-auto flex-1">
            <form @submit.prevent="submitForm">
                <table class="w-full text-sm text-left text-gray-400">
                    <thead class="text-xs uppercase bg-gray-700/70 text-white">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                <p>Modelo</p>
                                <input class="w-28 bg-gray-900/50 rounded focus:outline-none focus:ring focus:ring-slate-500" type="text" v-model="modelo">
                                <button type="submit"></button>
                            </th>
                            <th scope="col" class="px-6 py-3">
                                <p>Placa</p>
                                <input class="w-28 bg-gray-900/50 rounded focus:outline-none focus:ring focus:ring-slate-500" type="text" v-model="placa">
                            </th>
                            <th scope="col" class="px-6 py-3">
                                <p>Combustivel</p>
                                <input class="w-28 bg-gray-900/50 rounded focus:outline-none focus:ring focus:ring-slate-500" type="text" v-model="combustivel">
                            </th>
                            <th scope="col" class="px-6 py-3">
                                <p>Assentos</p>
                                <input class="w-28 bg-gray-900/50 rounded focus:outline-none focus:ring focus:ring-slate-500" type="text" v-model="assentos">
                            </th>
                            <th scope="col" class="px-6 py-3">
                                <p>Comunidade</p>
                                <input class="w-28 bg-gray-900/50 rounded focus:outline-none focus:ring focus:ring-slate-500" type="text" v-model="comunidade">
                            </th>
                            <th scope="col" class="px-6 py-3">
                                <p>Carga</p>
                                <input class="w-28 bg-gray-900/50 rounded focus:outline-none focus:ring focus:ring-slate-500" type="text" v-model="carga">
                            </th>

                            <th scope="col" class="px-6 py-3">
                                <p>Ação</p>
                            </th>         
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="veiculo in pagination()" :key="veiculo.placa" class="bg-gray-900/70 ">
                            <th scope="row" class="px-6 py-4 font-medium text-white whitespace-nowrap">
                                {{ veiculo.modelo }}
                            </th>
                            <td class="px-6 py-4">
                                {{ veiculo.placa }}
                            </td>
                            <td class="px-6 py-4">
                                {{ veiculo.capacidadecombustivel }}
                            </td>
                            <td class="px-6 py-4">
                                {{ veiculo.numassentos }}
                            </td>
                            <td class="px-6 py-4">
                                {{ veiculo.comunidade }}
                            </td>
                            <td class="px-6 py-4">
                                {{ veiculo.capacidadecarga }}
                            </td>
                            <td class="px-6 py-4">
                                <button @click="deleteveiculo(veiculo.placa)">
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
    import axios from 'axios'  
    import { ArrowRight } from 'lucide-vue-next';
    import { ArrowLeft } from 'lucide-vue-next';
    import { Trash2Icon } from 'lucide-vue-next';

    interface Veiculo {
        placa: string;
        modelo: string;
        capacidadecombustivel: string;
        numassentos: string;
        comunidade: string;
        capacidadecarga: string;        
    }

    export default {
        data() {
            return {
                veiculo: [] as Veiculo[],
                itemsPerPage: 7,
                currentPage: 1,
                modelo: '',
                placa: '',
                combustivel: '',
                assentos: '',
                comunidade: '',
                carga: '',
            };
        },
        mounted() {
            axios.post('http://localhost:3000/veiculos')
                .then(res => {
                this.veiculo = res.data;
            })
                .catch(err => {
                console.log(err);
            });
        },
        methods: {
            nextPage() {
                if (this.currentPage * this.itemsPerPage < this.veiculo.length) this.currentPage++;
            },
            prevPage() {
                if (this.currentPage > 1) this.currentPage--;
            },
            pagination() {   
                let start = (this.currentPage - 1) * this.itemsPerPage;
                let end = start + this.itemsPerPage;
                return this.veiculo.slice(start, end);
            },
            deleteveiculo(placa) {
                axios.delete(`http://localhost:3000/veiculos/delete?placa=${placa}`)
                window.location.reload();
             },
            submitForm() {
                this.searchByTag();
            },
            async searchByTag() {
                try {
                    const response = await axios.post(`http://localhost:3000/veiculos`, {
                        modelo: this.modelo,
                        placa: this.placa,
                        combustivel: this.combustivel,
                        assentos: this.assentos,
                        comunidade: this.comunidade,
                        carga: this.carga,
                    });
                    this.veiculo = response.data;
                } catch (error) {
                    console.error(error);
                }
            }
        },
        components: { Trash2Icon, ArrowLeft, ArrowRight }
    }
</script>
