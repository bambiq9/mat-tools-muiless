import {
	useCallback,
	useEffect,
	useMemo,
	useState,
	type ChangeEvent,
	type FC,
} from 'react';
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
import { useLocation } from 'react-router-dom';

export const AssemblyUnitsList: FC = () => {
	const location = useLocation();
	const dispatch = useDispatch();
	const unitsList = useSelector(selectUnitsList);
	const partsList = useSelector(selectUnitPartsList);

	const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
	const [filter, setFilter] = useState('');
	const [debouncedFilter, setDebouncedFilter] = useState('');

	useEffect(() => {
		const timer = setTimeout(() => {
			setDebouncedFilter(filter.trim());
		}, 300);
		return () => clearTimeout(timer);
	}, [filter]);

	const filteredUnits = useMemo(() => {
		if (!debouncedFilter) return unitsList;

		const searchTerm = debouncedFilter.toLowerCase();
		return unitsList.filter((unit) => {
			const nameMatch = unit.name?.toLowerCase().includes(searchTerm);
			const drawingMatch = unit.blueprint?.id
				.toLowerCase()
				.includes(searchTerm);
			return nameMatch || drawingMatch;
		});
	}, [unitsList, debouncedFilter]);

	const { activeUnits, archiveUnits } = useMemo(() => {
		const active: TAssemblyUnitCard[] = [];
		const archive: TAssemblyUnitCard[] = [];

		filteredUnits.forEach((unit) => {
			const unitPartsList: TAssemblyUnitCardPart[] = unit.parts.map((part) => {
				const curPart = partsList.find((item) => item.id === part.partId);
				return {
					name: curPart?.name || `Деталь ${part.partId}`,
					partId: part.partId,
					quantity: part.quantity,
				};
			});

			const currentUnit = { ...unit, partsList: unitPartsList };
			if (currentUnit.active) active.push(currentUnit);
			else archive.push(currentUnit);
		});

		return { activeUnits: active, archiveUnits: archive };
	}, [filteredUnits, partsList]);

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

	const handleFilterChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		setFilter(e.target.value);
	}, []);

	useEffect(() => {
		dispatch(getAssemblyUnitsList());
		dispatch(getAssemblyUnitPartsList());
	}, [dispatch]);

	return (
		<AssemblyUnitsListUI
			activeUnits={activeUnits}
			archiveUnits={archiveUnits}
			selectedUnits={selectedIds}
			onArchive={handleToggleArchive}
			onDelete={handleDelete}
			handleCheckboxChange={handleCheckboxChange}
			hasSelected={selectedIds.size > 0}
			filterValue={filter}
			onFilterChange={handleFilterChange}
			locationState={{ background: location }}
		/>
	);
};
