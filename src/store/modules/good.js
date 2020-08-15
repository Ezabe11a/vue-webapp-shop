// import { fetchGoodsOfCate } from '@/utils/api'

export default {
    namespaced: true,
    state: {
        find:{},
    },
    getters: {},
    mutations: {
        updateFind(state,payload){
            state.find[payload.index] = payload.list
        },
        clearFind(state) {
            state.find = {}
        }
    },
    actions: {
        // getGoodsOfCate(stroe,payload) {
        //     fetchGoodsOfCate(payload.params).then(result=>{
        //         console.log(result);
        //         stroe.commit('updateFind',{list:result,index:payload.index})
        //     })
        // }
    }
}