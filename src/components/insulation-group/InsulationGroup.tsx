import { InsulationGroupUI } from '@components/ui/insulation-group';
import type { FC } from 'react';
import type { TInsulationGroupProps } from './type';
import { calculateArea } from '@utils/helpers';

export const InsulationGroup: FC<TInsulationGroupProps> = ({
	isGroupCompleted,
	group,
	onGroupExpand,
	groupExpanded,
	selectedPieces,
	selectAllInGroup,
	clearAllInGroup,
	togglePiece,
}) => {
	const completed = isGroupCompleted(group);
	const expanded = groupExpanded[group.id] !== false;
	const completedCount = group.items.filter((item) =>
		selectedPieces.has(item.id)
	).length;

	// Статистика по группе
	let groupTotalArea = 0;
	const groupThicknessMap: Record<number, number> = {};
	group.items.forEach((item) => {
		const area = calculateArea(item.shape);
		groupTotalArea += area;
		groupThicknessMap[item.thickness] =
			(groupThicknessMap[item.thickness] || 0) + area;
	});

	return (
		<InsulationGroupUI
			completed={completed}
			expanded={expanded}
			group={group}
			onGroupExpand={onGroupExpand}
			completedCount={completedCount}
			selectAllInGroup={selectAllInGroup}
			clearAllInGroup={clearAllInGroup}
			selectedPieces={selectedPieces}
			togglePiece={togglePiece}
			groupTotalArea={groupTotalArea}
			groupThicknessMap={groupThicknessMap}
		/>
	);
};
