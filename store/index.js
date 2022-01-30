import axios from 'axios';
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const url = 'http://localhost:5000/api/users';

const createStore = () => {
  return new Vuex.Store({
    state: {
    },
    getters: {
      users: state => state.users
    },
    mutations: {
    },
    actions: {
      authenticateUser(_, authData) {
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
