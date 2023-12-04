export async function postData(url, data, token=''){
    let headers = {'Content-Type': 'application/json'}
    if(token){
        headers['Authorization'] = `Bearer ${token}`
    }

    const response = await fetch(url,
        {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data),
        }
    )
    return response
}


export async function putData(url, data, token=''){
    let headers = {'Content-Type': 'application/json'}
    if(token){
        headers['Authorization'] = `Bearer ${token}`
    }

    const response = await fetch(url,
        {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(data),
        }
    )
    return response
}


export async function getData(url, token=''){
    let headers = {'Content-Type': 'application/json'}
    if(token){
        headers['Authorization'] = `Bearer ${token}`
    }
    const response = await fetch(url,
        {
            method: 'GET',
            headers: headers,
        }
    )
    return response
}
