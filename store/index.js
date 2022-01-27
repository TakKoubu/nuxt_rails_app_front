import axios from 'axios';
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const createStore = () => {
  return new Vuex.Store({
    api: 'http://localhost:3000/api',
    state: {
      users: []
    },
    getters: {
      users: state => state.users
    },
    mutations: {
      setUsers: (state, users) => (state.users = users)
    },
    actions: {
      async fetchUsers({ commit }) {
        const response = await axios.get(`${api}/users`);
        commit('setUsers', response.data);
      }
    }
  })
}

export default createStore;
