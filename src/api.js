import axios from 'axios'


const URL = 'https://api.nobelprize.org/2.1/'


const getPrizes = async (params) => {
    const config = {
        url:URL+'nobelPrizes',
        method: 'GET', 
        params,
    }
    return await axios.request(config)
        .then(res => res.data)
}

const getLaureates = async (params) => {
    const config = {
        url:URL+'laureates',
        method: 'GET', 
        params,
    }
    return await axios.request(config)
        .then(res => res.data)
}


export {getPrizes,getLaureates}