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
      addLike(state, id) {
        const index = state.loadedMemos.findIndex(
          memo => memo.id === id
        );
        const memo = state.loadedMemos[index]
        memo.goodwill_count =+ 1
      }
    },
    actions: {
      nuxtServerInit(vuexContext, context) {
        return context.app.$axios
          .$get("http://localhost:5000/api/memos")
          .then(data => {
            vuexContext.commit("setMemos", data);
          })
          .catch(e => context.error(e));
      },
      authenticateUser(_, authData) {
        let authUrl = "http://localhost:5000/api/users"
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
        return this.$axios
          .$post(
            "http://localhost:5000/api/memos",
            memo
          )
          .then(data => {
            vuexContext.commit("addMemo", data);
          })
          .catch(e => console.log(e));
      },
      addLike(vuexContext, id) {
        return this.$axios
          .$post(
            "http://localhost:5000/api/goodwills",
            {memo_id: id, user_id: 1}
          )
          .then(
            vuexContext.commit('addLike', id)
          )
          .catch(e => console.log(e));
      },
    }
  })
}

export default createStore;
