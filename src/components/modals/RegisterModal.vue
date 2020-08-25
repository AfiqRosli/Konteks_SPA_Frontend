<template>
    <base-modal id="registerModal" title="Register">
        <template v-slot:body>
            <form @submit.prevent="register">
                <div class="form-group">
                    <input
                        type="text"
                        class="form-control"
                        placeholder="Name (optional)"
                        v-model="name"
                    />
                </div>
                <div class="form-group">
                    <input
                        type="text"
                        class="form-control"
                        placeholder="Email"
                        v-model="email"
                    />
                </div>
                <div class="form-group">
                    <input
                        type="password"
                        class="form-control"
                        placeholder="Password"
                        v-model="password"
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
import BaseModal from "@/components/modals/BaseModal";
let debounce = require("lodash/debounce");

export default {
    components: {
        BaseModal,
    },
    data() {
        return {
            name: "",
            email: "",
            password: "",
        };
    },
    methods: {
        openLoginModal: debounce(() => {
            $("#loginModal").modal("show");
        }, 650),
        changeToLoginModal() {
            $("#registerModal").modal("hide");
            this.openLoginModal();
        },
        register() {
            let userData = {
                name: this.name,
                email: this.email,
                password: this.password,
            };

            this.$store
                .dispatch("user/register", userData)
                .then((user) => {
                    this.$store
                        .dispatch("user/login", {
                            email: this.email,
                            password: this.password,
                        })
                        .then(() => {
                            $("#registerModal").modal("hide");
                            this.$router.push({ name: "Topic" });
                        });
                })
                .catch((err) => {
                    console.log(err);
                });
        },
    },
};
</script>

<style lang="scss" scoped></style>
