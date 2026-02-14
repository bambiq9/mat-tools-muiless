import { useCallback, useEffect, useMemo, useState, type FC } from 'react';
import { InsulationListUI } from '@pages/ui/insulation-list-ui';
import { useDispatch, useSelector } from '@services/store';
import {
	clearCurrentUnit,
	getUnit,
	getUnits,
	selectUnit,
	selectUnits,
} from '@services/unitsSlice';
import type { TInsulationGroup } from '@utils/types';
import { calculateArea } from '@utils/helpers';

export const InsulationList: FC = () => {
	const dispatch = useDispatch();
	const units = useSelector(selectUnits);
	const currentUnit = useSelector(selectUnit);

	const [selectedUnitId, setSelectedUnitId] = useState<string>('');
	const [unitNumber, setUnitNumber] = useState<string>('');
	const [selectedPieces, setSelectedPieces] = useState<Set<string>>(new Set());
	const [groupExpanded, setGroupExpanded] = useState<Record<string, boolean>>(
		{}
	);

	useEffect(() => {
		dispatch(getUnits());
	}, [dispatch]);

	const handleUnitSelect = useCallback(
		(unitId: string) => {
			setSelectedUnitId(unitId);
			if (unitId) {
				dispatch(getUnit(unitId));
				setUnitNumber(unitId);
			} else {
				dispatch(clearCurrentUnit());
				setUnitNumber('');
			}

			setSelectedPieces(new Set());
			setGroupExpanded({});
		},
		[dispatch]
	);

	const groups = useMemo(() => currentUnit?.insulation ?? [], [currentUnit]);

	const togglePiece = useCallback((pieceId: string) => {
		setSelectedPieces((prev) => {
			const newSet = new Set(prev);
			if (newSet.has(pieceId)) newSet.delete(pieceId);
			else newSet.add(pieceId);
			return newSet;
		});
	}, []);

	const selectAllInGroup = useCallback((group: TInsulationGroup) => {
		setSelectedPieces((prev) => {
			const newSet = new Set(prev);
			group.items.forEach((item) => newSet.add(item.id));
			return newSet;
		});
	}, []);

	const clearAllInGroup = useCallback((group: TInsulationGroup) => {
		setSelectedPieces((prev) => {
			const newSet = new Set(prev);
			group.items.forEach((item) => newSet.delete(item.id));
			return newSet;
		});
	}, []);

	const selectAllGroups = useCallback(() => {
		const allIds = groups.flatMap((g) => g.items.map((item) => item.id));
		setSelectedPieces(new Set(allIds));
	}, [groups]);

	const resetAll = useCallback(() => {
		if (window.confirm('Вы уверены?')) {
			setSelectedUnitId('');
			setUnitNumber('');
			dispatch(clearCurrentUnit());
			setSelectedPieces(new Set());
			setGroupExpanded({});
		}
	}, [dispatch]);

	const handleSave = useCallback(() => {
		if (!unitNumber.trim() || !currentUnit) {
			alert('Выберите установку и укажите её номер.');
			return;
		}

		// Здесь можно было бы отправить PATCH на сервер с обновлённым состоянием выбранных кусков,
		// но в текущей БД такого поля нет. Имитируем успех и сбрасываем.
		// setShowNotification(true);
		// setTimeout(() => setShowNotification(false), 3000);

		// Очищаем выбор и установку
		setSelectedUnitId('');
		setUnitNumber('');
		dispatch(clearCurrentUnit());
		setSelectedPieces(new Set());
		setGroupExpanded({});
	}, [unitNumber, currentUnit, dispatch]);

	// Переключение свёрнутости группы
	const toggleGroupExpanded = useCallback((groupId: string) => {
		setGroupExpanded((prev) => ({ ...prev, [groupId]: !prev[groupId] }));
	}, []);

	// Проверка, завершена ли группа
	const isGroupCompleted = useCallback(
		(group: TInsulationGroup) =>
			group.items.every((item) => selectedPieces.has(item.id)),
		[selectedPieces]
	);

	// Общая статистика по установке
	const totalStats = useMemo(() => {
		let totalArea = 0;
		const thicknessMap: Record<number, number> = {};
		groups.forEach((group) => {
			group.items.forEach((item) => {
				const area = calculateArea(item.shape);
				totalArea += area;
				thicknessMap[item.thickness] =
					(thicknessMap[item.thickness] || 0) + area;
			});
		});
		return { totalArea, thicknessMap };
	}, [groups]);

	return (
		<InsulationListUI
			units={units}
			currentUnit={currentUnit}
			unitNumber={unitNumber}
			onUnitNumberChange={setUnitNumber}
			selectedUnit={selectedUnitId}
			onUnitSelect={handleUnitSelect}
			groups={groups}
			isGroupCompleted={isGroupCompleted}
			groupExpanded={groupExpanded}
			onGroupExpand={toggleGroupExpanded}
			selectedPieces={selectedPieces}
			selectAllInGroup={selectAllInGroup}
			clearAllInGroup={clearAllInGroup}
			togglePiece={togglePiece}
			totalStats={totalStats}
			selectAllGroups={selectAllGroups}
			handleSave={handleSave}
			resetAll={resetAll}
		/>
	);
};
