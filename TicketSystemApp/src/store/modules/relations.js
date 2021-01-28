import {
    RELATIONS_REQUEST,
    RELATIONS_ERROR,
    RELATIONS_SUCCESS
} from "../actions/relations";
import apiCall from "utils/api";
import { AUTH_LOGOUT } from "../actions/auth";
import Vue from "vue";

const state = {
    status: "",
    relations: {}
};

const getters = {
    getRelations: state => state.relations,
};

const actions = {
    [RELATIONS_REQUEST]: ({ commit, dispatch, data }) => {
        commit(RELATIONS_REQUEST);
        apiCall({ url: "api/crm/relations/", method: "GET"})
            .then(resp => {
                console.log(resp);

                commit(RELATIONS_SUCCESS, resp.data.objectResult.find(f => f.relationId == data.relationId));
            })
            .catch((error) => {
                commit(RELATIONS_ERROR);
                // if resp is unauthorized, logout, to

                if (error.response) {
                    if (error.response.status == 401)
                        dispatch(AUTH_LOGOUT);
                }
            });
    }
};

const mutations = {
    [RELATIONS_REQUEST]: state => {
        state.statusCode = null;
        state.status = "loading";
    },
    [RELATIONS_SUCCESS]: (state, resp) => {
        state.status = "success";
        Vue.set(state, "relations", resp);
    },
    [RELATIONS_ERROR]: state => {
        state.status = "error";
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
