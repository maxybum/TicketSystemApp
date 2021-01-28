<template>
    <b-card class="mt-3 col-md-12 text-center">

        <loading v-if="!isloadedOnes || !ifNewTicketLoading" />
        <div v-if="isloadedOnes && ifNewTicketLoading">

            <b-col class="d-flex justify-content-between">

                <h2>{{$t('TicketDetails')}}</h2>
                <div>
                    <b-button class="mb-2 mx-2 btn-refresh-fixed-right" @click="refreshMessages" variant="primary">
                        <b-icon icon="arrow-repeat"></b-icon>
                    </b-button>
                </div>
            </b-col>

            <b-card>
                <b-card>

                    <b-badge class="badge-right" pill :variant="badgeVariant"><h6 class="mt-1">{{details.ticketDetails.fkticketStatusId.ticketStatusName}}</h6></b-badge>
                    <div class="name-stamp-left">Sender: {{ details.ticketDetails.fkticketSenderId.relationName }}</div>
                    <div class="message-timestamp-left">{{ details.ticketDetails.ticketDate | moment("dddd, MMMM Do YYYY")}}</div>

                    <b-row class="mt-4">
                        <b-col md="4" class="text-left font-weight-bold">{{$t('TicketType')}}:</b-col>
                        <b-col class="text-left">{{details.ticketDetails.fkticketTypeId.ticketTypeName}}</b-col>
                    </b-row>

                    <b-row>
                        <b-col md="4" class="text-left font-weight-bold">{{$t('TicketHeader')}}:</b-col>
                        <b-col class="text-left">{{details.ticketDetails.ticketHeader}}</b-col>
                    </b-row>
                    <b-row class="mb-2">
                        <b-col md="4" class="text-left font-weight-bold">{{$t('Message')}}:</b-col>
                        <b-col class="text-left">{{details.ticketDetails.ticketBody}}</b-col>
                    </b-row>
                </b-card>


                <!-- REPLIES -->
                <b-card-group deck v-for="item in getMappedMessages" :key="item.ticketMessageId">

                    <b-card class="col-md-6 mt-4 ml-auto bg-light message-right"
                            :title="item.ticketMessageSubject"
                            align="right"
                            v-if="item.fkticketMessageTypeId.tikcketMessageTypeName == 'INBOUND'">
                        <b-card-text>
                            {{ item.ticketMessageText }}
                        </b-card-text>

                        <div class="message-timestamp-right">{{ item.ticketMessageDate | moment("dddd, MMMM Do YYYY")}}</div>


                        <div class="name-stamp-left">{{ item.SenderName }}</div>

                    </b-card>

                    <b-card class="col-md-6 mt-4 mr-auto bg-light message-left "
                            :title="item.ticketMessageSubject"
                            align="left"
                            v-if="item.fkticketMessageTypeId.tikcketMessageTypeName == 'OUTBOUND'">
                        <b-card-text>
                            {{ item.ticketMessageText }}
                        </b-card-text>

                        <div class="message-timestamp-left">{{ item.ticketMessageDate | moment("dddd, MMMM Do YYYY")}}</div>


                        <div class="name-stamp-right">{{ item.SenderName }}</div>

                    </b-card>

                </b-card-group>

                <div class="mt-2">
                    <!--CREATE MESSAGE-->
                    <b-button v-b-toggle.sendReply v-if="ifSendAllowed && !isTicketClosed" class="mt-2">Create message</b-button>
                    <b-alert variant="warning" class="mt-2" show v-if="!ifSendAllowed">{{ $t('MoreThan20MesAlert') }}</b-alert>
                    <b-alert variant="warning" class="mt-2" show v-if="isTicketClosed">{{ $t('TicketClosedAlert') }}</b-alert>

                    <b-collapse id="sendReply" v-if="ifSendAllowed && !isTicketClosed" class="mt-2 ">
                        <b-row class="justify-content-center">

                            <b-card bg-variant="light w-100 mx-5">

                                <loading v-if="isMesSending" />
                                <b-form class="text-left" @submit.prevent="send " v-if="!isMesSending">

                                    <label for="ticketMessageSubject">{{$t('MessageSubject')}}</label>
                                    <b-input v-model="ticketMessageSubject" id="ticketMessageSubject" required></b-input>

                                    <label for="ticketMessageText">{{$t('Message')}}</label>
                                    <b-textarea v-model="ticketMessageText" id="ticketMessageText" required></b-textarea>

                                    <div class="justify-content-center mt-2">
                                        <b-button type="reset">{{$t('Reset')}}</b-button>
                                        <b-button type="submit" variant="info" class="ml-2">{{$t('Send')}}</b-button>
                                    </div>
                                </b-form>
                            </b-card>
                        </b-row>
                    </b-collapse>
                </div>
            </b-card>
        </div>
        <alerts></alerts>
        <modals></modals>
    </b-card>
</template>


<script>
    import { mapState, mapGetters } from "vuex";
    import { CREATEMESSAGE_REQUEST } from "actions/createMessage";
    import { TICKETDETAILS_REQUEST } from "actions/ticketDetails";
    import { RELATIONS_REQUEST } from "actions/relations";

    export default {
        name: "ticketDetails",
        props: {},
        data() {
            return {
                ticketMessageSubject: null,
                ticketMessageText: null,
                typeId: null
            };
        },
        methods: {
            send: function () {
                const { ticketMessageSubject, ticketMessageText } = this;

                var data = {
                    ticketId: this.details.ticketDetails.ticketId,
                    ticketMessageTypeId: 1,
                    ticketMessageDate: new Date(),
                    ticketMessageSubject,
                    ticketMessageText,
                    senderData: {
                        messageId: null,
                        recipentAddress: this.getRelations.relationMail,
                        recipentName: this.getRelations.relationName,
                        recipentContactId: this.getRelations.relationAddressId,
                        recipentIsMain: true,
                        recipentIsSender: true,
                    }
                };

                this.$store.dispatch(CREATEMESSAGE_REQUEST, data).then(() => {
                    this.ticketMessageSubject = null;
                    this.ticketMessageText = null;
                    this.typeId = null;
                });
            },
            refreshMessages: function () {
                const data = { id: this.details.ticketDetails.ticketId, user: this.getProfile.username }
                console.log(data.id, this.getProfile.username);
                this.$store.dispatch(TICKETDETAILS_REQUEST, { ticketId: data.id, user: data.user })
            },
            CheckStatus: function (mesSenderReqCode) {
                if (this.statusCodes.createTicketReq == 200 && mesSenderReqCode == 200) {
                    this.$emit('ShowAlert', 'sucs');
                    this.refreshMessages();
                 // this.$emit('ShowModal', 'sucs');
                }
                if (this.statusCodes.createTicketReq == 500 || mesSenderReqCode == 500) {
                    this.$emit('ShowAlert', 'err');
                    this.$emit('ShowModal', 'err');
                }
            }
        },
        watch: {
            'statusCodes.mesSenderReq': function (value) {
                this.CheckStatus(value);
            }
        },
        mounted: function () {
            console.log(this.$route.params);
            this.$store.dispatch(TICKETDETAILS_REQUEST, { ticketId: this.$route.query.ticketId, user: this.getProfile.username });
            this.$store.dispatch(RELATIONS_REQUEST, { relarionId: this.getProfile.relarionId });
        },
        computed: {
            ...mapState({ details: state => state.ticketDetails }),
            ...mapState({ statusCodes: state => state.createMessage.statusCodes }),
            ...mapState({ createMes: state => state.createMessage }),
            ...mapGetters(["getSelectOptions", "getProfile", "getMappedMessages", "getRelations"]),
            loading: function () {
                return this.details.status === "loading";
            },
            badgeVariant: function () {
                if (this.isTicketClosed)
                    return "warning"
                else return "primary"
            },
            isloadedOnes: function () {
                return this.details.isLoadedOnes
            },
            ifNewTicketLoading: function () {
                var flag = this.details.idLoadingNow == this.details.idLoadedBefore;
                if (flag)
                    return true
                else return false
            },
            ifSendAllowed: function () {
                if (this.details.ticketDetails.list_ManTicketMessage_TicketId.length >= 20)
                    return false;
                return true;
            },
            isMesSending: function () {
                return this.createMes.status === "loading";
            },
            isTicketClosed: function () {
                return this.details.ticketDetails.fkticketStatusId.ticketStatusId > 5
            },
            reqStatus: function () {
                if (this.details.status === "success") {

                    return true;
                }
                else return false;
            }
        },
    };
</script>
