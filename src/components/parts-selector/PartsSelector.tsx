import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import type { FC } from 'react';
import { PartsSelectorUI } from '@components/ui/parts-selector-ui';
import type { ISelectedPart, TAssemblyUnitPart } from '@utils/types';
import { selectUnitPartsList } from '@services/assemblySlice';

interface IPartsSelectorProps {
	selectedParts: ISelectedPart[];
	onPartsChange: (parts: ISelectedPart[]) => void;
}

export const PartsSelector: FC<IPartsSelectorProps> = ({
	selectedParts,
	onPartsChange,
}) => {
	const [searchQuery, setSearchQuery] = useState('');
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);
	const searchInputRef = useRef<HTMLInputElement>(null);

	// Получаем детали из Redux (типизировано как TAssemblyUnitPart[])
	const allParts: TAssemblyUnitPart[] = useSelector(selectUnitPartsList);

	// Фильтрация с учётом структуры blueprint.id
	const filteredParts = allParts.filter(
		(part) =>
			part.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			(part.blueprint?.id &&
				part.blueprint.id.toLowerCase().includes(searchQuery.toLowerCase()))
	);

	// Автофокус и закрытие по клику вне — без изменений
	useEffect(() => {
		if (isDropdownOpen) {
			searchInputRef.current?.focus();
		}
	}, [isDropdownOpen]);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setIsDropdownOpen(false);
			}
		};

		if (isDropdownOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		}
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, [isDropdownOpen]);

	// Добавление/выбор детали
	const handlePartSelect = (part: TAssemblyUnitPart) => {
		const existingPart = selectedParts.find((p) => p.id === part.id);

		let newParts: ISelectedPart[];
		if (existingPart) {
			newParts = selectedParts.map((p) =>
				p.id === part.id ? { ...p, quantity: p.quantity + 1 } : p
			);
		} else {
			newParts = [...selectedParts, { ...part, quantity: 1 }];
		}

		onPartsChange(newParts);
		setSearchQuery('');
	};

	// Удаление детали
	const handleRemovePart = (partId: string) => {
		const newParts = selectedParts.filter((part) => part.id !== partId);
		onPartsChange(newParts);
	};

	// Изменение количества
	const handleQuantityChange = (partId: string, delta: number) => {
		const newParts = selectedParts
			.map((part) =>
				part.id === partId
					? { ...part, quantity: Math.max(1, part.quantity + delta) }
					: part
			)
			.filter((part) => part.quantity > 0);

		onPartsChange(newParts);
	};

	return (
		<PartsSelectorUI
			isDropdownOpen={isDropdownOpen}
			searchQuery={searchQuery}
			onSearchChange={setSearchQuery}
			onToggleDropdown={() => setIsDropdownOpen((prev) => !prev)}
			filteredParts={filteredParts}
			onPartSelect={handlePartSelect}
			selectedParts={selectedParts}
			onRemovePart={handleRemovePart}
			onQuantityDecrease={(id: string) => handleQuantityChange(id, -1)}
			onQuantityIncrease={(id: string) => handleQuantityChange(id, 1)}
			dropdownRef={dropdownRef}
			searchInputRef={searchInputRef}
		/>
	);
};
