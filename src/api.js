import axios from 'axios'


const URL = 'https://api.nobelprize.org/2.1/nobelPrizes'

// ?nobelPrizeYear=1908&yearTo=1910

const get = async () => {
    const config = {url:URL, method: 'GET', 
        headers: {
            // 'Access-Control-Allow-Origin': '*',
            // "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
            // accept: 'application/json'
    }}
    return await axios.request(config)
        .then(res => res.data)
}


export {get}