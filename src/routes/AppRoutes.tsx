import { Routes, Route, useLocation } from 'react-router-dom';
import { InsulationList } from '@pages/insulation-list';

export const AppRoutes = () => {
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
				<Route path='scheme-list' element={null} />
				<Route path='filter' element={null} />
				<Route path='sets' element={null} />
				<Route path='*' element={null} />
			</Routes>
			{background && (
				<Routes>
					<Route path='/insulation/list/:id' element={null} />
					<Route path='/insulation/list/:id/edit' element={null} />
					<Route path='/scheme-list/part/:id' element={null} />
				</Routes>
			)}
		</>
	);
};
