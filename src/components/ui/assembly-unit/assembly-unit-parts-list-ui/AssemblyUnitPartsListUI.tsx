import type { FC } from 'react';
import styles from './AssemblyUnitPartsListUI.module.scss';
import { WrenchIcon } from '@assets/svg/WrenchIcon/WrenchIcon';
import type { TAssemblyUnitPartsListUIProps } from './types';
import { Typography } from '@components/ui/typography';
import { PartIcon } from '@assets/svg/PartIcon/PartIcon';
import type { TAssemblyUnitCardPart } from '@utils/types';

export const AssemblyUnitPartsListUI: FC<TAssemblyUnitPartsListUIProps> = ({
	parts,
}) => {
	return (
		<div className={styles['parts-list__wrapper']}>
			<div className={styles['parts-list__title']}>
				<div className={styles['parts-list__title-icon']}>
					<WrenchIcon />
				</div>
				Состав:
			</div>
			<ul className={styles['parts-list__list']}>
				{parts.map((part) => (
					<AssemlutUnitPart key={part.partId} part={part} />
				))}
			</ul>
		</div>
	);
};

export const AssemlutUnitPart = ({ part }: { part: TAssemblyUnitCardPart }) => {
	return (
		<li key={part.partId} className={styles['part__wrapper']}>
			<div className={styles['part__info']}>
				<div className={styles['part__icon']}>
					<PartIcon />
				</div>
				<Typography>{part.name}</Typography>
			</div>
			<div className={styles['part__quantity']}>
				<Typography type='subtitle'>{part.quantity} шт</Typography>
			</div>
		</li>
	);
};
