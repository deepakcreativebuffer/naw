import constants from '../../enviroment/environment'

const get_destination = {
    'url': `${constants.api_url}/destinations/api/`,
    'typeRequest': 'get',
}

const get_terms = {
    'url': `${constants.api_url}/extras/api/terms/`,
    'typeRequest': 'get',
}

export default {
    get_destination,
    get_terms,
}