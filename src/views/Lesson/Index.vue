<template>
    <div class="header-height_mt-5">
        <nav class="mb-4" aria-label="breadcrumb">
            <ol v-if="this.topic && this.lesson" class="breadcrumb">
                <li class="breadcrumb-item">
                    <router-link
                        :to="{
                            name: 'TopicShow',
                            params: { id: this.lesson.topic_id },
                        }"
                        class="breadcrumb__link"
                        >{{
                            this.capitalizePhrase(this.topic.title)
                        }}</router-link
                    >
                </li>
                <li class="breadcrumb-item active" aria-current="page">
                    {{ this.lesson.title }}
                </li>
            </ol>
        </nav>

        <div class="context p-4">
            <h1 class="context__heading m-0 mb-2 font-weight-bold">Context</h1>
            <p v-if="this.lesson" class="m-0">{{ this.lesson.context }}</p>
        </div>

        <div style="height: 300px"></div>

        <div ref="lesson-contents">
            <div
                class="row mb-5"
                v-for="lesson_content in lesson_contents"
                :key="lesson_content.id"
            >
                <div class="col-12 col-sm-2 text-left text-sm-right order-1">
                    <span v-if="!lesson_content.user_input">{{
                        lesson_content.name
                    }}</span>
                </div>
                <div class="col-12 col-sm-8 order-0 order-sm-1 mb-3 mb-sm-0">
                    <div
                        class="lesson-content__speech p-3"
                        :class="speechStyling(lesson_content.user_input)"
                    >
                        <p class="m-0 mb-2">{{ lesson_content.says }}</p>
                        <p
                            v-if="!lesson_content.user_input"
                            class="lesson-content__translation m-0"
                        >
                            {{ lesson_content.says_translation }}
                        </p>

                        <div v-else class="position-relative">
                            <input
                                class="lesson-content__input w-100"
                                type="text"
                                :name="lesson_content.order"
                                placeholder="Guess the phrase"
                                autocomplete="off"
                            />
                            <CorrectnessIndicator
                                :ref="'CI' + lesson_content.id"
                            ></CorrectnessIndicator>
                        </div>
                    </div>
                </div>
                <div
                    class="col-12 col-sm-2 text-right text-sm-left order-2 order-sm-2"
                >
                    <span v-if="lesson_content.user_input">{{
                        lesson_content.name
                    }}</span>
                </div>
            </div>
        </div>

        <div v-if="lesson_contents.length > 0" class="row mb-5">
            <div class="col-8 offset-2 text-right">
                <button class="btn btn-primary" @click="checkSimilarity">
                    SUBMIT
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import RadialProgressBar from 'vue-radial-progress'

import { Corpus, Similarity } from 'tiny-tfidf'
import { mapState, mapActions, mapGetters } from 'vuex'
import helper from '@/mixins/helper'

import CorrectnessIndicator from '@/components/CorrectnessIndicator'

export default {
    props: ['id'],
    components: {
        RadialProgressBar,
        CorrectnessIndicator,
    },
    computed: {
        ...mapState('topic', ['topic']),
        ...mapState('lesson', ['lesson']),
        ...mapState('lesson_content', ['lesson_contents']),
        ...mapGetters('lesson_content', ['getLessonContentsReqInput']),
    },
    watch: {
        lesson() {
            if (this.lesson) {
                this.fetchTopic(this.lesson.topic_id)
            }
        },
    },
    created() {
        this.fetchLesson(this.id)
        this.fetchLessonContents(this.id)
    },
    methods: {
        ...mapActions('topic', ['fetchTopic']),
        ...mapActions('lesson', ['fetchLesson']),
        ...mapActions('lesson_content', ['fetchLessonContents']),
        progress(event, progress, stepValue) {
            console.log(stepValue)
        },
        progress_end(event) {
            console.log('Circle progress end')
        },
        speechStyling(reqUserInput) {
            return {
                'lesson-content__speech_left': !reqUserInput,
                'lesson-content__speech_right': reqUserInput,
            }
        },
        checkSimilarity() {
            let userInputElements = this.$refs[
                'lesson-contents'
            ].getElementsByTagName('input')

            let userInputs = []
            let saysTranslations = []
            let docs = []

            userInputElements.forEach(inputEl => {
                let input = inputEl.value
                this.checkSynonyms(input)
                userInputs.push(input)
            })

            this.getLessonContentsReqInput.forEach(content => {
                saysTranslations.push(content.says_translation)
            })

            // userInputs & saysTranslations doc should be of equal length
            for (let i = 1; i <= userInputs.length; i++) {
                docs.push(`d${i}`)
            }

            // d1: document 1 etc.
            // TODO: Test user input with all documents and get the highest similarity
            const userCorpus = new Corpus(docs, userInputs)
            const answerCorpus = new Corpus(docs, saysTranslations)

            for (let i = 1; i <= userCorpus._documents.size; i++) {
                console.log(
                    Similarity.cosineSimilarity(
                        userCorpus.getDocumentVector(`d${i}`),
                        answerCorpus.getDocumentVector(`d${i}`)
                    )
                )
            }

            console.log(this.$refs['CI9'])
        },
        checkSynonyms(input) {
            console.log(input)
        },
    },
    mixins: [helper],
}
</script>

<style lang="scss" scoped></style>
