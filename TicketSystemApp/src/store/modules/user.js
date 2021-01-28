import {
    USER_REQUEST,
    USER_ERROR,
    USER_SUCCESS,
    USERDETAILS_REQUEST,
    USERDETAILS_ERROR,
    USERDETAILS_SUCCESS
} from "../actions/user";
import apiCall from "utils/api";
import Vue from "vue";
import { AUTH_LOGOUT } from "../actions/auth";

const state = {
    lang: localStorage.getItem("lang") || "nl",
    status: "",
    profile: {},
    details: {}
};

const getters = {
    getProfile: state => Object.assign({}, state.details, state.profile),
    isProfileLoaded: state => !!state.details.companyUserId,
    userStatus: state => state.status
};

const actions = {
    [USER_REQUEST]: ({ commit, dispatch}, userName) => {
        commit(USER_REQUEST);
        
        apiCall({ url: "api/user/info/name?name=" + userName, method: "GET" })
            .then(resp => {
                console.log(resp);
                dispatch(USERDETAILS_REQUEST, resp.data.objectResult.userid);
                commit(USER_SUCCESS, resp.data);                
            })
            .catch(() => {
                commit(USER_ERROR);
                // if resp is unauthorized, logout, to
                dispatch(AUTH_LOGOUT);
            });
    },
    [USERDETAILS_REQUEST]: ({ commit, dispatch }, userId) => {
        commit(USERDETAILS_REQUEST);

        apiCall({ url: "api/com/company/users?id=" + userId, method: "GET" })
            .then(resp => {
                console.log(resp);
                commit(USERDETAILS_SUCCESS, resp.data);
            })
            .catch(() => {
                commit(USERDETAILS_ERROR);
                // if resp is unauthorized, logout, to
                dispatch(AUTH_LOGOUT);
            });
    }
};

const mutations = {
    [USER_REQUEST]: state => {
        state.status = "loading";
    },
    [USER_SUCCESS]: (state, resp) => {
        //state.status = "success";
        Vue.set(state, "profile", resp.objectResult);
    },
    [USER_ERROR]: state => {
        state.status = "error";
    },

    [USERDETAILS_REQUEST]: state => {
        state.status = "loading";
    },
    [USERDETAILS_SUCCESS]: (state, resp) => {
        state.status = "success";
        Vue.set(state, "details", resp.objectResult);
    },
    [USERDETAILS_ERROR]: state => {
        state.status = "error";
    },

    [AUTH_LOGOUT]: state => {
        state.profile = {};
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
