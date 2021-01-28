<template>
    <b-breadcrumb :items="items" v-if="show">

    </b-breadcrumb>
</template>

<script>
    export default {
        name: "breadcrumbs",
        props: {},
        components: {},
        watch: {
            items: function () {
                if (this.items.lenght == 0)
                    this.show = false
                else this.show = true
            },
            '$route.path': function (value) {
                console.log("route value", value.split('/'));

                var crumb = value.split('/').map((e) => {
                    var buf = {};

                    if (e != "") {
                        buf.text = this.$t(e);
                        buf.to = '/' + e;
                        return buf
                    }

                })

                crumb.unshift({
                    text: this.$t('Home'),
                    to: '/',
                });

                var filtered = crumb.filter(function (el) {
                    return el != null;
                });

                this.items = filtered;
                console.log('ITEMS', filtered);
            }
        },
        data() {
            return {
                show: false,
                items: []
            }
        }
    }
</script>