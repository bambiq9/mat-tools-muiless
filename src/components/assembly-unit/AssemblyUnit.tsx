import { AssemblyUnitUI } from '@components/ui/assembly-unit-ui/AssemblyUnitUI';
import type { TAssemblyUnitProps } from '@components/ui/assembly-unit-ui/types';
import { type FC } from 'react';
import { useLocation } from 'react-router-dom';

export const AssemblyUnit: FC<TAssemblyUnitProps> = ({
	unit,
	isSelected,
	onCheckboxChange,
}) => {
	const location = useLocation();

	return (
		<AssemblyUnitUI
			unit={unit}
			isSelected={isSelected}
			onCheckboxChange={onCheckboxChange}
			locationState={{ background: location }}
		/>
	);
};
