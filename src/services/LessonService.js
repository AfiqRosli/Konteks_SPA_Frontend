import apiClient from './API'

export default {
    getTopicLessons(topic) {
        return apiClient.get('/lessons/topics/' + topic)
    },
}