import axios from 'axios';
import Vue from 'vue'
import Vuex from 'vuex'
import Cookie from "js-cookie";

Vue.use(Vuex);

const url = 'http://localhost:3000/api/users';

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
      setUsers: (state, users) => (state.users = users),
      setToken(state, token) {
        state.token = token;
      },
      clearToken(state) {
        state.token = null;
      },
      setMemos: (state, memos) => (state.memos = memos)
    },
    actions: {
      async fetchUsers({ commit }) {
        const response = await axios.get(url);
        commit('setUsers', response.data);
      },
      async fetchMemos({ commit }) {
        const response = await axios.get(url);
        commit('setUsers', response.data);
      },
      authenticateUser(vuexContext, authData) {
        let authUrl =
          "http://localhost:3000/api/users" 
        if (!authData.isLogin) {
          authUrl = url
        }
        return this.$axios
          .$post(authUrl, { user: {
            email: authData.email,
            password: authData.password,
            password_confirmation: authData.password_confirmation}
          })
          // .then(result => {
          //   vuexContext.commit("setToken", result.idToken);
          //   localStorage.setItem("token", result.idToken);
          //   localStorage.setItem(
          //     "tokenExpiration",
          //     new Date().getTime() + Number.parseInt(result.expiresIn) * 1000
          //   );
          //   Cookie.set("jwt", result.idToken);
          //   Cookie.set(
          //     "expirationDate",
          //     new Date().getTime() + Number.parseInt(result.expiresIn) * 1000
          //   );
          //   return this.$axios.$post('http://localhost:3000/api/track-data', {data: 'Authenticated!'})
          // })
          .catch(e => console.log(e));
      },
      initAuth(vuexContext, req) {
        let token;
        let expirationDate;
        if (req) {
          if (!req.headers.cookie) {
            return;
          }
          const jwtCookie = req.headers.cookie
            .split(";")
            .find(c => c.trim().startsWith("jwt="));
          if (!jwtCookie) {
            return;
          }
          token = jwtCookie.split("=")[1];
          expirationDate = req.headers.cookie
            .split(";")
            .find(c => c.trim().startsWith("expirationDate="))
            .split("=")[1];
        } else if (process.client) {
          token = localStorage.getItem("token");
          expirationDate = localStorage.getItem("tokenExpiration");
        }
        if (new Date().getTime() > +expirationDate || !token) {
          console.log("No token or invalid token");
          vuexContext.dispatch("logout");
          return;
        }
        vuexContext.commit("setToken", token);
      },
      logout(vuexContext) {
        vuexContext.commit("clearToken");
        Cookie.remove("jwt");
        Cookie.remove("expirationDate");
        if (process.client) {
          localStorage.removeItem("token");
          localStorage.removeItem("tokenExpiration");
        }
      }
    }
  })
}

export default createStore;
