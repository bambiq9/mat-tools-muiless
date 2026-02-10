import type { FC } from 'react';
import type { TModalUIProps } from './type';
import styles from './ModalUI.module.scss';
import { Typography } from '../typography';
import { Button } from '../button';
import { XIcon } from '@assets/svg/XIcon/XIcon';

export const ModalUI: FC<TModalUIProps> = ({ title, onClose, children }) => {
	return (
		<>
			<div className={styles.modal}>
				<div className={styles.header}>
					<Typography type='h2'>{title}</Typography>
					<Button className={styles['close-btn']} onClick={onClose}>
						<XIcon className={styles['close-icon']} />
					</Button>
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
