import React from 'react';
import {connect} from 'react-redux';
// own components
import BaseComponent from '../baseComponent';
import TemperatureFilter from './temperatureFilter';
import * as actionTypes from '../../redux/actions/types';

class TemperatureFilterContainer extends BaseComponent {
  constructor(props) {
    super(props);

    let selectedUnit = props.units.temp;
    this.state = {
      unitArray: [
        {label: 'Celsius', value: 'celsius'},
        {label: 'Fahrenheit', value: 'fahrenheit'},
      ],
      selectedUnit,
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

  clickOnProceed = () => {
    let that = this;
    try {
      that.props.saveTempratureUnit(that.state.selectedUnit);
      that.props.navigation.goBack();
    } catch (err) {}
  };

  render() {
    return (
      <TemperatureFilter
        setSelectedUnit={this.setSelectedUnit}
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
    saveTempratureUnit: unit => {
      dispatch({
        type: actionTypes.SAVE_TEMPERATURE_UNIT,
        payload: {
          unit,
        },
      });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TemperatureFilterContainer);
