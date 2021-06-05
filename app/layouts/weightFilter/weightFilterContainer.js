import React from 'react';
import {connect} from 'react-redux';
// own components
import BaseComponent from '../baseComponent';
import WeightFilter from './weightFilter';
import * as actionTypes from '../../redux/actions/types';

class WeightFilterContainer extends BaseComponent {
  constructor(props) {
    super(props);

    this.state = {
      unitArray: [
        {label: 'Kilogram', value: 'kg'},
        {label: 'Pound', value: 'lbs'},
      ],
      heightUnitArray: [
        {label: 'Feet', value: 'feet'},
        {label: 'Centimeter', value: 'cm'},
      ],
      selectedUnit: props.units.weight,
      selectedHeightUnit: props.units.height,
    };
  }

  componentWillUnmount() {}

  componentDidMount() {}

  componentDidUpdate() {}

  setSelectedUnit = item => {
    let that = this;
    try {
      that.setState({
        selectedUnit: item.value,
      });
    } catch (err) {}
  };

  setSelectedHeightUnit = item => {
    let that = this;
    try {
      that.setState({
        selectedHeightUnit: item.value,
      });
    } catch (err) {}
  };

  clickOnProceed = () => {
    let that = this;
    try {
      that.props.saveWeightHeightUnit(
        that.state.selectedUnit,
        that.state.selectedHeightUnit,
      );
      that.props.navigation.goBack();
    } catch (err) {}
  };

  render() {
    return (
      <WeightFilter
        setSelectedUnit={this.setSelectedUnit}
        setSelectedHeightUnit={this.setSelectedHeightUnit}
        clickOnProceed={this.clickOnProceed}
        {...this.state}
        {...this.props}
      />
    );
  }
}
const mapStateToProps = state => ({
  units: state.app.units,
});

const mapDispatchToProps = dispatch => {
  return {
    saveWeightHeightUnit: (weight, height) => {
      dispatch({
        type: actionTypes.SAVE_WEIGHT_HEIGHT_UNIT,
        payload: {
          weight,
          height,
        },
      });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WeightFilterContainer);
