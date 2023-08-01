<template>
    <div class="h-screen">
        <div class="pt-20 flex flex-col gap-5">
            <h1 class="text-3xl text-center text-gray-800">Pessoas</h1>

            <table class="flex-col justify-center items-center bg-white/30">
                <tr class="border border-slate-400 text-xl text-black">
                    <td>Nome</td>
                    <td>Registro Único</td>
                    <td>Data de Nascimento</td>
                    <td>Comunidade</td>
                    <td>Profissão</td>
                    <td>R.A.A.F</td>
                    <td>Ação</td>
                </tr>
                <tr v-for="pessoa in pessoas" :key="pessoa.registrounico" class="border border-gray-500 text-gray-800">
                    <td>{{ pessoa.nome }}</td>
                    <td>{{ pessoa.registrounico }}</td>
                    <td>{{ pessoa.datanascimento }}</td>
                    <td>{{ pessoa.comunidade }}</td>
                    <td>{{ pessoa.profissao }}</td>
                    <td>{{ pessoa.raaf }}</td>
                    <td><div class="btn btn-ghost">
                            <Trash2Icon/>
                        </div>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script lang="ts">
    import axios from 'axios'
    import { Trash2Icon } from 'lucide-vue-next';

    interface Pessoa {
        nome: string,
        registrounico: number,
        datanascimento: string,
        comunidade: string, 
        profissao: string,
        raaf: string
    }

    export default {
    data() {
        return {
            pessoas: [] as Pessoa[]
        };
    },
    mounted() {
        axios.get('http://localhost:3000/pessoas')
            .then(res => {
            this.pessoas = res.data;
        })
            .catch(err => {
            console.log(err);
        });
    },
    components: {Trash2Icon }
}
</script>

<!-- <table class="bg-gray-600/70 p-10 flex-col justify-center items-center m-auto">
            
    <tr class="border border-gray-300 flex gap-16">
        <td>Nome</td>
        <td>Registro Único</td>
        <td>Data de Nascimento</td>
        <td>Comunidade</td>
    </tr>
    <tr v-for="pessoa in pessoas" :key="pessoa.registrounico" class="border border-gray-300 flex gap-16">
        <td>{{ pessoa.nome }}</td>
        <td>{{ pessoa.registrounico }}</td>
        <td>{{ pessoa.datanascimento }}</td>
        <td>{{ pessoa.comunidade }}</td>
    </tr>
</table> -->
