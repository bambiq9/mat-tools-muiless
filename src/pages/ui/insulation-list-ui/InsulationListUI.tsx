import type { FC } from 'react';
import { Container } from '@components/ui/container';
import { Typography } from '@components/ui/typography';
import styles from './InsulationListUI.module.scss';
import { Card } from '@components/ui/card';
import { InputUI } from '@components/ui/input';

export const InsulationListUI: FC = () => {
	return (
		<main>
			<Container fixedWidth className={styles.container}>
				<div className={styles.header}>
					<Typography type='h1'>Теплоизоляция</Typography>
					<Typography type='text'>
						Отметьте готовые куски изоляции. Когда все куски в группе будут
						отмечены, группа автоматически пометится как завершенная.
					</Typography>
				</div>

				<Card className={styles.controls}>
					<div className={styles['control-row']}>
						<div className={styles['control-group']}>
							<label className='control-label' htmlFor='installationNumber'>
								Номер установки
							</label>
							<InputUI
								type='text'
								className={styles.input}
								id='installationNumber'
								placeholder='Введите номер установки...'
							/>
						</div>
						<div className={styles['control-group']}>
							<label className='control-label' htmlFor='assemblySelect'>
								Комплект изоляции
							</label>
							<div className='dropdown-container'>
								<select className='assembly-select' id='assemblySelect'>
									<option value=''>Выберите комплект изоляции...</option>
									<option value='ventilation'>Система вентиляции</option>
									<option value='compressor'>Компрессорная установка</option>
									<option value='pump'>Насосная станция</option>
									<option value='filter'>Фильтрационная система</option>
								</select>
							</div>
						</div>
					</div>
				</Card>
			</Container>
		</main>
	);
};
