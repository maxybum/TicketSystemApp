/* eslint-disable promise/param-names */
import {
    AUTH_REQUEST,
    AUTH_ERROR,
    AUTH_SUCCESS,
    AUTH_LOGOUT
} from "../actions/auth";
import { USER_REQUEST } from "../actions/user";
import apiCall from "utils/api";
import axios from 'axios';
import router from "../../router";

const axiosBaseUrl = 'https://12001.tripserver.nl/';

const state = {
    token: "",
    status: "",
    hasLoadedOnce: false
};

const getters = {
    isAuthenticated: state => !!state.token,
    authStatus: state => state.status
};

const actions = {
    [AUTH_REQUEST]: ({ commit, dispatch }, user) => {
        return new Promise((resolve, reject) => {
            commit(AUTH_REQUEST);

            axios.defaults.baseURL = axiosBaseUrl;

            var details = { 'grant_type': 'password', 'username': user.username, 'password': user.password };
            let formBody = [];
            for (let property in details) {
                let encodedKey = encodeURIComponent(property);
                let encodedValue = encodeURIComponent(details[property]);
                formBody.push(encodedKey + "=" + encodedValue);
            }
            formBody = formBody.join("&");

            apiCall({ url: "token", data: formBody, method: "POST" })
                .then(resp => {
                    axios.defaults.headers.common['Authorization'] = 'Bearer ' + resp.data.access_token;
                    commit(AUTH_SUCCESS, resp);
                    dispatch(USER_REQUEST, user.username);
                    resolve(resp);
                })
                .catch(err => {
                    commit(AUTH_ERROR, err);
                    reject(err);
                });
        });
    },
    [AUTH_LOGOUT]: ({ commit }) => {
        return new Promise(resolve => {
            commit(AUTH_LOGOUT);
            router.push("/login");
            resolve();
        });
    }
};

const mutations = {
    [AUTH_REQUEST]: state => {
        state.status = "loading";
    },
    [AUTH_SUCCESS]: (state, resp) => {
        state.status = "success";
        state.token = resp.data.access_token;
        state.hasLoadedOnce = true;
    },
    [AUTH_ERROR]: state => {
        state.token = "";
        state.status = "error";
        state.hasLoadedOnce = true;
    },
    [AUTH_LOGOUT]: state => {
        state.token = "";
        getters.isAuthenticated = false;
        delete axios.defaults.headers.common['Authorization'];
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
