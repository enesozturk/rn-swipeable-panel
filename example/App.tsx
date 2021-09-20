import * as React from 'react';
import { SafeAreaView } from 'react-native';

import { SwipeablePanel } from 'rn-swipeable-panel';

import { Header } from './src/components/Header';
import { PanelContent } from './src/components/PanelContent';
import useSwipeablePanel from './src/hooks/useSwipeablePanel';
import List from './src/screens/List';

export default function App() {
  const {
    panelState,
    changePanelState,
    openAboutPanel,
    openSettingsPanel,
    openConfigurationsPanel,
    openDarkPanel,
    openDefaultPanel,
    closePanel,
  } = useSwipeablePanel();

  return (
    <>
      <SafeAreaView>
        <Header title="Examples" />
        <List
          openDefaultPanel={openDefaultPanel}
          openSettingsPanel={openSettingsPanel}
          openAboutPanel={openAboutPanel}
          openConfigurationsPanel={openConfigurationsPanel}
          openDarkPanel={openDarkPanel}
        />
      </SafeAreaView>
      <SwipeablePanel {...panelState} onClose={closePanel}>
        <PanelContent
          contentType={panelState.contentType}
          panelState={panelState}
          changePanelState={changePanelState}
        />
      </SwipeablePanel>
    </>
  );
}
