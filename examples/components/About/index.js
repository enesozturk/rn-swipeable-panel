import React from 'react';

import { Title } from '../About/components/Title';
import { Details } from '../About/components/Details';

export const About = ({}) => {
	return (
		<React.Fragment>
			<Title title="About" />
			<Details />
		</React.Fragment>
	);
};
