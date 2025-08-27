import Loading from '@/components/Loading';
import { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

const AuthLayout = () => {
	console.log("call authLayout")
	const { isAuth, auth } = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	console.log("call authLayout", isAuth, auth)
	useEffect(() => {
		if (!isAuth) {
			// navigate('/admin');
			navigate('/login');
		} else {
			const role = auth?.user?.role;
			navigate(`/${role}`);

			// const user_type = auth?.user?.role;
			// if (['Admin', 'branch', 'rider'].includes(user_type)) {
			// 	navigate(`/${user_type}`);
			// } else {
			// 	dispatch({ type: 'LOGOUT' });
			// 	navigate('/login');
			// }
		}
	}, [isAuth, navigate]);

	return (
		<>
			<Suspense fallback={<Loading />}>
				<ToastContainer />
				{<Outlet />}
			</Suspense>
		</>
	);
};

export default AuthLayout;
