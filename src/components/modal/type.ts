import type { ReactNode } from 'react';

export type TModalProps = {
	title: string;
	children?: ReactNode;
	onClose: () => void;
};
