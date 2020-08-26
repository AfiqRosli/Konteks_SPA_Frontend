<template>
    <base-modal id="loginModal" title="Sign In">
        <template v-slot:body>
            <form @submit.prevent="login" method="POST">
                <div class="form-group">
                    <input
                        type="text"
                        class="form-control"
                        placeholder="Email"
                        name="email"
                        v-model="form.email"
                    />
                </div>
                <div class="form-group">
                    <input
                        type="password"
                        class="form-control"
                        placeholder="Password"
                        name="password"
                        v-model="form.password"
                    />
                </div>

                <a href="#" class="ml-2 pl-1">Forgot?</a>

                <div class="mt-5">
                    <button class="w-100 btn btn-primary">SIGN IN</button>
                </div>
            </form>
        </template>

        <template v-slot:footer>
            <div class="w-100 pt-3 text-center border-top">
                <b>
                    Not a member?
                    <a
                        href="#"
                        class="text-decoration-none"
                        @click="changeToRegisterModal"
                        >JOIN US</a
                    >
                </b>
            </div>
        </template>
    </base-modal>
</template>

<script>
import BaseModal from "@/components/modals/BaseModal";

import { mapActions } from "vuex";
let debounce = require("lodash/debounce");

export default {
    components: {
        BaseModal,
    },
    data() {
        return {
            form: {
                email: "",
                password: "",
            },
        };
    },
    methods: {
        ...mapActions("auth", ["signIn"]),
        openRegisterModal: debounce(() => {
            $("#registerModal").modal("show");
        }, 650),
        changeToRegisterModal() {
            $("#loginModal").modal("hide");
            this.openRegisterModal();
        },
        async login() {
            await this.signIn(this.form);
            $("#loginModal").modal("hide");
            this.$router.replace({ name: "Topic" });
        },
    },
};
</script>

<style lang="scss" scoped></style>
