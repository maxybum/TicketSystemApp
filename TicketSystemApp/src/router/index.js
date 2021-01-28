import Vue from "vue";
import Router from "vue-router";
import Home from "components/home";
import Account from "components/account";
import Login from "components/login";
import store from "../store";
import Tikets from "components/tikets";
import TicketDetails from "components/ticketDetails";
import CreateTicket from "components/createTicket";

Vue.use(Router);

const ifNotAuthenticated = (to, from, next) => {
    if (!store.getters.isAuthenticated ) {
        console.log("NotAuthenticated");
        next();
        return;
    }
    next("/");
};

const ifAuthenticated = (to, from, next) => {
    if (store.getters.isAuthenticated && !!store.state.auth.token) {
        console.log("Authenticated");
        next();
        return;
    }
    next("/login");
};

export default new Router({
    mode: "history",
    //base: "/helpdesk/", //Uncomment before deploy
    routes: [
        {
            path: "/",
            name: "Home",
            component: Home
        },
        {
            path: "/account",
            name: "Account",
            component: Account,
            beforeEnter: ifAuthenticated
        },
        {
            path: "/login",
            name: "Login",
            component: Login,
            beforeEnter: ifNotAuthenticated
        },
        {
            path: "/tickets",
            name: "Tickets",
            component: Tikets,
            beforeEnter: ifAuthenticated
        },
        {
            path: "/tickets/ticketDetails",
            props: (route) => ({ query: route.query.ticketid}),
            name: "Details",
            component: TicketDetails,
            beforeEnter: ifAuthenticated
        },
        {
            path: "/createTicket",
            name: "CreateTicket",
            component: CreateTicket,
            beforeEnter: ifAuthenticated
        }
    ]
});
