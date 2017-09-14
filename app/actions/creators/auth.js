import {
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE
} from '../types/auth';

import {ebooksFeetchFeetch} from './ebooks';
import {default as rp}  from 'request-promise';
import cheerio from 'cheerio';

const URL_LOGIN = 'http://jigsaw.vitalsource.com/login';
const URL_TEST = 'https://jigsaw.vitalsource.com/books/9788536320250/epub/OPS/loc_002.xhtml';


export function loginUserRequest() {
  return {
    type: LOGIN_USER_REQUEST
  }
}


export function loginUserFailure(error) {
  return {
    type: LOGIN_USER_FAILURE,
    payload: {
      status: error.response.status,
      statusText: error.response.statusText
    }
  }
}


export function loginUserSuccess(payload) {
  return {
    type: LOGIN_USER_SUCCESS,
    payload: {
      cookie: payload.cookie,
      status: payload.response.message
    }
  }
}


export function loginUserFeetch(email, password) {
  return function(dispatch) {
    dispatch(loginUserRequest());

    let jar = rp.jar();


    return rp(URL_LOGIN)
    .then(response =>{
      let $ = cheerio.load(response);
      let token = $('meta[name=csrf-token]').attr("content");


      rp({
        form: {
          'user[email]': email,
          'user[password]': password,
          'authenticity_token': token
        },
        uri: URL_LOGIN,
        method: 'POST',
        simple: false,
        followRedirect: false,
        jar:jar

      })
      .then(response => {

        rp({
          uri: URL_TEST,
          jar:jar,
          resolveWithFullResponse: true,
          simple: false,
          followRedirect: false
        }).then((response)=>{


          if(response.statusCode != 302){

            dispatch(loginUserSuccess({
              response:{
                message: 'success'
              },
              cookie: jar
            }));

            // dispatch(ebooksFeetchFeetch(jar));


          }else{

            dispatch(loginUserFailure({
              response: {
                status: 'invalid_credentials',
                statusText: 'invalid_credentials'
              }
            }))

          }


        })

      })
      .catch(error => {
        dispatch(loginUserFailure({
          response: {
            status: 'invalid_credentials',
            statusText: 'invalid_credentials'
          }
        }));
      })

    })
  }
}
