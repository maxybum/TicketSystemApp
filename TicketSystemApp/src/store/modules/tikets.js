import Vue from "vue";
import apiCall from "utils/api";
import { AUTH_LOGOUT } from "../actions/auth";
import {
    TIKETS_REQUEST,
    TIKETS_ERROR,
    TIKETS_SUCCESS,
    TICKETS_TOGGLE,
    TIKETTYPES_REQUEST,
    TIKETTYPES_ERROR,
    TIKETTYPES_SUCCESS,
    TIKETSTATUSES_REQUEST,
    TIKETSTATUSES_ERROR,
    TIKETSTATUSES_SUCCESS

} from "../actions/tikets";

const state = {
    showClosed: false,
    status: "",
    tickets: [],
    ticketTypes: [],
    ticketStatuses: []
};

const getters = {
    getTickets: state => {
        if (!state.tickets) return [];
        let filteredTickets = state.showClosed ? state.tickets.filter(t => t.ticketStatusId > 5) : state.tickets.filter(t => t.ticketStatusId < 6);
        return filteredTickets.map((e, i) => {
            let type = state.ticketTypes.find(tt => tt.ticketTypeId == e.ticketTypeId);
            if (type)
                e.TicketType = type.ticketTypeName;

            let status = state.ticketStatuses.find(ts => ts.ticketStatusId == e.ticketStatusId);
            if (status)
                e.TicketStatusName = status.ticketStatusName;

            return e
        })
    },
    getSelectOptions: state => {
        return state.ticketTypes.map((e) => {

            return {
                value: e.ticketTypeId,
                text: e.ticketTypeName
            }
        })
    },
    isTicketLoaded: state => !!state.data,
    ticketsStatus: state => state.status,
    showClosed: state => state.showClosed
};

const actions = {
    [TICKETS_TOGGLE]: ({ commit }, toggle) => {
        commit(TICKETS_TOGGLE, toggle);
    },
    [TIKETS_REQUEST]: ({ commit, dispatch }, userId) => {
        commit(TIKETS_REQUEST);
        //you can use same time requests since your data is not dependent
        dispatch(TIKETTYPES_REQUEST);
        dispatch(TIKETSTATUSES_REQUEST);
        apiCall({ url: "api/man/tickets/find/base?query=TicketSenderId=" + userId, method: "GET" })
            .then(resp => {
                commit(TIKETS_SUCCESS, resp);
            })
            .catch((error) => {
                commit(TIKETS_ERROR);

                if (error.response) {
                    if (error.response.status == 401)
                        dispatch(AUTH_LOGOUT);
                }
            });
    },
    [TIKETTYPES_REQUEST]: ({ commit, dispatch }) => {
        if (console) console.log("TIKETTYPES_REQUEST");
        commit(TIKETTYPES_REQUEST);
        apiCall({ url: "api/man/ticket/type", method: "GET" })
            .then(resp => {
                console.log(resp);
                commit(TIKETTYPES_SUCCESS, resp);
            })
            .catch((error) => {
                commit(TIKETTYPES_ERROR);

                if (error.response) {
                    if (error.response.status == 401)
                        dispatch(AUTH_LOGOUT);
                }

            });
    },
    [TIKETSTATUSES_REQUEST]: ({ commit, dispatch }) => {
        commit(TIKETSTATUSES_REQUEST);
        apiCall({ url: "api/man/ticket/status", method: "GET" })
            .then(resp => {
                console.log(resp);
                commit(TIKETSTATUSES_SUCCESS, resp);
            })
            .catch((error) => {
                commit(TIKETSTATUSES_ERROR);

                // if resp is unauthorized, logout, to
                if (error.response) {
                    if (error.response.status == 401)
                        dispatch(AUTH_LOGOUT);
                }
            });
    }
};

const mutations = {
    [TIKETS_REQUEST]: state => {
        state.status = "loading";
    },
    [TICKETS_TOGGLE]: (state, toggle) => {
        Vue.set(state, "showClosed", toggle);
    },
    [TIKETS_SUCCESS]: (state, resp) => {
        //state.status = "success";
        Vue.set(state, "tickets", resp.data.objectResult);
    },
    [TIKETS_ERROR]: state => {
        state.status = "error";
    },

    [TIKETTYPES_REQUEST]: state => {
        state.status = "loading";
    },
    [TIKETTYPES_SUCCESS]: (state, resp) => {
        //state.status = "success";
        Vue.set(state, "ticketTypes", resp.data.objectResult);
    },
    [TIKETTYPES_ERROR]: state => {
        state.status = "error";
    },

    [TIKETSTATUSES_REQUEST]: state => {
        state.status = "loading";
    },
    [TIKETSTATUSES_SUCCESS]: (state, resp) => {
        state.status = "success";
        Vue.set(state, "ticketStatuses", resp.data.objectResult);
    },
    [TIKETSTATUSES_ERROR]: state => {
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
