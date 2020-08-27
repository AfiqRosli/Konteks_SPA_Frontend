import apiClient from './API'

export default {
    getTopics() {
        return apiClient.get('/topics')
    },
}