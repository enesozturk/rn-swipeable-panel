import React from 'react';

import {Title} from './components/Title';
import {Details} from './components/Details';

export const About = () => {
  return (
    <React.Fragment>
      <Title title="About" />
      <Details />
    </React.Fragment>
  );
};
