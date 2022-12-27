import {
  IconBrandProducthunt,
  IconFlower,
  IconFriends,
  IconGenderAndrogyne,
  IconMap,
  IconPhone,
  IconWorldWww,
} from '@tabler/icons'
import { Link, useParams } from 'react-router-dom'
import getImage from '../lib/helper'
import { useAuth } from '../hooks/useAuth'
import { useGetUserQuery } from '../redux/services/authApi'
import { CreatePostBox } from '../components'

const Profile = () => {
  const { username } = useParams()
  const auth = useAuth()

  const { isLoading, isError, error, data: user } = useGetUserQuery(username)

  const profileMock = [
    {
      label: 'Posts',
      icon: IconBrandProducthunt,
    },
    {
      label: 'Firneds',
      icon: IconFriends,
    },
    {
      label: 'Followers',
      icon: IconFlower,
    },
  ]

  if (isLoading) {
    return (
      <div className='py-6'>
        <h2 className='text-center dark:text-wa-light-gray text-wa-dark3 text-2xl'>
          Loading...
        </h2>
      </div>
    )
  }
  if (isError) {
    return (
      <div className='py-6'>
        <h2 className='text-center dark:text-wa-light-gray text-wa-dark3 text-2xl'>
          {error}
        </h2>
      </div>
    )
  }
  return (
    <div className='min-h-screen'>
      <div
        className='h-[300px] w-full relative before:absolute before:w-[200%] before:h-[100%] before:bg-[#181d2e] before:left-[-50%] before:top-0 before:-z-10'
        style={{
          backgroundImage: `url(${getImage(user.cover_pic)})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
        }}
      ></div>
      <div className='relative before:absolute before:w-[200%] before:h-[100%] before:dark:bg-wa-dark-1 before:bg-wa-light before:left-[-50%] before:top-0 before:-z-10'>
        <div className='dark:bg-wa-dark-1 bg-wa-light border-b dark:border-wa-dark-2 border-wa-light-gray'>
          <div className='mx-10'>
            <div className='grid grid-cols-4 gap-6 items-center py-4'>
              <div className='col-span-1'>
                <div className='-mt-[80px] flex justify-center'>
                  <img
                    className='w-40 h-40 border-4 dark:border-wa-dark-2 border-wa-light-gray shadow-main rounded-full z-10'
                    src={getImage(user.profile_pic)}
                    alt=''
                  />
                </div>
              </div>
              <div className='col-span-2'>
                <h3 className='text-2xl font-bold dark:text-wa-light-gray  text-wa-dark-1'>
                  {user.fullname}
                </h3>
                <h4 className='text-md text-normal dark:text-wa-light-gray text-wa-dark-3 mb-2 mt-1'>
                  {user.title ? (
                    user.title
                  ) : (
                    <Link to={`/profile/edit/${user._id}`}>Add Your Title</Link>
                  )}
                </h4>
                <div className='flex gap-5'>
                  <div className='text-wa-dark-3 dark:text-wa-light-gray'>
                    305 friends
                  </div>
                  <div className='text-wa-dark-3 dark:text-wa-light-gray'>
                    30k Followers
                  </div>
                </div>
              </div>
              <div className='col-span-1'>
                {auth._id === user._id ? (
                  <Link to={`/profile/edit/${user.username}`}>
                    <span className='border border-wa-gray hover:bg-wa-primary dark:text-wa-light-gray text-wa-dark-3 hover:text-wa-light-gray dark:border-wa-dark-3 px-8 py-3 rounded-md'>
                      Edit Profile
                    </span>
                  </Link>
                ) : (
                  <div className='flex gap-4'>
                    <span className='border border-wa-gray hover:bg-wa-primary dark:text-wa-light-gray text-wa-dark-3 hover:text-wa-light-gray dark:border-wa-dark-3 px-8 py-3 rounded-md cursor-pointer'>
                      Message
                    </span>
                    <span className='border border-wa-gray hover:bg-wa-primary dark:text-wa-light-gray text-wa-dark-3 hover:text-wa-light-gray dark:border-wa-dark-3 px-8 py-3 rounded-md cursor-pointer'>
                      Follow
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <>
        <div className='2xl:max-w-[1100px] xl:max-w-[900px] lg:max-w-[800px] lg:px-0 px-5 mx-auto'>
          <div className='grid grid-cols-5 gap-6 '>
            <div className='col-span-2 py-4'>
              <div className='dark:bg-wa-dark-3 bg-wa-light px-4 py-4 rounded shadow'>
                <h3 className='text-2xl font-semibold dark:text-wa-light-gray text-wa-dark-3 mb-3'>
                  Intro
                </h3>
                {user.bio && (
                  <div className='mb-4'>
                    <p className='dark:text-wa-light-gray text-dark-3'>
                      {user.bio ? user.bio : 'Add Bio'}
                    </p>
                  </div>
                )}
                {user.gender && (
                  <div className='mb-4'>
                    <div className='flex gap-3 justify-start items-center'>
                      <IconGenderAndrogyne
                        stroke={1.5}
                        size={40}
                        className='dark:bg-wa-dark-2 bg-wa-light-gray p-2 dark:text-wa-light-gray text-wa-dark-3 rounded'
                      />
                      <p className='dark:text-wa-light-gray text-dark-3'>
                        {user.gender}
                      </p>
                    </div>
                  </div>
                )}
                {user.location && (
                  <div className='mb-4'>
                    <div className='flex gap-3 justify-start items-center'>
                      <IconMap
                        stroke={1.5}
                        size={40}
                        className='dark:bg-wa-dark-2 bg-wa-light-gray p-2 dark:text-wa-light-gray text-wa-dark-3 rounded'
                      />
                      <p className='dark:text-wa-light-gray text-dark-3'>
                        {user.location}
                      </p>
                    </div>
                  </div>
                )}
                {user.phone && (
                  <div className='mb-4'>
                    <div className='flex gap-3 justify-start items-center'>
                      <IconPhone
                        stroke={1.5}
                        size={40}
                        className='dark:bg-wa-dark-2 bg-wa-light-gray p-2 dark:text-wa-light-gray text-wa-dark-3 rounded'
                      />
                      <p className='dark:text-wa-light-gray text-dark-3'>
                        {user.phone}
                      </p>
                    </div>
                  </div>
                )}
                {user.website && (
                  <div className='mb-4'>
                    <div className='flex gap-3 justify-start items-center'>
                      <IconWorldWww
                        stroke={1.5}
                        size={40}
                        className='dark:bg-wa-dark-2 bg-wa-light-gray p-2 dark:text-wa-light-gray text-wa-dark-3 rounded'
                      />
                      <p className='dark:text-wa-light-gray text-dark-3'>
                        {user.website}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className='col-span-3 py-4'>
              <CreatePostBox />
            </div>
          </div>
        </div>
      </>
    </div>
  )
}

export default Profile
