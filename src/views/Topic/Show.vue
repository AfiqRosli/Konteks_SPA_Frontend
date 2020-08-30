<template>
    <div class="pt-5 mt-5">{{ this.topic }}</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    props: ['id'],
    computed: {
        ...mapState('topic', ['topic']),
    },
    created() {
        this.$store.dispatch('topic/fetchTopic', this.id)
    },
}
</script>

<style lang="scss" scoped></style>
