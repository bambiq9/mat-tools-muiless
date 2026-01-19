import type { FC } from 'react';
import type { TButtonProps } from './types';
import styles from './Button.module.scss';
import { Loader } from '../loader';

export const Button: FC<TButtonProps> = ({
	IconLeft,
	IconRight,
	loading = false,
	color = 'primary',
	children,
	...props
}) => {
	const colorClass = `button_${color}`;
	const content = () => {
		if (loading)
			return (
				<>
					<div className={styles.button__icon}>{<Loader />}</div>
					{children}
				</>
			);

		if (IconLeft || IconRight) {
			return (
				<>
					{IconLeft && (
						<div className={styles.button__icon}>{<IconLeft />}</div>
					)}
					{children}
					{IconRight && (
						<div className={styles.button__icon}>{<IconRight />}</div>
					)}
				</>
			);
		}

		return children;
	};

	return (
		<button className={`${styles.button} ${styles[colorClass]}`} {...props}>
			{content()}
		</button>
	);
};
