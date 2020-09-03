import apiClient from './API'

export default {
    getLessonContents(lesson) {
        return apiClient.get(`lessons/${lesson}/lesson_contents`)
    }
}