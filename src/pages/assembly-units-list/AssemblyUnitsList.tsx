import { useEffect, useState, type FC } from 'react';
import { AssemblyUnitsListUI } from '@pages/ui/assembly-units-list-ui';
import { useDispatch, useSelector } from '@services/store';
import {
	toggleArchiveAssemblyUnits,
	getAssemblyUnitPartsList,
	getAssemblyUnitsList,
	selectUnitPartsList,
	selectUnitsList,
	deleteAssemblyUnits,
} from '@services/assemblySlice';
import type { TAssemblyUnitCard, TAssemblyUnitCardPart } from '@utils/types';

export const AssemblyUnitsList: FC = () => {
	const dispatch = useDispatch();
	const unitsList = useSelector(selectUnitsList);
	const partsList = useSelector(selectUnitPartsList);

	const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

	const handleCheckboxChange = (id: string, checked: boolean) => {
		setSelectedIds((prev) => {
			const next = new Set(prev);
			if (checked) {
				next.add(id);
			} else {
				next.delete(id);
			}
			return next;
		});
	};

	const handleToggleArchive = () => {
		if (selectedIds.size === 0) return;
		dispatch(toggleArchiveAssemblyUnits(Array.from(selectedIds)));
		setSelectedIds(new Set());
	};

	const handleDelete = () => {
		if (selectedIds.size === 0) return;
		if (
			!confirm(
				'Удалить выбранные сборочные единицы? Это действие нельзя отменить.'
			)
		)
			return;
		dispatch(deleteAssemblyUnits(Array.from(selectedIds)));
		setSelectedIds(new Set());
	};

	useEffect(() => {
		dispatch(getAssemblyUnitsList());
		dispatch(getAssemblyUnitPartsList());
	}, [dispatch]);

	const activeUnits: TAssemblyUnitCard[] = [];
	const archiveUnits: TAssemblyUnitCard[] = [];

	unitsList.forEach((unit) => {
		const unitPartsList: TAssemblyUnitCardPart[] = unit.parts.map((part) => {
			const curPart = partsList.find((item) => item.id === part.partId);

			const data: TAssemblyUnitCardPart = {
				name: curPart?.name || part.partId,
				partId: part.partId,
				quantity: part.quantity,
			};

			return data;
		});

		const currentUnit = { ...unit, partsList: unitPartsList };

		if (currentUnit.active) activeUnits.push(currentUnit);
		else archiveUnits.push(currentUnit);
	});

	return (
		<AssemblyUnitsListUI
			activeUnits={activeUnits}
			archiveUnits={archiveUnits}
			selectedUnits={selectedIds}
			onArchive={handleToggleArchive}
			onDelete={handleDelete}
			handleCheckboxChange={handleCheckboxChange}
			hasSelected={selectedIds.size > 0}
		/>
	);
};
