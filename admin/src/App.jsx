import { RouterProvider } from 'react-router-dom';
import router from './routers';

function App() {
	return (
		<main className="App relative">
			<RouterProvider router={router} />
		</main>
	);
}

export default App;
