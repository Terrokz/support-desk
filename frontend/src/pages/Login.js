import { useState, useEffect } from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { login, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

function Login() {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	})

	const { email, password } = formData

	const dispatch = useDispatch()
	const navigate = useNavigate()

	const { user, isLoading, isSuccess, isError, message } = useSelector(
		(state) => state.auth
	)

	const handleChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}))
	}

	useEffect(() => {
		if (isError) {
			toast.error(message)
		}

		//redirect if succesfully logged in
		if (isSuccess && user) {
			navigate('/')
		}

		dispatch(reset())
	}, [isError, isSuccess, user, message, navigate, dispatch])

	const handleSubmit = (e) => {
		e.preventDefault()

		const userData = {
			email,
			password,
		}

		dispatch(login(userData))
	}
   
   if(isLoading) {
      return <Spinner/>
   }
	return (
		<>
			<section className='heading'>
				<h1>
					<FaSignInAlt /> Login
				</h1>
				<p>Please log in to get support</p>
			</section>
			<section className='form'>
				<form onSubmit={handleSubmit}>
					<div className='form-group'>
						<input
							type='email'
							id='email'
							name='email'
							className='form-control'
							value={email}
							placeholder='Enter your email'
							onChange={handleChange}
							required
							autoComplete='email'
						/>
					</div>
					<div className='form-group'>
						<input
							type='password'
							id='password'
							name='password'
							className='form-control'
							value={password}
							placeholder='Enter password'
							onChange={handleChange}
							required
							autoComplete='current-password'
						/>
					</div>

					<div className='form-group'>
						<button className='btn btn-block'>Submit</button>
					</div>
				</form>
			</section>
		</>
	)
}

export default Login
