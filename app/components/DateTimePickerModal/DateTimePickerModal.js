import React, {Component} from 'react';
import {
  View,
  Text,
  Dimensions,
  ViewPropTypes,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import moment from 'moment';
import Modal from 'react-native-modal';
import {colors, globalStyle as gs} from '../../config/styles';
import {moderateScale} from '../../lib/scalingUtils';
import DateTimePicker from '@react-native-community/datetimepicker';

import {PoppinsTextRegular} from '../../components/Text';

const window = Dimensions.get('window');
const {height, width} = window;

class DateTimePickerModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: this.props.isOpen,
      selectedDate: '',
    };
  }

  //   static getDerivedStateFromProps = (props, state) => {
  //     let that = this;
  //     try {
  //       let newState = {
  //         ...state,
  //         visible: false,
  //       };
  //       if (props.isOpen !== state.visible) {
  //         console.log('props', props, state.visible);
  //         if (props.isOpen) {
  //           newState = {...newState, visible: true};
  //         } else {
  //           newState = {...newState, visible: false};
  //         }
  //         return newState;
  //       }
  //     } catch (error) {}
  //     return null;
  //   };

  UNSAFE_componentWillReceiveProps(nextProps) {
    // isOpen prop changed to true from false
    if (!this.props.isOpen && nextProps.isOpen) {
      this.setState({visible: true});
    } else if (this.props.isOpen && !nextProps.isOpen) {
      // isOpen prop changed to false from true
      this.setState({visible: false});
    }
    if (!this.state.selectedDate) {
      this.setState({
        selectedDate: nextProps.date,
      });
    }
  }

  hideModal = () => {
    this.setState(
      {
        visible: false,
      });
  };

  getSelectedDate = date => {
    let that = this;
    let dateString = moment(date.nativeEvent.timestamp).format('YYYY-MM-DD');
    try {
      that.setState({
        selectedDate: dateString,
      });
    } catch (err) {}
  };

  render() {
    return (
      <View>
        <Modal
          isVisible={this.state.visible}
          backdropOpacity={0.7}
          onBackButtonPress={this.props.closeModalReq}
          onBackdropPress={this.props.closeModalReq}
          // animationInTiming={props.animationInTiming}
          // animationOutTiming={props.animationOutTiming}
          useNativeDriverForBackdrop={true}
          propagateSwipe={true}
          style={styles.modal}
          useNativeDriver={true}>
          <View style={styles.wrpr}>
            <DateTimePicker
              value={new Date(this.state.selectedDate)}
              display="spinner"
              mode={'date'}
              is24Hour={false}
              maximumDate={new Date()}
              onChange={this.getSelectedDate}
            />
            <View style={styles.deviderView} />
            <TouchableWithoutFeedback
              onPress={() =>
                this.props.getDateFromPicker(this.state.selectedDate)
              }>
              <View style={styles.confirmButtonView}>
                <PoppinsTextRegular color={2} fontSize={16}>
                  Confirm
                </PoppinsTextRegular>
              </View>
            </TouchableWithoutFeedback>
          </View>
          <TouchableWithoutFeedback onPress={this.props.closeModalReq}>
            <View style={[styles.wrpr, {marginTop: moderateScale(10)}]}>
              <View style={styles.confirmButtonView}>
                <PoppinsTextRegular color={3} fontSize={16}>
                  Cancel
                </PoppinsTextRegular>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
    );
  }
}

DateTimePickerModal.propTypes = {};

DateTimePickerModal.defaultProps = {};

const styles = StyleSheet.create({
  wrpr: {
    paddingTop: moderateScale(10),
    backgroundColor: colors.white,
    width: width - moderateScale(40),
    //height: height * 0.8,
    //     shadowOpacity: 0.3,
    //     shadowColor: colors.red_light,
    //     shadowRadius: 5,
    borderRadius: moderateScale(10),
  },
  modal: {
    margin: 20,
    justifyContent: 'flex-end',
    paddingBottom: moderateScale(20),
    alignItems: 'center',
  },
  deviderView: {
    height: moderateScale(1),
    backgroundColor: '#eee',
    width: width - moderateScale(40),
  },
  confirmButtonView: {
    padding: moderateScale(10),
    alignItems: 'center',
  },
});

export default DateTimePickerModal;
