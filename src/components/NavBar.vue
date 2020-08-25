<template>
    <header class="header layer_top position-absolute w-100">
        <div
            ref="navHeader"
            class="container-lg d-flex flex-column flex-md-row justify-content-md-between align-items-md-center text-center text-md-left"
        >
            <div class="d-flex justify-content-between">
                <a href="/">
                    <img
                        class="header-logo py-2 layer_top"
                        src="@/assets/img/logo/konteks-transparent.png"
                        alt="Konteks Logo"
                    />
                </a>
                <span
                    @click="toggleMenu"
                    class="nav__icon_color_white d-inline-block d-md-none d-flex align-items-center layer_top"
                >
                    <i class="fas fa-bars fa-2x"></i>
                </span>
            </div>
            <template v-if="windowWidth >= 768">
                <nav class="nav my-3 my-md-0">
                    <ul
                        class="nav__ul w-100 m-0 p-0 d-flex flex-column flex-md-row justify-content-between"
                    >
                        <li class="nav__item mb-3 mx-2 mb-md-0 mx-lg-3">
                            <a href class="nav__link text-decoration-none"
                                >COMMUNITY</a
                            >
                        </li>
                        <li class="nav__item mb-3 mx-2 mb-md-0 mx-lg-3">
                            <a href class="nav__link text-decoration-none"
                                >STATISTICS</a
                            >
                        </li>
                        <li class="nav__item mb-3 mx-2 mb-md-0 mx-lg-3">
                            <a href class="nav__link text-decoration-none"
                                >VOCABULARIES</a
                            >
                        </li>
                    </ul>
                </nav>
                <div>
                    <template v-if="false">
                        <button
                            class="btn btn-secondary mb-4 mr-3 mb-md-0"
                            @click="logout"
                        >
                            SIGN OUT
                        </button>
                    </template>
                    <template v-else>
                        <button
                            class="btn btn-secondary mb-4 mr-3 mb-md-0"
                            @click="this.openLoginModal"
                        >
                            SIGN IN
                        </button>
                        <button
                            class="btn btn-primary mb-4 mb-md-0"
                            @click="this.openRegisterModal"
                        >
                            CREATE PROFILE
                        </button>
                    </template>
                </div>
            </template>

            <div
                ref="navMenuMobile"
                v-if="windowWidth < 768"
                class="w-100 position-absolute"
                style="left: 0; top: -500px"
            >
                <nav class="nav my-3 my-md-0">
                    <ul
                        class="nav__ul w-100 m-0 p-0 d-flex flex-column flex-md-row justify-content-between"
                    >
                        <li class="nav__item mb-3">
                            <a href class="nav__link text-decoration-none"
                                >COMMUNITY</a
                            >
                        </li>
                        <li class="nav__item mb-3">
                            <a href class="nav__link text-decoration-none"
                                >STATISTICS</a
                            >
                        </li>
                        <li class="nav__item mb-3">
                            <a href class="nav__link text-decoration-none"
                                >VOCABULARIES</a
                            >
                        </li>
                    </ul>
                </nav>
                <div>
                    <template v-if="false">
                        <button
                            class="btn btn-secondary mb-4 mr-3 mb-md-0"
                            @click="logout"
                        >
                            SIGN OUT
                        </button>
                    </template>
                    <template v-else>
                        <button
                            class="btn btn-secondary mb-4 mr-3 mb-md-0"
                            @click="this.openLoginModal"
                        >
                            SIGN IN
                        </button>
                        <button
                            class="btn btn-primary mb-4 mb-md-0"
                            @click="this.openRegisterModal"
                        >
                            CREATE PROFILE
                        </button>
                    </template>
                </div>
            </div>
        </div>
    </header>
</template>

<script>
export default {
    data() {
        return {
            showMenu: false,
            windowWidth: window.innerWidth,
        };
    },
    computed: {},
    watch: {
        windowWidth() {
            if (this.windowWidth > 767) {
                this.$refs.navHeader.style.height = "60px";
                this.showMenu = false;
            }
        },
    },
    mounted() {
        this.$nextTick(() => {
            window.addEventListener("resize", this.onResize);
        });
    },
    beforeDestroy() {
        window.removeEventListener("resize", this.onResize);
    },
    methods: {
        onResize() {
            this.windowWidth = window.innerWidth;
        },
        openLoginModal() {
            this.$nextTick(() => {
                $("#loginModal").modal("show");
            });
        },
        openRegisterModal() {
            this.$nextTick(() => {
                $("#registerModal").modal("show");
            });
        },
        toggleMenu() {
            if (this.showMenu) {
                this.$refs.navHeader.style.height = "60px";
                this.$refs.navMenuMobile.style.top = "-500px";

                this.showMenu = false;
            } else {
                this.$refs.navHeader.style.height = "260px";
                this.$refs.navMenuMobile.style.top = "55px";

                this.showMenu = true;
            }
        },
    },
};
</script>

<style lang="scss" scoped></style>
