
<div align="center">
    <img src="https://github.com/enesozturk/rn-swipeable-panel/blob/master/screenshots/default.gif" width="200" height="400">
</div>

<br/>


<br/>
<div align="center"><h3>React Native Swipeable Panel<h3></div>
<div align="center">React Native Panel animates up and controllable with p
<div align="center">To see other examples <a href="https://github.com/enesozturk/rn-swipeable-panel/tree/master/examples">click here</a></div>

<br/>

<div align="center">

[![npm version](https://img.shields.io/npm/v/rn-swipeable-panel.svg)](https://www.npmjs.com/package/rn-swipeable-panel)
</div>
<br/>

React Native Swipeable Panel that animate from bottom and controllable with pan gestures. You can extend panel by swiping up, make it small or close by swiping down with pan gestures. Feel free to redesign inside of panel.


## Getting started
```
$ npm install rn-swipeable-panel --save
```

or

```
$ yarn add rn-swipeable-panel
```

<!-- ## Usage -->



## Example

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
        setTimeout(() => {
        	this.openPanel();
        }, 1000);
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

## Options
<br/>

| Properties                        | Type       | Description                                            | Default                                     |
| --------------------------------- | ---------- | ------------------------------------------------------ | ------------------------------------------- |
| **isActive**                      | `bool`     | Show/Hide the panel                                    | `false`                                   |
| **onClose**                       | `Function` | Fired when the panel is closed                         |                                             |
| **onPressCloseButton**            | `Function` | Use this if you want to show close button. *Using same function with onClose is recommended as example above*                         |                                             |
| **fullWidth**                     | `bool`     | Set true if you want to make full with panel           | `false`                                   |

#### Releases

- 1.0.2 - Initial release
- 1.0.3 - Full width option
- 1.0.4 - Prop and styling fixes
- 1.0.5 - Disable swipe up when panel is full open 
- 1.0.6 - Scrollable content and close button
- 1.0.7 - Changes for nested scrollview usage (Horizontal scrollview)
- 1.0.8 - Optional close button
- 1.0.9 - useNativeDriver for better performance

#### TODOs

- [x] Add full width option
- [x] Disable swipe up when panel is full open 
- [x] Scrollable content
- [x] Add close button
- [x] Horizontal scrollview inside the panel
- [x] Optional close button
- [x] Native driver for all animations for better performance