<template>
    <div class="container">
        <div class="col-md-12 text-center">
            <loading v-if="profileLoading" />

            <div class="mt-5" v-if="isAuthenticated && isProfileLoaded">
                <h1 style="word-wrap: break-word;">{{$t('HomeWelcome')}}</h1>
                <p>
                    {{$t('HomeDescription')}}
                </p>
                <p>{{$t('HomeTickets')}}</p>
                <b-button @click="tickets" variant="primary">{{$t('HomeSeeAllTickets')}}</b-button>
            </div>

            <div v-if="!isAuthenticated && authStatus !== 'loading'">
                <h1>{{$t('HomeWelcome')}}</h1>
                <p>
                    {{$t('HomeDescription')}}
                </p>
                <login />
            </div>
        </div>
    </div>
</template>

<style>
    .home {
        display: flex;
        align-items: center;
        flex-direction: column;
    }
</style>

<script>
   
    import { mapGetters } from "vuex";
    import Login from "components/login";

    export default {
        components: {
            Login
        },
        name: "home",
        computed: {

            ...mapGetters(["isAuthenticated", "authStatus", "getProfile", "isProfileLoaded", "userStatus"]),
            loading: function () {
                return this.authStatus === "loading" && !this.isAuthenticated;
            },
            profileLoading: function () {
                return this.userStatus === "loading" && !this.isProfileLoaded;
            }
        },
        methods: {
            tickets: function () {
                this.$router.push("/tickets");
            }
        }//,
        //data() {
        //    return { fakeFeed };
        //}
    };
</script>

