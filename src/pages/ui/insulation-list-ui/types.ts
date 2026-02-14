import type { TInsulationGroup, TUnit } from '@utils/types';

export type TInsulationListUIProps = {
	units: TUnit[];
	currentUnit: TUnit | null;
	unitNumber: string;
	onUnitNumberChange: (e: string) => void;
	selectedUnit: string;
	onUnitSelect: (e: string) => void;
	groups: TInsulationGroup[];
	isGroupCompleted: (group: TInsulationGroup) => boolean;
	groupExpanded: Record<string, boolean>;
	onGroupExpand: (id: string) => void;
	selectedPieces: Set<string>;
	selectAllInGroup: (group: TInsulationGroup) => void;
	clearAllInGroup: (group: TInsulationGroup) => void;
	togglePiece: (id: string) => void;
	totalStats: { totalArea: number; thicknessMap: Record<number, number> };
	selectAllGroups: () => void;
	handleSave: () => void;
	resetAll: () => void;
};
