import type { ElementType, ReactNode } from 'react';

export type TTypographyTypes = 'h1' | 'h2' | 'h3' | 'text' | 'subtitle';

export type TElementData = {
	tag: ElementType;
	class: string;
};

export type TTypographyProps = {
	type?: TTypographyTypes;
	align?: 'left' | 'center' | 'right';
	className?: string;
	children: ReactNode;
};
