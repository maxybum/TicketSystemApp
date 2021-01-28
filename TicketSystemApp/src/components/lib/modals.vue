<template>
    <div>

        <b-modal id="successModal" centered hide-header hide-footer>
            <div class="d-block text-center text-success">
                <h3>{{$t('Success')}}!</h3>
            </div>
            <b-button class="mt-3" block to="/">{{$t('Back')}}</b-button>
        </b-modal>

        <b-modal id="errModal" centered hide-header hide-footer>
            <div class="d-block text-center text-danger">
                <h3>{{$t('Error')}}!</h3>
            </div>
            <b-button class="mt-3" block to="/">{{$t('Back')}}</b-button>
        </b-modal>

    </div>
</template>

<script>
    export default {
        name: "alerts",
        data() {
            return {
                showSucsAlert: false,
                showErrorAlert: false,
            }
        },
        methods: {
            showSucs() {
                this.$bvModal.show('successModal');
            },
            showErr() {
                this.$bvModal.show('errModal');
            },
            showModal(type) {
                if (type == 'err')
                    this.showErr()
                if (type == 'sucs')
                    this.showSucs()
            }
        },
        created: function () {
            this.$parent.$on('ShowModal', this.showModal);
        },
    }
</script>