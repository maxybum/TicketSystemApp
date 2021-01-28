<template>
    <footer class="page-footer font-small bg-primary pt-4 text-white">

        <!-- Footer Links -->
        <div class="container-fluid text-center text-md-left">

            <!-- Grid row -->
            <div class="row">

                <!-- Grid column -->
                <div class="col-md-4 mt-md-0 mt-3">

                    <!-- Content -->
                    <h3>Reinder<span class="text-info">.eu</span></h3>
                    <p>{{$t('FooText1')}}</p>

                </div>

                <div class="col-md-2 mt-md-0 mt-3">

                    <!-- Content -->
                    <h4 class="text-primary">...</h4>
                    <address>
                        <p>
                            De Marne 118<br>8701 MC Bolsward<br>
                            <a class="text-light" href="tel:+31515227027">0515-227027</a>
                                <br>
                            <a class="text-light" href="mailto:info@reinder.eu">info@reinder.eu</a>
                        </p>
                    </address>

                </div>
                <!-- Grid column -->

                <hr class="clearfix w-100 d-md-none pb-3">

                <!-- Grid column -->
                <div class="col-md-3 mb-md-0 mb-3 text-center">

                    <!-- Links -->
                    <h4 class="text-md-left ml-3">Lid <span class="text-info">van</span></h4>

                    <b-row class="ml-0 justify-content-center text-md-left">
                        <div class="col-md-12">
                            <b-link href="https://dalti.nl/" class="text-light">
                                <span>{{$t('FooText2')}}</span>
                            </b-link>
                        </div>
                        <div class="col-md-12">
                            <img src="https://reinder.eu/images/logo-dalti.jpg" alt="" class="img-thumbnail mt-2" />
                        </div>
                    </b-row>

                </div>

                <!-- Grid column -->
                <div class="col-md-3 mx-0 text-center">

                    <!-- Links -->
                    <h4 class="mr-5">
                        Social
                        <span class="text-info">media</span>
                    </h4>

                    <ul class="list-unstyled">
                        <b-row class="justify-content-center">
                            <li class="mr-2">
                                <b-link href="https://www.facebook.com/reinder.eu">
                                    <div class="border border-info p-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="41" height="41" viewBox="0 0 24 24" class="facebook">
                                            <path d="M16.75,9H13.5V7a1,1,0,0,1,1-1h2V3H14a4,4,0,0,0-4,4V9H8v3h2v9h3.5V12H16Z"></path>
                                        </svg>
                                    </div>
                                </b-link>
                            </li>

                            <li class="mx-2">
                                <b-link href="https://twitter.com/reinderstolte">
                                    <div class="border border-info p-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="41" height="41" viewBox="0 0 24 24" class="twitter">
                                            <path opacity="0" d="M0 0h24v24H0z"></path>
                                            <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path>
                                        </svg>
                                    </div>
                                </b-link>
                            </li>

                            <li class="ml-2">
                                <b-link href="https://www.linkedin.com/company/reinder-eu">
                                    <div class="border border-info p-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="41" height="41" viewBox="0 0 24 24" class="linkedin">
                                            <rect height="11" width="4" x="3" y="9"></rect>
                                            <circle cx="5" cy="5" r="2"></circle>
                                            <path d="M16.5,8.25A4.47251,4.47251,0,0,0,13,9.95343V9H9V20h4V13a2,2,0,0,1,4,0v7h4V12.75A4.5,4.5,0,0,0,16.5,8.25Z"></path>
                                        </svg>
                                    </div>
                                </b-link>
                            </li>
                        </b-row>
                    </ul>

                </div>
                <!-- Grid column -->

            </div>
            <!-- Grid row -->

        </div>
        <!-- Footer Links -->
        <!-- Copyright -->
        <div class="footer-copyright text-center bg-dark py-3 mt-2">
            2020 - 
            <a href="https://reinder.eu/"> REINDER.EU</a>
        </div>
        <!-- Copyright -->

    </footer>
</template>

<style scoped>
</style>

<script>
    export default {
        name: "sqreen-footer"
    };
</script>
