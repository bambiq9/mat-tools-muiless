import type { FC } from 'react';
import type { TCardProps } from './types';
import styles from './Card.module.scss';
import { Typography } from '../typography';
import { Button } from '../button';

export const Card: FC<TCardProps> = ({
	title,
	img,
	actions,
	hover = true,
	children,
}) => {
	return (
		<div
			className={
				hover ? `${styles.card} ${styles['card-hoverable']}` : styles.card
			}
		>
			<Typography type='h3' align='left'>
				{title}
			</Typography>
			{img && <img src={img} alt={title} />}
			<Typography type='body' align='left'>
				{children}
			</Typography>
			{actions && actions}
			<Button loading={true}>Test</Button>
		</div>
	);
};
