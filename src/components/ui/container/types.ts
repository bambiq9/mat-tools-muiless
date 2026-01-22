import type { ReactNode } from 'react';

export type TContainerProps = {
	fixedWidth?: boolean;
	children?: ReactNode | ReactNode[];
	className?: string;
};
