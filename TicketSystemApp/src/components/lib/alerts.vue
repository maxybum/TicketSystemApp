<template>
    <div>

        <b-alert v-model="showSucsAlert" class="mt-4" variant="success" dismissible>
            {{$t('RequestWasSendedSuccessful')}}!
        </b-alert>

        <b-alert class="mt-4"
                 :show="dismissCountDown"
                 dismissible
                 variant="success"
                 @dismissed="dismissCountDown=0"
                 @dismiss-count-down="countDownChanged">
             {{$t('RequestWasSendedSuccessful')}}! 
            <!--<b-progress variant="success"
                        :max="dismissSecs"
                        :value="dismissCountDown"
                        height="4px"></b-progress>-->
        </b-alert>



        <b-alert v-model="showErrorAlert" class="mt-4" variant="danger" dismissible>
            {{$t('Error')}}
        </b-alert>

    </div>
</template>

<script>
    export default {
        name: "alerts",
        data() {
            return {
                showSucsAlert: false,
                showErrorAlert: false,

                dismissSecs: 7,
                dismissCountDown: 0,
            }
        },
        methods: {
            countDownChanged(dismissCountDown) {
                this.dismissCountDown = dismissCountDown
            },
            showSucs() {
                this.dismissCountDown = this.dismissSecs
                //this.showSucsAlert = true;
            },
            showErr() {
                this.showErrorAlert = true;
            },
            showAlert(alert) {
                if (alert == 'err')
                    this.showErr()
                if (alert == 'sucs')
                    this.showSucs()
            }
        },
        created: function () {
            this.$parent.$on('ShowAlert', this.showAlert);
        },
    }
</script>