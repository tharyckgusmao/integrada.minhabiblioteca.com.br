import React, {Component} from 'react';
import {TweenMax} from 'gsap';
import Styles from './styles/styles.css';

export default class Loading extends Component {

  componentDidMount(){

    if(this.props.load == null|| this.props.load == false){

      this._hidePreloading();
    }

  }

  componentWillReceiveProps(newProps) {
    if(newProps.load){
      this._showPreloading()
    }else{
      this._hidePreloading();
    }

  }

  _hidePreloading(){

    TweenMax.to(this.refs.preloading,1,{

      autoAlpha:0

    })


  }

  _showPreloading(){
    TweenMax.to(this.refs.preloading,1,{

      autoAlpha:1

    })
  }


  render(){

    let type = this.props.type == 'img' ? (
      <div className={Styles['preloading-ctn--wrapper']}>
        <h3>{this.props.statusText}</h3>
        <span className={Styles['preloading']} >
        </span>
      </div>
    ) : <div className={Styles['preloading-ctn--wrapper']}>
      <h3>{this.props.statusText}</h3>
      <h3>{((this.props.percent * 100) / this.props.size).toFixed(2) || 0 } %</h3>
      <span className={Styles['preloading']} >
      </span>
    </div>

    return(
      <div className={Styles['preloading-ctn']} ref="preloading">
        {type}
      </div>
    )

  }


}
