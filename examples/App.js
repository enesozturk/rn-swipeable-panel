/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-navigation";

import { Header } from "./components/Header";
import List from "./scenes/List";

import { Settings } from "./components/Settings";
import { About } from "./components/About";
import { Configurations } from "./components/Configurations";

import SwipeablePanel from "rn-swipeable-panel";

// For developement I use
//import SwipeablePanel from "./components/Panel/Panel";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      content: () => null,
      fullWidth: true,
      customPanel: false,
      customPanelState: {
        isOpen: false,
        openLarge: false,
        fullWidth: false,
        noBackgroundOpacity: false,
        closeButton: false
      }
    };
  }

  componentDidMount = () => {};

  openAboutPanel = () => {
    this.setState({
      isOpen: true,
      openLarge: true,
      closeButton: this.closePanel,
      noBackgroundOpacity: false,
      content: () => <About />
    });
  };

  openSettingsPanel = () => {
    this.setState({
      isOpen: true,
      openLarge: false,
      closeButton: this.closePanel,
      noBackgroundOpacity: false,
      content: () => <Settings />
    });
  };

  openConfigurationsPanel = () => {
    this.setState({
      customPanelState: { ...this.state.customPanelState, isOpen: true },
      content: () => (
        <Configurations
          state={this.state.customPanelState}
          changeState={this.changeCustomPanelState}
        />
      )
    });
  };

  changeCustomPanelState = state => {
    this.setState({ customPanelState: { ...state } });
  };

  openDefaultPanel = () => {
    this.setState({ isOpen: true, openLarge: false, content: () => null });
  };

  closePanel = () => {
    this.setState({
      customPanelState: { ...this.state.customPanelState, isOpen: false },
      isOpen: false,
      content: () => null
    });
  };

  render() {
    const panelState = this.state.customPanelState.isOpen
      ? this.state.customPanelState
      : this.state;

    return (
      <SafeAreaView style={styles.container}>
        <Header title={"Examples"} />
        <List
          openDefaultPanel={this.openDefaultPanel}
          openSettingsPanel={this.openSettingsPanel}
          openAboutPanel={this.openAboutPanel}
          openConfigurationsPanel={this.openConfigurationsPanel}
        />
        <SwipeablePanel
          bounceAnimation
          fullWidth={panelState.fullWidth}
          noBackgroundOpacity={panelState.noBackgroundOpacity}
          openLarge={panelState.openLarge}
          isActive={panelState.isOpen}
          onClose={this.closePanel}
          onPressCloseButton={panelState.closeButton ? this.closePanel : null}
        >
          {this.state.content()}
        </SwipeablePanel>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EEF4F6"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});
