<template>
    <div>
        <div class="header-height_mt-5 row mb-5">
            <div class="col-12 col-sm-6">
                <h1>I want to talk about</h1>
            </div>
            <div class="search col-12 col-sm-6 text-right">
                <input
                    class="search__input"
                    type="text"
                    placeholder="Search topics..."
                />
                <span class="search__icon">
                    <i class="fas fa-search"></i>
                </span>
            </div>
        </div>

        <div class="row">
            <div
                v-for="topic in topics"
                :key="topic.id"
                class="col-12 col-sm-6 col-lg-3 mb-4 d-flex justify-content-center"
            >
                <div
                    class="card-topic d-flex align-items-end"
                    :style="inlineBgImage(topic.src)"
                >
                    <div class="card-topic__button py-3 text-center w-100">
                        <a href class="card-topic__link">{{ topic.title }}</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    computed: {
        ...mapState('topic', ['topics']),
    },
    created() {
        this.$store.dispatch('topic/fetchTopics')
    },
    methods: {
        inlineBgImage(src) {
            let fileExt = src.substring(src.lastIndexOf('.'))

            src = src.replace('/img/', '')
            src = src.replace(fileExt, '')

            let bgImage = require('@/assets/img/' + src + fileExt)

            return {
                backgroundImage: `url("${bgImage}")`,
            }
        },
    },
}
</script>

<style lang="scss" scoped></style>
