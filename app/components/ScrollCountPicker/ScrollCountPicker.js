import React from 'react';
import {View, Text, ScrollView, Dimensions, Platform} from 'react-native';
import PropTypes from 'prop-types';

const Container = props => {
  return (
    <View
      style={{
        height: props.wrapperHeight,
        flex: 1,
        overflow: 'hidden',
        alignSelf: 'center',
        width: props.wrapperWidth,
        backgroundColor: props.wrapperBackground,
      }}>
      {props.children}
    </View>
  );
};

const HighLightView = props => {
  return (
    <View
      style={{
        position: 'absolute',
        top: (props.wrapperHeight - props.itemHeight) / 2,
        height: props.itemHeight,
        width: props.highlightWidth,
        borderTopColor: props.highlightColor,
        borderBottomColor: props.highlightColor,
        borderTopWidth: props.highlightBorderWidth,
        borderBottomWidth: props.highlightBorderWidth,
      }}>
      {props.children}
    </View>
  );
};

const SelectedItem = props => {
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        height: props.itemHeight,
      }}>
      {props.children}
    </View>
  );
};

const deviceWidth = Dimensions.get('window').width;
export default class ScrollCountPicker extends React.Component {
  constructor() {
    super();
    this.onMomentumScrollBegin = this.onMomentumScrollBegin.bind(this);
    this.onMomentumScrollEnd = this.onMomentumScrollEnd.bind(this);
    this.onScrollBeginDrag = this.onScrollBeginDrag.bind(this);
    this.onScrollEndDrag = this.onScrollEndDrag.bind(this);
    this.state = {
      selectedIndex: 1,
    };
  }

  componentDidMount() {
    if (typeof this.props.selectedIndex !== 'undefined') {
      this.scrollToIndex(this.props.selectedIndex);
    }
  }

  componentWillUnmount() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  render() {
    const {header, footer} = this.renderPlaceHolder();
    return (
      <Container
        wrapperHeight={this.props.wrapperHeight}
        wrapperWidth={this.props.wrapperWidth}
        wrapperBackground={this.props.wrapperBackground}>
        <HighLightView
          highlightColor={this.props.highlightColor}
          highlightWidth={this.props.highlightWidth}
          wrapperHeight={this.props.wrapperHeight}
          itemHeight={this.props.itemHeight}
          highlightBorderWidth={this.props.highlightBorderWidth}
        />
        <ScrollView
          ref={sview => {
            this.sview = sview;
          }}
          //horizontal={true}
          bounces={false}
          showsVerticalScrollIndicator={false}
          onTouchStart={this.props.onTouchStart}
          onMomentumScrollBegin={this.onMomentumScrollBegin}
          onMomentumScrollEnd={this.onMomentumScrollEnd}
          onScrollBeginDrag={this.onScrollBeginDrag}
          onScrollEndDrag={this.onScrollEndDrag}>
          {header}
          {this.props.dataSource.map(this.renderItem.bind(this))}
          {footer}
        </ScrollView>
      </Container>
    );
  }

  renderPlaceHolder() {
    const height = (this.props.wrapperHeight - this.props.itemHeight) / 2;
    const header = <View style={{height, flex: 1}} />;
    const footer = <View style={{height, flex: 1}} />;
    return {header, footer};
  }

  renderItem(data, index) {
    const isSelected = index === this.state.selectedIndex;
    const item = (
      <Text
        //color={34}
        style={
          isSelected ? this.props.activeItemTextStyle : this.props.itemTextStyle
        }>
        {data}
      </Text>
    );

    return (
      <SelectedItem key={index} itemHeight={this.props.itemHeight}>
        {item}
      </SelectedItem>
    );
  }

  scrollFix(e) {
    let verticalY = 0;
    const h = this.props.itemHeight;
    if (e.nativeEvent.contentOffset) {
      verticalY = e.nativeEvent.contentOffset.y;
    }
    const selectedIndex = Math.round(verticalY / h);
    const verticalElem = selectedIndex * h;
    if (verticalElem !== verticalY) {
      // using scrollTo in ios, onMomentumScrollEnd will be invoked
      if (Platform.OS === 'ios') {
        this.isScrollTo = true;
      }
      if (this.sview) {
        this.sview.scrollTo({y: verticalElem});
      }
    }
    if (this.state.selectedIndex === selectedIndex) {
      return;
    }
    this.setState({
      selectedIndex,
    });
    // onValueChange
    if (this.props.onValueChange) {
      const selectedValue = this.props.dataSource[selectedIndex];
      this.props.onValueChange(selectedValue, selectedIndex);
    }
  }

  onScrollBeginDrag() {
    this.dragStarted = true;
    if (Platform.OS === 'ios') {
      this.isScrollTo = false;
    }
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  onScrollEndDrag(e) {
    this.props.onScrollEndDrag();
    this.dragStarted = false;
    // if not used, event will be garbaged
    const element = {
      nativeEvent: {
        contentOffset: {
          y: e.nativeEvent.contentOffset.y,
        },
      },
    };
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.timer = setTimeout(() => {
      if (!this.momentumStarted && !this.dragStarted) {
        this.scrollFix(element, 'timeout');
      }
    }, 10);
  }

  onMomentumScrollBegin() {
    this.momentumStarted = true;
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  onMomentumScrollEnd(e) {
    this.props.onMomentumScrollEnd();
    this.momentumStarted = false;
    if (!this.isScrollTo && !this.momentumStarted && !this.dragStarted) {
      this.scrollFix(e);
    }
  }

  scrollToIndex(ind) {
    this.setState({
      selectedIndex: ind,
    });
    const y = this.props.itemHeight * ind;
    setTimeout(() => {
      if (this.sview) {
        this.sview.scrollTo({y});
      }
    }, 0);
  }
}
ScrollCountPicker.propTypes = {
  style: PropTypes.object,
  dataSource: PropTypes.array,
  selectedIndex: PropTypes.number,
  onValueChange: PropTypes.func,
  renderItem: PropTypes.func,
  highlightColor: PropTypes.string,
  itemHeight: PropTypes.number,
  wrapperBackground: PropTypes.string,
  wrapperWidth: PropTypes.number,
  wrapperHeight: PropTypes.number,
  highlightWidth: PropTypes.number,
  highlightBorderWidth: PropTypes.number,
  itemTextStyle: PropTypes.object,
  activeItemTextStyle: PropTypes.object,
  onMomentumScrollEnd: PropTypes.func,
  onScrollEndDrag: PropTypes.func,
};
ScrollCountPicker.defaultProps = {
  dataSource: [1, 2, 3],
  itemHeight: 60,
  wrapperBackground: 'transparent',
  wrapperHeight: 180,
  wrapperWidth: 150,
  highlightWidth: deviceWidth,
  highlightBorderWidth: 2,
  highlightColor: '#333',
  onMomentumScrollEnd: () => {},
  onScrollEndDrag: () => {},
  itemTextStyle: {
    fontSize: 20,
    lineHeight: 26,
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
    color: '#022b3a',
    opacity: 0.5,
  },
  activeItemTextStyle: {
    fontSize: 20,
    lineHeight: 26,
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
    color: '#022b3a',
  },
};
