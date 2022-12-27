import { IconBrandFacebook, IconBrandGithub, IconBrandInstagram, IconBrandLinkedin, IconBrandTwitter } from '@tabler/icons'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import getImage from '../../lib/helper'

const ChatUserProfile = () => {
  const { isChatOpen, activeChatUser } = useSelector((state) => state.chat)
  return (
    <div className='hidden lg:block 2xl:w-[320px] lg:w-[270px]'>
      <div
        className={`${
          isChatOpen ? 'left-0' : 'left-[110%] '
        } relative transition-all duration-200 delay-150 overflow-hidden z-[-1]`}
      >
        <div className='mt-3'>
          <div className='flex gap-6 items-center justify-between'>
            <h3 className='text-md font-medium dark:text-wa-light text-wa-dark-1'>
              Profile
            </h3>
            <span className='flex-1 h-[1px] dark:bg-wa-dark-3 bg-wa-light'></span>
          </div>
        </div>
        <div className=''>
          <div className='mt-4 text-center'>
            <div className='w-[120px] h-[120px] mx-auto'>
              <img
                className='w-full h-full object-cover rounded-full'
                src={
                  activeChatUser?.profile_pic
                    ? getImage(activeChatUser?.profile_pic)
                    : ''
                }
                alt='Avatar'
              />
            </div>
            <h3 className='text-xl font-medium mt-1 dark:text-wa-light'>
              {activeChatUser?.fullname}
            </h3>
            <h4 className='text-sm text-gray-400'>
              {activeChatUser?.title ? activeChatUser.title : ''}
            </h4>

            <div className='flex gap-3 mt-3 justify-around'>
              <div className='flex-1 rounded-xl px-5 py-3 text-wa-primary'>
                <h5 className='dark:text-wa-light-gray text-wa-dark-3 dark:opacity-[.7]'>
                  Follower
                </h5>
                <h4 className='text-xl font-normal dark:text-wa-light text-wa-primary'>
                  100k
                </h4>
              </div>
              <div className='flex-1 rounded-xl px-5 py-3 text-wa-primary'>
                <h5 className='dark:text-wa-light-gray text-wa-dark-3 dark:opacity-[.7]'>
                  Friends
                </h5>
                <h4 className='text-xl font-normal dark:text-wa-light text-wa-primary'>
                  84
                </h4>
              </div>
            </div>
            <div>
              <p className='dark:text-wa-light-gray text-wa-dark-3 dark:opacity-[.7]'>A self-taught front-end developer. I started learning web development for curiosity, and now it's my profession.I love to learn new technology and addicted to code 😀</p>
            </div>
            <div className="flex justify-center items-center gap-2 my-3">
              <a className='dark:bg-wa-dark-3 bg-wa-dark-gray hover:bg-wa-primary p-2 rounded-full text-wa-light' target='_blank' href="https://github.com/wyarejali">
                <IconBrandGithub size={18} stroke={2} />
              </a>
              <a className='dark:bg-wa-dark-3 bg-wa-dark-gray hover:bg-wa-primary p-2 rounded-full text-wa-light' target='_blank' href="https://www.linkedin.com/in/wyarejali/">
                <IconBrandLinkedin size={18} stroke={2} />
              </a>
              <a className='dark:bg-wa-dark-3 bg-wa-dark-gray hover:bg-wa-primary p-2 rounded-full text-wa-light' target='_blank' href="https://www.facebook.com/wyarejali">
                <IconBrandFacebook size={18} stroke={2} />
              </a>
              <a className='dark:bg-wa-dark-3 bg-wa-dark-gray hover:bg-wa-primary p-2 rounded-full text-wa-light' target='_blank' href="https://twitter.com/wyarejali">
                <IconBrandTwitter size={18} stroke={2} />
              </a>
              <a className='dark:bg-wa-dark-3 bg-wa-dark-gray hover:bg-wa-primary p-2 rounded-full text-wa-light' target='_blank' href="https://www.instagram.com/wyarejali">
                <IconBrandInstagram size={18} stroke={2} />
              </a>
            </div>
            <Link to={`/profiles/${activeChatUser?._id}`}>
              <span className='bg-wa-primary hover:bg-wa-secondary px-10 py-2 mt-3 inline-block rounded-full text-wa-light'>Profile</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatUserProfile
