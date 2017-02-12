import request from 'request';
import fs from 'fs';
import cheerio from 'cheerio';
import async from 'async';
import { Spinner } from 'cli-spinner';


export function downloadEbook(ebook, pages, name, callback) {

    const URL_HOST = "https://jigsaw.vitalsource.com/api/v0/";

    let spinner = new Spinner('Construindo Data.. %s');

    spinner.setSpinnerString("⢹⢺⢼⣸⣇⡧⡗⡏");
    spinner.start();
    console.log('\n');

    let jar = global.CookieLogin;

    let config = {
        uri: URL_HOST,
        method: 'GET',
        jar: jar
    }


    fs.exists(name + '/', function(exists) {

        if (!exists) {
            fs.mkdir(name + '/');
        }

    });


    async.eachSeries(pages, (item, cb) => {



        config.uri = URL_HOST + item.url;

        request(config, (error, response, body) => {

            let $ = cheerio.load(body);
            let itemLink = $("#pbk-page").attr("src");
            let index = item.label;

            console.log('\x1b[32m', '    Baixando Pagina    ' + index + '\u2713', '\x1b[0m');

            config.uri = URL_HOST + itemLink +'jpeg';

            request(config, (error, response, body) => {

			    cb()
            }).pipe(fs.createWriteStream(name + '/' + name + "_" + index + '.jpeg'));




        });




    }, function(err) {

        spinner.stop();


        console.log('\x1b[31m', 'Download Concluido ...', '\x1b[0m');




    });


}
