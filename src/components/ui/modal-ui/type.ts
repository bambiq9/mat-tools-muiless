import type { ReactNode } from 'react';

export type TModalUIProps = {
	title: string;
	children?: ReactNode;
	onClose: () => void;
};
