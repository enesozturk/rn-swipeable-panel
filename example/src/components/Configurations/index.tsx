import React from 'react';
import { StyleSheet, View, Text, Switch } from 'react-native';
import { material } from 'react-native-typography';

type ConfigurationsProps = {
  state: any;
  changeState: Function;
};

export const Configurations = ({ state, changeState }: ConfigurationsProps) => {
  return (
    <React.Fragment>
      <View
        style={[
          Styles.configurationItem,
          {
            justifyContent: 'center',
            borderBottomWidth: 1,
            borderBottomColor: 'rgba(0,0,0,0.1)',
          },
        ]}
      >
        <Text style={material.headline}>Configurations</Text>
      </View>
      <View style={Styles.configurationItem}>
        <Text style={Styles.configurationTitle}>Is Open</Text>
        <Switch value={state.isActive} disabled />
      </View>
      <View style={Styles.configurationItem}>
        <Text style={Styles.configurationTitle}>Full Width</Text>
        <Switch value={state.fullWidth} onValueChange={(value) => changeState({ fullWidth: value })} />
      </View>
      <View style={Styles.configurationItem}>
        <Text style={Styles.configurationTitle}>Close Button</Text>
        <Switch
          value={state.showCloseButton}
          onValueChange={(value) =>
            changeState({
              showCloseButton: value,
            })
          }
        />
      </View>
      <View style={Styles.configurationItem}>
        <Text style={Styles.configurationTitle}>No Background Opacity</Text>
        <Switch
          value={state.noBackgroundOpacity}
          onValueChange={(value) => changeState({ noBackgroundOpacity: value })}
        />
      </View>
      <View style={Styles.configurationItem}>
        <Text style={Styles.configurationTitle}>Close on touch outside</Text>
        <Switch
          value={state.closeOnTouchOutside}
          onValueChange={(value) => changeState({ closeOnTouchOutside: value })}
        />
      </View>
      <View style={Styles.configurationItem}>
        <Text style={Styles.configurationTitle}>Allow outside touch</Text>
        <Switch value={state.allowTouchOutside} onValueChange={(value) => changeState({ allowTouchOutside: value })} />
      </View>
    </React.Fragment>
  );
};

export const Styles = StyleSheet.create({
  configurationItem: {
    width: '100%',
    marginBottom: 10,
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  configurationTitle: { ...material.subheading },
});
