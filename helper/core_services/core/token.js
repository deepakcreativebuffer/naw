import 'isomorphic-fetch'
import axios from 'axios';

export default function token_request() {
    
    return fetch('https://naw.mx/adventures/api/adventure_types',{
        method: 'GET', // or 'PUT'
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
      })
    .then(res => {
        var data = res.json()
        console.log(data)
        return data;
    })
    .catch(error => console.error('Error:', error))
}