import {baseURL} from "./config";

export async function doPost(url = '', data = {}) {

    const response = await fetch(`${baseURL}${url}`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return await response.json(); // parses JSON response into native JavaScript objects
}
