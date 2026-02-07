import { EditIcon } from '@assets/svg/EditIcon/EditIcon';
import styles from './EditButton.module.scss';
import type { FC } from 'react';

export const EditButton: FC<{ className?: string }> = ({ className = '' }) => {
	return (
		<button className={`${styles['edit-button']} ${className}`}>
			<EditIcon />
		</button>
	);
};
