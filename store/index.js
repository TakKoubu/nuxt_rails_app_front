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
            deleteMemo(state, id) {
                state.loadedMemos.slice(id, 1);
            },
        },
        actions: {
            nuxtServerInit(vuexContext, context) {
                return context.app.$axios
                    .$get("http://localhost:5000/api/memos")
                    .then(data => {
                        const memosArray = [];
                        for (const key in data) {
                            memosArray.push({...data[key], id: key });
                        }
                        vuexContext.commit("setMemos", memosArray);
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
        }
    })
}

export default createStore;