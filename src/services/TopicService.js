import apiClient from './API'

export default {
    getTopics() {
        return apiClient.get('/topics')
    },
    getTopic(id) {
        return apiClient.get('/topic/' + id)
    }
}