import type { ReactNode } from 'react';

export type TCardProps = {
	title: string;
	img?: string;
	hover?: boolean;
	actions?: ReactNode;
	children?: ReactNode;
};
