import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { io } from 'socket.io-client'
import Logo from '../assets/full-logo.png'
import { InputField, Loading } from '../components'
import { useAuth } from '../hooks/useAuth'
import useLocalStorage from '../hooks/useLocalStorage'
import { setSoket } from '../redux/features/appSlice'
import { setUserInfo } from '../redux/features/authSlice'
import { useRegisterMutation } from '../redux/services/authApi'

const Signup = () => {
  const [error, setError] = useState({})
  const [person, setPerson] = useState({
    fullname: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  })

  const [register, { isLoading, isError, isSuccess, error: err, data }] =
    useRegisterMutation()

  const socket = io('https://wa-lets-talk-socket.onrender.com')
  const auth = useAuth()
  const dispatch = useDispatch()
  const [user, setUser] = useLocalStorage('user')
  const [token, setToken] = useLocalStorage('token')

  // Handle change
  const handleChange = (e) => {
    setPerson({ ...person, [e.target.name]: e.target.value })
    setError({ [e.target.name]: '' })
  }

  // Submit handler
  const submitHandler = async (e) => {
    e.preventDefault()

    if (person.fullname !== '') {
      if (person.email !== '') {
        if (person.username !== '' && person.username.length > 5) {
          if (person.password !== '' && person.password.length > 5) {
            if (person.confirmPassword) {
              if (person.password === person.confirmPassword) {
                // signup the user
                //=========================
                register(person)
              } else {
                setError({
                  confirmPassword: 'Confirm Password is not matches',
                })
              }
            } else {
              setError({ confirmPassword: 'Field is Required' })
            }
          } else {
            setError({
              password: 'Field is required & must be at least 6 characters',
            })
          }
        } else {
          setError({
            username: 'Field is required & must be at least 6 characters',
          })
        }
      } else {
        setError({ email: 'Field is required' })
      }
    } else {
      setError({ fullname: 'Field is required' })
    }
  }

  useEffect(() => {
    if (data) {
      setError({ message: data.message })
      setUser(data.user)
      setToken(data.access_token)
      location.reload()
    }

    if (isError) {
      setError({ message: err.data.message })
    }
  }, [isSuccess, isError])

  if (auth) {
    return <Navigate to='/' />
  }
  return (
    <div className='flex justify-center items-center min-h-screen w-full'>
      <div className='w-full md:w-[650px]'>
        <div className=' w-40 mx-auto'>
          <img src={Logo} alt='logo' />
        </div>
        <h2 className='text-2xl font-semibold text-center dark:text-wa-light-gray text-wa-dark-3'>
          Create an account
        </h2>
        <div className='dark:bg-wa-dark-1 bg-wa-light-gray shadow-main p-8 mt-10 rounded-md'>
          {error.message && (
            <p
              className={`${isError && 'bg-wa-secondary'} ${
                isSuccess && 'bg-wa-primary'
              } text-wa-light-gray text-center py-2 px-4 mb-3 rounded-md`}
            >
              {error.message}
            </p>
          )}
          <form onSubmit={submitHandler}>
            <div className='grid grid-cols-2 gap-6 mb-3'>
              <div>
                <InputField
                  label={'Full Name'}
                  name='fullname'
                  value={person.fullname}
                  handleChange={handleChange}
                  error={error.fullname}
                  type='text'
                />
                {error.fullname && (
                  <span className='text-sm text-wa-secondary'>
                    {error.fullname}
                  </span>
                )}
              </div>
              <div>
                <InputField
                  label={'Email'}
                  name='email'
                  value={person.email}
                  handleChange={handleChange}
                  error={error.email}
                  type='email'
                />
                {error.email && (
                  <span className='text-sm text-wa-secondary'>
                    {error.email}
                  </span>
                )}
              </div>
            </div>
            <div className='mb-5'>
              <InputField
                label={'Username'}
                name='username'
                value={person.username}
                handleChange={handleChange}
                error={error.username}
                type='text'
              />
              {error.username && (
                <span className='text-sm text-wa-secondary'>
                  {error.username}
                </span>
              )}
            </div>

            <div className='grid grid-cols-2 gap-6 mb-5'>
              <div>
                <InputField
                  label={'Password'}
                  name='password'
                  value={person.password}
                  handleChange={handleChange}
                  error={error.password}
                  type='password'
                />
                {error.password && (
                  <span className='text-sm text-wa-secondary'>
                    {error.password}
                  </span>
                )}
              </div>
              <div>
                <InputField
                  label={'Confirm Password'}
                  name='confirmPassword'
                  value={person.confirmPassword}
                  handleChange={handleChange}
                  error={error.confirmPassword}
                  type='password'
                />
                {error.confirmPassword && (
                  <span className='text-sm text-wa-secondary'>
                    {error.confirmPassword}
                  </span>
                )}
              </div>
            </div>
            <div className='my-4 flex justify-between items-center'>
              <div className='flex items-center'>
                <input
                  id='remember-me'
                  name='remember-me'
                  type='checkbox'
                  className='h-4 w-4 text-wa-primary focus:ring-wa-primary border-gray-300 rounded'
                />
                <label
                  htmlFor='remember-me'
                  className='ml-2 block text-sm dark:text-wa-light-gray text-wa-dark-1'
                >
                  Remember me
                </label>
              </div>

              <div className='text-sm'>
                <a
                  href='#'
                  className='font-medium text-wa-primary hover:text-wa-primary'
                >
                  Forgot your password?
                </a>
              </div>
            </div>
            <button
              type='submit'
              disabled={isLoading ? true : false}
              className='flex justify-center items-center bg-wa-primary w-full text-wa-light-gray py-2 rounded-md active:scale-[.97] transition-all duration-100 disabled:opacity-75'
            >
              {isLoading ? (
                <>
                  <Loading /> Processing...
                </>
              ) : (
                'Sign Up'
              )}
            </button>
            <div className='flex items-center gap-4 mt-4'>
              <span className='flex-1 dark:bg-wa-light-gray bg-wa-gray w-full h-[1px]'></span>
              <span className='flex-3 dark:text-wa-light-gray text-wa-dark-1'>
                Already have an account?{' '}
                <Link
                  to='/login'
                  className='font-medium text-wa-primary hover:text-wa-primary'
                >
                  Login
                </Link>
              </span>
              <span className='flex-1 dark:bg-wa-light-gray bg-wa-gray w-full h-[1px]'></span>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Signup
