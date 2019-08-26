
<div align="center">
    <img src="https://user-images.githubusercontent.com/19428358/63675284-1da66280-c7f1-11e9-98d6-d6577fee4798.gif" width="auto" height="600">
</div>
<br/>

<div align="center"><h3>React Native Swipeable Panel<h3></div>
<div align="center">React Native Panel animates up and controllable with pan gestures</div>
<div align="center">To see other examples <a href="https://github.com/enesozturk/rn-swipeable-panel/tree/master/examples">click here</a></div>

<br/>

<div align="center">

[![npm version](https://img.shields.io/npm/v/rn-swipeable-panel.svg)](https://www.npmjs.com/package/rn-swipeable-panel)

</div>

<br/>

React Native Swipeable Panel that animate from bottom and controllable with pan gestures. You can extend panel by swiping up, make it small or close by swiping down with pan gestures. Feel free to redesign inside of panel


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
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import SwipeablePanel from 'rn-swipeable-panel';


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

| Properties                        | Type       | Description                                            | Default                                     |
| --------------------------------- | ---------- | ------------------------------------------------------ | ------------------------------------------- |
| **isActive**                      | `bool`     | Show/Hide the panel                                    | `false`                                   |
| **onClose**                       | `Function` | Fired when the panel is closed                         |                                             |
| **onPressCloseButton**            | `Function` | Use this if you want to show close button. *Using same function with onClose is recommended as example above*                         |                                             |
| **fullWidth**                     | `bool`     | Set true if you want to make full with panel           | `false`                                   |
| **openLarge**                     | `bool`     | Set true if you want to open panel large by default           | `false`                                   |
| **noBackgroundOpacity**                     | `bool`     | Set true if you want to disable black background opacity           | `false`                                   |

#### 📦 Releases

- 1.0.2 - Initial release
- 1.0.3 - Full width option
- 1.0.4 - Prop and styling fixes
- 1.0.5 - Disable swipe up when panel is full open 
- 1.0.6 - Scrollable content and close button
- 1.0.7 - Changes for nested scrollview usage (Horizontal scrollview)
- 1.0.8 - Optional close button
- 1.0.9 - useNativeDriver for better performance
- 1.0.11 - openLarge parameter added
- 1.0.11 - Added noBackgroundOpacity parameter

#### ☑️ TODOs

- [x] Add full width option
- [x] Disable swipe up when panel is full open 
- [x] Scrollable content
- [x] Add close button
- [x] Horizontal scrollview inside the panel
- [x] Optional close button
- [x] Native driver for all animations for better performance
- [x] Open large panel by default
- [x] Add option to disable black background opacity

#### ⭐️ Show Your Support
Please give a ⭐️ if this project helped you!

#### 👏 Contributing

If you have any questions or requests or want to contribute to `rn-swipeable-panel`, please write the [issue](https://github.com/enesozturk/rn-swipeable-panel/issues) or give me a Pull Request freely.