/* eslint-disable eslint-comments/disable-enable-pair */

import type { FC } from 'react';
import styles from './SidebarUI.module.scss';
import { MenuIcon } from '@assets/svg/MenuIcon/MenuIcon';

import type { SidebarProps } from './type';
import { SettingsIcon } from '@assets/svg/SettingsIcon/SettingsIcon';
import { UserIcon } from '@assets/svg/UserIcon/UserIcon';
import { StatsIcon } from '@assets/svg/StatsIcon/StatsIcon';
import { MenuItemUI } from './MenuItemUI';
import { Typography } from '../typography';

export const SidebarUI: FC<SidebarProps> = ({
	isOpen,
	isCollapsed,
	onToggleCollapse,
	onToggleOpen,
	user,
	menuItems,
}) => {
	return (
		<>
			<aside
				className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ''} ${isOpen ? styles.open : ''}`}
				id='sidebar'
			>
				<div className={styles['sidebar-header']}>
					<button
						className={styles['toggle-sidebar']}
						onClick={onToggleCollapse}
						aria-label={isCollapsed ? 'Развернуть меню' : 'Свернуть меню'}
					>
						<MenuIcon />
					</button>
					{!isCollapsed && (
						<span className={styles.sidebarTitle}>Навигация</span>
					)}
				</div>

				<nav className={styles['sidebar-nav']}>
					<div className={styles['nav-section']}>
						<div className={styles['nav-section-title']}>Основное</div>
						{menuItems.map(({ id, title, icon, path }) => (
							<MenuItemUI key={id} title={title} icon={icon} path={path} />
						))}
					</div>

					<div className={styles['nav-section']}>
						<div className={styles['nav-section-title']}>Отчеты</div>
						<MenuItemUI
							title='Статистика'
							icon={<StatsIcon />}
							path={'/stats'}
						/>
					</div>

					<div className={styles['nav-section']}>
						<div className={styles['nav-section-title']}>Настройки</div>
						<MenuItemUI
							title='Параметры'
							icon={<SettingsIcon />}
							path={'/settings'}
						/>
						<MenuItemUI
							title='Пользователь'
							icon={<UserIcon />}
							path={'/user'}
						/>
					</div>
				</nav>

				<div className={styles['user-section']}>
					<div className={styles['user-info']}>
						<div className={styles['user-avatar']}>{user.avatar}</div>
						<div className={styles['user-details']}>
							<Typography type='h3' className={styles['user-name']}>
								{user.name}
							</Typography>
							<Typography type='subtitle' className={styles['user-role']}>
								{user.role}
							</Typography>
						</div>
					</div>
				</div>
			</aside>

			<header className={styles['top-header']}>
				<button className={styles['mobile-menu-btn']} onClick={onToggleOpen}>
					<MenuIcon />
				</button>

				<div className={styles['quick-nav']}>
					{menuItems.map(({ id, title, icon, path }) => (
						<MenuItemUI key={id} title={title} icon={icon} path={path} quick />
					))}
				</div>

				<div className={styles['user-avatar']}>{user.avatar}</div>
			</header>
		</>
	);
};
