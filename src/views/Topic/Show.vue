<template>
    <div class="mt-5 pt-3">
        <div v-if="this.topic" class="card-topic-info mt-5">
            <div class="row h-100">
                <div class="col-3">
                    <div
                        class="card__background-img card-topic-info__background-img w-100 h-100"
                        :style="inlineBgImage(topic.src)"
                    ></div>
                </div>
                <div class="col p-3">
                    <h1 class="my-3">
                        {{ capitalizePhrase(this.topic.title) }}
                    </h1>

                    <p>{{ this.topic.desc }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import helper from '@/mixins/helper'
import { mapState } from 'vuex'

export default {
    props: ['id'],
    computed: {
        ...mapState('topic', ['topic']),
    },
    created() {
        this.$store.dispatch('topic/fetchTopic', this.id)
        this.$store.dispatch('lesson/fetchLessons', this.id)
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
    mixins: [helper],
}
</script>

<style lang="scss" scoped></style>
