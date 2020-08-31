<template>
    <div>
        <div class="header-height_mt-5 row mb-5">
            <div class="col-12 col-sm">
                <h1>I want to talk about</h1>
            </div>
            <div class="search col-12 col-md-4 text-right">
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
                class="col-12 col-sm-6 col-md-4 col-lg-3 p-4 d-flex justify-content-center"
                @click="showTopic(topic.id)"
            >
                <div
                    class="card-topic card__background-img d-flex align-items-end"
                    :style="inlineBgImage(topic.src)"
                >
                    <div class="card-topic__button py-3 text-center w-100">
                        <router-link
                            class="card-topic__link"
                            :to="{
                                name: 'TopicShow',
                                params: { id: topic.id },
                            }"
                        >
                            {{ capitalizePhrase(topic.title) }}
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import helper from '@/mixins/helper.js'
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
        showTopic(topicId) {
            if (this.$router.currentRoute.name == 'TopicIndex') {
                this.$router.push({
                    name: 'TopicShow',
                    params: { id: topicId },
                })
            }
        },
    },
    mixins: [helper],
}
</script>

<style lang="scss" scoped></style>
