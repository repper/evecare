import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, TouchableOpacity, DeviceEventEmitter} from 'react-native';
import Modal from 'react-native-modal';
import merge from 'deepmerge';
//Own Code
import styles, {viewWidth} from './styles';
import Loader from './loader';
import Alert from './alert';

class AppModal extends Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {
      ...this.getDefaultState(),
    };
  }

  componentDidMount() {
    let listenerKey = this.props.listenerKey;
    listenerKey = `appModalManage_${listenerKey}`;
    this.emitter = DeviceEventEmitter.addListener(
      listenerKey,
      this.changeModalBehaviour,
    );
  }

  componentWillUnmount() {
    if (this.emitter && typeof this.emitter == 'function') {
      this.emitter.remove();
    }
  }

  getDefaultState() {
    let modalState = {
      visible: false,
      overrideBackdropDismiss: false,
      backdropOpacity: 0.8,
      isDismissable: true,
      animationIn: 'fadeIn',
      animationInTiming: 300,
      animationOut: 'fadeOut',
      animationOutTiming: 300,
      useNativeDriver: true,
      onDismissed: () => {},
      listenerKey: parseInt(Math.random() * 100000).toString(),
      style: [],
    };
    //type - loading, alert, cancelRemark,
    let newState = merge(
      {
        type: 'loading',
        modal: modalState,
        loading: {},
        alert: {},
        cancelRemark: {
          title: '',
          remark: '',
          selectedOption: -1,
          onOptionRowClick: this.onCancelRemarkOptionRowClick,
          onRemarkTextChange: this.onCancelRemarkRemarkChange,
          remarkVisible: false,
          // onRemarkTextChange:
        },
      },
      this.props,
    );
    return newState;
  }

  changeModalBehaviour = newState => {
    let that = this;
    let oldState = this.state;
    oldState.loading = {};
    oldState.alert = {};
    oldState.cancelRemark = {
      title: '',
      remark: '',
      selectedOption: -1,
      onOptionRowClick: this.onCancelRemarkOptionRowClick,
      onRemarkTextChange: this.onCancelRemarkRemarkChange,
      remarkVisible: false,
    };
    let modState = merge(oldState, newState);
    that.setState({...modState});
  };

  onBackdropPress = () => {
    let that = this;
    try {
      let state = that.state.modal;
      if (state.overrideBackdropDismiss) {
        if (typeof state.onBackdropPress == 'function') {
          state.onBackdropPress();
        }
      } else {
        if (state.isDismissable) {
          this.setState({modal: {...state, visible: false}});
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  onCancelRemarkOptionRowClick = (opt, index) => {
    let that = this;
    try {
      let cancelRemark = {...that.state.cancelRemark};
      cancelRemark.selectedOption = index;
      cancelRemark.remarkVisible = false;
      if (opt == 'Other') {
        cancelRemark.remarkVisible = true;
      }
      that.setState({cancelRemark});
    } catch (err) {
      console.error(err);
    }
  };

  onCancelRemarkRemarkChange = text => {
    let that = this;
    try {
      let cancelRemark = {...that.state.cancelRemark};
      cancelRemark.remark = text;
      that.setState({cancelRemark});
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    const {
      backdropOpacity,
      visible,
      animationIn,
      animationInTiming,
      animationOut,
      animationOutTiming,
      useNativeDriver,
      style,
    } = this.state.modal;
    let onDismissed = this.state.modal.onDismissed;
    if (typeof onDismissed != 'function') {
      onDismissed = () => {};
    }
    let listenerKey = this.props.listenerKey;
    let modalStyle = [styles.modalStyle].concat(style);
    let type = this.state.type;
    return (
      <Modal
        isVisible={visible}
        backdropOpacity={backdropOpacity}
        onBackButtonPress={this.onBackdropPress}
        onBackdropPress={this.onBackdropPress}
        animationIn={animationIn}
        animationInTiming={animationInTiming}
        animationOut={animationOut}
        animationOutTiming={animationOutTiming}
        useNativeDriver={useNativeDriver}
        onModalHide={onDismissed}
        style={modalStyle}>
        {type == 'loading' ? (
          <Loader listenerKey={listenerKey} {...this.state.loading} />
        ) : type == 'cancelRemark' ? (
          <CancelRemark
            listenerKey={listenerKey}
            onBackdropPress={this.onBackdropPress}
            {...this.state.cancelRemark}
          />
        ) : (
          <Alert
            listenerKey={listenerKey}
            onBackdropPress={this.onBackdropPress}
            {...this.state.alert}
          />
        )}
      </Modal>
    );
  }
}

export default AppModal;
