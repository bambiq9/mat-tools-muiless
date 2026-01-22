import type { FC } from 'react';
import type { TContainerProps } from './types';
import styles from './Container.module.scss';

export const Container: FC<TContainerProps> = ({
	children,
	fixedWidth = false,
	className,
}: TContainerProps) => {
	return (
		<div
			className={
				fixedWidth
					? `${styles['container_fixed']} ${className}`
					: `${styles.container} ${className}`
			}
		>
			{children}
		</div>
	);
};
