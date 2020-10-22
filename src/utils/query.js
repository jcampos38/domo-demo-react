import axios from 'axios';
axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.request.use((request) => {
    request.headers.common.Accept = 'application/json';
    return request;
}, (error) => Promise.reject(error));

export default function query(
    {
        endpoint,
        data = null,
        method = 'POST',
        headers = {},
        opts = { retry: true },
        type = 'json',
        params = {}
    }) {
    const requestObj = {
        method,
        url: endpoint,
        withCredentials: false,
        retry: opts.retry,
        headers: {
            'Content-Type': 'application/json',
            ...headers
        },
        data,
        params,
        responseType: type
    };
    return axios(requestObj);
}