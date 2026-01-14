import type { FC } from 'react';
import type { TButtonProps } from './types';
import styles from './Button.module.scss';

export const Button: FC<TButtonProps> = ({
	iconLeft,
	iconRight,
	loading = false,
	color = 'primary',
	children,
	...props
}) => {
	const colorClass = `button_${color}`;
	const content = () => {
		if (loading) return 'loading';

		if (iconLeft || iconRight)
			return (
				<>
					{iconLeft || null}
					{children}
					{iconRight || null}
				</>
			);

		return children;
	};

	return (
		<button className={`${styles.button} ${styles[colorClass]}`} {...props}>
			{content()}
		</button>
	);
};
