import request from 'request';
import cheerio from 'cheerio';

const URL_LOGIN = 'http://jigsaw.vitalsource.com/login';

export function login(username=null, password=null,callback) {

	 let jar = request.jar();

    let config = {
        form: {
            'user[email]': username,
            'user[password]': password,
            'authenticity_token': null
        },
        uri: URL_LOGIN,
        method: 'POST',
        jar:jar

    }
    request.get(URL_LOGIN, (error, response, body) => {

        let $ = cheerio.load(body);
        let token = $('meta[name=csrf-token]').attr("content");

        console.log('\x1b[31m', 'Efetuando Login ...' ,'\x1b[0m');
        console.log('\n');

		config.form.authenticity_token = token



    	request(config, (error, response, body) => {

       		  global.CookieLogin = jar;


      		  console.log('\x1b[32m', 'Login Efetuado \u2713' ,'\x1b[0m');
      		  console.log('\n');

  			  callback();

  		 })



    })





}
