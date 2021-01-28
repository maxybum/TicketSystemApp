<template>

    <b-container class="mt-1">
        
        <div class="headline">

            <h1>{{$t('Yourprofile')}}</h1>
        </div>

        <div v-if="profile">
            <b-tabs content-class="mt-3">
                <b-tab :title="$t('Profile')" active>
                    <div>
                        <strong>{{$t('Name')}}:</strong> {{ profile.username }}
                    </div>
                    <div>
                        <strong>{{$t('Email')}}:</strong> {{ profile.email }}
                    </div>
                    <div>
                        <strong>{{$t('ClientName')}}:</strong> {{ profile.clientname }}
                    </div>
                    <div>
                        <strong>{{$t('Role')}}:</strong> {{ profile.userrole }}
                    </div>
                    <div>
                        <strong>{{$t('YourId')}}:</strong> {{ profile.userid }}
                    </div>
                    <!--<div>
                        <strong>profile:</strong> {{ profile }}
                    </div>-->
                </b-tab>
                <b-tab :title="$t('Company')">

                    <div>
                        <strong>{{$t('Company')}} Id:</strong> {{ details.companyId }}
                    </div>

                    <!--<strong>details:</strong>
                    {{ details }}-->
                </b-tab>
            </b-tabs>
        </div>

    </b-container>
</template>

<script>
    import { mapState } from "vuex";

    export default {
        name: "account",
        computed: {
            ...mapState({ profile: state => state.user.profile }),
            ...mapState({ details: state => state.user.details })
        }
    };
</script>