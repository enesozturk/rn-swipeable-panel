import React from 'react';
import {View} from 'react-native';

import {SettingItem} from './components/SettingItem';
import {Seperator} from './components/Seperator';

type SettingsProps = {};

export const Settings = ({}: SettingsProps) => {
  return (
    <>
      <SettingItem title={'Settings'} isHeader />
      <SettingItem title={'Add To Favorites'} />
      <SettingItem title={'Remove'} isLast isRed />
    </>
  );
};
