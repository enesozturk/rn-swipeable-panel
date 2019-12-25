import React from 'react';
import {View} from 'react-native';

import {SettingItem} from './components/SettingItem';
import {Seperator} from './components/Seperator';

export const Settings = ({item, settingMethods}) => {
  return (
    <React.Fragment>
      <SettingItem title={'Settings'} isHeader />
      <SettingItem title={'Add To Favorites'} item={item} />
      <SettingItem title={'Remove'} item={item} isLast isRed />
    </React.Fragment>
  );
};
