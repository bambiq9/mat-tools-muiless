import type { FC } from 'react';
import { Card } from '../card';
import { GearsIcon } from '@assets/svg/GearsIcon/GearsIcon';
import styles from './AssemblyUnitUI.module.scss';
import { Typography } from '../typography';
import { AssemblyUnitPartsList } from '@components/assembly-unit-parts-list';
import type { TAssemblyUnitProps } from './types';

export const AssemblyUnitUI: FC<TAssemblyUnitProps> = ({
	unit,
	isSelected,
	onCheckboxChange,
}) => {
	return (
		<Card
			className={[
				styles.card,
				!unit.active ? styles.archive : '',
				isSelected ? styles.selected : '',
			]
				.filter(Boolean)
				.join(' ')}
		>
			<div
				className={
					isSelected
						? `${styles['selection-checkbox']} ${styles.checked}`
						: styles['selection-checkbox']
				}
			>
				<input
					type='checkbox'
					checked={isSelected}
					onChange={(e) => {
						onCheckboxChange?.(e.target.checked);
					}}
					className={styles.checkbox}
				/>
			</div>
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
