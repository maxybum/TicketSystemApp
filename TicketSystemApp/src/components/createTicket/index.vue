<template>
    <b-container>
        <b-row class="justify-content-center">

            <h1 class="ml-3"  v-if="!loading">{{$t('Createnewticket')}}:</h1>
            
            <loading v-if="loading" />

            <b-card bg-variant="light w-75 mt-3" v-if="!loading">

                <b-form @submit.prevent="send">

                    <label for="topicId"><b-icon-check-circle class="mr-2" />{{$t('Topic')}}:</label>
                    <b-form-select id="topicId"
                                   v-model="topicId"
                                   :options="getSelectOptions"
                                   :plain = "true"
                                   required></b-form-select>


                    <label for="ticketHeader" class="mt-3"><b-icon-chat-quote class="mr-2" />{{$t('Subject')}}:</label>
                    <b-input v-model="ticketHeader" id="ticketHeader" required></b-input>

                    <label for="ticketBody" class="mt-3"><b-icon-inbox-fill class="mr-2" />{{$t('Message')}}</label>
                    <b-textarea style="height:130px" v-model="ticketBody" id="ticketBody" required></b-textarea>

                    <div class="justify-content-center mt-2">
                        <b-button to="/">{{$t('Back')}}</b-button>
                        <b-button type="submit" variant="info" class="ml-2">{{$t('Send')}}</b-button>
                    </div>
                </b-form>
            </b-card>
        </b-row>

        <alerts></alerts>
        <modals></modals>
    </b-container>

</template>


<script>
    import { mapState, mapGetters } from "vuex";
    import { CREATETICKET_REQUEST } from "actions/createTicket";
    import { TIKETS_REQUEST } from "actions/tikets";

    export default {
        name: "createTicket",
        data() {
            return {
                topicId: null,
                ticketHeader: null,
                ticketBody: null,
                isReqSending: false
            };
        },
        computed: {
            ...mapGetters(["getSelectOptions", "getCreateTicketStatus", "getProfile", "ticketsStatus"]),
            ...mapState({ statusCode: state => state.createTicket.statusCode }),
            loading: function () {
                return this.ticketsStatus === "loading";
            },
        },
        watch: {
            statusCode: function (value) {
                this.CheckStatus(value);
            }
        },
        methods: {
            send: function () {

                const { topicId, ticketHeader, ticketBody } = this;
                console.log(topicId);

                this.$store.dispatch(CREATETICKET_REQUEST, {
                    topicId,
                    ticketStatusId: 1,
                    ticketTypeId: 1,
                    ticketDate: new Date(),
                    ticketHeader,
                    ticketBody,
                    ticketSenderId: this.getProfile.relationId
                });
            },
            CheckStatus: function (code) {
                if (code == 200) {
                    this.$emit('ShowAlert', 'sucs');
                    this.tickets();
                  //  this.$emit('ShowModal', 'sucs');
                }
                if (code == 500) {
                    this.$emit('ShowAlert', 'err');
                    this.$emit('ShowModal', 'err');
                }
            },
            tickets: function () {
                this.$store.dispatch(TIKETS_REQUEST, this.getProfile.relationId).then(() => {
                    this.$router.push("/tickets");
                });
            },
        }
    };
</script>
