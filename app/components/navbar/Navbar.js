import React, {Component} from 'react';
import { remote } from 'electron';
import Styles from './styles/navbar.css'

export default class Navbar extends Component{

  minimize = () => {
    remote.BrowserWindow.getFocusedWindow().minimize();
  }

  maximize = () => {
    const win = remote.BrowserWindow.getFocusedWindow();
    if (win.isMaximized()) {
      win.unmaximize();
    } else {
      win.maximize();
    }
  }

  close = () => {
    remote.BrowserWindow.getFocusedWindow().close();
  }

  render(){
    return(
      <div className={Styles['navbar-ctn']}>
        <div className={Styles['navbar--title']}>
          Integrada Biblioteca V2
        </div>
        <div className={Styles['navbar--actions']}>
          <button className='icon-less' title="Minimizar" onClick={this.minimize}></button>
          <button className='icon-expand1' title="Expandir" onClick={this.maximize}></button>
          <button className='icon-close-circle' title="Fechar" onClick={this.close}></button>
        </div>
      </div>
    )



  }



}
