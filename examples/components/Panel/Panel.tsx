import React, {Component} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Animated,
  Dimensions,
  PanResponder,
} from 'react-native';

import {Bar} from './Bar';
import {Close} from './Close';

const FULL_HEIGHT = Dimensions.get('window').height;
const FULL_WIDTH = Dimensions.get('window').width;
const PANEL_HEIGHT = FULL_HEIGHT - 100;

const STATUS = {
  CLOSED: 0,
  SMALL: 1,
  LARGE: 2,
};

type SwipeablePanelProps = {
  isActive: Boolean;
  onClose: Function;
  showCloseButton?: Boolean;
  fullWidth?: Boolean;
  noBackgroundOpacity?: Boolean;
  style?: Object;
  closeRootStyle?: Object;
  closeIconStyle?: Object;
  closeOnTouchOutside: Boolean;
  onlyLarge?: Boolean;
  openLarge?: Boolean;
  noBar?: Boolean;
};

type MaybeAnimated<T> = T | Animated.Value;

type SwipeablePanelState = {
  status: number;
  isActive: Boolean;
  showComponent: Boolean;
  canScroll: Boolean;
  opacity: Animated.Value;
  pan: any;
};

class SwipeablePanel extends Component<
  SwipeablePanelProps,
  SwipeablePanelState
> {
  pan: Animated.ValueXY;
  isClosing: Boolean;
  _panResponder: any;
  animatedValueY: Number;
  constructor(props: SwipeablePanelProps) {
    super(props);
    this.state = {
      status: STATUS.CLOSED,
      isActive: false,
      showComponent: false,
      canScroll: false,
      opacity: new Animated.Value(0),
      pan: new Animated.ValueXY({x: 0, y: FULL_HEIGHT}),
    };

    this.pan = new Animated.ValueXY({x: 0, y: FULL_HEIGHT});
    this.isClosing = false;
    this.animatedValueY = 0;

    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderGrant: (evt, gestureState) => {
        this.state.pan.setOffset({
          x: 0,
          y: this.animatedValueY,
        });
        this.state.pan.setValue({x: 0, y: 0});
      },
      onPanResponderMove: (evt, gestureState) => {
        if (
          (this.state.status == 1 &&
            Math.abs(this.state.pan.y._value) <= this.state.pan.y._offset) ||
          (this.state.status == 2 && this.state.pan.y._value > -1)
        )
          this.state.pan.setValue({
            x: 0,
            y: gestureState.dy,
          });
      },
      onPanResponderRelease: (evt, gestureState) => {
        const {onlyLarge} = this.props;
        this.state.pan.flattenOffset();

        if (gestureState.dy == 0) {
          this._animateTo(this.state.status);
        } else if (gestureState.dy < -100 || gestureState.vy < -0.5) {
          if (this.state.status == STATUS.SMALL) this._animateTo(STATUS.LARGE);
          else {
            this._animateTo(STATUS.LARGE);
          }
        } else if (gestureState.dy > 100 || gestureState.vy > 0.5) {
          if (this.state.status == STATUS.LARGE)
            this._animateTo(onlyLarge ? STATUS.CLOSED : STATUS.SMALL);
          else this._animateTo(0);
        } else {
          this._animateTo(this.state.status);
        }
      },
    });
  }

  componentDidMount = () => {
    this.animatedValueY = 0;
    this.state.pan.y.addListener(
      (value: any) => (this.animatedValueY = value.value),
    );

    this.setState({isActive: this.props.isActive});
  };

  componentDidUpdate(
    prevProps: SwipeablePanelProps,
    prevState: SwipeablePanelState,
  ) {
    const {isActive, openLarge, onlyLarge} = this.props;

    if (prevProps.isActive !== isActive) {
      this.setState({isActive});

      if (isActive) {
        this._animateTo(
          openLarge ? STATUS.LARGE : onlyLarge ? STATUS.LARGE : STATUS.SMALL,
        );
      } else {
        this._animateTo();
      }
    }
  }

  _animateTo = (newStatus = 0) => {
    let newY = 0;

    if (newStatus == 0) {
      newY = PANEL_HEIGHT;
    } else if (newStatus == 1) newY = FULL_HEIGHT - 400;
    else if (newStatus == 2) newY = 0;

    this.setState({
      showComponent: true,
      status: newStatus,
    });

    Animated.spring(this.state.pan, {
      toValue: {x: 0, y: newY},
      tension: 80,
      friction: 25,
    }).start();

    this.setState({canScroll: newStatus == 2 ? true : false});

    if (newStatus == 0) {
      setTimeout(() => {
        this.props.onClose();
        this.setState({
          showComponent: false,
        });
      }, 360);
    }
  };

  render() {
    const {showComponent} = this.state;
    const {
      noBackgroundOpacity,
      style,
      closeRootStyle,
      closeIconStyle,
    } = this.props;

    return showComponent ? (
      <Animated.View
        style={[
          SwipeablePanelStyles.background,
          {
            backgroundColor: noBackgroundOpacity
              ? 'rgba(0,0,0,0)'
              : 'rgba(0,0,0,0.5)',
          },
        ]}>
        {this.props.closeOnTouchOutside && (
          <TouchableWithoutFeedback onPress={() => this.props.onClose()}>
            <View
              style={[
                SwipeablePanelStyles.background,
                {backgroundColor: 'rgba(0,0,0,0)'},
              ]}
            />
          </TouchableWithoutFeedback>
        )}
        <Animated.View
          style={[
            SwipeablePanelStyles.panel,
            {width: this.props.fullWidth ? FULL_WIDTH : FULL_WIDTH - 50},
            {transform: this.state.pan.getTranslateTransform()},
            style,
          ]}
          {...this._panResponder.panHandlers}>
          {!this.props.noBar && <Bar />}
          {this.props.showCloseButton && (
            <Close
              rootStyle={closeRootStyle}
              iconStyle={closeIconStyle}
              onPress={this.props.onClose}
            />
          )}
          <ScrollView
            onTouchStart={() => {
              return false;
            }}
            onTouchEnd={() => {
              return false;
            }}
            contentContainerStyle={
              SwipeablePanelStyles.scrollViewContentContainerStyle
            }>
            {this.state.canScroll ? (
              <TouchableHighlight>
                <React.Fragment>{this.props.children}</React.Fragment>
              </TouchableHighlight>
            ) : (
              this.props.children
            )}
          </ScrollView>
        </Animated.View>
      </Animated.View>
    ) : null;
  }
}

const SwipeablePanelStyles = StyleSheet.create({
  background: {
    position: 'absolute',
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: FULL_WIDTH,
    height: FULL_HEIGHT,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  panel: {
    position: 'absolute',
    height: PANEL_HEIGHT,
    width: FULL_WIDTH - 50,
    transform: [{translateY: FULL_HEIGHT - 100}],
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    bottom: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
    zIndex: 2,
  },
  scrollViewContentContainerStyle: {
    width: '100%',
  },
});

export default SwipeablePanel;
