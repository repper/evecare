import React from 'react';
import {View, StyleSheet, SafeAreaView, Dimensions} from 'react-native';
import {colors, globalStyle as gs} from '../../config/styles';
import GradientHeader from '../../components/GradientHeader';
import cs from '../../config/commonStyles';
import {PoppinsTextMedium, PoppinsTextSemiBold} from '../../components/Text';
import {moderateScale} from '../../lib/scalingUtils';
import BackgroundWaveView from '../../components/BackgroundWaveView';
import BottomButtons from '../../components/BottomButtons';
import ScrollCountPicker from '../../components/ScrollCountPicker';
const window = Dimensions.get('window');
const {height, width} = window;

const HeightScreen = props => {
  return (
    <SafeAreaView style={gs.safeArea}>
      <BackgroundWaveView>
        <GradientHeader
          backIcon="left_arrow"
          title="Height"
          rightIcon="edit"
          onRightIconClick={() => props.navigation.navigate('WeightFilter')}
          onLeftIconClick={() => props.navigation.goBack()}
        />
        <View style={cs.displayFlex}>
          <View style={cs.displayFlex}>
            <View style={styles.verticleView}>
              {props.isInCm ? getCmView(props) : getFeetInchView(props)}
            </View>
          </View>
          <BottomButtons
            showButton={false}
            saveText={props.btnTxt}
            onDelete={props.onDelete}
            onSave={props.onSaveOrUpdate}
          />
        </View>
      </BackgroundWaveView>
    </SafeAreaView>
  );
};

const getCmView = props => {
  return (
    <View style={{height: moderateScale(300)}}>
      <PoppinsTextMedium
        color={34}
        fontSize={26}
        style={{
          position: 'absolute',
          right: moderateScale(60),
          top: moderateScale(112),
          alignSelf: 'center',
          zIndex: 1,
        }}>
        CM
      </PoppinsTextMedium>
      <ScrollCountPicker
        dataSource={props.cmArr}
        selectedIndex={props.cmIdx}
        onValueChange={(data, selectedIndex) =>
          props.setSelectedCentimeter(data, selectedIndex)
        }
        wrapperHeight={280}
        wrapperWidth={width}
        wrapperBackground={'transparent'}
        itemHeight={60}
        highlightColor={colors.bg_pink}
        highlightBorderWidth={1}
        key={`cm_${props.cmIdx}`}
      />
    </View>
  );
};

const getFeetInchView = props => {
  return (
    <View
      style={{
        height: moderateScale(280),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
      }}>
      <PoppinsTextSemiBold
        color={2}
        fontSize={20}
        style={{
          position: 'absolute',
          left: 80,
          alignSelf: 'center',
        }}>
        {`ft`}
      </PoppinsTextSemiBold>
      <PoppinsTextSemiBold
        color={2}
        fontSize={20}
        style={{
          position: 'absolute',
          right: -10,
          alignSelf: 'center',
        }}>
        {`in`}
      </PoppinsTextSemiBold>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          alignSelf: 'center',
          flex: 0.55,
        }}>
        <ScrollCountPicker
          dataSource={props.feetArr}
          selectedIndex={props.feetIndex}
          onValueChange={(data, selectedIndex) =>
            props.setFeetSelection(data, selectedIndex)
          }
          wrapperHeight={280}
          wrapperWidth={moderateScale(50)}
          wrapperBackground={'transparent'}
          itemHeight={60}
          highlightColor={colors.bg_pink}
          highlightBorderWidth={1}
          key={`ft_${props.feetIndex}`}
        />
        <PoppinsTextSemiBold color={2}>.</PoppinsTextSemiBold>
        <ScrollCountPicker
          dataSource={props.decimalArr}
          selectedIndex={props.decimalIndex}
          onValueChange={(data, selectedIndex) =>
            props.setDecimalSelection(data, selectedIndex)
          }
          wrapperHeight={280}
          wrapperWidth={10}
          wrapperBackground={'transparent'}
          itemHeight={60}
          highlightColor={colors.bg_pink}
          highlightBorderWidth={1}
          key={`inc_${props.decimalIndex}`}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  verticleView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: moderateScale(100),
  },
});

HeightScreen.propTypes = {};

export default HeightScreen;
