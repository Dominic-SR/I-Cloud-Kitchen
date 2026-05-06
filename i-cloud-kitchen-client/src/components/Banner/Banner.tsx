import React from 'react'

const Banner = () => {
  return (
    <div className='relative'>
        <div className='bg-gradient-to-br from-amber-900 via-amber-800 to-amber-700 text-white py-16 px-4 sm:px-8 relative overflow-hidden'>
            <div className='absolute inset-0 flex flex-col md:flex-row items-center gap-12 relative z-10'>
                {/* LEFT CONTENT */}
                <div className='flex-1 text-center md:text-left'>
                    <h1 className='text-3xl md:text-4xl font-bold mb-4'>Welcome to Our Restaurant</h1>
                    <p className='text-lg md:text-xl mb-6'>Experience the best flavors and service in town!</p>
                    <button className='bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded-full transition duration-300'>
                        Order Now
                    </button>
                </div>
                {/* RIGHT CONTENT */}
                <div className='flex-1 flex justify-center'>
                    <img src="/path/to/image.jpg" alt="Delicious Food" className='rounded-full border-4 border-white shadow-lg' />
                </div>
            </div>
        </div>
    </div>
  )
}

export default Banner