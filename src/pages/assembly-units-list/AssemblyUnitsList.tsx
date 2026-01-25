import { useEffect, type FC } from 'react';
import { AssemblyUnitsListUI } from '@pages/ui/assembly-units-list-ui';
import { useDispatch, useSelector } from '@services/store';
import {
	getAssemblyUnitPartsList,
	getAssemblyUnitsList,
	selectUnitPartsList,
	selectUnitsList,
} from '@services/assemblySlice';
import type { TAssemblyUnitCard, TAssemblyUnitCardPart } from '@utils/types';

export const AssemblyUnitsList: FC = () => {
	const dispatch = useDispatch();
	const unitsList = useSelector(selectUnitsList);
	const partsList = useSelector(selectUnitPartsList);

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
		/>
	);
};
