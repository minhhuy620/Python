import axios from "axios";

let API_URL =process.env.API_URL ? process.env.API_URL:"https://127.0.0.1:8000/";

export async function callApi(endpoint, method = "GET", body) {
    const cookieValue = document.cookie.split('; ').find(row => row.startsWith('Bearer')).split('=')[1];
    let res = await axios({
        method,
        headers: {
            'Authorization': cookieValue,
            'Content-Type': 'application/json'
        },
        url: `${API_URL}/${endpoint}`,
        data: body,
    })
        .then(function (response) { return response })
        .catch(function (error) {
            if (error.response?.status == 401) {
                console.log(error);
            }
        })
    return res
}

export function LOGIN(endpoint) {
    return callApi(endpoint, "GET");
}