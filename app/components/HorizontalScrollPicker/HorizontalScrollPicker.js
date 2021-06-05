import React, {Component} from 'react';
import {
  View,
  Text,
  Dimensions,
  ViewPropTypes,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import PropTypes from 'prop-types';
import {ScrollView} from 'react-native-gesture-handler';
import {Shadow} from 'react-native-neomorph-shadows';
import {colors, globalStyle as gs} from '../../config/styles';
import {moderateScale} from '../../lib/scalingUtils';

const {width} = Dimensions.get('window');

class HorizontalScrollPicker extends Component {
  constructor(props) {
    super(props);

    let compWidth = props.width ? props.width : width;
    this.state = {
      size: compWidth / props.rowItems,
      selected: props.initialIdx,
    };

    this.scrollView = null;
    this.scrollOffset = 0;
  }

  static getDerivedStateFromProps = (props, state) => {
    try {
      if (props.initialIdx !== state.selected) {
        let newState = {
          ...state,
          selected: props.initialIdx,
        };

        return newState;
      }
    } catch (error) {}
    return null;
  };

  getSnapshotBeforeUpdate(prevProps, prevState) {
    // Are we adding new items to the list?
    // Capture the scroll position so we can adjust scroll later.
    if (prevState.selected !== this.state.selected) {
      return {oper: 'selected'};
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // If we have a snapshot value, we've just added new items.
    // Adjust scroll so these new items don't push the old ones out of view.
    // (snapshot here is the value returned from getSnapshotBeforeUpdate)
    if (snapshot !== null) {
      let {size, selected} = this.state;
      if (this.props.offset) {
        selected -= this.props.offset;
      }
      this.scrollView.scrollTo({x: selected * size, y: 0, animated: true});
    }
  }

  _calculateLayout = event => {
    let {size, selected} = this.state;
    const {initialIdx, offset} = this.props;
    if (offset) {
      selected -= offset;
    }
    this.scrollView.scrollTo({x: selected * size, y: 0, animated: true});
  };

  clickOnItem = item => {
    let that = this;
    that.props.onSelect(item);
  };

  _handleScroll = event => {
    this.scrollOffset = event.nativeEvent.contentOffset.x;
  };

  _selectItem = () => {
    const {items, onSelect, offset} = this.props;
    const {size} = this.state;
    const idx = Math.abs(Math.round(this.scrollOffset / size));
    let selected = idx === items.length ? idx - 1 : idx;
    if (offset) {
      selected += offset;
    }

    onSelect(items[selected]);
    return selected;
  };

  _renderItem = (item, idx, props) => {
    const {size, selected} = this.state;
    const {itemStyle, textStyle, selectedTextStyle} = this.props;
    const {label, value} = item;

    if (props.offset && idx < props.offset) {
      return null;
    }
    return (
      <TouchableWithoutFeedback
        onPress={() => this.clickOnItem(item)}
        key={`cp_${idx}`}>
        <View
          style={[
            styles.itemContainer,
            {
              width: size,
            },
            itemStyle,
          ]}>
          {this._getSingleInnerItem(
            size,
            selected,
            idx,
            textStyle,
            selectedTextStyle,
            label,
          )}
        </View>
      </TouchableWithoutFeedback>
    );
  };

  _getSingleInnerItem = (
    size,
    selected,
    idx,
    textStyle,
    selectedTextStyle,
    label,
  ) => {
    if (selected === idx) {
      return (
        <Shadow
          style={{
            ...styles.shadowColor,
            borderRadius: size / 2,
            width: size,
            height: size,
          }}>
          <Text style={[styles.item, textStyle, selectedTextStyle]}>
            {label}
          </Text>
        </Shadow>
      );
    }
    return <Text style={[styles.item, textStyle]}>{label}</Text>;
  };

  render() {
    const {
      items,
      rowItems,
      containerStyle,
      selectorStyle,
      itemStyle,
    } = this.props;
    const {size, selected} = this.state;

    const sideItems = (rowItems - 1) / 2;

    let rowCount = rowItems == 7 ? sideItems * size - 5 : sideItems * size - 5;
    return (
      <View style={[{width: width}, containerStyle]}>
        <ScrollView
          horizontal
          ref={ref => (this.scrollView = ref)}
          showsHorizontalScrollIndicator={false}
          onLayout={this._calculateLayout}
          snapToInterval={size}
          onScroll={this._handleScroll}
          scrollEventThrottle={16}
          onMomentumScrollEnd={this._selectItem}
          shouldCancelWhenOutside={false}
          contentContainerStyle={{
            paddingLeft: size * sideItems,
            paddingRight: size * sideItems,
          }}>
          {items.map((item, idx) => this._renderItem(item, idx, this.props))}
        </ScrollView>
      </View>
    );
  }
}

HorizontalScrollPicker.propTypes = {
  rowItems: PropTypes.number,
  containerStyle: ViewPropTypes.style,
  itemStyle: ViewPropTypes.style,
  selectorStyle: ViewPropTypes.style,
  textStyle: Text.propTypes.style,
  selectedTextStyle: Text.propTypes.style,
  items: PropTypes.array,
  onSelect: PropTypes.func.isRequired,
  initialIdx: PropTypes.number.isRequired,
};

HorizontalScrollPicker.defaultProps = {
  rowItems: 5,
  items: [],
  initialIdx: 0,
};

const styles = StyleSheet.create({
  itemContainer: {
    justifyContent: 'center',
    marginTop: moderateScale(12),
    marginBottom: moderateScale(12),
  },
  shadowColor: {
    justifyContent: 'center',
    shadowOpacity: 0.3,
    shadowColor: colors.red_light,
    shadowRadius: 10,
    backgroundColor: colors.white,
  },
  item: {
    textAlign: 'center',
    textAlignVertical: 'center',
    color: colors.red_light,
    fontSize: moderateScale(30),
    fontFamily: 'Poppins-Medium',
  },
});

export default HorizontalScrollPicker;
