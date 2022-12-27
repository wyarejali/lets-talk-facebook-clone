import React, { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import Logo from '../assets/full-logo.png'
import { Loading } from '../components'
import { useLoginMutation } from '../redux/services/authApi'
import useLocalStorage from '../hooks/useLocalStorage'
import { setUserInfo } from '../redux/features/authSlice'
import { useDispatch } from 'react-redux'
import { io } from 'socket.io-client'
import { setSoket } from '../redux/features/appSlice'

const Login = () => {
  const [person, setPerson] = useState({ username: '', password: '' })
  const [error, setError] = useState({})

  const [login, { isLoading, isError, error: err, isSuccess, data }] =
    useLoginMutation(person)

  const [user, setUser] = useLocalStorage('user')
  const [token, setToken] = useLocalStorage('token')

  const socket = io('https://wa-lets-talk-socket.onrender.com')
  const auth = useAuth()
  const dispatch = useDispatch()

  // handleChange input fields
  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setPerson({ ...person, [name]: value })
    // reset the error if the field is filled
    setError({})
  }

  // Submit handler
  const submitHandler = async (e) => {
    // reset the default behavior of the submit button
    e.preventDefault()

    // if username is empty
    if (person.username !== '') {
      // if password is empty
      if (person.password !== '') {
        // if all are ok
        login(person)
      } else {
        // if no password is provided
        setError({ ...error, password: 'Password is required' })
      }
    } else {
      // if no username is provided
      setError({ ...error, username: 'Username is required' })
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
    <div className='flex justify-center items-center h-screen w-full'>
      <div className='w-full md:w-[400px]'>
        <div className='w-40 mx-auto'>
          <img src={Logo} alt='logo' />
        </div>
        <h2 className='text-2xl font-semibold text-center dark:text-wa-light-gray text-wa-dark-3'>
          Sign in to your account
        </h2>
        <div className='dark:bg-wa-dark-1 bg-wa-white shadow-medium p-8 mt-10 rounded-md'>
          <form onSubmit={submitHandler}>
            {error.message && (
              <p
                className={`${isError && 'bg-wa-secondary'} ${
                  isSuccess && 'bg-wa-primary'
                } text-wa-light-gray text-center py-2 px-4 mb-3 rounded-md`}
              >
                {error.message}
              </p>
            )}
            <div className='mb-5'>
              <label
                htmlFor='username'
                className='block text-md font-normal font-heading dark:text-wa-light-gray text-wa-dark-1'
              >
                UserName
              </label>
              <input
                onChange={handleChange}
                value={person.username}
                type='text'
                name='username'
                id='username'
                autoComplete='username'
                className={`${
                  error.username
                    ? 'border border-wa-secondary'
                    : 'dark:border-wa-dark-3 border-wa-light-gray'
                } dark:bg-gray-800 mt-1 focus:ring-wa-primary focus:border-wa-primary text-wa-dark-3 dark:text-wa-light-gray block w-full sm:text-sm font-normal rounded-md`}
              />
              {error.username && (
                <span className='text-sm text-wa-secondary'>
                  {error.username}
                </span>
              )}
            </div>
            <div className='mb-5'>
              <label
                htmlFor='password'
                className='block text-md font-normal font-heading dark:text-wa-light-gray text-wa-dark-1'
              >
                Password
              </label>
              <input
                onChange={handleChange}
                value={person.password}
                type='password'
                name='password'
                id='password'
                autoComplete='password'
                className={`${
                  error.password
                    ? 'border border-wa-secondary'
                    : 'dark:border-wa-dark-3 border-wa-light-gray'
                } dark:bg-gray-800 mt-1 focus:ring-wa-primary focus:border-wa-primary text-wa-dark-3 dark:text-wa-light-gray block w-full sm:text-sm font-normal rounded-md`}
              />
              {error.password && (
                <span className='text-sm text-wa-secondary'>
                  {error.password}
                </span>
              )}
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
              className='flex justify-center items-center bg-wa-primary w-full text-wa-white py-2 rounded-md active:scale-[.97] transition-all duration-100 disabled:opacity-75'
            >
              {isLoading ? <Loading /> : ''}
              {isLoading ? 'Processing...' : 'Sign in'}
            </button>
            <div className='flex items-center gap-4 mt-4'>
              <span className='flex-1 dark:bg-wa-light-gray bg-wa-gray w-full h-[1px]'></span>
              <span className='flex-3 dark:text-wa-light-gray text-wa-dark-1'>
                Don't have account?{' '}
                <Link
                  to='/signup'
                  className='font-medium text-wa-primary hover:text-wa-primary'
                >
                  Sign Up
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

export default Login
