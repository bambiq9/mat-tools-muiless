import type { TInsulationGroup } from '@utils/types';

export type TInsulationGroupUIProps = {
	completed: boolean;
	expanded: boolean;
	group: TInsulationGroup;
	onGroupExpand: (id: string) => void;
	completedCount: number;
	selectAllInGroup: (group: TInsulationGroup) => void;
	clearAllInGroup: (group: TInsulationGroup) => void;
	selectedPieces: Set<string>;
	togglePiece: (pieceId: string) => void;
	groupTotalArea: number;
	groupThicknessMap: Record<number, number>;
};
