import type { ElementType, FC } from 'react';
import type { TTypographyProps, TTypographyTypes } from './types';
import styles from './Typography.module.scss';

const typographyTypeElementMap: Record<TTypographyTypes, ElementType> = {
	body: 'p',
	caption: 'figcaption',
	quote: 'blockquote',
	h1: 'h1',
	h2: 'h2',
	h3: 'h3',
};

export const Typography: FC<TTypographyProps> = ({
	children,
	type = 'body',
	align = 'left',
}) => {
	const TypographyComponent = typographyTypeElementMap[type];

	return (
		<TypographyComponent
			className={
				align ? `${styles.typography} ${styles[align]}` : styles.typography
			}
		>
			{children}
		</TypographyComponent>
	);
};
