import type { ComponentType, InputHTMLAttributes, SVGProps } from 'react';

export interface TInputUIProps extends InputHTMLAttributes<HTMLInputElement> {
	type?: 'text' | 'number' | 'password' | 'email';
	className?: string;
	IconLeft?: ComponentType<SVGProps<SVGElement>> | null;
	IconRight?: ComponentType<SVGProps<SVGElement>> | null;
}
