<template>
    <base-modal id="loginModal" title="Sign In">
        <template v-slot:body>
            <form action="http://127.0.0.1:8000/login" method="POST">
                <div class="form-group">
                    <input
                        type="text"
                        class="form-control"
                        placeholder="Email"
                        name="email"
                        v-model="email"
                    />
                </div>
                <div class="form-group">
                    <input
                        type="password"
                        class="form-control"
                        placeholder="Password"
                        name="password"
                        v-model="password"
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
            email: "",
            password: "",
        };
    },
    methods: {
        ...mapActions("user", ["login"]),
        openRegisterModal: debounce(() => {
            $("#registerModal").modal("show");
        }, 650),
        changeToRegisterModal() {
            $("#loginModal").modal("hide");
            this.openRegisterModal();
        },
    },
};
</script>

<style lang="scss" scoped></style>
