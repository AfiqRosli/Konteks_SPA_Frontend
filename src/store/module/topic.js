import TopicService from '@/services/TopicService.js'

export const namespaced = true

export const state = {
    topics: [],
    topic: null,
    // topicsTotal: 0,
}

export const mutations = {
    SET_TOPICS(state, topics) {
        state.topics = topics
    },
    SET_TOPIC(state, topic) {
        state.topic = topic
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
    async fetchTopic({ commit }, id) {
        try {
            let res = await TopicService.getTopic(id)
            commit('SET_TOPIC', res.data)
        } catch (err) {
            console.log(err)
        }
    },
}

export const getters = {}
