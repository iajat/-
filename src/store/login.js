import { getInfo } from "@/api"

const actions = {
    async GetInfo({ commit }) {
        let resolve
        try {
            resolve = await getInfo()
        } catch (error) {
            return 0;
        }
        if (resolve.code == 200) {
            commit('GETINFO', resolve.data)
            return 'ok'
        } else {
            return resolve.message
        }
    }
}


const mutations = {
    GETINFO(state, data) {
        state.personInfo = data
    }
}

const state = {
    personInfo: ''
}

const getters = {

}

export default {
    actions,
    mutations,
    state,
    getters,
}