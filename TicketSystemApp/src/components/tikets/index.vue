<template>
    <b-container>
        <div class="row text-center">
            <div class="col-12">
                <loading v-if="!reqStatus" />
                <div v-if="reqStatus">

                    <b-col class="d-flex flex-row-reverse">
                        <b-row>
                            <b-col>{{$t('ShowClosedTickets')}}:</b-col>
                            <toggle-button color="#4d82b8" :value="showClosed" @input="updateShow">Hey</toggle-button>
                        </b-row>
                    </b-col>

                    <b-table striped hover :filter="filter" :filterIncludedFields="filterOn" :busy.sync="isBusy" :items="getTickets" :fields="fields">

                        <template v-slot:cell(ticketHeader)="data">
                            <b-link @click="linkClick(data.item.ticketId)"> {{ data.value }}</b-link>
                        </template>

                        <template  v-slot:cell(ticketBody)="data">
                            <b-link @click="linkClick(data.item.ticketId)">  {{ data.value }}</b-link>
                        </template>

                        <template v-slot:cell(ticketDate)="data">
                            {{ data.value | moment("dddd, MMMM Do YYYY") }}
                        </template>

                    </b-table>

                </div>
            </div>
        </div>
    </b-container>
</template>


<script>
    import { mapState, mapGetters } from "vuex";
    import { TICKETDETAILS_REQUEST } from "actions/ticketDetails";
    import { TIKETS_REQUEST, TICKETS_TOGGLE } from "actions/tikets";

    export default {
        name: "tickets",
        data() {
            return {
                isBusy: false,
                filterOn: ['ticketStatusId'],
                filter: null,
                fields: [
                    {
                        key: 'ticketId',
                        sortable: true,
                        label: this.$t('TicketId'),
                    },
                    {
                        key: 'TicketType',
                        sortable: false,
                        label: this.$t('Type'),
                        class: 'd-none d-sm-table-cell'
                    },
                    {
                        key: 'ticketHeader',
                        sortable: true,
                        label: this.$t('Subject'),
                    },
                    {
                        key: 'ticketBody',
                        sortable: true,
                        label: this.$t('Message'),
                        class: "d-none d-sm-table-cell"
                    },
                    {
                        key: 'ticketDate',
                        sortable: true,
                        label: this.$t('Date'),
                        class: "d-none d-sm-table-cell"
                    },
                    {
                        key: 'TicketStatusName',
                        sortable: true,
                        label: this.$t('Status'),
                    }]
            }
        },
        mounted() {
            this.$store.dispatch(TIKETS_REQUEST, this.getProfile.relationId).then((data) => {
                console.log('TIKETS_REQUEST: store was updated');
            });
        },
        methods: {
            updateShow(toggle) {
                this.$store.dispatch(TICKETS_TOGGLE, toggle);
            },
            linkClick: function (id) {
                if (console) console.log(id, this.getProfile.username);            
                this.$router.push({ path: "tickets/ticketDetails", query: { ticketId: id } });
            }
        },
       
        computed: {
            ...mapGetters(["getProfile"]),
            ...mapGetters(["getTickets"]),
            ...mapGetters(["ticketsStatus"]),
            ...mapGetters(["getSelectOptions"]),
            ...mapState({ showClosed: state => state.tikets.showClosed, token: state => state.auth.token }), //map state example
            //tst: { //computed prop example 
            //    get: function () {
            //        var s = this.$store.state;
            //        return 'wefllewrjker';
            //    }
            //},
            loading: function () {
                return this.tiketsStatus === "loading";
            },
            reqStatus: function () {
                if (this.ticketsStatus === "success") {

                    return true;
                }
                else return false;
            }
        }
    };
</script>
