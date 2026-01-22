import type { FC } from 'react';
import { Card } from '../card';
import { GearsIcon } from '@assets/svg/GearsIcon/GearsIcon';
import styles from './AssemblyUnit.module.scss';
import { Typography } from '../typography';
import { AssemblyUnitPartsList } from '@components/assembly-unit-parts-list';
import type { TAssemblyUnitProps } from './types';

export const AssemblyUnit: FC<TAssemblyUnitProps> = ({ unit }) => {
	return (
		<Card>
			<div className={styles.header}>
				<div className={styles.header__icon}>
					<GearsIcon />
				</div>
				<div className={styles.header__title}>
					<Typography type='h3'>{unit.name}</Typography>
					{unit.blueprint.id && (
						<Typography type='subtitle'>{unit.blueprint.id}</Typography>
					)}
				</div>
			</div>
			<div className={styles.description}>
				<Typography>{unit.description}</Typography>
			</div>
			<AssemblyUnitPartsList parts={unit.partsList} />
		</Card>
	);
};
