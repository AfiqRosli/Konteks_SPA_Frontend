import LessonContentService from '@/services/LessonContentService.js'

export const namespaced = true

export const state = {
    lesson_contents: [],
}

export const mutations = {
    SET_LESSON_CONTENTS(state, lesson_contents) {
        state.lesson_contents = lesson_contents
    },
}

export const actions = {
    async fetchLessonContents({ commit }, lesson) {
        try {
            let res = await LessonContentService.getLessonContents(lesson)
            commit('SET_LESSON_CONTENTS', res.data)
        } catch (err) {
            console.log(err)
        }
    },
}

export const getters = {}
