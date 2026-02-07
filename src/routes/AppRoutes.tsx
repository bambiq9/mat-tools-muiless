import { Routes, Route, useLocation } from 'react-router-dom';
import { InsulationList } from '@pages/insulation-list';
import { AssemblyUnitsList } from '@pages/assembly-units-list';
import { Modal } from '@components/modal';
import type { TAppRoutesProps } from './types';
import type { FC } from 'react';
import { AddAssemblyUnit } from '@components/add-assembly-unit';

export const AppRoutes: FC<TAppRoutesProps> = ({ onCloseModal }) => {
	const location = useLocation();
	const background = location.state?.background;

	return (
		<>
			<Routes location={background || location}>
				<Route path='register' element={null} />
				<Route path='login' element={null} />
				<Route path='insulation' element={null}>
					<Route path='list' element={<InsulationList />}>
						<Route path='compare' element={null} />
					</Route>
					<Route path='calc' element={null} />
					<Route path='stats' element={null} />
				</Route>
				<Route path='assembly-units-list' element={<AssemblyUnitsList />} />
				<Route path='filter' element={null} />
				<Route path='sets' element={null} />
				<Route path='*' element={null} />
			</Routes>
			{background && (
				<Routes>
					<Route
						path='/assembly-units-list/add'
						element={
							<Modal title='Добавить сборочную единицу' onClose={onCloseModal}>
								<AddAssemblyUnit />
							</Modal>
						}
					/>
					<Route
						path='/assembly-units-list/edit/:id'
						element={
							<Modal
								title='Редактировать сборочную единицу'
								onClose={onCloseModal}
							>
								<AddAssemblyUnit />
							</Modal>
						}
					/>
					<Route path='/insulation/list/:id' element={null} />
					<Route path='/insulation/list/:id/edit' element={null} />
				</Routes>
			)}
		</>
	);
};
