import apiClient from './API'

export default {
    getTopicLessons(topic) {
        return apiClient.get(`/topics/${topic}/lessons`)
    },
    getLesson(lesson) {
        return apiClient.get(`/lessons/${lesson}`)
    }
}