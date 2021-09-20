import React from 'react';

import { About } from '../About';
import { Configurations } from '../Configurations';
import { DarkPanel } from '../DarkShoppingCart';
import { Settings } from '../Settings';

type PanelContentProps = {
  contentType: null | 'about' | 'settings' | 'configurations' | 'darkShoppingCart';
  panelState: any;
  changePanelState: (args: any) => any;
};

export const PanelContent = ({ contentType, panelState, changePanelState }: PanelContentProps) => {
  switch (contentType) {
    case 'about':
      return <About />;
    case 'settings':
      return <Settings />;
    case 'configurations':
      return <Configurations state={panelState} changeState={changePanelState} />;
    case 'darkShoppingCart':
      return <DarkPanel />;
    default:
      return null;
  }
};
