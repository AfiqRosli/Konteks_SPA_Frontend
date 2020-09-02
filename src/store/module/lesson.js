import LessonService from '@/services/LessonService'

export const namespaced = true

export const state = {
    lessons: [],
}

export const mutations = {
    SET_LESSONS(state, lessons) {
        state.lessons = lessons
    },
}

export const actions = {
    async fetchLessons({ commit }, topic_id) {
        try {
            let lessons = await LessonService.getTopicLessons(topic_id)
            console.log(lessons)
            commit('SET_LESSONS', lessons)
        } catch (err) {
            console.log(err)
        }
    },
}

export const getters = {}
