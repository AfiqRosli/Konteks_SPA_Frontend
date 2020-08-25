<template>
    <div id="app" class="h-100">
        <NavBar></NavBar>
        <router-view />
    </div>
</template>

<script>
import NavBar from "./components/NavBar";

export default {
    components: {
        NavBar,
    },
    mounted() {
        this.$nextTick(() => {
            let bodyTag = document.body;
            let htmlTag = bodyTag.parentElement;

            bodyTag.classList.add("h-100");
            htmlTag.classList.add("h-100");
        });
    },
};
</script>

<style lang="scss" scoped></style>
