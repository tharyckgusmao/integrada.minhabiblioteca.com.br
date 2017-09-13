import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {loginUserFeetch } from '../actions/creators/auth';
import home from '../view/home/homeView';

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

function mapDispatchToProps(dispatch) {

  return bindActionCreators({
    loginUserFeetch
  }, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(home);
