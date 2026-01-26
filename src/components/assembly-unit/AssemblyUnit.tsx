import { AssemblyUnitUI } from '@components/ui/assembly-unit-ui/AssemblyUnitUI';
import type { TAssemblyUnitProps } from '@components/ui/assembly-unit-ui/types';
import { type FC } from 'react';

export const AssemblyUnit: FC<TAssemblyUnitProps> = ({
	unit,
	isSelected,
	onCheckboxChange,
}) => {
	return (
		<AssemblyUnitUI
			unit={unit}
			isSelected={isSelected}
			onCheckboxChange={onCheckboxChange}
		/>
	);
};
