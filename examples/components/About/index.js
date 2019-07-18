import React from 'react';

import { Title } from '../About/components/Title';
import { Details } from '../About/components/Details';
import { Seperator } from '../About/components/Seperator';

export const About = ({}) => {
	return (
		<React.Fragment>
			<Title />
			<Seperator />
			<Details />
		</React.Fragment>
	);
};
