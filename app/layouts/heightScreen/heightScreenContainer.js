import React from 'react';
import {connect} from 'react-redux';
// own components
import BaseComponent from '../baseComponent';
import HeightScreen from './heightScreen';
import * as actionTypes from '../../redux/actions/types';
import {convertFeetInchToCm, convertCmToFeetInch} from '../../lib/util';

class HeightScreenContainer extends BaseComponent {
  constructor(props) {
    super(props);

    let cmArr = [];
    let cmVal = 150;
    let cmIdx = 0;

    let decimalArr = [];
    let decimalVal = 11;
    let decimalIndex = 0;

    let feetArr = [];
    let feetVal = 4;
    let feetIndex = 0;

    let startAtCm = 92;
    let startAtFeet = 3;

    let btnTxt = 'Save';

    let isInCm = props.units.height === 'cm';

    //Check if we have log in the state
    if (props.user.height) {
      btnTxt = 'Update';
      cmVal = props.user.height;
    }

    //Check if we need conversion to celsius
    if (!isInCm) {
      const convHeight = convertCmToFeetInch(cmVal);
      feetVal = convHeight[0];
      decimalVal = convHeight[1];
    }

    for (let index = startAtCm; index <= 240; index++) {
      cmArr.push(index);
      if (index === cmVal) {
        cmIdx = index - startAtCm;
      }
    }
    for (let index = startAtFeet; index <= 8; index++) {
      feetArr.push(index);
      if (index === feetVal) {
        feetIndex = index - startAtFeet;
      }
    }
    for (let index = 0; index < 100; index++) {
      decimalArr.push(index);
      if (index === decimalVal) {
        decimalIndex = index;
      }
    }

    this.state = {
      selectedUnit: props.units.height,
      isInCm,
      startAtCm,
      startAtFeet,
      cmArr,
      cmVal,
      cmIdx,
      feetArr,
      feetVal,
      feetIndex,
      decimalArr,
      decimalVal,
      decimalIndex,
      btnTxt,
    };
  }

  componentWillUnmount() {
    this.props.navigation.removeListener('focus');
  }

  componentDidMount() {
    let that = this;
    try {
      that.props.navigation.addListener('focus', payload => {
        if (that.state.selectedUnit !== that.props.units.height) {
          //Means we need to update index;
          if (that.props.units.height === 'cm') {
            const conVal = convertFeetInchToCm(Number([that.state.feetVal, that.state.decimalVal].join('.')));
            that.setState({
              selectedUnit: that.props.units.height,
              isInCm: true,
              cmVal: conVal[0],
              cmIdx: conVal[0] - that.state.startAtCm,
            });
          } else {
            const conVal = convertCmToFeetInch(Number(that.state.cmVal));
            that.setState({
              selectedUnit: that.props.units.height,
              isInCm: false,
              feetVal: conVal[0],
              feetIndex: conVal[0] - that.state.startAtFeet,
              decimalVal: conVal[1],
              decimalIndex: conVal[1],
            });
          }
        }
      });
    } catch (error) {}
  }

  componentDidUpdate() {}

  setSelectedCentimeter = (data, selectedIndex) => {
    let that = this;
    try {
      that.setState({
        cmVal: data,
      });
    } catch (err) {}
  };

  setFeetSelection = (data, selectedIndex) => {
    let that = this;
    try {
      that.setState({
        feetVal: data,
      });
    } catch (err) {}
  };

  setDecimalSelection = (data, selectedIndex) => {
    let that = this;
    try {
      that.setState({
        decimalVal: data,
      });
    } catch (err) {}
  };

  onSaveOrUpdate = () => {
    let that = this;
    try {
      let height = Number(that.state.cmVal);
      //Convert into cm if in feet
      if (!that.state.isInCm) {
        height = Number([that.state.feetVal, that.state.decimalVal].join('.'));
        const conVal = convertFeetInchToCm(height);
        height = Number(conVal[0]);
      }

      that.props.saveHeightData(height);
      that.props.navigation.goBack();
    } catch (err) {
      console.log('err', err);
    }
  };

  onDelete = () => {
    let that = this;
    try {
      that.props.deleteWeightData(that.state.date);
      that.props.navigation.goBack();
    } catch (err) {}
  };

  render() {
    return (
      <HeightScreen
        onSaveOrUpdate={this.onSaveOrUpdate}
        setSelectedCentimeter={this.setSelectedCentimeter}
        setFeetSelection={this.setFeetSelection}
        setDecimalSelection={this.setDecimalSelection}
        {...this.state}
        {...this.props}
      />
    );
  }
}
const mapStateToProps = state => ({
  user: state.user,
  units: state.app.units,
});

const mapDispatchToProps = dispatch => {
  return {
    saveHeightData: height => {
      dispatch({
        type: actionTypes.SAVE_HEIGHT_DATA,
        payload: {
          height,
        },
      });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HeightScreenContainer);
