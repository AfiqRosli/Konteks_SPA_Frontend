<template>
    <base-modal id="registerModal" title="Register">
        <template v-slot:body>
            <form @submit.prevent="createProfile">
                <div class="form-group">
                    <input
                        type="text"
                        class="form-control"
                        placeholder="Name (optional)"
                        v-model="form.name"
                    />
                </div>
                <div class="form-group">
                    <input
                        type="text"
                        class="form-control"
                        placeholder="Email"
                        v-model="form.email"
                    />
                </div>
                <div class="form-group">
                    <input
                        type="password"
                        class="form-control"
                        placeholder="Password"
                        v-model="form.password"
                    />
                </div>

                <div class="mt-5">
                    <button class="w-100 btn btn-primary">
                        CREATE PROFILE
                    </button>
                </div>
            </form>
        </template>

        <template v-slot:footer>
            <div class="w-100 pt-3 text-center border-top">
                <b>
                    Already a member?
                    <a href="#" @click="changeToLoginModal">SIGN IN</a>
                </b>
            </div>
        </template>
    </base-modal>
</template>

<script>
import BaseModal from '@/components/modals/BaseModal'
import { mapActions } from 'vuex'

let debounce = require('lodash/debounce')

export default {
    components: {
        BaseModal,
    },
    data() {
        return {
            form: {
                name: '',
                email: '',
                password: '',
            },
        }
    },
    methods: {
        ...mapActions('auth', ['register']),
        openLoginModal: debounce(() => {
            $('#loginModal').modal('show')
        }, 650),
        changeToLoginModal() {
            $('#registerModal').modal('hide')
            this.openLoginModal()
        },
        async createProfile() {
            await this.register(this.form)
            $('#registerModal').modal('hide')
            this.$router.replace({ name: 'TopicIndex' })
        },
    },
}
</script>

<style lang="scss" scoped></style>
