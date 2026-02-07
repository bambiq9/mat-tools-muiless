import type { TAssemblyUnitCard } from '@utils/types';
import type { Location } from 'react-router-dom';

export type TAssemblyUnitProps = {
	unit: TAssemblyUnitCard;
	isSelected: boolean;
	onCheckboxChange?: (checked: boolean) => void;
	locationState: { background: Location };
};
