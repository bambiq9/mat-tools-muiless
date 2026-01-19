import type { FC } from 'react';
import { Container } from '@components/ui/container';
import { Loader } from '@components/ui/loader';
import { Card } from '@components/ui/card';

export const InsulationListUI: FC = () => {
	return (
		<Container fixedWidth>
			<Loader />
			<Card title={'test'} />
		</Container>
	);
};
