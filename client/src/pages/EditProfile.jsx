import { IconCameraPlus, IconEdit } from '@tabler/icons'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import getImage from '../lib/helper'
import InputField from '../components/InputField'
import { Loading, Toastify } from '../components'
import { useAuth } from '../hooks/useAuth'
import useLocalStorage from '../hooks/useLocalStorage'
import {
  useGetUserQuery,
  useUpdateUserMutation,
} from '../redux/services/authApi'

const EditProfile = () => {
  // States
  const [images, setImages] = useState({})
  const [updatedUser, setUpdatedUser] = useState({})

  const { username } = useParams()
  const { isLoading, isSuccess, isError, error, data } =
    useGetUserQuery(username)
  const [
    updateUser,
    {
      isLoading: isUpdating,
      isError: isUpdateError,
      isSuccess: isUpdated,
      error: updateError,
    },
  ] = useUpdateUserMutation()

  // Get the user for update
  useEffect(() => {
    if (isSuccess) {
      setUpdatedUser(data)
    }
  }, [data])

  // Change the state besd on updading
  useEffect(() => {}, [])

  // Handle onChange
  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setUpdatedUser({ ...updatedUser, [name]: value })
  }

  const handleImage = (e) => {
    const name = e.target.name
    const file = e.target.files[0]
    const ext = file.type.split('/')[1]
    const imageName = updatedUser.username + '-' + Date.now() + '.' + ext
    const imageUrl = URL.createObjectURL(file)

    if (name === 'profile_pic') {
      setImages({
        ...images,
        profileImage: file,
        profile_pic_name: imageName,
        profileUrl: imageUrl,
      })
      setUpdatedUser({ ...updatedUser, profile_pic: imageName })
    }
    if (name === 'cover_pic') {
      setImages({
        ...images,
        coverImage: file,
        cover_pic_name: imageName,
        coverUrl: imageUrl,
      })
      setUpdatedUser({ ...updatedUser, cover_pic: imageName })
    }
  }

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault()

    // if profile picture is changed
    // if (images.profile_pic_name !== '' && images.profileImage !== '') {
    //   const p_data = new FormData()
    //   p_data.append('name', images.profile_pic_name)
    //   p_data.append('file', images.profileImage)

    //   // Upload profile picture
    //   // UPLOAD profile picture
    // }

    updateUser(updatedUser)
  }

  if (isLoading) {
    return (
      <div className='py-6'>
        <h2 className='text-center dark:text-wa-light text-wa-dark3 text-2xl'>
          Loading...
        </h2>
      </div>
    )
  }

  if (isError && !isLoading) {
    return (
      <div className='py-6'>
        <h2 className='text-center dark:text-wa-light text-wa-dark3 text-2xl'>
          {error}
        </h2>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className='min-h-screen relative'>
        <div
          className='h-[300px] w-full '
          style={{
            backgroundImage: `url(${
              images.coverUrl
                ? images.coverUrl
                : getImage(updatedUser.cover_pic)
            })`,
            backgroundColor: '#333',
            backgroundBlendMode: 'overlay',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }}
        ></div>
        <div className='absolute top-[230px] right-10'>
          <label htmlFor='cover_pic'>
            <span className='flex justify-center gap-2 border hover:bg-wa-dark-3 text-wa-light-gray hover:text-wa-light-gray border-wa-dark-3 px-4 py-1 rounded-md cursor-pointer'>
              <IconEdit stroke={1.5} /> Edit
            </span>
            <input
              onChange={handleImage}
              type='file'
              name='cover_pic'
              id='cover_pic'
              className='hidden'
            />
          </label>
        </div>
        <div className='dark:bg-wa-dark-1 bg-wa-light border-b dark:border-wa-dark-2 border-wa-light-gray'>
          <div className='mx-10'>
            <div className='grid grid-cols-4 gap-6 items-center py-4'>
              <div className='col-span-1'>
                <div className='-mt-[80px] flex justify-center'>
                  <div className='w-40 h-40 border-4 shadow-main rounded-full overflow-hidden relative'>
                    <img
                      className='w-full h-full object-cover'
                      src={
                        images.profileUrl
                          ? images.profileUrl
                          : getImage(updatedUser.profile_pic)
                      }
                      alt=''
                    />
                    <label
                      htmlFor='profile_pic'
                      className='absolute inset-0 w-full h-full flex justify-center items-center cursor-pointer bg-gray-900/50 hover:bg-gray-900/75'
                    >
                      <span className='flex justify-center gap-2 text-wa-light-gray'>
                        <IconCameraPlus stroke={1.5} /> Edit
                      </span>
                      <input
                        onChange={handleImage}
                        type='file'
                        name='profile_pic'
                        id='profile_pic'
                        className='hidden'
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className=''>
          <div className='md:mx-10 sm:mx-12'>
            <div className='grid grid-cols-6 gap-6 '>
              <div className='col-span-1'></div>
              <div className='lg:col-span-4 col-span-6 py-4'>
                <div className='dark:bg-wa-dark-3 bg-wa-light px-4 py-5 shadow sm:overflow-hidden sm:rounded-md'>
                  <div className='grid grid-cols-6 gap-6'>
                    <div className='md:col-span-3 sm:col-span-6 col-span-6'>
                      <InputField
                        label={'Fullname'}
                        name={'fullname'}
                        value={updatedUser.fullname ? updatedUser.fullname : ''}
                        handleChange={handleChange}
                        type={'text'}
                      />
                    </div>
                    <div className='md:col-span-3 sm:col-span-6 col-span-6'>
                      <InputField
                        label={'Title'}
                        name={'title'}
                        value={updatedUser.title ? updatedUser.title : ''}
                        handleChange={handleChange}
                        type={'text'}
                      />
                    </div>
                    <div className='md:col-span-3 sm:col-span-6 col-span-6'>
                      <label
                        htmlFor='gender'
                        className='block text-sm font-medium dark:text-wa-light-gray text-gray-700'
                      >
                        Gender
                      </label>
                      <select
                        id='gender'
                        name='gender'
                        onChange={handleChange}
                        className='dark:bg-wa-dark-2 mt-1 block w-full rounded-md dark:border-wa-dark-1 border-gray-300 shadow-sm focus:border-wa-primary focus:ring-wa-primary sm:text-sm dark:text-wa-light'
                      >
                        <option value={'male'}>Male</option>
                        <option value={'female'}>Female</option>
                      </select>
                    </div>
                    <div className='md:col-span-3 sm:col-span-6 col-span-6'>
                      <InputField
                        label={'Website'}
                        type={'text'}
                        name={'website'}
                        handleChange={handleChange}
                        value={updatedUser.website ? updatedUser.website : ''}
                      />
                    </div>
                    <div className='md:col-span-3 sm:col-span-6 col-span-6'>
                      <InputField
                        label={'phone'}
                        type={'number'}
                        name={'phone'}
                        handleChange={handleChange}
                        value={updatedUser.phone ? updatedUser.phone : ''}
                      />
                    </div>
                    <div className='md:col-span-3 sm:col-span-6 col-span-6'>
                      <InputField
                        label={'location'}
                        type={'text'}
                        name={'location'}
                        handleChange={handleChange}
                        value={updatedUser.location ? updatedUser.location : ''}
                      />
                    </div>
                    <div className='col-span-6'>
                      <label
                        htmlFor='bio'
                        className='block text-sm font-medium dark:text-wa-light-gray text-gray-700'
                      >
                        Bio
                      </label>
                      <p className='mt-2 text-sm dark:text-wa-gray text-gray-500'>
                        Brief description for your profile. URLs are
                        hyperlinked.
                      </p>
                      <div className='mt-1'>
                        <textarea
                          id='bio'
                          name='bio'
                          rows={3}
                          onChange={handleChange}
                          value={updatedUser?.bio}
                          className='dark:bg-wa-dark-2 mt-1 block w-full rounded-md dark:border-wa-dark-2 border-gray-300 focus:border-wa-primary focus:ring-wa-primary sm:text-sm dark:text-wa-light'
                        />
                      </div>
                    </div>
                  </div>
                  <div className='dark:bg-wa-dark-3 bg-wa-light py-3 text-right'>
                    {isUpdateError && (
                      <div className='mr-3 inline'>
                        <Toastify type='danger' message={updateError} />
                      </div>
                    )}
                    {isUpdated && (
                      <div className='mr-3 inline'>
                        <Toastify
                          type='success'
                          message='Updated successfully!'
                        />
                      </div>
                    )}
                    <button
                      disabled={isUpdating ? true : false}
                      type='submit'
                      className={`${
                        isUpdating && 'opacity-70 cursor-wait '
                      } bg-wa-primary hover:bg-wa-secondary  dark:text-wa-light-gray text-wa-light-gray hover:text-wa-light-gray dark:border-wa-dark-3 px-8 py-3 rounded-md`}
                    >
                      {isUpdating ? (
                        <span className='flex justify-center items-center'>
                          <Loading /> Processing...
                        </span>
                      ) : (
                        'Update Changes'
                      )}
                    </button>
                  </div>
                </div>
              </div>
              <div className='col-span-1'></div>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}

export default EditProfile
