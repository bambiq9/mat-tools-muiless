import { useEffect, useState } from 'react';
import type { FC } from 'react';
import { AddAssemblyUnitUI } from '@components/ui/AddAssemblyUnitUI';
import type { TAddAssemblyUnitProps, TAddAssemblyUnitState } from './type';
import { PartsSelector } from '@components/parts-selector';
import type { ISelectedPart, TAssemblyUnit } from '@utils/types';
import { useDispatch, useSelector } from '@services/store';
import {
	addAssemblyUnit,
	getAssemblyUnit,
	getAssemblyUnitPartsList,
	selectUnit,
	selectUnitPartsList,
	updateAssemblyUnit,
} from '@services/assemblySlice';
import { useNavigate, useParams } from 'react-router-dom';

const initialFormState: TAddAssemblyUnitState = {
	name: '',
	blueprint: '',
	unit: '',
	date: '',
	description: '',
};

export const AddAssemblyUnit: FC<TAddAssemblyUnitProps> = () => {
	const [formData, setFormData] = useState(initialFormState);
	const [selectedParts, setSelectedParts] = useState<ISelectedPart[]>([]);

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { id } = useParams();
	const unit = useSelector(selectUnit);
	const partsList = useSelector(selectUnitPartsList);
	const [submitError, setSubmitError] = useState<string | null>(null);

	useEffect(() => {
		dispatch(getAssemblyUnitPartsList());
	}, [dispatch]);

	useEffect(() => {
		if (id) {
			dispatch(getAssemblyUnit(id));
		} else {
			setFormData(initialFormState);
			setSelectedParts([]);
			setSubmitError(null);
		}
	}, [id, dispatch]);

	useEffect(() => {
		if (unit && partsList.length > 0 && id) {
			setFormData({
				name: unit.name,
				unit: '',
				date: '',
				description: unit.description || '',
				blueprint: unit.blueprint?.id || '',
			});

			const initialSelectedParts: ISelectedPart[] = unit.parts
				.map((part) => {
					const fullPart = partsList.find((p) => p.id === part.partId);
					if (fullPart) {
						return {
							...fullPart,
							quantity: part.quantity,
						};
					}
					console.warn(`Деталь с ID ${part.partId} не найдена в списке`);
					return null;
				})
				.filter((part): part is ISelectedPart => part !== null);

			setSelectedParts(initialSelectedParts);
		}
	}, [unit, partsList, id]);

	const handleChange = (field: keyof typeof formData, value: string) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
		setSubmitError(null);
	};

	const handlePartsChange = (parts: ISelectedPart[]) => {
		setSelectedParts(parts);
		setSubmitError(null);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setSubmitError(null);

		const newAssemblyUnit: Omit<TAssemblyUnit, 'id'> = {
			...formData,
			active: true,
			blueprint: { id: formData.blueprint },
			parts: selectedParts.map((part) => {
				return {
					partId: part.id,
					quantity: part.quantity,
				};
			}),
		};

		try {
			if (id) {
				await dispatch(
					updateAssemblyUnit({ id, data: newAssemblyUnit })
				).unwrap();
			} else {
				await dispatch(
					addAssemblyUnit(newAssemblyUnit as Omit<TAssemblyUnit, 'id'>)
				).unwrap();
			}

			navigate(-1);
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : 'Не удалось сохранить данные';
			setSubmitError(errorMessage);
			console.error('Ошибка сохранения:', error);
		}
	};
	return (
		<AddAssemblyUnitUI
			name={formData.name}
			blueprint={formData.blueprint}
			unit={formData.unit}
			date={formData.date}
			description={formData.description}
			error={submitError}
			onNameChange={(value) => handleChange('name', value)}
			onBlueprintChange={(value) => handleChange('blueprint', value)}
			onUnitChange={(value) => handleChange('unit', value)}
			onDateChange={(value) => handleChange('date', value)}
			onDescriptionChange={(value) => handleChange('description', value)}
			onSubmit={handleSubmit}
		>
			<PartsSelector
				selectedParts={selectedParts}
				onPartsChange={handlePartsChange}
			/>
		</AddAssemblyUnitUI>
	);
};
