import type { FC } from 'react';
import { Card } from '@components/ui/card';
import { Container } from '@components/ui/container';

export const InsulationListUI: FC = () => {
	return (
		<Container fixedWidth>
			<Card title='Card Title' hover={false}>
				test
			</Card>
			<Card title='Card Title' hover={false}>
				test
			</Card>
			<Card title='Card Title' hover={false}>
				test
			</Card>
		</Container>
	);
};
