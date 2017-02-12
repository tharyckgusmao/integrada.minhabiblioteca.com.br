import request from 'request';
import fs from 'fs';




export function getPages(ebook, callback) {

    const URL_PAGES = "https://jigsaw.vitalsource.com/api/v0/books/" + ebook + "/pagebreaks";

    // let tunnelAgent = tunnel.httpsOverHttp({
    //     ca: [fs.readFileSync('charles-ssl-proxying-certificate.pem')],
    //     proxy: {
    //         host: '127.0.0.1',
    //         port: 8888
    //     }
    // });


    let jar = global.CookieLogin;

    let config = {
        uri: URL_PAGES,
        method: 'GET',
        jar: jar


    }

    request(config, (error, response, body) => {

        let data = JSON.parse(body);
         callback(data);

    });


}
