import axios from 'axios';
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const url = 'http://localhost:5000/api/users';

const createStore = () => {
  return new Vuex.Store({
    state: {
      loadedMemos: [],
    },
    getters: {
      users: state => state.users,
      loadedMemos(state) {
          return state.loadedMemos;
      },
    },
    mutations: {
      setMemos(state, memos) {
        state.loadedMemos = memos;
      },
      // deleteMemo(state, id) {
      //   state.loadedMemos.splice(id, 1);
      // },
      deleteMemo(state, id) {
        const index = state.loadedMemos.findIndex((v) => v.id === id);
        state.loadedMemos.splice(index,1);
      },
      addMemo(state, memo) {
        state.loadedMemos.push(memo);
      },
    },
    actions: {
      nuxtServerInit(vuexContext, context) {
        return context.app.$axios
          .$get("http://localhost:5000/api/memos")
          .then(data => {
            // const memosArray = [];
            // for (const key in data) {
            //   memosArray.push({...data[key], id: key });
            // }
            vuexContext.commit("setMemos", data);
          })
          .catch(e => context.error(e));
      },
      authenticateUser(_, authData) {
        let authUrl =
          "http://localhost:5000/api/users"
        if (!authData.isLogin) {
          authUrl = url
        }
        return this.$axios
          .$post(authUrl, {
            user: {
                email: authData.email,
                password: authData.password,
                password_confirmation: authData.password_confirmation
              }
            })
          .catch(e => console.log(e));
      },
      deleteMemo(vuexContext, id) {
        console.log(id)
        return this.$axios
          .$delete(
            "http://localhost:5000/api/memos/" + id
          )
          .then(res => {
            vuexContext.commit("deleteMemo", id);
          })
          .catch(e => console.log(e));
      },
      addMemo(vuexContext, memo) {
        // const Memo = {
        //   ...memo,
        // };
        return this.$axios
          .$post(
            "http://localhost:5000/api/memos",
            memo
          )
          .then(data => {
            console.log({ memo, id: data.id })
            vuexContext.commit("addMemo", data);
          })
          .catch(e => console.log(e));
      },
      addLike(_, id) {
        return this.$axios
        .$post(
          "http://localhost:5000/api/favorites",
          {favorite: {id: id, user_id: 1}}
        )
        .catch(e => console.log(e));
      },
    }
  })
}

export default createStore;
