const initialState = {
    valueLanguage: 'es'
};

function language(state = initialState, action) {
    var newState = Object.assign({}, state);
    switch ( action.type ){
        case 'STATE_LANGUAGE':
            newState.valueLanguage = action.stateLanguage;
            return newState;
        default:
            return state;
    }
};
  

export default language;