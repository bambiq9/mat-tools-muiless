import type { TAssemblyUnitCard } from '@utils/types';

export type TAssemblyUnitProps = {
	unit: TAssemblyUnitCard;
	isSelected: boolean;
	onCheckboxChange?: (checked: boolean) => void;
};
