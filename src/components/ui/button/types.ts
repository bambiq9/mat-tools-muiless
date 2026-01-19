import type { ButtonHTMLAttributes, ComponentType, SVGProps } from 'react';

export interface TButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	loading?: boolean;
	color?: 'primary' | 'secondary' | 'error';
	IconLeft?: ComponentType<SVGProps<SVGElement>> | null;
	IconRight?: ComponentType<SVGProps<SVGElement>> | null;
}
