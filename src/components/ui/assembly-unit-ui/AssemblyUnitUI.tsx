import type { FC } from 'react';
import { Card } from '../card';
import { GearsIcon } from '@assets/svg/GearsIcon/GearsIcon';
import styles from './AssemblyUnitUI.module.scss';
import { Typography } from '../typography';
import { AssemblyUnitPartsList } from '@components/assembly-unit-parts-list';
import type { TAssemblyUnitProps } from './types';
import { EditButton } from '../edit-button';
import { Link } from 'react-router-dom';

export const AssemblyUnitUI: FC<TAssemblyUnitProps> = ({
	unit,
	isSelected,
	onCheckboxChange,
	locationState,
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
			<Link state={locationState} to={`/assembly-units-list/edit/${unit.id}`}>
				<EditButton className={styles.editButtonWrapper} />
			</Link>
			<div className={styles.header}>
				<div className={styles.header__icon}>
					<GearsIcon />
				</div>
				<div className={styles.header__title}>
					<Typography type='h3'>{unit.name}</Typography>
					{unit.blueprint?.id && (
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
