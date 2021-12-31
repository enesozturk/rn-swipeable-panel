import * as React from 'react';

import type { SwipeablePanelProps } from 'rn-swipeable-panel';

type ContentType = null | 'about' | 'settings' | 'configurations' | 'darkShoppingCart';

const useSwipeablePanel = () => {
  const [panelState, setPanelState] = React.useState<SwipeablePanelProps & { contentType: ContentType }>({
    onClose: () => {},
    isActive: false,
    openLarge: false,
    onlyLarge: false,
    fullWidth: false,
    noBackgroundOpacity: false,
    closeOnTouchOutside: false,
    noBar: false,
    showCloseButton: false,
    onlySmall: false,
    allowTouchOutside: false,
    barStyle: {},
    barContainerStyle: {},
    style: {},
    closeRootStyle: {},
    contentType: null,
    smallPanelHeight: 400,
  });

  const changePanelState = React.useCallback(
    function (props) {
      setPanelState({
        ...panelState,
        ...props,
      });
    },
    [panelState],
  );

  function openAboutPanel() {
    changePanelState({
      isActive: true,
      openLarge: true,
      fullWidth: true,
      showCloseButton: true,
      panelStyles: {},
      contentType: 'about',
    });
  }

  function openSettingsPanel() {
    changePanelState({
      isActive: true,
      openLarge: false,
      fullWidth: true,
      showCloseButton: true,
      panelStyles: {},
      contentType: 'settings',
    });
  }

  function openConfigurationsPanel() {
    changePanelState({
      isActive: true,
      openLarge: false,
      fullWidth: false,
      showCloseButton: false,
      noBar: false,
      panelStyles: {},
      contentType: 'configurations',
    });
  }

  function openDarkPanel() {
    changePanelState({
      isActive: true,
      openLarge: false,
      fullWidth: true,
      showCloseButton: true,
      noBar: false,
      style: { backgroundColor: '#1f1f1f' },
      barStyle: { backgroundColor: 'rgba(255,255,255,0.2)' },
      barContainerStyle: { backgroundColor: '#1f1f1f' },
      closeRootStyle: { backgroundColor: 'rgba(255,255,255,0.2)' },
      contentType: 'darkShoppingCart',
    });
  }

  function openDefaultPanel() {
    changePanelState({
      isActive: true,
      openLarge: false,
    });
  }

  function closePanel() {
    changePanelState({
      isActive: false,
    });
  }

  return {
    panelState,
    changePanelState,
    openAboutPanel,
    openSettingsPanel,
    openConfigurationsPanel,
    openDarkPanel,
    openDefaultPanel,
    closePanel,
  };
};

export default useSwipeablePanel;
