import type { FC } from 'react';
import type { SidebarItem } from './type';
import styles from './SidebarUI.module.scss';
import { Typography } from '../typography';
import { NavLink } from 'react-router-dom';

export const MenuItemUI: FC<Partial<SidebarItem> & { quick?: boolean }> = ({
	icon,
	title,
	path,
	quick = false,
}) => {
	return (
		<NavLink
			className={({ isActive }) =>
				`${styles['nav-item']} ${isActive ? styles.active : ''}`
			}
			to={path || '/'}
			title={title}
		>
			{icon}
			{!quick && (
				<Typography className={styles['nav-item-text']}>{title}</Typography>
			)}
		</NavLink>
	);
};
