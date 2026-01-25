import type { FC } from 'react';
import type { TCardProps } from './types';
import styles from './Card.module.scss';

export const Card: FC<TCardProps> = ({ children, className }) => {
	return (
		<div className={className ? `${className} ${styles.card}` : styles.card}>
			{children}
		</div>
	);
};
