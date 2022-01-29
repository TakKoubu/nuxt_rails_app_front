import axios from 'axios';
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const url = 'http://localhost:5000/api/users';

const createStore = () => {
  return new Vuex.Store({
    state: {
      users: [],
      memos: [],
      token: null,
    },
    getters: {
      users: state => state.users
    },
    mutations: {
      setToken(state, token) {
        state.token = token;
      },
      clearToken(state) {
        state.token = null;
      },
      setMemos: (state, memos) => (state.memos = memos)
    },
    actions: {
      async fetchMemos({ commit }) {
        const response = await axios.get(url);
        commit('setUsers', response.data);
      },
      authenticateUser(vuexContext, authData) {
        let authUrl =
          "http://localhost:5000/api/users" 
        if (!authData.isLogin) {
          authUrl = url
        }
        return this.$axios
          .$post(authUrl, { user: {
            email: authData.email,
            password: authData.password,
            password_confirmation: authData.password_confirmation}
          })
          .catch(e => console.log(e));
      },
    }
  })
}

export default createStore;
