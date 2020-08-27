<template>
    <div class="h-100">
        <LoginModal></LoginModal>
        <RegisterModal></RegisterModal>

        <main class="py-4 h-100">
            <div class="h-100 d-flex justify-content-center align-items-center">
                <div>
                    <h1 class="mb-5 pb-0 pb-sm-5 text-center">
                        I want to speak
                    </h1>
                    <div
                        class="d-flex flex-wrap justify-content-center justify-content-md-between align-items-center"
                    >
                        <div class="mx-4 mb-5">
                            <img
                                @click="learnLanguage"
                                class="img_pointer img_size_medium"
                                src="@/assets/img/country-flag/brunei-flag-round-medium.png"
                                alt="brunei-flag-round-medium"
                            />
                        </div>
                        <div class="mx-4 mb-5">
                            <img
                                class="img_pointer img_size_medium"
                                src="@/assets/img/country-flag/united-kingdom-flag-round-medium.png"
                                alt="united-kingdom-flag-round-medium"
                            />
                        </div>
                        <div class="lang__img_disabled mx-4 mb-5">
                            <img
                                class="img_pointer img_size_medium"
                                src="@/assets/img/country-flag/china-flag-round-medium.png"
                                alt="china-flag-round-medium"
                            />
                        </div>
                        <div class="lang__img_disabled mx-4 mb-5">
                            <img
                                class="img_pointer img_size_medium"
                                src="@/assets/img/country-flag/japan-flag-round-medium.png"
                                alt="japan-flag-round-medium"
                            />
                        </div>
                        <div class="lang__img_disabled mx-4 mb-5">
                            <img
                                class="img_pointer img_size_medium"
                                src="@/assets/img/country-flag/south-korea-flag-round-medium.png"
                                alt="south-korea-flag-round-medium"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<script>
import LoginModal from '@/components/modals/LoginModal'
import RegisterModal from '@/components/modals/RegisterModal'
import axios from 'axios'

axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://localhost:8000'

export default {
    components: {
        LoginModal,
        RegisterModal,
    },
    methods: {
        login() {
            axios.get('/sanctum/csrf-cookie').then(res => {
                axios
                    .post('/login', {
                        email: 'asdf@live.com',
                        password: 'password',
                    })
                    .then(res => {
                        console.log(res)
                    })
            })
        },
        learnLanguage() {
            this.$router.push({ name: 'Topic' })
        },
    },
}
</script>

<style lang="scss" scoped></style>
