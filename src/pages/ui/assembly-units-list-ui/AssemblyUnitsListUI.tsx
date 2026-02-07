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
import { Link } from 'react-router-dom';

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
	locationState,
}) => {
	return (
		<main>
			<Container fixedWidth className={styles.container}>
				<div className={styles.header}>
					<Typography type='h1'>Сборочные единицы</Typography>
					<div className={styles.controls}>
						<Link
							className={styles.link}
							to={'/assembly-units-list/add'}
							state={locationState}
						>
							<Button>
								<PlusIcon />
							</Button>
						</Link>
						<Button onClick={onArchive} disabled={!hasSelected} color='neutral'>
							<ArchiveIcon />
						</Button>
						<Button onClick={onDelete} disabled={!hasSelected} color='error'>
							<TrashIcon />
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
								locationState={locationState}
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
								locationState={locationState}
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
