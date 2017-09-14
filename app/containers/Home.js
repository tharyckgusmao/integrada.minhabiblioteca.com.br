import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {loginUserFeetch } from '../actions/creators/auth';
import {ebooksFeetchFeetch } from '../actions/creators/ebooks';
import home from '../view/home/homeView';

function mapStateToProps(state) {
  return {
    auth: state.auth,
    ebooks: state.ebooks
  };
}

function mapDispatchToProps(dispatch) {

  return bindActionCreators({
    loginUserFeetch,
    ebooksFeetchFeetch
  }, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(home);
