import { SidebarUI } from '@components/ui/sidebar-ui';
import { useState, useEffect, type ReactNode, type FC } from 'react';
import type { User, SidebarItem } from './type';

interface SidebarProps {
	children?: ReactNode;
	user: User;
	menuItems: SidebarItem[];
}

export const Sidebar: FC<SidebarProps> = ({ children, user, menuItems }) => {
	const [isCollapsed, setIsCollapsed] = useState(false);
	const [isOpen, setIsOpen] = useState(true);

	useEffect(() => {
		const checkScreenSize = () => {
			if (window.innerWidth <= 760) {
				setIsOpen(false);
				setIsCollapsed(false);
			} else {
				setIsOpen(true);
			}
		};

		checkScreenSize();
		window.addEventListener('resize', checkScreenSize);

		return () => window.removeEventListener('resize', checkScreenSize);
	}, []);

	const handleToggleCollapse = () => {
		if (window.innerWidth > 760) {
			setIsCollapsed(!isCollapsed);
		}
	};

	const handleToggleOpen = () => {
		if (window.innerWidth <= 760) {
			setIsOpen(!isOpen);
		}
	};

	return (
		<>
			<SidebarUI
				isOpen={isOpen}
				isCollapsed={isCollapsed}
				onToggleCollapse={handleToggleCollapse}
				onToggleOpen={handleToggleOpen}
				user={user}
				menuItems={menuItems}
			/>
			{children}
		</>
	);
};
