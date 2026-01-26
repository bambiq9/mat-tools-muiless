import type { TAssemblyUnitCard } from '@utils/types';

export type TAssemblyUnitsListUIProps = {
	activeUnits: TAssemblyUnitCard[];
	archiveUnits: TAssemblyUnitCard[];
	selectedUnits: Set<string>;
	handleCheckboxChange: (id: string, selected: boolean) => void;
};
