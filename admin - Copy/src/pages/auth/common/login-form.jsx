// import Button from '@/components/ui/Button';
// import Checkbox from '@/components/ui/Checkbox';
// import Textinput from '@/components/ui/Textinput';
// import { useLoginMutation } from '@/store/api/auth/authApiSlice';
// import { setUser } from '@/store/api/auth/authSlice';
// import { yupResolver } from '@hookform/resolvers/yup';
// import { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import * as yup from 'yup';

// const schema = yup
// 	.object({
// 		email: yup.string().email('Invalid email').required('Email is Required'),
// 		password: yup.string().required('Password is Required'),
// 	})
// 	.required();

// const LoginForm = () => {
// 	const [login, { isLoading, isError, error, isSuccess }] = useLoginMutation();

// 	const dispatch = useDispatch();

// 	const {
// 		register,
// 		formState: { errors },
// 		handleSubmit,
// 	} = useForm({
// 		resolver: yupResolver(schema),
// 		//
// 		mode: 'all',
// 	});
// 	const navigate = useNavigate();
// 	const onSubmit = async (data) => {
// 		try {
// 			const response = await login(data);

// 			if (response?.data?.status !== 'success') {
// 				throw new Error('Invalid Credentials');
// 			}

// 			const loggedInUser = {
// 				accessToken: response?.data?.data?.accessToken,
// 				refreshToken: response?.data?.data?.refreshToken,
// 				user: response?.data?.data?.user,
// 			};

// 			dispatch(setUser(loggedInUser));
// 			navigate(`/${response?.data?.data?.user?.user_type}`);
// 			toast.success('Login Successful');
// 		} catch (error) {
// 			toast.error(error.message);
// 		}
// 	};

// 	const [checked, setChecked] = useState(false);

// 	return (
// 		<form
// 			onSubmit={handleSubmit(onSubmit)}
// 			className="space-y-4 "
// 			autoComplete="true"
// 		>
// 			<Textinput
// 				name="email"
// 				label="email"
// 				type="email"
// 				register={register}
// 				error={errors.email}
// 				className="h-[48px]"

// 			/>
// 			<Textinput
// 				name="password"
// 				label="passwrod"
// 				type="password"
// 				register={register}
// 				error={errors.password}
// 				className="h-[48px]"
// 			/>
// 			<div className="flex justify-between">
// 				<Checkbox
// 					value={checked}
// 					onChange={() => setChecked(!checked)}
// 					label="Keep me signed in"
// 				/>
// 				{/* <Link
//           to="/forgot-password"
//           className="text-sm text-slate-800 dark:text-slate-400 leading-6 font-medium"
//         >
//           Forgot Password?{" "}
//         </Link> */}
// 			</div>

// 			<Button
// 				type="submit"
// 				text="Sign in"
// 				className="btn btn-dark block w-full text-center "
// 				isLoading={isLoading}
// 			/>
// 		</form>
// 	);
// };

// export default LoginForm;


import Button from '@/components/ui/Button';
import Checkbox from '@/components/ui/Checkbox';
import Textinput from '@/components/ui/Textinput';
import { useLoginMutation } from '@/store/api/auth/authApiSlice';
import { setUser } from '@/store/api/auth/authSlice';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { GoEye } from "react-icons/go";
import { GoEyeClosed } from "react-icons/go";

const schema = yup
	.object({
		email: yup.string()
			.test('email-or-phone', 'Invalid email or phone number', (value) => {
				const isEmail = /\S+@\S+\.\S+/.test(value);
				const isPhoneNumber = /^\d{11}$/.test(value); // Assuming a 10-digit phone number format
				return isEmail || isPhoneNumber;
			})
			.required('Email or Phone number is required'),
		password: yup.string().required('Password is Required'),
	})
	.required();

const LoginForm = () => {
	const [login, { isLoading }] = useLoginMutation();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [showPassword, setShowPassword] = useState(false);

	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm({
		resolver: yupResolver(schema),
	});

	const onSubmit = async (data) => {
		try {
			const isEmail = /\S+@\S+\.\S+/.test(data.email);
			const isPhoneNumber = /^\d{11}$/.test(data.email); // Assuming a 11-digit phone number format

			const requestData = {
				...(isEmail ? { email: data.email } : {}),
				...(isPhoneNumber ? { phone: data.email } : {}),
				password: data.password
			};

			const response = await login(requestData);

			if (response?.data?.status !== 'success') {
				throw new Error('Invalid Credentials');
			}
// console.log("Response accessToken: " + response?.data?.data?.accessToken)
// console.log("Response accessToken: " + response?.data?.data?.refreshToken)
			const loggedInUser = {
				accessToken: response?.data?.data?.accessToken,
				refreshToken: response?.data?.data?.refreshToken,
				user: response?.data?.data?.user,
			};

			dispatch(setUser(loggedInUser));
			console.log('User logged in')
			// navigate(`/${response?.data?.data?.user?.user_type}`);
			navigate(`/admin`);
			toast.success('Login Successful');
		} catch (error) {
			toast.error(error.message);
		}
	};

	const [checked, setChecked] = useState(false);

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="space-y-4 "
			autoComplete="true"
		>
			<Textinput
				name="email"
				label="Email or Phone number"
				type="text"
				register={register}
				error={errors.email}
				className="h-[48px]"
				placeholder='Enter your Email or Phone number'
			/>
			{/* <Textinput
				name="password"
				label="Password"
				type="password"
				register={register}
				error={errors.password}
				className="h-[48px]"
				placeholder='Enter your password'
			/> */}
			<div className='relative'>
				<Textinput
					name="password"
					label="Passwrod"
					type={showPassword ? 'text' : 'password'}
					register={register}
					error={errors.password}
					className="h-[48px]"
					placeholder='Enter your password'
				/>

				<div
					className=" absolute right-3 top-12 cursor-pointer"
					onClick={() => setShowPassword(!showPassword)}
				>
					{showPassword ? <GoEyeClosed /> : <GoEye />}
				</div>
			</div>
			<div className="flex justify-between">
				<Checkbox
					value={checked}
					onChange={() => setChecked(!checked)}
					label="Keep me signed in"
				/>
				{/* <Link
          to="/forgot-password"
          className="text-sm text-slate-800 dark:text-slate-400 leading-6 font-medium"
        >
          Forgot Password?{" "}
        </Link> */}
			</div>

			<Button
				type="submit"
				text="Sign in"
				className="btn btn-dark block w-full text-center "
				isLoading={isLoading}
			/>
		</form>
	);
};

export default LoginForm;
