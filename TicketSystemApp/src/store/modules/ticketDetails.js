import {
    TICKETDETAILS_REQUEST,
    TICKETDETAILS_SUCCESS,
    TICKETDETAILS_ERROR,
    SENDERDETAILS_REQUEST,
    SENDERDETAILS_SUCCESS,
    SENDERDETAILS_ERROR
} from "../actions/ticketDetails";
import apiCall from "utils/api";
import { AUTH_LOGOUT } from "../actions/auth";
import Vue from "vue";

const state = {
    status: "",
    ticketDetails: {},
    senderDetails: {},
    isLoadedOnes: false,
    idLoadedBefore: -1,
    idLoadingNow: -1,
};

const getters = {
    getTicketStatus: state => state.status,
    getMappedMessages: state => {

        return state.ticketDetails.list_ManTicketMessage_TicketId.map((e) => {
    
            let senderName = state.senderDetails.find(f => f.messageId == e.ticketMessageId);
            
            if (senderName)
                e.SenderName = senderName.recipentName;
            return e;
        })
    }
};

const actions = {
    [TICKETDETAILS_REQUEST]: ({ commit, dispatch }, data) => {
        commit(TICKETDETAILS_REQUEST, data.ticketId);

        console.log(data);

        apiCall({ url: "api/man/tickets/full?id=" + data.user, method: "GET" })
            .then(resp => {
                console.log(resp.data.objectResult.find(f => f.ticketId == data.ticketId));

                commit(TICKETDETAILS_SUCCESS, resp.data.objectResult.find(f => f.ticketId == data.ticketId));

                dispatch(SENDERDETAILS_REQUEST);
            })
            .catch((error) => {
                commit(TICKETDETAILS_ERROR);
                // if resp is unauthorized, logout, to

                if (error.response) {
                    if (error.response.status == 401)
                        dispatch(AUTH_LOGOUT);
                }
            });
    },
    [SENDERDETAILS_REQUEST]: ({ commit, dispatch }) => {
        commit(SENDERDETAILS_REQUEST);
        apiCall({ url: "api/man/ticket/message/recipents", method: "GET" })
            .then(resp => {
                console.log(resp);
                commit(SENDERDETAILS_SUCCESS, resp.data.objectResult);
            })
            .catch((error) => {
                commit(SENDERDETAILS_ERROR);
                // if resp is unauthorized, logout, to

                if (error.response) {
                    if (error.response.status == 401)
                        dispatch(AUTH_LOGOUT);
                }
            });
    }
};

const mutations = {
    [TICKETDETAILS_REQUEST]: (state, id) => {
        state.idLoadingNow = id;
        state.status = "loading";
    },
    [TICKETDETAILS_SUCCESS]: (state, res) => {
        //state.status = "success";
        state.idLoadedBefore = res.ticketId;
        Vue.set(state, "ticketDetails", res);
    },
    [TICKETDETAILS_ERROR]: state => {
        state.status = "error";
    },

    [SENDERDETAILS_REQUEST]: state => {
        state.status = "loading";
    },
    [SENDERDETAILS_SUCCESS]: (state, res) => {
        state.status = "success";
        state.isLoadedOnes = true;
        Vue.set(state, "senderDetails", res);
    },
    [SENDERDETAILS_ERROR]: state => {
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
