import type { FC } from 'react';
import type { TCardProps } from './types';
import styles from './Card.module.scss';

export const Card: FC<TCardProps> = ({ children }) => {
	return <div className={styles.card}>{children}</div>;
};
