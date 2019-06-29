import React from 'react';

import { Title } from './components/Title';
import { Details } from './components/Details';
import { Seperator } from './components/Seperator';

export const PanelContent = ({}) => {
	return (
		<React.Fragment>
			<Title />
			<Seperator />
			<Details />
		</React.Fragment>
	);
};
