import { UserBox } from '../components'
import { useAuth } from '../hooks/useAuth'
import { useGetAllUserQuery } from '../redux/services/authApi'

const Friends = () => {
  const { isLoading, isError, error, data } = useGetAllUserQuery()
  const auth = useAuth()

  if (isError) {
    return (
      <div className='py-6'>
        <h2 className='text-center dark:text-wa-light text-wa-dark3 text-2xl'>
          {error}
        </h2>
      </div>
    )
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

  return (
    <div className='min-h-screen flex'>
      <div className='md:w-full w-full mx-auto  px-8 py-10 rounded-md'>
        <div className='mb-6'>
          <h3 className='dark:text-wa-light-gray text-wa-dark-3 text-2xl text-center'>
            All Friends
          </h3>
        </div>
        <div className='grid gap-5 lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 grid-cols-1'>
          {data
            ?.filter((user) => user._id !== auth._id)
            .map((user) => {
              return <UserBox key={user._id} {...user} />
            })}
        </div>
      </div>
    </div>
  )
}

export default Friends
