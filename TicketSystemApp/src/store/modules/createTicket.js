import {
    CREATETICKET_REQUEST,
    CREATETICKET_ERROR,
    CREATETICKET_SUCCESS
} from "../actions/createTicket";
import apiCall from "utils/api";
import { AUTH_LOGOUT } from "../actions/auth";
import Vue from "vue";

const state = { status: "", statusCode: null, statusDescription: "", createTicket: {} };

const getters = {
    getCreateTicketStatus: state => state,
};

const actions = {
    [CREATETICKET_REQUEST]: ({ commit, dispatch}, data) => {
        commit(CREATETICKET_REQUEST);
        apiCall({ url: "api/man/tickets", method: "POST", data: data })
            .then(resp => {
                console.log(resp);
                
                commit(CREATETICKET_SUCCESS, resp);
            })
            .catch((error) => {
                commit(CREATETICKET_ERROR);
                // if resp is unauthorized, logout, to

                if (error.response) {
                    if (error.response.status == 401)
                        dispatch(AUTH_LOGOUT);
                }
            });
    }
};

const mutations = {
    [CREATETICKET_REQUEST]: state => {
        state.statusCode = null;
        state.status = "loading";
    },
    [CREATETICKET_SUCCESS]: (state, resp) => {
        state.status = "success";
        state.statusCode = resp.data.statusCode;
        Vue.set(state, "createTicket", resp.data);
    },
    [CREATETICKET_ERROR]: state => {
        state.status = "error";
    },
    //[AUTH_LOGOUT]: state => {
    //    state.profile = {};
    //}
};

export default {
    state,
    getters,
    actions,
    mutations
};
