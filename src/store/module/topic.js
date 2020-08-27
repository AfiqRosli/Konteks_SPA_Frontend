import TopicService from '@/services/TopicService.js'

export const namespaced = true

export const state = {
    topics: [],
    // topicsTotal: 0,
}

export const mutations = {
    SET_TOPICS(state, topics) {
        state.topics = topics
    },
    // SET_TOPICS_TOTAL(state, topicsTotal) {
    //     state.topicsTotal = topicsTotal
    // },
}

export const actions = {
    async fetchTopics({ commit }) {
        try {
            let res = await TopicService.getTopics()
            // commit('SET_TOPICS_TOTAL', parseInt(res.headers['x-total-count']))
            commit('SET_TOPICS', res.data)
        } catch (err) {
            console.error(err)
        }
    },
}

export const getters = {}
