import {
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE
} from '../../actions/types/auth';

const initialState = {
  'isAuthenticating': null,
  'isAuthenticated': null,
  'statusText': null,
  'status': null

}

export default function auth(state = initialState, action) {

  switch (action.type) {
    case LOGIN_USER_REQUEST:
    return Object.assign({}, state, {
      'isAuthenticating': true,
      'statusText': null
    });
    case LOGIN_USER_SUCCESS:
    return Object.assign({}, state, {
      'isAuthenticating': false,
      'isAuthenticated': true,
      'cookie': action.payload.cookie,
      'status':  action.payload.status,
      'statusText': 'Login efetuado com sucesso.'
    });
    case LOGIN_USER_FAILURE:
    return Object.assign({}, state, {
      'isAuthenticating': false,
      'isAuthenticated': false,
      'cookie': null,
      'status':  action.payload.status,
      'statusText':  action.payload.statusText
    });
    default:

    return state;
  }

}
