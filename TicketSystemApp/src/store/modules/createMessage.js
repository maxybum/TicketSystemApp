import {
    CREATEMESSAGE_REQUEST,
    CREATEMESSAGE_SUCCESS,
    CREATEMESSAGE_ERROR,
    MESSAGESENDER_REQUEST,
    MESSAGESENDER_SUCCESS,
    MESSAGESENDER_ERROR
} from "../actions/createMessage";
import apiCall from "utils/api";
import { AUTH_LOGOUT } from "../actions/auth";
import Vue from "vue";

const state = {
    status: "",
    statusCodes: { createTicketReq:null , mesSenderReq: null },
    statusCodeMes: null,
    statusDescription: "",
};

const getters = {
    getCreateMessageStatus: state => state,
};

const actions = {
    [CREATEMESSAGE_REQUEST]: ({ commit, dispatch }, data) => {
        commit(CREATEMESSAGE_REQUEST);
        apiCall({ url: "api/man/ticket/message", method: "POST", data: data })
            .then(resp => {
                console.log(resp);

                data.senderData.messageId = resp.data.objectResult.ticketMessageId
                dispatch(MESSAGESENDER_REQUEST, data.senderData)

                commit(CREATEMESSAGE_SUCCESS, resp);
            })
            .catch((error) => {
                commit(CREATEMESSAGE_ERROR);
                // if resp is unauthorized, logout, to

                if (error.response) {
                    if (error.response.status == 401)
                        dispatch(AUTH_LOGOUT);
                }
            });
    },
    [MESSAGESENDER_REQUEST]: ({ commit, dispatch }, data) => {
        commit(MESSAGESENDER_REQUEST);
        apiCall({ url: "api/man/ticket/message/recipents", method: "POST", data: data })
            .then(resp => {
                console.log(resp);

                commit(MESSAGESENDER_SUCCESS, resp);
            })
            .catch((error) => {
                commit(MESSAGESENDER_ERROR);
                // if resp is unauthorized, logout, to

                if (error.response) {
                    if (error.response.status == 401)
                        dispatch(AUTH_LOGOUT);
                }
            });
    }
};

const mutations = {
    [CREATEMESSAGE_REQUEST]: state => {
        state.statusCodes.createTicketReq = null;
        state.status = "loading";
    },
    [CREATEMESSAGE_SUCCESS]: (state, resp) => {
        //state.status = "success";
        state.statusCodes.createTicketReq = resp.data.statusCode;
        Vue.set(state, "createMessage", resp.data);
    },
    [CREATEMESSAGE_ERROR]: state => {
        state.status = "error";
    },

    [MESSAGESENDER_REQUEST]: state => {
        state.statusCodes.mesSenderReq = null;
        state.status = "loading";
    },
    [MESSAGESENDER_SUCCESS]: (state, resp) => {
        state.status = "success";
        state.statusCodes.mesSenderReq = resp.data.statusCode;
        Vue.set(state, "messageSender", resp.data);
    },
    [MESSAGESENDER_ERROR]: state => {
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
