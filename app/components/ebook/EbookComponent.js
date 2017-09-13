import React,{Component} from 'react';
import Styles from './styles/styles.css';

import EbookItemComponent from './EbookItemComponent'
import Loading from '../loading/LoadingComponent';

export default class EbookComponent extends Component{


  _onScrollEvent = (e) =>{

    let offset = this.refs.listEbooks.scrollHeight - this.refs.listEbooks.clientHeight;

    if(this.refs.listEbooks.scrollTop ==  offset && offset > 0) {

      this.props._loadMoreEbooks()

    }

  }



  render(){

    let ebooksItems = this.props.ebooks.map((el,key)=>{

      return (<EbookItemComponent auth={this.props.auth} key={key} data={el}/>)

    })

    return (

      <div className={Styles['ebook-ctn']} ref="listEbooks" onScroll={this._onScrollEvent}>
        <ul >

          {ebooksItems.length == 0 ? (<span className={Styles['ebook--notfound']}>Nehum livro encontrado !!</span>) : ebooksItems}



        </ul>

        <Loading type='img' load={this.props.filtering} statusText={this.props.statusText}/>

      </div>

    )


  }

}
