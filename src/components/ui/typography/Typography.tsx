import type { FC } from 'react';
import type { TElementData, TTypographyProps, TTypographyTypes } from './types';
import styles from './Typography.module.scss';

const typographyTypeElementMap: Record<TTypographyTypes, TElementData> = {
	text: {
		tag: 'p',
		class: 'text',
	},
	subtitle: {
		tag: 'span',
		class: 'subtitle',
	},
	h1: {
		tag: 'h1',
		class: 'h1',
	},
	h2: {
		tag: 'h2',
		class: 'h2',
	},
	h3: {
		tag: 'h3',
		class: 'h3',
	},
};

export const Typography: FC<TTypographyProps> = ({
	children,
	type = 'text',
	align = 'left',
	className,
}) => {
	const TypographyComponent = typographyTypeElementMap[type].tag;
	const style = typographyTypeElementMap[type].class;

	return (
		<TypographyComponent
			className={
				align
					? `${className} ${styles[style]} ${styles[align]}`
					: `${className} ${styles.typograph}`
			}
		>
			{children}
		</TypographyComponent>
	);
};
