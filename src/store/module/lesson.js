import LessonService from '@/services/LessonService'

export const namespaced = true

export const state = {
    lessons: [],
    lesson: null,
}

export const mutations = {
    SET_LESSONS(state, lessons) {
        state.lessons = lessons
    },
    SET_LESSON(state, lesson) {
        state.lesson = lesson
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
    async fetchLesson({ commit }, lesson_id) {
        try {
            let res = await LessonService.getLesson(lesson_id)
            commit('SET_LESSON', res.data)
        } catch (err) {
            console.log(err)
        }
    },
}

export const getters = {}
