import React,{Component} from 'react';
import Styles from './styles/styles.css';
import Loading from '../loading/LoadingComponent';
import {default as rp}  from 'request-promise';
import request from 'request';
import cheerio from 'cheerio';
import fs from 'fs';
import async from 'async';
import { remote } from 'electron';

export default class EbookItemComponent extends Component{

  constructor(props){
    super(props);
    this.state = {
      loadingImg : true,
      statusText : 'Carregando Imagem...',
      statusTextDl : 'Carregando Crawl...',
      downloading: false,
      percent:0,
      pages:[]

    }
  }

  _handleImageLoaded = ()=>{

    this.setState({
      loadingImg: false
    })

  }


  _handlerDownloadEbook =()=>{

    const URL_HOST = "https://jigsaw.vitalsource.com/api/v0/";
    const URL_PAGES = URL_HOST + "books/" + this.props.data.isbn + "/pagebreaks";

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


        this.setState({
          downloading:true
        },()=>{


          let jar = self.props.auth.cookie;

          rp({
            uri: URL_PAGES,
            jar: jar
          })
          .then(body => {
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

              let dataSplit = [
                d1,d2,d3
              ];

              let percent = 0;

              dataSplit.forEach((el,index)=>{

                async.eachSeries(data, (item, cb) => {

                  rp({
                    uri: URL_HOST + item.url,
                    jar: jar
                  }).then(body => {

                    let $ = cheerio.load(body);
                    let itemLink = $("#pbk-page").attr("src");
                    let index = item.label;


                    request({
                      uri: URL_HOST + itemLink,
                      jar: jar
                    }, (error, response, body) => {
                      self.setState({
                        percent: percent++
                      },()=>{
                        cb()
                      });

                    }).pipe(fs.createWriteStream(folderPath + '/'+ self.props.data.isbn + '/' + self.props.data.title + "_" + index + '.jpeg'));


                  });
                });
              });
            })
          });
        })
      }
    });
  }




  render(){

    return (

      <li>
        <div className={Styles['ebook--item--cover']}>
          <img src={this.props.data.coverURL.replace(':width','320')}  onLoad={this._handleImageLoaded}></img>
          <Loading type='img' load={this.state.loadingImg} statusText={this.state.statusText}/>
          <div className={Styles['ebook-item--download']}>
            <div className={Styles['ebook--glass']}></div>
            <div className={Styles['ebook--btndl']}>
              <span className={Styles['ebook--button---circle']} onClick={this._handlerDownloadEbook}>
                <span className='icon-download'></span>
              </span>
              <span className={Styles['ebook--button---tooltip']}>Download {this.props.data.format == 'pbk' ? 'PDF' :'EPUB'}</span>
            </div>
          </div>

        </div>
        <h1 className={Styles['ebbok--title']} title={this.props.data.title}>{this.props.data.title.match(/(.{1,50})\s*/g)[0] || this.props.data.title}...</h1>
        <span className={Styles['ebbok--title']} title={this.props.data.author}>{this.props.data.author.match(/(.{1,20})\s*/g)[0] || this.props.data.author}...</span>
        <Loading type='download' size={this.state.pages.length} load={this.state.downloading} statusText={this.state.statusTextDl} percent={this.state.percent}/>

      </li>

    )


  }

}
