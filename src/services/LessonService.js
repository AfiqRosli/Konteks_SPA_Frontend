import apiClient from './API'

export default {
    getTopicLessons(topic) {
        return apiClient.get(`/topics/${topic}/lessons`)
    },
}
