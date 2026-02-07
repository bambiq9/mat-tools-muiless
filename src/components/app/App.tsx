import { AppRoutes } from '@routes/AppRoutes';
import { useNavigate } from 'react-router-dom';

function App() {
	const navigate = useNavigate();

	const handleModalClose = () => navigate(-1);

	return (
		<>
			<AppRoutes onCloseModal={handleModalClose} />
		</>
	);
}

export default App;
