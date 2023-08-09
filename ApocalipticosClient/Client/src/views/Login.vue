<template>
    <section class="bg-gray-900">
        <div id="app" style="background-image: url(background/apoc.jpg); background-repeat: no-repeat; background-size: cover;">
            <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a class="flex items-center mb-6 text-2xl font-semibold text-white gap-3">
                    <DatabaseIcon class="w-10 h-10 text-primary-600" />
                    <div class="flex flex-col items-start">
                        <h1>Apocalipticos</h1>
                        <p class="text-sm font-light text-gray-500">Sistema de Gerenciamento de Dados</p>
                    </div>   
                </a>
                <div class="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
                    <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 class="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
                            Faça o Login
                        </h1>
                        <div class="space-y-4 md:space-y-6" action="#">
                            <div>
                                <label for="email" class="block mb-2 text-sm font-mediumtext-white">Email</label>
                                <input type="email" name="email" id="email" class="border border-gray-300 sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 placeholder-gray-400 text-white" placeholder="nome@email.com">
                            </div>
                            <div>
                                <label for="password" class="block mb-2 text-sm font-medium text-white">Senha</label>
                                <input type="password" name="password" id="password" placeholder="••••••••" class="border border-gray-300 sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 placeholder-gray-400 text-white">
                            </div>
                            <div class="flex items-center justify-between">
                                <div class="flex items-start">
                                    <div class="flex items-center h-5">
                                        <input id="remember" aria-describedby="remember" type="checkbox" class="w-4 h-4 border border-gray-300 rounded focus:ring-3 bg-gray-700ring-offset-gray-800">
                                    </div>
                                    <div class="ml-3 text-sm">
                                        <label for="remember" class="text-gray-300">Lembrar-me</label>
                                    </div>
                                </div>
                                <a class="text-sm font-medium hover:underline">Esqueceu a senha?</a>
                            </div>

                            <button @click="login()" type="submit" class="w-full text-white bg-gray-700 hover:bg-gray-600 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center">Entrar</button>
                            
                            <p class="text-sm font-light text-gray-400">
                                Não tem uma conta ainda? <a class="font-medium hover:underline">Registrar</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import { RouterLink, RouterView } from 'vue-router'
    import { Database } from 'lucide-vue-next';

    export default {
        components: {
            DatabaseIcon: Database,
        },
        methods: {
            login() {
                this.$router.push('/');
            }
        }
    }
</script>