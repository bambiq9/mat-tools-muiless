import type { TInsulationGroup } from '@utils/types';

export type TInsulationGroupProps = {
	group: TInsulationGroup;
	onGroupExpand: (id: string) => void;
	groupExpanded: Record<string, boolean>;
	isGroupCompleted: (group: TInsulationGroup) => boolean;
	selectedPieces: Set<string>;
	selectAllInGroup: (group: TInsulationGroup) => void;
	clearAllInGroup: (group: TInsulationGroup) => void;
	togglePiece: (pieceId: string) => void;
};
