import { AssemblyUnit } from '@components/ui/assembly-unit';
import { Container } from '@components/ui/container';
import type { FC } from 'react';
import type { TAssemblyUnitsListUIProps } from './type';
import styles from './AssemblyUnitsListUI.module.scss';
import { Typography } from '@components/ui/typography';
import { Button } from '@components/ui/button';

export const AssemblyUnitsListUI: FC<TAssemblyUnitsListUIProps> = ({
	activeUnits,
	archiveUnits,
}) => {
	return (
		<main>
			<Container fixedWidth className={styles.container}>
				<div className={styles.header}>
					<Typography type='h1'>Сборочные единицы</Typography>
					<div className={styles.controls}>
						<Button>Добавить</Button>
						<Button disabled color='neutral'>
							В архив
						</Button>
						<Button disabled color='error'>
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
							<AssemblyUnit key={unit.id} unit={unit} />
						))}
					</ul>
				</div>

				<div className={styles['list-wrapper']}>
					<Typography type='h2' className={styles['list-title']}>
						Архивные сборочные единицы
					</Typography>
					<ul className={styles.list}>
						{archiveUnits.map((unit) => (
							<AssemblyUnit key={unit.id} unit={unit} />
						))}
					</ul>
				</div>
			</Container>
		</main>
	);
};
