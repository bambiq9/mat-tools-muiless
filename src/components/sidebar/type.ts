export interface SidebarItem {
	id: string;
	title: string;
	icon: React.ReactNode;
	path: string;
	isActive?: boolean;
}

export interface User {
	name: string;
	role: string;
	avatar: string;
}

export interface SidebarProps {
	isOpen: boolean;
	isCollapsed: boolean;
	user: User;
	menuItems: SidebarItem[];
	onToggleCollapse: () => void;
	onToggleOpen: () => void;
}
