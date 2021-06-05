import React, {Component} from 'react';
import {
  BackHandler,
  View,
  StyleSheet,
  Dimensions,
  Animated,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';
import {connect} from 'react-redux';
import {Text as PeoText, PoppinsTextRegular} from '../../../components/Text';
import {colors, globalStyle as gs} from '../../../config/styles';
import {scale, verticalScale, moderateScale} from '../../../lib/scalingUtils';

import AppNavigator from './routeConfig';

const window = Dimensions.get('window');
const {width, height} = window;

class ReduxNavigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogoutOper: false,
      progress: false,
      perVal: 0,
      receivedBytes: 0,
      totalBytes: 0,
      showGreenLable: false,
      x: new Animated.Value(0),
    };

    this.elRefs = {};
  }

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidUpdate() {}

  static getDerivedStateFromProps = (props, state) => {
    try {
    } catch (error) {}
    return null;
  };

  render() {
    const {navigation, dispatch, network} = this.props;
    const screenProps = {};

    return (
      <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
        <StatusBar backgroundColor="white" barStyle={'dark-content'} />
        <View style={styles.masterView}>
          <AppNavigator
            state={navigation}
            dispatch={dispatch}
            screenProps={screenProps} // optional
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  masterView: {
    flex: 1,
  },
  progressView: {
    flex: 1,
    position: 'absolute',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 1,
  },
  txtMsg: {
    padding: moderateScale(5),
    width: width,
    backgroundColor: colors.black,
    textAlign: 'center',
  },
  txtOnlineMsg: {
    padding: moderateScale(5),
    width: width,
    backgroundColor: 'green',
    textAlign: 'center',
    position: 'absolute',
    bottom: 0,
    zIndex: 1,
  },
});

const mapStateToProps = state => ({
  navigation: state.nav,
  auth: state.auth,
  bot: state.bot,
  network: state.network,
  orders: state.orders,
});

export default connect(mapStateToProps)(ReduxNavigation);
