import React from 'react'

const Nav = () => {
  return (
    <div className='absolute z-999 flex justify-between items-center w-full px-8 py-4'>
        <div><h1 className='text-[#11111d] text-2xl font-medium'><span className='text-[#dfff3e]'>Z</span>en<span className='text-[#dfff3e]'>Z</span>one</h1></div>
        <ul className='flex justify-center items-center gap-6 text-xm font-medium'>
            <li className='text-[#dfff3e] hover:text-black cursor-pointer'>Home</li>
            <li className='text-black/60 hover:text-[#dfff3e] cursor-pointer'>Program</li>
            <li className='text-black/60 hover:text-[#dfff3e] cursor-pointer'>Pricing</li>
            <li className='text-black/60 hover:text-[#dfff3e] cursor-pointer'>Community</li>
            <li className='text-black/60 hover:text-[#dfff3e] cursor-pointer'>Contact</li>
        </ul>

        <div>
            <button className='px-4 py-1 bg-black rounded-full border border-[#b0b0b1] text-white'>Register</button>
        </div>
    </div>
  )
}

export default Nav