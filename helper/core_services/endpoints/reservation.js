import constants from '../../enviroment/environment'

const post_reservation = {
    'url': `${constants.api_url}/reservations/api/reservation/`,
    'typeRequest': 'post',
}

const post_reservation_pay = {
    'url': `${constants.api_url}/reservations/api/reservation/#/pay/`,
    'typeRequest': 'post',
}

const post_contact = {
    'url': `${constants.api_url}/contact/api/message/`,
    'typeRequest': 'post',
}

const post_subcribe = {
    'url': `${constants.api_url}/users/api/subscribe/`,
    'typeRequest': 'post',
}

export default {
    post_reservation,
    post_reservation_pay,
    post_contact,
    post_subcribe
}