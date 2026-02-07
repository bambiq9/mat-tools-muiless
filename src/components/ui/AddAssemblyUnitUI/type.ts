import type { ReactNode } from 'react';

export type TAddAssemblyUnitUIProps = {
	name: string;
	blueprint: string;
	unit: string;
	date: string;
	description: string;
	error: string | null;
	onNameChange: (value: string) => void;
	onBlueprintChange: (value: string) => void;
	onUnitChange: (value: string) => void;
	onDateChange: (value: string) => void;
	onDescriptionChange: (value: string) => void;
	children?: ReactNode;
	onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
};
