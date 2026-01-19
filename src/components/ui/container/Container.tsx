import type { FC } from 'react';
import type { TContainerProps } from './types';
import styles from './Container.module.scss';

export const Container: FC<TContainerProps> = ({
	children,
	fixedWidth = false,
}: TContainerProps) => {
	return (
		<div className={fixedWidth ? styles.container : styles['container_fixed']}>
			{children}
		</div>
	);
};
