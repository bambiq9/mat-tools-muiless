import type { FC } from 'react';
import styles from './InputUI.module.scss';
import type { TInputUIProps } from './types';

export const InputUI: FC<TInputUIProps> = ({
	type = 'text',
	className = '',
	IconLeft = null,
	IconRight = null,
	...props
}) => {
	const textInputElement = () => (
		<input className={`${styles.input} ${className}`} type={type} {...props} />
	);

	const content = () => {
		if (IconLeft || IconRight) {
			return (
				<div className={styles.wrapper}>
					{IconLeft && (
						<div className={`${styles.icon} ${styles['icon_left']}`}>
							{<IconLeft />}
						</div>
					)}
					{textInputElement()}
					{IconRight && (
						<div className={`${styles.icon} ${styles['icon_right']}`}>
							{<IconRight />}
						</div>
					)}
				</div>
			);
		}

		return textInputElement();
	};

	return content();
};
