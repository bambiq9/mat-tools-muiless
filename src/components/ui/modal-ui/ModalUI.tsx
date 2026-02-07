import type { FC } from 'react';
import type { TModalUIProps } from './type';
import styles from './ModalUI.module.scss';
import { Typography } from '../typography';

export const ModalUI: FC<TModalUIProps> = ({ title, onClose, children }) => {
	return (
		<>
			<div className={styles.modal}>
				<div className={styles.header}>
					<Typography type='h2'>{title}</Typography>
				</div>
				<div className={styles.body}>{children}</div>
			</div>
			<div
				className={styles.overlay}
				onClick={onClose}
				role='presentation'
			></div>
		</>
	);
};
