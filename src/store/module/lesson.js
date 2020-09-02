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
            let res = await LessonService.getTopicLessons(topic_id)
            commit('SET_LESSONS', res.data)
        } catch (err) {
            console.log(err)
        }
    },
}

export const getters = {}
