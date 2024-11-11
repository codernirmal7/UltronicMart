import brandName from '@/constant/BrandName'
import {FaRegCircleUser } from 'react-icons/fa6'

export default function LogoNavbar() {
  return (
    <header className='w-full h-[80px]'>
        <nav className='max-w-[1200px] w-full h-full flex justify-between items-center mx-auto'>
            <div className='flex items-center'>
                <span className='text-2xl font-extrabold text-primary'>{brandName}</span>
            </div>

            <div>
                <FaRegCircleUser size={30} className='fill-primary cursor-pointer'/>
            </div>
        </nav>
    </header>
  )
}
