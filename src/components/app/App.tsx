import { ListDetails } from '@assets/svg/ListDetailsIcon/ListDetailsIcon';
import { PartIcon } from '@assets/svg/PartIcon/PartIcon';
import { UnitIcon } from '@assets/svg/UnitIcon/UnitIcon';
import { Sidebar } from '@components/sidebar';
import { AppRoutes } from '@routes/AppRoutes';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function App() {
	const navigate = useNavigate();
	const [user] = useState({
		name: 'Дмитрий Егоров',
		role: 'Слесарь МСР',
		avatar: 'ДЕ',
	});

	const [menuItems] = useState([
		{
			id: 'assembly-units',
			title: 'Сборочные единицы',
			icon: <ListDetails />,
			path: '/assembly-units-list',
			isActive: true,
		},
		{
			id: 'parts-catalog',
			title: 'Каталог деталей',
			icon: <PartIcon />,
			path: '/parts-catalog',
			isActive: false,
		},
		{
			id: 'units',
			title: 'Установки',
			icon: <UnitIcon />,
			path: '/units-list',
			isActive: false,
		},
	]);

	const handleModalClose = () => navigate(-1);

	return (
		<>
			<Sidebar user={user} menuItems={menuItems} />
			<AppRoutes onCloseModal={handleModalClose} />
		</>
	);
}

export default App;
