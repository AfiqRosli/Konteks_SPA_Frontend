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
                                :lessonContentId="lesson_content.id"
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
import {
    abs,
    sum,
    sqrt,
    multiply,
    divide,
    dotDivide,
    dotMultiply,
} from 'mathjs'
import { mapState, mapActions, mapGetters } from 'vuex'
import helper from '@/mixins/helper'

import CorrectnessIndicator from '@/components/CorrectnessIndicator'

let unionBy = require('lodash.unionby')

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
            let similarityResults = []

            let content = this.getLessonContentsReqInput
            for (let i = 0; i < content.length; i++) {
                if (content[i].synonyms) {
                    let synonyms = JSON.parse(content[i].synonyms)
                    let revisedInput = this.convertSynonyms(
                        userInputElements[i].value.toLowerCase(),
                        synonyms
                    )

                    userInputs.push(revisedInput)
                } else {
                    userInputs.push(userInputElements[i].value)
                }
                saysTranslations.push(content[i].says_translation.toLowerCase())
            }

            for (let i = 0; i < saysTranslations.length; i++) {
                similarityResults.push(
                    this.cosineSimilarity(saysTranslations[i], userInputs[i])
                )
            }

            console.log(similarityResults)

            // console.log(this.$refs['CI9'])
        },
        convertSynonyms(input, synonyms) {
            let keys = Object.keys(synonyms)

            for (let i = 0; i < keys.length; i++) {
                let values = synonyms[keys[i]]
                for (let j = 0; j < values.length; j++) {
                    if (input.includes(values[j])) {
                        input = input.replaceAll(values[j], keys[i])
                        break
                    }
                }
            }

            return input
        },
        getUniqueWords(input, preDefined) {
            let inputArr = this.splitToArr(input)
            let preDefinedArr = this.splitToArr(preDefined)

            return unionBy(inputArr, preDefinedArr)
        },
        generateWordCountVector(uniqueWords, sentence) {
            let sentenceArr = this.splitToArr(sentence)
            let wordCountVector = []

            uniqueWords.forEach(uniqueWord => {
                let matched = 0
                sentenceArr.forEach(word => {
                    if (word == uniqueWord) {
                        matched++
                    }
                })

                wordCountVector.push(matched)
            })

            return wordCountVector
        },
        splitToArr(input) {
            // Code adapted from
            // Greg, 23rd Dec 2008; https://stackoverflow.com/questions/388996/regex-for-javascript-to-allow-only-alphanumeric
            // BalusC, 30th Dec 2009; https://stackoverflow.com/questions/1981349/regex-to-replace-multiple-spaces-with-a-single-space
            // Niet the Dark Absol, 14th Mar 2012; https://stackoverflow.com/questions/9705194/replace-special-characters-in-a-string-with-underscore/9705227
            return input
                .replace(/[^a-z0-9 ]/gi, '')
                .replace(/\s\s+/, ' ')
                .split(' ')
            // End of adapted code
        },
        cosineSimilarity(translation, userAns) {
            let uniqueWords = this.getUniqueWords(translation, userAns)
            let translationWordCountVector = this.generateWordCountVector(
                uniqueWords,
                translation
            )
            let userAnsWordCountVector = this.generateWordCountVector(
                uniqueWords,
                userAns
            )

            let dotProduct = dotMultiply(
                translationWordCountVector,
                userAnsWordCountVector
            )
            let dividend = sum(dotProduct)
            let magnitudeTranslation = sqrt(
                sum(
                    dotMultiply(
                        translationWordCountVector,
                        translationWordCountVector
                    )
                )
            )
            let magnitudeuserAns = sqrt(
                sum(dotMultiply(userAnsWordCountVector, userAnsWordCountVector))
            )
            let divisor = multiply(magnitudeTranslation, magnitudeuserAns)

            let cosineSimilarity = divide(dividend, divisor)

            return cosineSimilarity
        },
    },
    mixins: [helper],
}
</script>

<style lang="scss" scoped></style>
