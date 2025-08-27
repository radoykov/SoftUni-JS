export async function proFetch(url, method = 'get', body = {}, token = null, isItLogout = false) {
    const headers = {
        'Content-Type': 'application/json',
    }
    if (token != null && token != undefined) {
        headers['X-Authorization'] = token;
    }
    const obj = {
        method: method,
        headers: headers,
    };
    if (Object.keys(body).length > 0) {
        obj['body'] = JSON.stringify(body);
    }
    const response = await fetch(url, obj);
    if (response.ok == false) {
        alert(`Error in fetch : ${response.statusText}`);
        return;
    }
    if (isItLogout) {
        return;
    }
    const data = await response.json();
    return data;
}
