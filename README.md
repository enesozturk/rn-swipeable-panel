<div align="center">

<img style="margin-right:1em" src="./rn-swipeable-panel.png" width="150" height="150">

<h1>React Native Swipeable Panel</h1>

**rn-swipeable-panel** ise swipeable, easy to use bottom panel for your React Native projects. You can extend panel by swiping up, make it small or close by swiping down with pan gestures. Feel free to redesign inside of the panel.

[![npm version](https://img.shields.io/npm/v/rn-swipeable-panel.svg)](https://www.npmjs.com/package/rn-swipeable-panel)

</div>

<br/>

<div align="center" style="margin-bottom:1em">
    <img src="rn-swipeable-panel.gif" width="auto" height="600"/>
</div>

<br/>

## ⚙️ Installation

```
$ npm install rn-swipeable-panel --save
```

or

```
$ yarn add rn-swipeable-panel
```

<!-- ## Usage -->

## 🚀 How to use

```javascript
import React from "react";
import { StyleSheet, Text, View } from "react-native";

import SwipeablePanel from "rn-swipeable-panel";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      swipeablePanelActive: false
    };
  }

  componentDidMount = () => {
    this.openPanel();
  };

  openPanel = () => {
    this.setState({ swipeablePanelActive: true });
  };

  closePanel = () => {
    this.setState({ swipeablePanelActive: false });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <SwipeablePanel
          fullWidth
          isActive={this.state.swipeablePanelActive}
          onClose={this.closePanel}
          onPressCloseButton={this.closePanel}
        >
          <PanelContent /> {/* Your Content Here */}
        </SwipeablePanel>
      </View>
    );
  }
}
```

## ☝️ Options

<br/>

| Properties              | Type       | Description                                              | Default |
| ----------------------- | ---------- | -------------------------------------------------------- | ------- |
| **isActive**            | `bool`     | Show/Hide the panel                                      | `false` |
| **onClose**             | `Function` | Fired when the panel is closed                           |         |
| **showCloseButton**     | `bool`     | Set true if you want to show close button                |         |
| **fullWidth**           | `bool`     | Set true if you want to make full with panel             | `false` |
| **openLarge**           | `bool`     | Set true if you want to open panel large by default      | `false` |
| **onlyLarge**           | `bool`     | Set true if you want to let panel open just large mode   | `false` |
| **noBackgroundOpacity** | `bool`     | Set true if you want to disable black background opacity | `false` |
| **style**               | `Object`   | Use this prop to override panel style                    | `{}`    |
| **closeRootStyle**      | `Object`   | Use this prop to override close button background style  | `{}`    |
| **closeIconStyle**      | `Object`   | Use this prop to override close button icon style        | `{}`    |
| **barStyle**            | `Object`   | Use this prop to override bar style                      | `{}`    |
| **closeOnTouchOutside** | `bool`     | Set true if you want to close panel by touching outside  | `false` |
| **noBar**               | `bool`     | Set true if you want to remove gray bar                  | `false` |

#### ⭐️ Show Your Support

Please give a ⭐️ if this project helped you!

#### 👏 Contributing

If you have any questions or requests or want to contribute to `rn-swipeable-panel`, please write the [issue](https://github.com/enesozturk/rn-swipeable-panel/issues) or give me a Pull Request freely.
