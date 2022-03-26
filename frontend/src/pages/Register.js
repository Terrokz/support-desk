import { useState, useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import { FaUser } from 'react-icons/fa'
import { toast } from 'react-toastify'
import {useSelector, useDispatch} from 'react-redux'
import {register, reset} from '../features/auth/authSlice'
import Spinner from '../components/Spinner'


function Register() {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		password2: '',
	})

	const { name, email, password, password2 } = formData

   const dispatch = useDispatch()
   const navigate = useNavigate()

   const {user, isLoading, isSuccess, isError, message} = useSelector(state => state.auth)

	const handleChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}))
	}

   useEffect(() => {
      if(isError) {
         toast.error(message)
      }

      //redirect if succesfully logged in
      if(isSuccess && user) {
         navigate('/')
      }

      dispatch(reset())
   },[isError, isSuccess, user, message, navigate, dispatch] )

	const handleSubmit = (e) => {
		e.preventDefault()

		if (password !== password2) {
			toast.error('Passwords do not match')
		} else {
         const userData = {
            name,
            email, 
            password
         }

         dispatch(register(userData))
      }
	}

   if(isLoading) {
      return <Spinner/>
   }
	return (
		<>
			<section className='heading'>
				<h1>
					<FaUser /> Register 
				</h1>
				<p>Please create an account</p>
			</section>
			<section className='form'>
				<form onSubmit={handleSubmit}>
					<div className='form-group'>
						<input
							type='text'
							id='name'
							name='name'
							className='form-control'
							value={name}
							placeholder='Enter your name'
							onChange={handleChange}
							required
                     autoComplete='username'
						/>
					</div>
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
							autoComplete='new-password'
						/>
					</div>
					<div className='form-group'>
						<input
							type='password'
							id='password2'
							name='password2'
							className='form-control'
							value={password2}
							placeholder='Confirm password'
							onChange={handleChange}
							required
							autoComplete='new-password'
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

export default Register
