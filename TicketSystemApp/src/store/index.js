import Vue from "vue";
import Vuex from "vuex";
import user from "./modules/user";
import auth from "./modules/auth";
import tikets from "./modules/tikets";
import createTicket from "./modules/createTicket";
import ticketDetails from "./modules/ticketDetails";
import createMessage from "./modules/createMessage";
import relations from "./modules/relations";
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex);

const debug = true;

export default new Vuex.Store({
    modules: {
        user,
        auth,
        tikets,
        createTicket,
        ticketDetails,
        createMessage,
        relations
    },
    plugins: [
        createPersistedState({
            storage: {
                getItem: key => sessionStorage.getItem(key),
                setItem: (key, value) => sessionStorage.setItem(key, value),
                removeItem: key => sessionStorage.removeItem(key)
            }
        })],
    strict: debug
});
