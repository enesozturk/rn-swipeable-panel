import React from 'react';
import { StyleSheet, Animated, Dimensions, PanResponder, Easing } from 'react-native';
import { Bar } from '../bar/Bar';

import PropTypes from 'prop-types';

const FULL_HEIGHT = Dimensions.get('window').height;
const FULL_WIDTH = Dimensions.get('window').width;
const CONTAINER_HEIGHT = FULL_HEIGHT - 100;

class SwipeablePanel extends React.Component {
	static propTypes = {
		isActive: PropTypes.bool.isRequired,
		onClose: PropTypes.func
	};

	constructor(props) {
		super(props);
		this.state = {
			showComponent: false,
			opacity: new Animated.Value(0)
		};
		this.pan = new Animated.ValueXY({ x: 0, y: FULL_HEIGHT });
		this.oldPan = { x: 0, y: 0 };

		this._panResponder = PanResponder.create({
			onStartShouldSetPanResponder: (evt, gestureState) => true,
			onPanResponderGrant: (evt, gestureState) => {
				this.pan.setOffset({ x: this.pan.x._value, y: this.pan.y._value });
				this.pan.setValue({ x: 0, y: 0 });
			},
			onPanResponderMove: Animated.event([ null, { dx: 0, dy: this.pan.y } ]),
			onPanResponderRelease: (evt, { vx, vy }) => {
				this.pan.flattenOffset();

				const distance = this.oldPan.y - this.pan.y._value;
				this.setState({ top: distance });

				if (distance < -100) this._animateClosingAndOnCloseProp();
				else if (distance > 0 && distance > 50) this._animateToLargePanel();
				else this._animateToSmallPanel();
			}
		});
	}

	componentDidMount = () => {};

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.active != this.props.active) {
			if (this.props.active) this.openDetails();
			else this.closeDetails();
		}
	}

	_animateClosingAndOnCloseProp = () => {
		this.closeDetails();
		if (this.props.onClose != 'undefined' && this.props.onClose) this.props.onClose();
	};

	_animateToLargePanel = () => {
		Animated.spring(this.pan, {
			toValue: { x: 0, y: 0 },
			easing: Easing.bezier(0.05, 1.35, 0.2, 0.95),
			duration: 300
		}).start();
	};

	_animateToSmallPanel = () => {
		Animated.spring(this.pan, {
			toValue: { x: 0, y: FULL_HEIGHT - 400 },
			easing: Easing.bezier(0.05, 1.35, 0.2, 0.95),
			duration: 300
		}).start();
	};

	openDetails = () => {
		this.setState({ showComponent: true });
		Animated.timing(this.pan, {
			toValue: { x: 0, y: FULL_HEIGHT - 400 },
			easing: Easing.bezier(0.05, 1.35, 0.2, 0.95),
			duration: 600
		}).start();
		Animated.timing(this.state.opacity, {
			toValue: 1,
			easing: Easing.bezier(0.5, 0.5, 0.5, 0.5),
			duration: 300
		}).start();
		this.oldPan = { x: 0, y: FULL_HEIGHT - 400 };
	};

	closeDetails = () => {
		Animated.timing(this.pan, {
			toValue: { x: 0, y: FULL_HEIGHT },
			easing: Easing.bezier(0.05, 1.35, 0.2, 0.95),
			duration: 600
		}).start();
		Animated.timing(this.state.opacity, {
			toValue: 0,
			easing: Easing.bezier(0.5, 0.5, 0.5, 0.5),
			duration: 300
		}).start();
		setTimeout(() => {
			this.setState({ showComponent: false });
		}, 600);
	};

	render() {
		const { showComponent, opacity } = this.state;

		return showComponent ? (
			<Animated.View style={[ SwipeablePanelStyles.background, { opacity: opacity } ]}>
				<Animated.View
					style={[ SwipeablePanelStyles.container, { transform: this.pan.getTranslateTransform() } ]}
					{...this._panResponder.panHandlers}
				>
					<Bar />
					{this.props.children}
				</Animated.View>
			</Animated.View>
		) : null;
	}
}

export default SwipeablePanel;

const SwipeablePanelStyles = StyleSheet.create({
	background: {
		backgroundColor: 'rgba(0,0,0,0.5)',
		position: 'absolute',
		zIndex: 1,
		justifyContent: 'center',
		width: FULL_WIDTH,
		height: FULL_HEIGHT
	},
	container: {
		position: 'absolute',
		height: CONTAINER_HEIGHT,
		width: FULL_WIDTH - 50,
		transform: [ { translateY: FULL_HEIGHT - 100 } ],
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'flex-start',
		backgroundColor: 'white',
		bottom: 0,
		left: '5%',
		borderRadius: 20,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 1
		},
		shadowOpacity: 0.18,
		shadowRadius: 1.0,
		elevation: 1,
		zIndex: 2
	}
});
