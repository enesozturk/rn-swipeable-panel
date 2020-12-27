/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, StatusBar} from 'react-native';
import {SafeAreaView} from 'react-navigation';

import {Header} from './components/Header';
import List from './scenes/List';

import {Settings} from './components/Settings';
import {About} from './components/About';
import {Configurations} from './components/Configurations';
import {DarkPanel} from './components/DarkShoppingCart';

import {SwipeablePanel} from 'rn-swipeable-panel';
// import {SwipeablePanel} from './components/Panel/Panel';

export type AppState = {
  content: Function;
  isActive: boolean;
  openLarge: boolean;
  onlyLarge: boolean;
  fullWidth: boolean;
  noBar: boolean;
  barStyle: Object;
  showCloseButton: boolean;
  noBackgroundOpacity: boolean;
  bounceAnimation: boolean;
  closeOnTouchOutside: boolean;
  onlySmall: boolean;
  allowTouchOutside: boolean;
  panelStyles: Object;
};

export default class App extends Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      content: () => null,
      isActive: false,
      openLarge: false,
      onlyLarge: false,
      fullWidth: false,
      noBackgroundOpacity: false,
      bounceAnimation: false,
      closeOnTouchOutside: false,
      noBar: false,
      showCloseButton: false,
      onlySmall: false,
      allowTouchOutside: false,
      barStyle: {},
      panelStyles: {},
    };
  }

  openAboutPanel = () => {
    this.setState({
      isActive: true,
      openLarge: true,
      fullWidth: true,
      showCloseButton: true,
      panelStyles: {},
      content: () => <About />,
    });
  };

  openSettingsPanel = () => {
    this.setState({
      isActive: true,
      openLarge: false,
      fullWidth: true,
      showCloseButton: true,
      panelStyles: {},
      content: () => <Settings />,
    });
  };

  openConfigurationsPanel = () => {
    this.setState({
      isActive: true,
      openLarge: false,
      fullWidth: false,
      showCloseButton: false,
      noBar: false,
      panelStyles: {},
      content: () => (
        <Configurations state={this.state} changeState={this.changeState} />
      ),
    });
  };

  openDarkPanel = () => {
    this.setState({
      isActive: true,
      openLarge: false,
      fullWidth: true,
      showCloseButton: true,
      noBar: false,
      panelStyles: {
        style: {backgroundColor: '#1f1f1f'},
        barStyle: {backgroundColor: 'rgba(255,255,255,0.2)'},
        closeRootStyle: {backgroundColor: 'rgba(255,255,255,0.2)'},
      },
      content: () => <DarkPanel />,
    });
  };

  changeState = (state: any) => {
    this.setState(state);
  };

  openDefaultPanel = () => {
    this.setState({isActive: true, openLarge: false, content: () => null});
  };

  closePanel = () => {
    this.setState({
      isActive: false,
      fullWidth: false,
      openLarge: false,
      showCloseButton: false,
      noBackgroundOpacity: false,
      closeOnTouchOutside: false,
      noBar: false,
    });
  };

  render() {
    return (
      <SafeAreaView style={Styles.container}>
        <StatusBar barStyle="dark-content" />
        <Header title={'Examples'} />
        <List
          openDefaultPanel={this.openDefaultPanel}
          openSettingsPanel={this.openSettingsPanel}
          openAboutPanel={this.openAboutPanel}
          openConfigurationsPanel={this.openConfigurationsPanel}
          openDarkPanel={this.openDarkPanel}
        />
        <SwipeablePanel
          {...this.state}
          {...this.state.panelStyles}
          onClose={() => this.setState({isActive: false})}>
          {this.state.content()}
        </SwipeablePanel>
      </SafeAreaView>
    );
  }
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
  },
});
