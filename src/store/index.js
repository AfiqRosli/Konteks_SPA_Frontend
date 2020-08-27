import Vue from 'vue'
import Vuex from 'vuex'
import * as auth from './module/auth'
import * as topic from './module/topic'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    topic
  }
})
