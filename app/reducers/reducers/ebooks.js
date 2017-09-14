import {
  EBOOKS_FEETCH_REQUEST,
  EBOOKS_FEETCH_SUCCESS,
  EBOOKS_FEETCH_FAILURE
} from '../../actions/types/ebooks';

const initialState = {
  'isGettingEbook': null,
  'isGettedEbook': null,
  'statusText': null,
  'status': null

}

export default function ebooks(state = initialState, action) {

  switch (action.type) {
    case EBOOKS_FEETCH_REQUEST:
    return Object.assign({}, state, {
      'isGettingEbook': true,
      'statusText': null
    });
    case EBOOKS_FEETCH_SUCCESS:
    return Object.assign({}, state, {
      'isGettingEbook': false,
      'isGettedEbook': true,
      'ebooks': action.payload.ebooks,
      'status':  action.payload.status,
      'statusText': 'Ebooks feetch success.'
    });
    case EBOOKS_FEETCH_FAILURE:
    return Object.assign({}, state, {
      'isGettingEbook': false,
      'isGettedEbook': false,
      'ebooks': null,
      'status':  action.payload.status,
      'statusText':  action.payload.statusText
    });
    default:

    return state;
  }

}
