import React,{Component} from 'react';
import Styles from './styles/styles.css';
import Loading from '../loading/LoadingComponent';
import request from 'requestretry';
import cheerio from 'cheerio';
import fs from 'fs';
import async from 'async';
import { remote } from 'electron';
import {convert} from '../../utils/convert.js';
import resizer from 'resizer';


const URL_HOST = "https://jigsaw.vitalsource.com/api/v0/";

export default class EbookItemComponent extends Component{

  constructor(props){
    super(props);
    this.state = {
      loadingImg : true,
      statusText : 'Carregando Imagem...',
      statusTextDl : 'Carregando Crawl...',
      downloading: false,
      complete:false,
      percent:0,
      pages:[]

    }
  }

  _handleImageLoaded = ()=>{

    this.setState({
      loadingImg: false
    })



  }


  _test = () =>{

    convert("PDF",'/run/media/thaka/Backup/Empresa/Projetos/lab/bibliotecaFumecV2/livros/9788520453339','teste',()=>{});

  }

  _handlerDownloadEbook =()=>{
     if (this.props.data.format == 'pbk'){

       let URL_PAGES = URL_HOST + "books/" + this.props.data.isbn + "/pagebreaks";

       let folderPath ;
       let self = this ;

       remote.dialog.showOpenDialog({
         title: "Selectione a Pasta de destino!!",
         properties: ["openDirectory"]
       }, (folderPaths)=> {

         if (folderPaths === undefined) {
           console.log("No destination folder selected");
           return;
         } else {
           folderPath = folderPaths[0];

           if(fs.existsSync(folderPath + '/'+ self.props.data.isbn) == false){
             fs.mkdirSync(folderPath + '/'+ self.props.data.isbn);
           };

           if(fs.existsSync(folderPath + '/'+ self.props.data.isbn+'/temp') == false){
             fs.mkdirSync(folderPath + '/'+ self.props.data.isbn+'/temp');

           };

           this.setState({
             downloading:true
           },()=>{


             let jar = self.props.auth.cookie;

             request({
               uri: URL_PAGES,
               jar: jar,
               maxAttempts: 5,
               retryDelay: 5000,
               retryStrategy: request.RetryStrategies.HTTPOrNetworkError
             },(err,response,body) => {
               let data = JSON.parse(body);

               self.setState({
                 pages: data,
                 statusTextDl : 'Carregando Paginas...',
               },()=>{

                 let l = data.length;
                 let lSplit = data.length/3;

                 let d1 = data.slice(0,Math.floor(lSplit));
                 let d2 = data.slice(lSplit, lSplit*2 );
                 let d3 = data.slice(lSplit*2, l);


                 let percent = 0;

                 Promise.all([
                   self._downloadPages(d1,folderPath),
                   self._downloadPages(d2,folderPath),
                   self._downloadPages(d3,folderPath)
                 ]).then(()=>{

                   self.setState({
                     downloading:true,
                     statusTextDl : 'Convertendo Paginas...',
                   },()=>{

                     convert('PDF',folderPath+ '/'+ self.props.data.isbn,self.props.data.title,()=>{

                       self.setState({
                         downloading:true,
                         complete:true,
                         statusTextDl : 'Download Concluido...',
                       })

                     })


                   });

                 })

               })
             });
           })
         }
       });

     }
  }

  _downloadPages(data,folderPath){

    let self = this;
    let jar = self.props.auth.cookie;

    return new Promise((resolve)=>{


      async.eachSeries(data, (item, cb) => {
        setTimeout(()=>{

          request({
            uri: URL_HOST + item.url,
            jar: jar,
            maxAttempts: 5,
            retryDelay: 5000,
            retryStrategy: request.RetryStrategies.HTTPOrNetworkError
          }, (error, response, body) => {



            let $ = cheerio.load(body);
            let itemLink = $("#pbk-page").attr("src");
            let index = item.label;

            request({
              uri: URL_HOST + itemLink,
              jar: jar,
              maxAttempts: 5,
              retryDelay: 5000,
              retryStrategy: request.RetryStrategies.HTTPOrNetworkError
            }, (error, response, body) => {

              this.setState((prevState, props) => {
                return {
                  percent: prevState.percent + 1
                };
              },()=>{
                cb()
              });


            })
            .pipe(fs.createWriteStream(folderPath + '/'+ self.props.data.isbn + '/temp/' + self.props.data.title + "___" + item.cfi.replace('/','') + '.jpeg'));



          });
        },Math.floor(Math.random() * (2000 - 1000) + 1000));
      }, err => {

        resolve();

      });


    })

  }





  render(){

    return (

      <li>
        <div className={Styles['ebook--item--cover']}>
          <img src={'http://'+this.props.data.coverURL.replace(':width','320')}  onLoad={this._handleImageLoaded}></img>
          <Loading type='img' load={this.state.loadingImg} statusText={this.state.statusText}/>
          <div className={Styles['ebook-item--download']}>
            <div className={Styles['ebook--glass']}></div>
            <div className={Styles['ebook--btndl']}>
              <span className={Styles['ebook--button---circle']} onClick={this._handlerDownloadEbook}>
                <span className='icon-download'></span>
              </span>
              <span className={Styles['ebook--button---tooltip']}> {this.props.data.format == 'pbk' ? 'Download PDF' :'(EPUB) dont support'}</span>
            </div>
          </div>

        </div>
        <h1 className={Styles['ebbok--title']} title={this.props.data.title}>{this.props.data.title.match(/(.{1,50})\s*/g)[0] || this.props.data.title}...</h1>
        <span className={Styles['ebbok--title']} title={this.props.data.author}>{this.props.data.author.match(/(.{1,20})\s*/g)[0] || this.props.data.author}...</span>
        <Loading type='download' size={this.state.pages.length} complete={this.state.complete} load={this.state.downloading} statusText={this.state.statusTextDl} percent={this.state.percent}/>

      </li>

    )


  }

}
