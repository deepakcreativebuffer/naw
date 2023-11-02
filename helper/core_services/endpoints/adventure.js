import constants from '../../enviroment/environment'

    
console.log("constants.api_url >>", constants.api_url)

const get_categories = {
    'url': `${constants.api_url}/adventures/api/category/`,
    'typeRequest': 'get',
}

const get_adventure_type = {
    'url': `${constants.api_url}/adventures/api/adventure_types`,
    'typeRequest': 'get'
}

const get_adventure_popular = {
    'url': `${constants.api_url}/adventures/api/featured_adventures/`,
    'typeRequest': 'get'
}

const get_adventure_search = {
    'url': `${constants.api_url}/adventures/api/search_adventures/`,
    'typeRequest': 'get'
}

const get_adventure_detail = {
    'url': `${constants.api_url}/adventures/api/adventures/#`,
    'typeRequest': 'get'
}

const get_adventure_similar = {
    'url': `${constants.api_url}/adventures/api/adventures/#/similar/`,
    'typeRequest': 'get'
}

const post_adventure_date = {
    'url': `${constants.api_url}/adventures/api/adventure_date/`,
    'typeRequest': 'post'
}

const get_extras = {
    'url': `${constants.api_url}/extras/api/extras/`,
    'typeRequest': 'get'
}

const get_pics_carousel = {
    'url': `${constants.api_url}/adventures/api/carousel`,
    'typeRequest': 'get'
}

export default {
    get_categories,
    get_adventure_type,
    get_adventure_popular,
    get_adventure_search,
    get_adventure_detail,
    get_adventure_similar,

    post_adventure_date,
    get_extras,
    get_pics_carousel
}