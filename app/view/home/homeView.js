import React,{Component} from 'react';
import Styles from './styles/styles.css';

import EbookComponent from '../../components/ebook/EbookComponent'
import LoginComponent from '../../components/auth/LoginComponent'
import {data} from '../../utils/data.js'
export default class home extends Component{

  constructor(props){
    super(props);
    this.state = {
      data: data.books,
      dataFiltered: data.books.slice(0,15),
      offset: 15,
      current: 15,
      max: data.books.length,
      search: '',
      loading: null,
      statusText: 'Carregando Livros'
    }

  }

  // componentWillReceiveProps(newProps) {
  //
  //   if(newProps.ebooks.ebooks != undefined){
  //
  //
  //     this.setState({
  //       data: newProps.ebooks.ebooks,
  //       dataFiltered: newProps.ebooks.ebooks.slice(0,15) ,
  //       max: newProps.ebooks.ebooks.length
  //     });
  //
  //
  //   }
  //
  //
  //
  // }


  _loadMoreEbooks = () => {

    let current = this.state.current + this.state.offset;

    if(current >= this.state.max){
      current = this.state.max
    }



    let dataEbooks = this.state.data.slice(0,current);


    this.setState({
      dataFiltered: dataEbooks,
      current: current
    })


  }


  _onKeySearchPress = (e) =>{

    if (e.key === 'Enter') {

      this._filterSearch();
    }


  }


  _handlerSearchInput = (e) =>{

    let value = e.currentTarget.value;

    this.setState({

      search: value

    })

  }


  _filterSearch = ()=>{

    this.setState({
      loading: true
    },()=>{


      let query = this.state.search.toUpperCase();
      let dataEbooks = data.books;

      if(/\S/.test(query)){

        let dataFiltered = dataEbooks.filter((el)=>{

          if(el.title.toUpperCase().includes(query)){
            return true
          }else{
            return false
          }

        })

        this.setState({
          data: dataFiltered,
          dataFiltered: dataFiltered.slice(0,15),
          max: dataFiltered.length,
          loading:false

        })

      }else{

        this.setState({
          data: dataEbooks,
          dataFiltered: dataEbooks.slice(0,15),
          max: dataEbooks.length,
          loading:false

        })

      }


      this.refs.ebookComponent.scrollTop = 0

    })


  }


  _loginUser = (login,pass) =>{

    this.props.loginUserFeetch(login,pass)

  }


  render(){


    return (
      <div className={Styles['home-ctn']}>
        <div className={Styles['search-ctn']}>
          <div className={Styles['search--input']}>
            <span className='icon-search'></span>
            <input placeholder="Pesquisar Livros" onChange={this._handlerSearchInput} onKeyPress={this._onKeySearchPress}></input>
          </div>
          <button onClick={this._filterSearch}>Pesquisar</button>
        </div>

        <EbookComponent ref="ebookComponent" auth={this.props.auth} ebooks={this.state.dataFiltered} _loadMoreEbooks={()=>{this._loadMoreEbooks()}} filtering={this.state.loading || this.props.auth.isAuthenticated == null} statusText={this.state.statusText}/>
        <span className={Styles['footer']}><a href="https://github.com/tharyckgusmao/integrada.minhabiblioteca.com.br">Github Tharyck Gusmao</a></span>

        { this.props.auth.isAuthenticated == null || this.props.auth.isAuthenticated == false? <LoginComponent _loginUser={(login,pass)=>{this._loginUser(login,pass)}} load={this.props.auth.isAuthenticating || false } authenticated={this.props.auth.status} statusText="Aguarde..."/> : null}

      </div>

    )


  }

}
