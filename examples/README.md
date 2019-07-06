## Default

```javascript
return(
    <SwipeablePanel
        isActive={this.state.swipeablePanelActive}
        onClose={this.closePanel}>
            <PanelContent /> {/* Your Content Here */} 
    </SwipeablePanel>
)
```

#### Result
<div>
    <img src="https://github.com/enesozturk/rn-swipeable-panel/blob/master/screenshots/default.gif" width="200" height="400">
</div>
<br/>

## Full Width

```javascript
return(
    <SwipeablePanel
        fullWidth
        isActive={this.state.swipeablePanelActive}
        onClose={this.closePanel}>
            <PanelContent /> {/* Your Content Here */} 
    </SwipeablePanel>
)
```

#### Result
<div>
    <img src="https://github.com/enesozturk/rn-swipeable-panel/blob/master/screenshots/fullWidth.gif" width="200" height="400">
</div>
<br/>

## Close Button

```javascript
return(
    <SwipeablePanel
        fullWidth
        isActive={this.state.swipeablePanelActive}
        onClose={this.closePanel}
        onPressCloseButton={this.closePanel}
        >
            <PanelContent /> {/* Your Content Here */} 
    </SwipeablePanel>
)
```

#### Result
<div>
    <img src="https://github.com/enesozturk/rn-swipeable-panel/blob/master/screenshots/closeButton.gif" width="200" height="400">
</div>
<br/>