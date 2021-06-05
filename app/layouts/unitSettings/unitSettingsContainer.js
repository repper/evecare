import React from 'react';
import {connect} from 'react-redux';
// own components
import BaseComponent from '../baseComponent';
import UnitSettings from './unitSettings';

class UnitSettingsContainer extends BaseComponent {
  constructor(props) {
    super(props);
     
    this.state = {
      listnerKey: 'unitSetting',
      settingsArray: [
        {title: 'Weight & Height', screenName: 'WeightFilter'},
        {title: 'Temperature', screenName: 'TemperatureFilter'},
      ],
    };
  }

  componentWillUnmount() {}

  componentDidMount() {}

  componentDidUpdate() {}

  clickOnSettingOption = item => {
    let that = this;
    try {
      that.props.navigation.navigate(item.screenName);
    } catch (err) {}
  };

  render() {
    return (
      <UnitSettings
        updateState={this.setState.bind(this)}
        clickOnSettingOption={this.clickOnSettingOption}
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
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UnitSettingsContainer);
