import axios from 'axios';
import store from '../store';

const headers = {
    axiosBaseUrl: "https://12001.tripserver.nl/"
};

const apiCall = ({ url, data, method }) =>
    new Promise((resolve, reject) => {

        var token = store.state.auth.token;
        if (token)
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;

        axios.defaults.baseURL = headers.axiosBaseUrl;
        try {
            if (method == "GET") { resolve(axios.get(url)); }
            if (method == "POST") { resolve(axios.post(url, data)); }
        } catch (err) {
            reject(new Error(err));
        }

    });

export default apiCall;
