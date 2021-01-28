<template>
    <b-container fluid>
        <b-row class="justify-content-center">
            <b-form @submit.prevent="login">
                <h1>{{$t('SignIn')}}</h1>
                <label for="userName">{{$t('UserName')}}</label>
                <b-input v-model="username" :state="validationName" id="userName"></b-input>
                <div class="invalid-feedback d-block" v-if="validationName == false">
                    {{$t('InvalidUserName')}}
                </div>
                <div class="valid-feedback d-block" v-if="validationName">
                    {{$t('LooksGood')}}
                </div>

                <label for="password">{{$t('')}}Password</label>
                <b-input type="password" v-model="password" :state="validationPass" id="password"></b-input>
                <div class="invalid-feedback d-block" v-if="validationPass == false">
                    {{$t('InvalidPassword')}}
                </div>
                <div class="valid-feedback d-block" v-if="validationPass">
                    {{$t('LooksGood')}}
                </div>
                <div class="justify-content-center mt-3">
                    <b-button href="https://reinder.eu/" variant="success">{{$t('BackReinder')}}</b-button>
                    <b-button class="ml-2" type="submit" :disabled="!btnVisibility" :variant="btnColor">{{$t('Login')}}</b-button>
                </div>
            </b-form>
        </b-row>
    </b-container>
</template>


<script>
    import { AUTH_REQUEST } from "actions/auth";

    export default {
        name: "login",
        data() {
            return {        
                username: "",
                password: ""
            };
        },
        computed: {
            validationName() {
                if (this.username == "")
                    return null

                return this.username.length > 4 && this.username.length < 13
            },
            validationPass() {
                if (this.password == "")
                    return null

                return this.password.length > 8 && this.password.length < 20
            },
            btnVisibility() {
                if (this.validationName && this.validationPass)
                    return true;
                else return false;
            },
            btnColor() {
                if (this.validationName && this.validationPass)
                    return "primary";
                else return "secondary";
            }
        },
        methods: {
            login: function () {
                const { username, password } = this;
                this.$store.dispatch(AUTH_REQUEST, { username, password }).then(() => {
                    this.$router.push("/");
                });
            }
        }
    };
</script>
