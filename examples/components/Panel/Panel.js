import React, { Component } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Animated,
  Dimensions,
  PanResponder,
  Easing
} from "react-native";
const { cond, eq, add, set, Value, event } = Animated;

import { Bar } from "./Bar";
import { Close } from "./Close";

import PropTypes from "prop-types";
import { thisExpression } from "@babel/types";

const FULL_HEIGHT = Dimensions.get("window").height;
const FULL_WIDTH = Dimensions.get("window").width;
const PANEL_HEIGHT = FULL_HEIGHT - 100;

const STATUS = {
  CLOSED: 0,
  SMALL: 1,
  LARGE: 2
};

const AnimateOutTransition = bounce =>
  bounce
    ? Easing.bezier(0.98, -0.11, 0.44, 0.59)
    : Easing.bezier(0.47, 0, 0.745, 0.715);
const AnimateOutDuration = (status, bounce) =>
  status === STATUS.SMALL ? (bounce ? 400 : 250) : bounce ? 400 : 450;
const AnimateInTransition = bounce =>
  bounce
    ? Easing.bezier(0.05, 1.35, 0.2, 0.95)
    : Easing.bezier(0.39, 0.575, 0.565, 1);
const AnimateInDuration = (status, bounce) =>
  status === STATUS.SMALL ? (bounce ? 800 : 300) : bounce ? 1000 : 450;

class SwipeablePanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: false,
      showComponent: false,
      opacity: new Animated.Value(0),
      canScroll: false,
      status: STATUS.CLOSED,
      pan: new Animated.ValueXY({ x: 0, y: FULL_HEIGHT })
    };

    this.pan = new Animated.ValueXY({ x: 0, y: FULL_HEIGHT });
    this.isClosing = false;

    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderGrant: (evt, gestureState) => {
        this.state.pan.setOffset({
          x: 0,
          y: this.animatedValueY
        });
        this.state.pan.setValue({ x: 0, y: 0 });
      },
      onPanResponderMove: (evt, gestureState) => {
        if (
          this.state.pan.y._offset + Math.abs(gestureState.dy) <
          PANEL_HEIGHT
        ) {
          this.state.pan.setValue({
            x: 0,
            y: gestureState.dy
          });
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        this.state.pan.flattenOffset();

        if (gestureState.dy == 0) {
          this._animateTo(this.state.status);
        } else if (gestureState.dy < -100 || gestureState.vy < -1) {
          if (this.state.status == STATUS.SMALL) this._animateTo(STATUS.LARGE);
          else {
            this._animateTo(STATUS.LARGE);
          }
        } else if (gestureState.dy > 100 || gestureState.vy > 1) {
          if (this.state.status == STATUS.LARGE) this._animateTo(STATUS.SMALL);
          else this._animateTo(0);
        } else {
          this._animateTo(this.state.status);
        }
      }
    });
  }

  componentDidMount = () => {
    this.animatedValueY = 0;
    this.state.pan.y.addListener(value => (this.animatedValueY = value.value));

    this.setState({ isActive: this.props.isActive });
  };

  componentDidUpdate(prevProps, prevState) {
    const { isActive, openLarge, onlyLarge } = this.props;

    if (prevProps.isActive !== isActive) {
      this.setState({ isActive });

      if (isActive) {
        this._animateTo(STATUS.SMALL);
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
      status: newStatus
    });

    Animated.spring(this.state.pan, {
      toValue: { x: 0, y: newY },
      duration: 300,
      tension: 80,
      friction: 25
    }).start();
    setTimeout(() => {
      if (newStatus == 0) {
        this.props.onClose();
        this.setState({ showComponent: false });
      }
    }, 280);
  };

  _animateSpringPan = (x, y, duration) => {
    return Animated.spring(this.pan, {
      toValue: { x, y },
      easing: AnimateInTransition(this.props.bounceAnimation),
      duration,
      useNativeDriver: true
    }).start();
  };

  _animateTimingPan = (
    y = 0,
    duration = AnimateInDuration(this.state.status, this.props.bounceAnimation),
    easing = AnimateInTransition(this.props.bounceAnimation)
  ) => {
    return Animated.timing(this.state.pan, {
      toValue: { x: 0, y },
      easing: Easing.bezier(0.47, 0, 0.745, 0.715),
      duration: 800,
      useNativeDriver: true
    }).start();
  };

  _animateTimingOpacity = (toValue, duration) => {
    return Animated.timing(this.state.opacity, {
      toValue,
      easing: toValue
        ? AnimateInTransition(this.props.bounceAnimation)
        : AnimateOutTransition(this.props.bounceAnimation),
      duration,
      useNativeDriver: true
    }).start();
  };

  render() {
    const { showComponent, opacity } = this.state;
    const { style, closeRootStyle, closeIconStyle } = this.props;

    return showComponent ? (
      <Animated.View style={[SwipeablePanelStyles.background]}>
        <Animated.View
          style={[
            SwipeablePanelStyles.container,
            { width: FULL_WIDTH },
            { transform: this.state.pan.getTranslateTransform() },
            style
          ]}
          {...this._panResponder.panHandlers}
        >
          <Bar />
          {this.props.showCloseButton && (
            <Close
              rootStyle={closeRootStyle}
              iconStyle={closeIconStyle}
              onPress={this.props.onClose}
            />
          )}
        </Animated.View>
      </Animated.View>
    ) : null;
  }
}

SwipeablePanel.propTypes = {
  isActive: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  fullWidth: PropTypes.bool,
  showCloseButton: PropTypes.bool,
  noBackgroundOpacity: PropTypes.bool,
  style: PropTypes.object,
  closeRootStyle: PropTypes.object,
  closeIconStyle: PropTypes.object,
  openLarge: PropTypes.bool,
  onlyLarge: PropTypes.bool,
  bounceAnimation: PropTypes.bool,
  closeOnTouchOutside: PropTypes.bool
};

SwipeablePanel.defaultProps = {
  style: {},
  onClose: () => {},
  fullWidth: true,
  closeRootStyle: {},
  closeIconStyle: {},
  openLarge: false,
  onlyLarge: false,
  bounceAnimation: false,
  showCloseButton: false,
  closeOnTouchOutside: false
};

const SwipeablePanelStyles = StyleSheet.create({
  background: {
    position: "absolute",
    zIndex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: FULL_WIDTH,
    height: FULL_HEIGHT,
    backgroundColor: "rgba(0,0,0,0.5)"
  },
  container: {
    position: "absolute",
    height: PANEL_HEIGHT,
    width: FULL_WIDTH - 50,
    transform: [{ translateY: FULL_HEIGHT - 100 }],
    display: "flex",
    flexDirection: "column",
    backgroundColor: "white",
    bottom: 0,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
    zIndex: 2
  },
  scrollViewContentContainerStyle: {
    width: "100%"
  }
});

export default SwipeablePanel;
