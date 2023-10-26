import constants from '../../enviroment/environment'

const get_landing1 = {
    'url': `${constants.api_url}/landings/api/buceo-en-cancun/`,
    'typeRequest': 'get',
}

const get_landing2 = {
    'url': `${constants.api_url}/landings/api/buceo-en-cozumel/`,
    'typeRequest': 'get',
}

const get_landing3 = {
    'url': `${constants.api_url}/landings/api/buceo-en-playa-del-carmen/`,
    'typeRequest': 'get',
}

export default {
    get_landing1,
    get_landing2,
    get_landing3
}