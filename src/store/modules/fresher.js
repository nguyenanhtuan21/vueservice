//state - chua cac trang thai cua vuex

const state = () => ({
    fresherList: [],
    fresher: {
        FresherID: frID++,
        FresherCode: '',
        FirstName: '',
        LastName: '',
        FullName: ''
    },
    frID: 1,
    

})

// getters - thuong tra ve cac state

const getters = {
    getFresherList: (state,getters) => {
        return state.fresherList
    }
}

// actions - commit phan ung 

const actions = {

}

// mutations - phan ung 

const mutations = {

}