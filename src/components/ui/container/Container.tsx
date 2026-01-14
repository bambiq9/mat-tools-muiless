import type { FC } from 'react';
import type { TContainerProps } from './types';
import styles from './Container.module.scss';

export const Container: FC<TContainerProps> = ({
	children,
	fixedWidth = false,
}: TContainerProps) => {
	return (
		<div
			className={styles.container}
			style={{ maxWidth: fixedWidth ? '500px' : 'none' }}
		>
			{children}
		</div>
	);
};
