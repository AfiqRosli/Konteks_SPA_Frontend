<template>
    <div class="header-height_mt-5">
        <div v-if="this.topic" class="card-topic-info my-5">
            <div class="row h-100">
                <div class="col-5 col-sm-3">
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

        <div
            class="d-flex flex-wrap justify-content-center justify-content-md-between"
        >
            <div
                class="lesson mb-5 mr-3 shadow position-relative d-flex justify-content-center align-items-center"
                v-for="lesson in lessons"
                :key="lesson.id"
                @click="showLessonContents(lesson.id)"
            >
                <p class="lesson__opening position-absolute">
                    {{ lesson.opening }}
                </p>
                <h3 class="m-0">{{ lesson.title }}</h3>
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
        ...mapState('lesson', ['lessons']),
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
        showLessonContents(lesson_id) {
            this.$router.push({
                name: 'LessonIndex',
                params: { id: lesson_id },
            })
        },
    },
    mixins: [helper],
}
</script>

<style lang="scss" scoped></style>
