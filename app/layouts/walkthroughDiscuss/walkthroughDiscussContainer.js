import React from 'react';
import {StackActions} from '@react-navigation/native';
import {connect} from 'react-redux';
// own components
import BaseComponent from '../baseComponent';
import WalkthroughDiscuss from './walkthroughDiscuss';
import {WALTHROUGH_SKIP} from '../../redux/actions/types';

class WalkthroughDiscussContainer extends BaseComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentWillUnmount() {}

  componentDidMount() {}

  componentDidUpdate() {}

  navigateToWalkPeriod = () => {
    let that = this;
    try {
      that.props.navigation.dispatch(StackActions.replace('GetStarted'));
      that.props.walthroughSkipped();
    } catch (err) {}
  };

  clickOnSkip = () => {
    let that = this;
    try {
      that.props.navigation.dispatch(StackActions.replace('GetStarted'));
      that.props.walthroughSkipped();
    } catch (err) {
      console.log('err', err);
    }
  };

  render() {
    return (
      <WalkthroughDiscuss
        updateState={this.setState.bind(this)}
        navigateToWalkPeriod={this.navigateToWalkPeriod}
        clickOnSkip={this.clickOnSkip}
        {...this.state}
        {...this.props}
      />
    );
  }
}
const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => {
  return {
    walthroughSkipped: () => {
      dispatch({
        type: WALTHROUGH_SKIP,
      });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WalkthroughDiscussContainer);
