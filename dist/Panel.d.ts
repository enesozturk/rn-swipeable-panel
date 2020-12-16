import { Component } from 'react';
import { Animated, ScrollViewProps } from 'react-native';
declare type SwipeablePanelProps = {
    isActive: boolean;
    onClose: () => void;
    showCloseButton?: boolean;
    fullWidth?: boolean;
    noBackgroundOpacity?: boolean;
    style?: object;
    closeRootStyle?: object;
    closeIconStyle?: object;
    closeOnTouchOutside?: boolean;
    onlyLarge?: boolean;
    onlySmall?: boolean;
    openLarge?: boolean;
    noBar?: boolean;
    barStyle?: object;
    allowTouchOutside?: boolean;
    scrollViewProps?: ScrollViewProps;
};
declare type SwipeablePanelState = {
    status: number;
    isActive: boolean;
    showComponent: boolean;
    canScroll: boolean;
    opacity: Animated.Value;
    pan: any;
    orientation: 'portrait' | 'landscape';
    deviceWidth: number;
    deviceHeight: number;
    panelHeight: number;
};
declare class SwipeablePanel extends Component<SwipeablePanelProps, SwipeablePanelState> {
    pan: Animated.ValueXY;
    isClosing: boolean;
    _panResponder: any;
    animatedValueY: number;
    constructor(props: SwipeablePanelProps);
    componentDidMount: () => void;
    _onOrientationChange: () => void;
    componentDidUpdate(prevProps: SwipeablePanelProps, prevState: SwipeablePanelState): void;
    _animateTo: (newStatus?: number) => void;
    render(): JSX.Element | null;
}
declare const SMALL_PANEL_CONTENT_HEIGHT: number;
declare const LARGE_PANEL_CONTENT_HEIGHT: number;
export { SwipeablePanel, LARGE_PANEL_CONTENT_HEIGHT, SMALL_PANEL_CONTENT_HEIGHT };
