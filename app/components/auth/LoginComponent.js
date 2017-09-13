import React,{Component} from 'react';
import Styles from './styles/styles.css';
import Loading from '../loading/LoadingComponent';

export default class LoginComponent extends Component{

  constructor(props){
    super(props);
    this.state = {
      login: "",
      pass: "",
    }

  }

  _handlerLoginInput = (e) =>{

    let value = e.currentTarget.value;

    this.setState({

      login: value

    })

  }
  _handlerPassInput = (e) =>{

    let value = e.currentTarget.value;

    this.setState({

      pass: value

    })

  }

  _handlerLogin = () =>{

    let {login,pass} = this.state;

    if(/\S/.test(login) && /\S/.test(pass)){
      this.props._loginUser(login,pass);

    }


  }




  _onKeySearchPress = (e) =>{

    if (e.key === 'Enter') {

      this._handlerLogin();
    }


  }

  render(){
    return (

      <div className={Styles['auth--ctn']}>

        <h3>Insira os seus dados:</h3>

        <div  className={Styles['auth--formitem']}>
          <span className='icon-study'></span>
          <input onChange={this._handlerLoginInput} placeholder="email faculdade:" onKeyPress={this._onKeySearchPress}></input>
        </div>

        <div className={Styles['auth--formitem']}>
          <span className='icon-key'></span>
          <input onChange={this._handlerPassInput} placeholder="senha faculdade:" onKeyPress={this._onKeySearchPress}></input>
        </div>

        <button onClick={this._handlerLogin}>Logar</button>

        {this.props.authenticated == 'invalid_credentials' ? (<span className={Styles['error']}>Algo deu errado !! verifique o email e a senha.</span>):null }
        <Loading type='img' load={this.props.load} statusText={this.props.statusText}/>

      </div>

    )


  }

}
