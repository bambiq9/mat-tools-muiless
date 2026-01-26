import { Container } from '@components/ui/container';
import type { FC } from 'react';
import type { TAssemblyUnitsListUIProps } from './type';
import styles from './AssemblyUnitsListUI.module.scss';
import { Typography } from '@components/ui/typography';
import { Button } from '@components/ui/button';
import { AssemblyUnit } from '@components/assembly-unit';
import { SearchIcon } from '@assets/svg/SearchIcon/SearchIcon';
import { PlusIcon } from '@assets/svg/PlusIcon/PlusIcon';
import { ArchiveIcon } from '@assets/svg/ArchiveIcon/ArchiveIcon';
import { TrashIcon } from '@assets/svg/TrashIcon/TrashIcon';

export const AssemblyUnitsListUI: FC<TAssemblyUnitsListUIProps> = ({
	activeUnits,
	archiveUnits,
	selectedUnits,
	handleCheckboxChange,
	onArchive,
	onDelete,
	hasSelected,
	filterValue,
	onFilterChange,
}) => {
	let archiveButtonLabel = 'В архив';
	if (selectedUnits.size > 0) {
		const hasActive = Array.from(selectedUnits).some((id) =>
			activeUnits.some((u) => u.id === id)
		);
		const hasArchived = Array.from(selectedUnits).some((id) =>
			archiveUnits.some((u) => u.id === id)
		);

		if (hasArchived && !hasActive) {
			archiveButtonLabel = 'Восстановить';
		} else if (hasActive && hasArchived) {
			archiveButtonLabel = 'Изменить статус';
		}
	}

	return (
		<main>
			<Container fixedWidth className={styles.container}>
				<div className={styles.header}>
					<Typography type='h1'>Сборочные единицы</Typography>
					<div className={styles.controls}>
						<Button IconLeft={PlusIcon}>Добавить</Button>
						<Button
							IconLeft={ArchiveIcon}
							onClick={onArchive}
							disabled={!hasSelected}
							color='neutral'
						>
							{archiveButtonLabel}
						</Button>
						<Button
							IconLeft={TrashIcon}
							onClick={onDelete}
							disabled={!hasSelected}
							color='error'
						>
							Удалить
						</Button>
					</div>
					<div className={styles['search-container']}>
						<SearchIcon className={styles['search-icon']} />
						<input
							type='text'
							className={styles['search-input']}
							id='searchInput'
							placeholder='Поиск по названию или чертежу...'
							value={filterValue}
							onChange={onFilterChange}
						/>
					</div>
				</div>
				<div className={styles['list-wrapper']}>
					<Typography type='h2' className={styles['list-title']}>
						Активные сборочные единицы
					</Typography>
					<ul className={styles.list}>
						{activeUnits.map((unit) => (
							<AssemblyUnit
								key={unit.id}
								unit={unit}
								isSelected={selectedUnits.has(unit.id)}
								onCheckboxChange={(checked) =>
									handleCheckboxChange(unit.id, checked)
								}
							/>
						))}
					</ul>
				</div>

				<div className={styles['list-wrapper']}>
					<Typography type='h2' className={styles['list-title']}>
						Архивные сборочные единицы
					</Typography>
					<ul className={styles.list}>
						{archiveUnits.map((unit) => (
							<AssemblyUnit
								key={unit.id}
								unit={unit}
								isSelected={selectedUnits.has(unit.id)}
								onCheckboxChange={(checked) =>
									handleCheckboxChange(unit.id, checked)
								}
							/>
						))}
					</ul>
				</div>
			</Container>
		</main>
	);
};
