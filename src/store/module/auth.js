import axios from 'axios'

export const namespaced = true

export const state = {
    authenticated: false,
    user: null
}

export const mutations = {
    SET_AUTHENTICATED(state, value) {
        state.authenticated = value
    },

    SET_USER(state, value) {
        state.user = value
    }
}

export const actions = {
    async signIn({
        dispatch
    }, credentials) {
        await axios.get('/sanctum/csrf-cookie')
        await axios.post('/login', credentials)

        return dispatch('me')
    },

    async signOut({
        dispatch
    }) {
        await axios.post('/logout')

        return dispatch('me')
    },

    me({
        commit
    }) {
        return axios.get('/api/user').then((response) => {
            commit('SET_AUTHENTICATED', true)
            commit('SET_USER', response.data)
        }).catch(() => {
            commit('SET_AUTHENTICATED', false)
            commit('SET_USER', null)
        })
    }
}

export const getters = {
    authenticated(state) {
        return state.authenticated
    },

    user(state) {
        return state.user
    },
}