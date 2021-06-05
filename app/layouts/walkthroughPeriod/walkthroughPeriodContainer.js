import React from 'react';
import {StackActions} from '@react-navigation/native';
import {connect} from 'react-redux';
// own components
import {WALTHROUGH_SKIP} from '../../redux/actions/types';
import BaseComponent from '../baseComponent';
import WalkthroughPeriod from './walkthroughPeriod';

class WalkthroughPeriodContainer extends BaseComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentWillUnmount() {}

  componentDidMount() {}

  componentDidUpdate() {}

  navigateToNextWalkthrough = () => {
    let that = this;
    try {
      that.props.navigation.navigate('WalkDiscuss');
    } catch (err) {
      console.log('err', err);
    }
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
      <WalkthroughPeriod
        navigateToNextWalkthrough={this.navigateToNextWalkthrough}
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
)(WalkthroughPeriodContainer);
