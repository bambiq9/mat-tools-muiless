import type { ButtonHTMLAttributes, ComponentType, SVGProps } from 'react';

export interface TButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	loading?: boolean;
	color?: 'primary' | 'secondary' | 'error';
	iconLeft?: ComponentType<SVGProps<SVGElement>> | null;
	iconRight?: ComponentType<SVGProps<SVGElement>> | null;
}
