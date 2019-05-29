import React from 'react';
import { StyleSheet, Animated, Dimensions, PanResponder, Easing } from 'react-native';

export const fullHeight = Dimensions.get('window').height;

const Bar = ({}) => {
	return <View style={BarStyles.bar} />;
};

class BottomUpDetails extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showComponent: false,
			opacity: new Animated.Value(0)
		};
		this.pan = new Animated.ValueXY({ x: 0, y: fullHeight });
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

				if (distance < -100) {
					Animated.spring(this.pan, {
						toValue: { x: 0, y: fullHeight },
						easing: Easing.bezier(0.05, 1.35, 0.2, 0.95),
						duration: 300
					}).start();
					this.props.setBottomUpDetailsState(false);
				} else if (distance > 0 && distance > 50) {
					Animated.spring(this.pan, {
						toValue: { x: 0, y: 0 },
						easing: Easing.bezier(0.05, 1.35, 0.2, 0.95),
						duration: 300
					}).start();
				} else {
					Animated.spring(this.pan, {
						toValue: { x: 0, y: fullHeight - 400 },
						easing: Easing.bezier(0.05, 1.35, 0.2, 0.95),
						duration: 300
					}).start();
				}
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

	openDetails = () => {
		this.setState({ showComponent: true });
		Animated.timing(this.pan, {
			toValue: { x: 0, y: fullHeight - 400 },
			easing: Easing.bezier(0.05, 1.35, 0.2, 0.95),
			duration: 600
		}).start();
		Animated.timing(this.state.opacity, {
			toValue: 1,
			easing: Easing.bezier(0.5, 0.5, 0.5, 0.5),
			duration: 300
		}).start();
		this.oldPan = { x: 0, y: fullHeight - 400 };
	};

	closeDetails = () => {
		Animated.timing(this.pan, {
			toValue: { x: 0, y: fullHeight },
			easing: Easing.bezier(0.24, 1.08, 0.65, 0.92),
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
			<Animated.View style={[ BottomUpDetailStyles.background, { opacity: opacity } ]}>
				<Animated.View
					style={[ BottomUpDetailStyles.container, { transform: this.pan.getTranslateTransform() } ]}
					{...this._panResponder.panHandlers}
				>
					<Bar />
					{this.props.children}
				</Animated.View>
			</Animated.View>
		) : null;
	}
}

export default BottomUpDetails;

const BarStyles = StyleSheet.create({
	bar: {
		width: '60%',
		height: 6,
		borderRadius: 5,
		marginTop: 10,
		marginBottom: 10,
		backgroundColor: '#e2e2e2'
	}
});

const BottomUpDetailStyles = StyleSheet.create({
	background: {
		backgroundColor: 'rgba(0,0,0,0.5)',
		position: 'absolute',
		zIndex: 1,
		justifyContent: 'center',
		width: fullWidth,
		height: fullHeight
	},
	container: {
		position: 'absolute',
		height: containerHeight,
		width: fullWidth - 50,
		transform: [ { translateY: fullHeight - 100 } ],
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
