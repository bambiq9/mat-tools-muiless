import { AssemblyUnit } from '@components/ui/assembly-unit';
import { Container } from '@components/ui/container';
import type { FC } from 'react';
import type { TAssemblyUnitsListUIProps } from './type';
import styles from './AssemblyUnitsListUI.module.scss';

export const AssemblyUnitsListUI: FC<TAssemblyUnitsListUIProps> = ({
	units,
}) => {
	return (
		<Container className={styles.container}>
			{units.map((unit) => (
				<AssemblyUnit key={unit.id} unit={unit} />
			))}
		</Container>
	);
};
