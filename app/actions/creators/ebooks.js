
import {
  EBOOKS_FEETCH_REQUEST,
  EBOOKS_FEETCH_SUCCESS,
  EBOOKS_FEETCH_FAILURE
} from '../types/ebooks';

import {default as rp}  from 'request-promise';

const URL_EBOOKS = "https://jigsaw.vitalsource.com/books?order=recent&per_page=:page&offset=:offset&eager=true"

export function ebooksFeetchRequest() {
  return {
    type: EBOOKS_FEETCH_REQUEST
  }
}


export function ebooksFeetchFailure(error) {
  return {
    type: EBOOKS_FEETCH_FAILURE,
    payload: {
      status: error.response.status,
      statusText: error.response.statusText
    }
  }
}


export function ebooksFeetchSuccess(payload) {
  return {
    type: EBOOKS_FEETCH_SUCCESS,
    payload: {
      ebooks: payload.ebooks,
      status: payload.response.message
    }
  }
}


export function ebooksFeetchFeetch(jar) {
  return function(dispatch) {

    dispatch(ebooksFeetchRequest());

    return rp({
      uri:URL_EBOOKS.replace(':page','25').replace(':offset','0'),
      jar:jar
    })
    .then(response =>{

      let arrayEbooks = [];
      let data = JSON.parse(response);
      let l = data.total- 25;

      console.log(data);

      let info = Array(Math.ceil(l/1000)).fill(0).map((el,index)=>{
        let off = l - 1000*index;
        return {
          'page': 1000 ,
          'offset': off
        }
      });

      Promise.all(info.map((el)=>{

        return rp({
          uri:URL_EBOOKS.replace(':page',el.page).replace(':offset',el.off),
          jar:jar
        })
        .then(response =>{
          console.log(response);

          let d2 = JSON.parse(response);
          arrayEbooks.push(d2);

        });


      })).then(()=>{

        dispatch(ebooksFeetchSuccess({
          response:{
            message: 'success'
          },
          ebooks: arrayEbooks
        }));

      })



    })
    .catch(error => {
      console.log(error);
      dispatch(ebooksFeetchFailure({
        response: {
          status: 'Ebooks_failed',
          statusText: 'Ebooks_failed'
        }
      }));
    })

  }
}
