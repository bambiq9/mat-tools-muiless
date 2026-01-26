import { Container } from '@components/ui/container';
import type { FC } from 'react';
import type { TAssemblyUnitsListUIProps } from './type';
import styles from './AssemblyUnitsListUI.module.scss';
import { Typography } from '@components/ui/typography';
import { Button } from '@components/ui/button';
import { AssemblyUnit } from '@components/assembly-unit';

export const AssemblyUnitsListUI: FC<TAssemblyUnitsListUIProps> = ({
	activeUnits,
	archiveUnits,
	selectedUnits,
	handleCheckboxChange,
	onArchive,
	onDelete,
	hasSelected,
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
						<Button>Добавить</Button>
						<Button onClick={onArchive} disabled={!hasSelected} color='neutral'>
							{archiveButtonLabel}
						</Button>
						<Button onClick={onDelete} disabled={!hasSelected} color='error'>
							Удалить
						</Button>
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
