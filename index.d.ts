import * as React from 'react';

export interface SwipeablePanelProps extends React.Props<SwipeablePanel> {
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
  barStyle: object;
  allowTouchOutside?: boolean;
}

declare class SwipeablePanel extends React.Component<SwipeablePanelProps, any> {}

declare module 'rn-swipeable-panel' {}

export default SwipeablePanel;
