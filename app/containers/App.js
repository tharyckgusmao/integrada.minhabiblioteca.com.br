import React, {Component} from 'react';
import Navbar from '../components/navbar/Navbar'

export default class App extends Component {
  render(){
    return(
      <section>
        <Navbar> </Navbar>
        {this.props.children}
      </section>
    )
  }
}
