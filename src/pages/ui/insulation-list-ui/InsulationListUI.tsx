/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable eslint-comments/no-duplicate-disable */
/* eslint-disable eslint-comments/disable-enable-pair */

/* eslint-disable eslint-comments/disable-enable-pair */

import type { FC } from 'react';
import { Container } from '@components/ui/container';
import { Typography } from '@components/ui/typography';
import styles from './InsulationListUI.module.scss';
import { Card } from '@components/ui/card';
import { InputUI } from '@components/ui/input';
import type { TInsulationListUIProps } from './types';
import { formatDate } from '@utils/helpers';
import { InsulationGroup } from '@components/insulation-group/InsulationGroup';

export const InsulationListUI: FC<TInsulationListUIProps> = ({
	units,
	currentUnit,
	unitNumber,
	onUnitNumberChange,
	selectedUnit,
	onUnitSelect,
	groups,
	isGroupCompleted,
	groupExpanded,
	selectedPieces,
	selectAllInGroup,
	clearAllInGroup,
	onGroupExpand,
	togglePiece,
	totalStats,
	selectAllGroups,
	handleSave,
	resetAll,
}) => {
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
							<label
								className={styles['control-label']}
								htmlFor='installationNumber'
							>
								Номер установки
							</label>
							<InputUI
								value={unitNumber}
								onChange={(e) => onUnitNumberChange(e.target.value)}
								type='text'
								className={styles.input}
								id='installationNumber'
								placeholder='Введите номер установки...'
								disabled={!unitNumber}
							/>
						</div>
						<div className={styles['control-group']}>
							<label
								className={styles['control-label']}
								htmlFor='assemblySelect'
							>
								Комплект изоляции
							</label>
							<div className={styles['dropdown-container']}>
								<select
									className={styles['assembly-select']}
									id='assemblySelect'
									value={selectedUnit}
									onChange={(e) => onUnitSelect(e.target.value)}
								>
									<option value=''>Выберите установку...</option>
									{units.map((unit) => (
										<option key={unit.id} value={unit.id}>
											{unit.name} ({unit.id})
										</option>
									))}
								</select>
							</div>
						</div>
						<div className={styles['control-group']}>
							<label
								className={styles['control-label']}
								htmlFor='versionSelect'
							>
								Версия от
							</label>
							<select
								className={styles['version-select']}
								id='versionSelect'
								disabled
							>
								<option value=''>Выберите дату версии...</option>
							</select>
						</div>
					</div>
				</Card>

				{/* PAST THIS */}
				{/* PAST THIS */}
				{/* PAST THIS */}
				{/* PAST THIS */}
				{/* PAST THIS */}
				{/* PAST THIS */}

				<div className={styles['groups-container']}>
					{currentUnit && groups.length > 0 ? (
						<>
							<div className={styles['version-info']}>
								Текущая установка: {currentUnit.name} (ID: {currentUnit.id}) от{' '}
								{formatDate(currentUnit.date)}
							</div>

							{groups.map((group) => {
								return (
									<InsulationGroup
										key={group.id}
										group={group}
										groupExpanded={groupExpanded}
										onGroupExpand={onGroupExpand}
										isGroupCompleted={isGroupCompleted}
										selectedPieces={selectedPieces}
										selectAllInGroup={selectAllInGroup}
										clearAllInGroup={clearAllInGroup}
										togglePiece={togglePiece}
									/>
								);
							})}

							{/* Общая статистика */}
							<div className={styles['total-stats-card']}>
								<h2>
									<svg
										viewBox='0 0 24 24'
										fill='none'
										stroke='currentColor'
										strokeWidth='2'
									>
										<path d='M12 20h9'></path>
										<path d='M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z'></path>
									</svg>
									Общая статистика по установке
								</h2>
								<div className={styles['group-stats']}>
									<div className={styles['stat-item']}>
										<span className={styles['stat-label']}>Общая площадь:</span>
										<span className={styles['stat-value']}>
											{totalStats.totalArea.toFixed(2)} м²
										</span>
									</div>
									<div className={styles['stat-item']}>
										<span className={styles['stat-label']}>
											Типы изоляции (мм):
										</span>
										<span className={styles['stat-value']}>
											{Object.keys(totalStats.thicknessMap)
												.map(Number)
												.sort((a, b) => a - b)
												.join(', ')}
										</span>
									</div>
									{Object.entries(totalStats.thicknessMap)
										.sort(([a], [b]) => Number(a) - Number(b))
										.map(([thickness, area]) => (
											<div
												key={thickness}
												className={`${styles['stat-item']} ${styles['stat-thickness']}`}
											>
												<span className={styles['stat-label']}>
													{thickness} мм:
												</span>
												<span className={styles['stat-value']}>
													{area.toFixed(2)} м²
												</span>
											</div>
										))}
								</div>
							</div>
						</>
					) : (
						<div
							style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}
						>
							{currentUnit && !groups.length
								? 'У выбранной установки нет групп изоляции'
								: 'Выберите установку для отображения групп изоляции'}
						</div>
					)}
				</div>

				{/* Кнопки действий */}
				<div className={styles['actions-section']}>
					<div className={styles['main-actions']}>
						<button
							className={`${styles['action-btn']} ${styles['select-all-btn']}`}
							onClick={selectAllGroups}
						>
							<svg
								width='18'
								height='18'
								viewBox='0 0 24 24'
								fill='none'
								stroke='currentColor'
								strokeWidth='2'
							>
								<path d='M22 11.08V12a10 10 0 1 1-5.93-9.14'></path>
								<polyline points='22 4 12 14.01 9 11.01'></polyline>
							</svg>
							Выбрать все
						</button>
						<button
							className={`${styles['action-btn']} ${styles['reset-btn']}`}
							onClick={resetAll}
						>
							<svg
								width='18'
								height='18'
								viewBox='0 0 24 24'
								fill='none'
								stroke='currentColor'
								strokeWidth='2'
							>
								<path d='M18 8a6 6 0 0 0-12 0'></path>
								<path d='M6 8v9a4 4 0 0 0 4 4h4a4 4 0 0 0 4-4V8'></path>
								<line x1='6' y1='12' x2='18' y2='12'></line>
							</svg>
							Сброс
						</button>
						<button
							className={`${styles['action-btn']} ${styles['save-btn']}`}
							onClick={handleSave}
						>
							<svg
								width='18'
								height='18'
								viewBox='0 0 24 24'
								fill='none'
								stroke='currentColor'
								strokeWidth='2'
							>
								<path d='M22 11.08V12a10 10 0 1 1-5.93-9.14'></path>
								<polyline points='22 4 12 14.01 9 11.01'></polyline>
							</svg>
							Сохранить
						</button>
					</div>
				</div>
			</Container>
		</main>
	);
};
