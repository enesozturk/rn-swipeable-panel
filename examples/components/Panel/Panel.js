import React, { Component } from "react";
import {
  StyleSheet,
  ScrollView,
  TouchableHighlight,
  Animated,
  Dimensions,
  PanResponder,
  Easing
} from "react-native";
import { Bar } from "./Bar";
import { Close } from "./Close";

import PropTypes from "prop-types";

const FULL_HEIGHT = Dimensions.get("window").height;
const FULL_WIDTH = Dimensions.get("window").width;
const CONTAINER_HEIGHT = FULL_HEIGHT - 100;

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
      showComponent: false,
      opacity: new Animated.Value(0),
      canScroll: false,
      status: STATUS.CLOSED
    };
    this.pan = new Animated.ValueXY({ x: 0, y: FULL_HEIGHT });
    this.oldPan = { x: 0, y: 0 };

    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderGrant: (evt, gestureState) => {
        const { status } = this.state;

        if (status === STATUS.SMALL) {
          this.pan.setOffset({ x: this.pan.x._value, y: FULL_HEIGHT - 400 });
        } else if (status === STATUS.LARGE) {
          this.pan.setOffset({ x: this.pan.x._value, y: 0 });
        }

        this.pan.setValue({ x: 0, y: 0 });
      },
      onPanResponderMove: (evt, gestureState) => {
        const currentTop = this.pan.y._offset + gestureState.dy;
        if (currentTop > 0) {
          this.pan.setValue({ x: 0, y: gestureState.dy });
        }
      },
      onPanResponderRelease: (evt, { vx, vy }) => {
        this.pan.flattenOffset();

        const distance = this.oldPan.y - this.pan.y._value;
        const absDistance = Math.abs(distance);
        const { status } = this.state;
        const { onlyLarge } = this.props;

        if (status === STATUS.LARGE) {
          if (0 < absDistance && absDistance < 100) {
            this._animateToLargePanel();
          } else if (
            100 < absDistance &&
            absDistance < CONTAINER_HEIGHT - 200
          ) {
            if (onlyLarge) {
              this._animateClosingAndOnCloseProp(true);
            } else {
              this._animateToSmallPanel();
            }
          } else if (CONTAINER_HEIGHT - 200 < absDistance) {
            this._animateClosingAndOnCloseProp();
          }
        } else {
          if (distance < -100) {
            this._animateClosingAndOnCloseProp(false);
          } else if (distance > 0 && distance > 50) {
            this._animateToLargePanel();
          } else {
            this._animateToSmallPanel();
          }
        }
      }
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { isActive, openLarge, onlyLarge } = this.props;

    if (prevProps.isActive !== isActive) {
      if (isActive) {
        if (openLarge || onlyLarge) {
          this.openLarge();
        } else {
          this.openSmall();
        }
      } else {
        //this.closePanel(true);
      }
    }
  }

  _animateClosingAndOnCloseProp = isCloseButtonPress => {
    this.closePanel(isCloseButtonPress);
  };

  _animateToLargePanel = () => {
    this._animateSpringPan(
      0,
      0,
      AnimateInDuration(STATUS.LARGE, this.props.bounceAnimation)
    );
    this.setState({ canScroll: true, status: STATUS.LARGE });
    this.oldPan = { x: 0, y: 0 };
  };

  _animateToSmallPanel = () => {
    this._animateSpringPan(
      0,
      FULL_HEIGHT - 400,
      AnimateInDuration(STATUS.SMALL, this.props.bounceAnimation)
    );
    this.setState({ status: STATUS.SMALL });
    this.oldPan = { x: 0, y: FULL_HEIGHT - 400 };
  };

  openLarge = () => {
    this.setState({
      showComponent: true,
      status: STATUS.LARGE,
      canScroll: true
    });
    Animated.parallel([
      this._animateTimingPan(
        0,
        0,
        AnimateInDuration(STATUS.LARGE, this.props.bounceAnimation)
      ),
      this._animateTimingOpacity(
        1,
        AnimateInDuration(STATUS.LARGE, this.props.bounceAnimation)
      )
    ]);
    this.oldPan = { x: 0, y: 0 };
  };

  openSmall = () => {
    this.setState({ showComponent: true, status: STATUS.SMALL });
    Animated.parallel([
      this._animateTimingPan(
        0,
        FULL_HEIGHT - 400,
        AnimateInDuration(STATUS.SMALL, this.props.bounceAnimation)
      ),
      this._animateTimingOpacity(
        1,
        AnimateInDuration(STATUS.SMALL, this.props.bounceAnimation)
      )
    ]);
    this.oldPan = { x: 0, y: FULL_HEIGHT - 400 };
  };

  closePanel = isCloseButtonPress => {
    const { status } = this.state;
    const duration = AnimateOutDuration(status, this.props.bounceAnimation);
    const easing = isCloseButtonPress
      ? AnimateOutTransition(this.props.bounceAnimation)
      : Easing.linear;

    Animated.parallel([
      this._animateTimingPan(0, FULL_HEIGHT, duration, easing),
      this._animateTimingOpacity(
        0,
        AnimateOutDuration(status, this.props.bounceAnimation)
      )
    ]);

    setTimeout(() => {
      this.setState({
        showComponent: false,
        canScroll: false,
        status: STATUS.CLOSED
      });
      this.props.onClose();
    }, AnimateOutDuration(status, this.props.bounceAnimation) - 50);
  };

  onPressCloseButton = () => {
    this._animateClosingAndOnCloseProp(true);
  };

  _animateSpringPan = (x, y, duration) => {
    return Animated.spring(this.pan, {
      toValue: { x, y },
      easing: AnimateInTransition(this.props.bounceAnimation),
      duration,
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

  _animateTimingPan = (
    x = 0,
    y = 0,
    duration = AnimateInDuration(this.state.status, this.props.bounceAnimation),
    easing = AnimateInTransition(this.props.bounceAnimation)
  ) => {
    return Animated.timing(this.pan, {
      toValue: { x, y },
      easing,
      duration,
      useNativeDriver: true
    }).start();
  };

  render() {
    const { showComponent, opacity } = this.state;
    const {
      noBackgroundOpacity,
      style,
      closeRootStyle,
      closeIconStyle
    } = this.props;

    return showComponent ? (
      <Animated.View
        style={[
          SwipeablePanelStyles.background,
          {
            opacity,
            backgroundColor: noBackgroundOpacity
              ? "rgba(0,0,0,0)"
              : "rgba(0,0,0,0.5)"
          }
        ]}
      >
        <Animated.View
          style={[
            SwipeablePanelStyles.container,
            { width: this.props.fullWidth ? FULL_WIDTH : FULL_WIDTH - 50 },
            { transform: this.pan.getTranslateTransform() },
            style
          ]}
          {...this._panResponder.panHandlers}
        >
          <Bar />
          {this.props.onPressCloseButton && (
            <Close
              rootStyle={closeRootStyle}
              iconStyle={closeIconStyle}
              onPress={this.onPressCloseButton}
            />
          )}
          <ScrollView
            contentContainerStyle={
              SwipeablePanelStyles.scrollViewContentContainerStyle
            }
          >
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

SwipeablePanel.propTypes = {
  isActive: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  fullWidth: PropTypes.bool,
  onPressCloseButton: PropTypes.func,
  noBackgroundOpacity: PropTypes.bool,
  style: PropTypes.object,
  closeRootStyle: PropTypes.object,
  closeIconStyle: PropTypes.object,
  openLarge: PropTypes.bool,
  onlyLarge: PropTypes.bool,
  bounceAnimation: PropTypes.bool
};

SwipeablePanel.defaultProps = {
  style: {},
  onClose: () => {},
  fullWidth: true,
  closeRootStyle: {},
  closeIconStyle: {},
  openLarge: false,
  onlyLarge: false,
  bounceAnimation: false
};

const SwipeablePanelStyles = StyleSheet.create({
  background: {
    position: "absolute",
    zIndex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: FULL_WIDTH,
    height: FULL_HEIGHT
  },
  container: {
    position: "absolute",
    height: CONTAINER_HEIGHT,
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
