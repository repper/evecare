import React from 'react';
import {StyleSheet, View} from 'react-native';
import moment from 'moment';

import cs from '../../config/commonStyles';
import {PoppinsTextRegular} from '../../components/Text';
import {LineButton, GradientButton} from '../../components/Button';

const Component = props => {
  return (
    <View style={cs.firstDataBottom}>
      <View style={cs.flexRow}>
        {props.showButton ? (
          <View style={[cs.displayFlex, cs.twoButtonMargin]}>
            <LineButton
              hasElevation={false}
              text={props.leftBtnTxt}
              textColor={3}
              onPress={props.onDelete}
            />
          </View>
        ) : null}
        <View style={cs.displayFlex}>
          <GradientButton
            text={props.showButton ? props.updateText : props.saveText}
            onPress={props.onSave}
          />
        </View>
      </View>
      {props.showBottomTxt ? (
        <View style={cs.firstDataBottomMsg}>
          {props.date ? (
            <PoppinsTextRegular color={26} fontSize={14} style={cs.txtCenter}>
              {moment(props.date).format('DD MMM YYYY')}
            </PoppinsTextRegular>
          ) : null}
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({});

Component.propTypes = {};

Component.defaultProps = {
  onDelete: () => {},
  onSave: () => {},
  leftBtnTxt: 'Delete',
  saveText: 'Save',
  updateText: 'Update',
  showBottomTxt: true,
};

export default Component;
