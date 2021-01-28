<template>
    <div class="mb-3">
        <b-navbar toggleable="sm" type="dark" variant="primary">

            <a class="navbar-brand" href="#"></a>
            <div id="logo">
                <b-link class="navbar-brand" to="/">
                    <img src="https://reinder.eu/images/logo.png" alt="">
                </b-link>
            </div>

            <b-navbar-toggle target="sidebar-1"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">


                    <b-nav-item href="https://www.facebook.com/reinder.eu">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="facebook">
                            <path d="M16.75,9H13.5V7a1,1,0,0,1,1-1h2V3H14a4,4,0,0,0-4,4V9H8v3h2v9h3.5V12H16Z"></path>
                        </svg>
                    </b-nav-item>

                    <b-nav-item href="https://twitter.com/reinderstolte">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="twitter">
                            <path opacity="0" d="M0 0h24v24H0z"></path>
                            <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path>
                        </svg>
                    </b-nav-item>

                    <b-nav-item href="https://www.linkedin.com/company/reinder-eu">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="linkedin">
                            <rect height="11" width="4" x="3" y="9"></rect>
                            <circle cx="5" cy="5" r="2"></circle>
                            <path d="M16.5,8.25A4.47251,4.47251,0,0,0,13,9.95343V9H9V20h4V13a2,2,0,0,1,4,0v7h4V12.75A4.5,4.5,0,0,0,16.5,8.25Z"></path>
                        </svg>
                    </b-nav-item>

                    <b-form-select v-model="lang" :plain="true" :options="langOpt" class="mt-1 bg-primary text-light"></b-form-select>

                    <b-nav-item-dropdown right v-if="isAuthenticated" class="mt-1">
                        <!-- Using 'button-content' slot -->
                        <template v-slot:button-content>
                            <em>{{$t('Hi')}}, {{getProfile.username}}</em>
                        </template>
                        <b-dropdown-item to="/account">  <b-icon class="mr-1" icon="people-circle" font-scale="1" />{{$t('Profile')}}</b-dropdown-item>
                        <b-dropdown-item to="/login" @click="logout"><b-icon class="mr-1" icon="box-arrow-down-right" font-scale="1" />{{$t('SignOut')}}</b-dropdown-item>
                    </b-nav-item-dropdown>



                </b-navbar-nav>
            </b-collapse>

            <!--SIDE BAR-->
            <b-sidebar id="sidebar-1" :title="$t('Hi') + ', ' + getProfile.username" shadow bg-variant="primary">
                <b-col v-if="isAuthenticated">
                    <b-col variant="primary" class="mt-4">
                        <h5>
                            <b-icon icon="people-circle" font-scale="1" />
                            <b-link to="/account" class="text-dark">
                                {{$t('Profile')}}
                            </b-link>
                        </h5>
                    </b-col>
                    <b-col variant="primary" class="mt-4">
                        <h5>
                            <b-icon icon="book" font-scale="1" />
                            <b-link to="/tickets" class="text-dark">
                                {{$t('Tickets')}}
                            </b-link>
                        </h5>
                    </b-col>
                    <b-col variant="primary" class="mt-4">
                        <h5>
                            <b-icon icon="file-plus" font-scale="1" />
                            <b-link to="/createTicket" class="text-dark">
                                {{$t('CreateTicket')}}
                            </b-link>
                        </h5>
                    </b-col>
                </b-col>


                <template v-slot:footer="{ hide }">
                    <div class="d-flex bg-dark text-light align-items-center px-3 py-2">
                        <strong class="mr-auto">{{$t('Language')}} : </strong>
                        <b-col class="col mb-1">
                            <b-form-select v-model="lang" :options="langOpt" class="mt-2 bg-secondary text-light" />
                        </b-col>
                        <b-button to="/login" class="mt-1" @click="logout" v-if="isAuthenticated">{{$t('SignOut')}}</b-button>
                    </div>

                    <div class="footer-copyright text-center bg-dark text-white py-3">
                        2020 -
                        <a href="https://reinder.eu/"> REINDER.EU</a>
                    </div>
                </template>
            </b-sidebar>

        </b-navbar>

        <!--MAIN MENU-->
        <b-col class="d-none d-sm-block mt-5 pt-5 px-5 " v-if="isAuthenticated">
            <b-navbar type="dark" class="py-0" variant="info">
                <b-navbar-nav class="mr-auto">
                    <b-nav-item class=" custom-nav-link navbar-brand my-0" v-if="isProfileLoaded" to="/tickets">{{$t('Tickets')}}</b-nav-item>
                    <b-nav-item class=" custom-nav-link navbar-brand my-0" v-if="isProfileLoaded" to="/createTicket">{{$t('CreateTicket')}}</b-nav-item>
                </b-navbar-nav>
            </b-navbar>
        </b-col>
    </div>
</template>

<script>
    import { mapGetters, mapState } from "vuex";
    import { AUTH_LOGOUT } from "actions/auth";
    import { TIKETS_REQUEST, TIKETTYPES_REQUEST } from "actions/tikets";

    export default {
        name: "navigation",
        data() {
            return {
                lang: localStorage.getItem("lang") || 'nl',
                langOpt: [
                    { value: 'en', text: 'EN' },
                    { value: 'nl', text: 'NL' }
                ]
            }
        },
        watch: {
            lang: function (value) {
                this.$i18n.locale = value;
                document.querySelector('html').setAttribute('lang', value);
                localStorage.setItem("lang", value);
            }
        },
        methods: {
            logout: function () {
                this.$store.dispatch(AUTH_LOGOUT).then(() => this.$router.push("/login"));
            },
            setI18nLanguage(lang) {
                this.$i18n.locale = lang;
                document.querySelector('html').setAttribute('lang', lang);
                localStorage.setItem("lang", lang);
                this.language = lang;
            }
        },

        computed: {
            ...mapGetters(["getProfile", "isAuthenticated", "isProfileLoaded"]),
            ...mapState({
                authLoading: state => state.auth.status === "loading",
                language: state => state.user.lang,
                name: state => `${state.user.profile.title} ${state.user.profile.name}`
            })
        }
    };
</script>

<style>
    #logo {
        position: absolute;
        background-repeat: no-repeat;
        background-position: 50% 50%;
        height: 123px;
        width: 123px;
        margin-top: 30px;
    }

        #logo a {
            height: 123px;
            width: 123px;
            display: block;
        }

    .facebook, .linkedin, .twitter {
        fill: white;
    }
</style>