import type { ReactNode } from 'react';

export type TTypographyTypes =
	| 'h1'
	| 'h2'
	| 'h3'
	| 'body'
	| 'quote'
	| 'caption';

export type TTypographyProps = {
	type?: TTypographyTypes;
	align?: 'left' | 'center' | 'right';
	children: ReactNode;
};
