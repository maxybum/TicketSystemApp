<template>
    <div id="app">
        <navigation />
        <b-container class="py-5" style="min-height: 600px">
            <b-row>
                <router-view>              
                </router-view>
            </b-row>
        </b-container>
        <sqreen-footer />
        <go-top :size="50" :right="10" bg-color="#4d82b8" :bottom="10"></go-top>
    </div>
</template>

<script>
    import Navigation from "components/navigation";
    import { USER_REQUEST } from "actions/user";
    import SqreenFooter from "./components/footer/index.vue";
    import { mapGetters, mapState } from "vuex";
    import GoTop from '@inotom/vue-go-top';

    export default {
        name: 'app',
        components: {
            SqreenFooter,
            Navigation,
            GoTop
        },
        computed: {
            ...mapGetters(["getProfile"]),
        },
        created: function () {
            if (this.$store.getters.isAuthenticated) {
                console.log(this.getProfile.username);
                this.$store.dispatch(USER_REQUEST, this.getProfile.username);
            }
        }
    };
</script>

<style>
</style>
