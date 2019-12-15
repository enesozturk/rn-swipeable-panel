/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-navigation";

import { Header } from "./components/Header";
import List from "./scenes/List";

import { Settings } from "./components/Settings";
import { About } from "./components/About";
import { Configurations } from "./components/Configurations";

//import SwipeablePanel from "rn-swipeable-panel";

// For developement I use
import SwipeablePanel from "./components/Panel/Panel";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: () => null,
      isActive: false,
      openLarge: false,
      onlyLarge: false,
      fullWidth: false,
      noBackgroundOpacity: false,
      closeButton: null,
      bounceAnimation: false,
      closeOnTouchOutside: false,
      button: null
    };
  }

  openAboutPanel = () => {
    this.setState({
      isActive: true,
      openLarge: true,
      fullWidth: true,
      showCloseButton: true,
      content: () => <About />
    });
  };

  openSettingsPanel = () => {
    this.setState({
      isActive: true,
      openLarge: false,
      fullWidth: false,
      bounceAnimation: true,
      showCloseButton: true,
      content: () => <Settings />
    });
  };

  changeState = state => {
    this.setState({ ...state });
  };

  openDefaultPanel = () => {
    this.setState({ isActive: true, openLarge: false, content: () => null });
  };

  closePanel = () => {
    this.setState({
      isActive: false,
      bounceAnimation: false
    });
  };

  render() {
    const {
      button,
      isActive,
      showCloseButton,
      closeOnTouchOutside,
      bounceAnimation,
      fullWidth,
      noBackgroundOpacity,
      openLarge
    } = this.state;

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
          fullWidth
          openLarge={openLarge}
          showCloseButton
          isActive={isActive}
          closeOnTouchOutside
          onClose={() => {
            this.setState({ isActive: false });
          }}
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
    backgroundColor: "#82B7E9"
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
