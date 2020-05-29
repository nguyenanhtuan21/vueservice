import Vue from 'vue'
import Vuex from 'vuex'
import fresher from './modules/fresher'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        fresher,
    },
    
})