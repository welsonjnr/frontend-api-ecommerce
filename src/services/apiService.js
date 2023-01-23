import axios from 'axios'

const httpClient = axios.create({
    baseURL: 'http://localhost:8080'
})

class ApiService{

    constructor(apiUrl){
        this.apiUrl = apiUrl;
    }

    post(url, object){
        return httpClient.post(url, object);
    }

    put(url, object){
        return httpClient.put(url, object);
    }

    delete(url){
        return httpClient.delete(url)
    }

    get(url){
        return httpClient.get(url)
    }
}

export default ApiService;