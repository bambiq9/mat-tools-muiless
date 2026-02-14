/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable eslint-comments/no-duplicate-disable */
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import type { FC } from 'react';
import type { TInsulationGroupUIProps } from './type';
import styles from './InsulationGroupUI.module.scss';
import { StackIcon } from '@assets/svg/StackIcon/StackIcon';
import { CheckIcon } from '@assets/svg/CheckIcon/CheckIcon';
import { UncheckIcon } from '@assets/svg/UncheckIcon/UncheckIcon';
import { formatSize } from '@utils/helpers';
import { Card } from '../card';

export const InsulationGroupUI: FC<TInsulationGroupUIProps> = ({
	completed,
	expanded,
	group,
	onGroupExpand,
	clearAllInGroup,
	completedCount,
	selectAllInGroup,
	selectedPieces,
	togglePiece,
	groupTotalArea,
	groupThicknessMap,
}) => {
	return (
		<Card
			key={group.id}
			className={`${styles['group-card']} ${completed ? styles.completed : ''} ${expanded ? '' : styles.collapsed}`}
		>
			{/* Заголовок группы (логика полностью сохранена) */}
			<div className={styles['group-header']}>
				<div className={styles['group-header-left']}>
					<button
						className={styles['toggle-group-btn']}
						onClick={() => onGroupExpand(group.id)}
						title={expanded ? 'Свернуть группу' : 'Развернуть группу'}
					>
						<svg
							viewBox='0 0 24 24'
							fill='none'
							stroke='currentColor'
							strokeWidth='2'
						>
							<polyline points='6 9 12 15 18 9'></polyline>
						</svg>
					</button>
					<StackIcon className={styles['piece-icon']} />
					<div className={styles['group-title']}>{group.name}</div>
				</div>

				<div className={styles['group-header-right']}>
					{expanded && (
						<div
							className={`${styles['group-status']} ${completed ? styles['status-completed'] : styles['status-incomplete']}`}
						>
							{completedCount}/{group.items.length}
						</div>
					)}
					{expanded ? (
						<>
							<button
								className={`${styles['group-btn']} ${styles['select-all']}`}
								onClick={() => {
									selectAllInGroup(group);
								}}
								title='Выбрать все куски в группе'
							>
								<CheckIcon />
							</button>
							<button
								className={`${styles['group-btn']} ${styles['clear-all']}`}
								onClick={() => {
									clearAllInGroup(group);
								}}
								title='Снять все куски в группе'
							>
								<UncheckIcon />
							</button>
						</>
					) : (
						<button
							className={`${styles['group-btn']} ${completed ? styles['clear-all'] : styles['select-all']}`}
							onClick={() => {
								if (completed) clearAllInGroup(group);
								else selectAllInGroup(group);
							}}
							title={completed ? 'Сбросить группу' : 'Выбрать все в группе'}
						>
							{completed ? <UncheckIcon /> : <CheckIcon />}
						</button>
					)}
				</div>
			</div>

			{/* Тело группы (развёрнуто) */}
			{expanded && (
				<div className={styles['group-body']}>
					<div className={styles['pieces-grid']}>
						{group.items.map((item) => (
							<div
								key={item.id}
								className={`${styles['piece-card']} ${selectedPieces.has(item.id) ? styles.selected : ''} `}
								onClick={() => togglePiece(item.id)}
							>
								<StackIcon className={styles['piece-icon']} />
								<div className={styles['piece-name']}>
									{item.name || item.id}
								</div>
								<div className={styles['piece-dimensions']}>
									{formatSize(item.shape)}
									<br />
									{item.thickness} мм{item.adhesive && ' (клей)'}
								</div>
							</div>
						))}
					</div>
					<div className={styles['group-stats']}>
						<div className={styles['stat-item']}>
							<span className={styles['stat-label']}>Общая площадь:</span>
							<span className={styles['stat-value']}>
								{groupTotalArea.toFixed(2)} м²
							</span>
						</div>
						<div className={styles['stat-item']}>
							<span className={styles['stat-label']}>Типы изоляции (мм):</span>
							<span className={styles['stat-value']}>
								{Object.keys(groupThicknessMap)
									.map(Number)
									.sort((a, b) => a - b)
									.join(', ')}
							</span>
						</div>
						{Object.entries(groupThicknessMap)
							.sort(([a], [b]) => Number(a) - Number(b))
							.map(([thickness, area]) => (
								<div
									key={thickness}
									className={`${styles['stat-item']} ${styles['stat-thickness']}`}
								>
									<span className={styles['stat-label']}>{thickness} мм:</span>
									<span className={styles['stat-value']}>
										{area.toFixed(2)} м²
									</span>
								</div>
							))}
					</div>
				</div>
			)}
		</Card>
	);
};
