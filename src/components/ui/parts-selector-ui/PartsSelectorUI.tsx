import type { FC, RefObject } from 'react';
import styles from './PartsSelectorUI.module.scss';
import type { ISelectedPart, TAssemblyUnitPart } from '@utils/types';
import { BlankIcon } from '@assets/svg/BlankIcon/BlankIcon';
import { TrashIcon } from '@assets/svg/TrashIcon/TrashIcon';

interface IPartsSelectorUIProps {
	isDropdownOpen: boolean;
	searchQuery: string;
	onSearchChange: (query: string) => void;
	onToggleDropdown: () => void;
	filteredParts: TAssemblyUnitPart[];
	onPartSelect: (part: TAssemblyUnitPart) => void;
	selectedParts: ISelectedPart[];
	onRemovePart: (partId: string) => void;
	onQuantityDecrease: (partId: string) => void;
	onQuantityIncrease: (partId: string) => void;
	dropdownRef: RefObject<HTMLDivElement | null>;
	searchInputRef: RefObject<HTMLInputElement | null>;
}

export const PartsSelectorUI: FC<IPartsSelectorUIProps> = ({
	isDropdownOpen,
	searchQuery,
	onSearchChange,
	onToggleDropdown,
	filteredParts,
	onPartSelect,
	selectedParts,
	onRemovePart,
	onQuantityDecrease,
	onQuantityIncrease,
	dropdownRef,
	searchInputRef,
}) => {
	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<h3 className={styles.label}>Список деталей</h3>
				<button
					type='button'
					className={styles.addBtn}
					onClick={onToggleDropdown}
					aria-expanded={isDropdownOpen}
				>
					<svg
						width='12'
						height='12'
						viewBox='0 0 24 24'
						fill='none'
						stroke='currentColor'
						strokeWidth='2'
					>
						<line x1='12' y1='5' x2='12' y2='19' />
						<line x1='5' y1='12' x2='19' y2='12' />
					</svg>
					Добавить деталь
				</button>
			</div>

			{isDropdownOpen && (
				<div ref={dropdownRef} className={styles.dropdown} id='partsDropdown'>
					<input
						ref={searchInputRef}
						type='text'
						className={styles.searchInput}
						placeholder='Поиск детали по названию или чертежу...'
						value={searchQuery}
						onChange={(e) => onSearchChange(e.target.value)}
						aria-label='Поиск деталей'
					/>
					<div className={styles.dropdownList} id='partsList'>
						{filteredParts.length > 0 ? (
							filteredParts.map((part) => {
								const isSelected = selectedParts.some((p) => p.id === part.id);
								return (
									<div
										key={part.id}
										className={styles.dropdownItem}
										onClick={() => onPartSelect(part)}
										role='option'
										aria-selected={isSelected}
										tabIndex={0}
										onKeyDown={(e) => {
											if (e.key === 'Enter' || e.key === ' ') {
												onPartSelect(part);
											}
										}}
									>
										<span className={styles.partName}>{part.name}</span>
										<span className={styles.partBlueprint}>
											Чертёж: {part.blueprint?.id || '—'}
										</span>
									</div>
								);
							})
						) : (
							<div className={styles.dropdownEmpty}>
								Нет совпадений по запросу &quot;{searchQuery}&quot;
							</div>
						)}
					</div>
				</div>
			)}

			<div className={styles.selectedList} id='selectedPartsList'>
				{selectedParts.length === 0 ? (
					<div className={styles.emptyState}>
						<BlankIcon />
						<p>Нет добавленных деталей</p>
						<span>Нажмите &quot;Добавить деталь&quot;, чтобы начать</span>
					</div>
				) : (
					<div className={styles.table}>
						<div className={styles.tableHeader}>
							<div>Деталь</div>
							<div>Чертёж</div>
							<div>Количество</div>
							<div>Действия</div>
						</div>
						{selectedParts.map((part) => (
							<div key={part.id} className={styles.tableRow}>
								<div className={styles.partInfo}>
									<span className={styles.partName}>{part.name}</span>
								</div>
								<div className={styles.partBlueprint}>
									{part.blueprint?.id || '—'}
								</div>
								<div className={styles.quantityControl}>
									<button
										type='button'
										className={styles.quantityBtn}
										onClick={() => onQuantityDecrease(part.id)}
										aria-label={`Уменьшить количество ${part.name}`}
										disabled={part.quantity <= 1}
									>
										-
									</button>
									<span className={styles.quantityValue}>{part.quantity}</span>
									<button
										type='button'
										className={styles.quantityBtn}
										onClick={() => onQuantityIncrease(part.id)}
										aria-label={`Увеличить количество ${part.name}`}
									>
										+
									</button>
								</div>
								<button
									type='button'
									className={styles.removeBtn}
									onClick={() => onRemovePart(part.id)}
									aria-label={`Удалить ${part.name}`}
								>
									<TrashIcon />
								</button>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
};
