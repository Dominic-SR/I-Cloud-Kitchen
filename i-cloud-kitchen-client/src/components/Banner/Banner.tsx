import React from 'react'
import { FaDownload, FaPlay, FaSearch } from 'react-icons/fa'

const Banner = () => {
    const [searchQuery, setSearchQuery] = React.useState('')
    const [showVideos, setShowVideos] = React.useState(false)

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault() ;
        console.log("Search");
    }
  return (
    <div className='relative'>
        <div className='bg-gradient-to-br from-amber-900 via-amber-800 to-amber-700 text-white py-16 px-4 sm:px-8 relative overflow-hidden'>
            <div className='absolute inset-0 flex flex-col md:flex-row items-center gap-12 relative z-10'>
                {/* LEFT CONTENT */}
                <div className='flex-1 space-y-8 relative md:pr-8 lg:pr-19 text-center md:text-left'>
                    <h1 className='text-4xl md:text-5xl md:text-4xl lg:text-6xl font-bold leading-tight font-serif drop-shadow-md'>We're here <br/><span className='text-amber-400 bg-gradient-to-r from-amber-400 to-amber-300 bg-clip-text'>For Food Delivery</span></h1>
                    <p className='text-lg md:text-lg lg:text-xl font-playfair italic sm:text-xl text-amber-100 mx-w-xl opacity-90 mx-auto md:mx-0'>
                        Best cook and best delivery guys all at your service. Hot tasty food will reach you in 60 minutes.
                    </p>

                    <form onSubmit={handleSearch} className='relative max-w-2xl mx-auto md:mx-0 group'>
                        <div className='relative flex items-center bg-amber-900/30 rounded-xl border-2 border-amber-500 shadow-2xl hover:bg-amber-400/50 transition-all duration-100' >
                            <div className="pl-6 pr-3 py-4">
                                <FaSearch className='text-amber-400/80 text-xl' />
                            </div>
                            <input type='text' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder='Discover your next favourite meal' 
                            className='w-full py-4 pr-6 bg-transparent outline-none placeholder-amber-200/70 text-lg font-medium tracking-wide' />
                            <button type='submit' className='m-4 px-6 py-3 bg-gradient-to-r from-amber-400 to-amber300/20 rounded-lg font-semibold text-amber-900 Hover:from-amber-300 Hover:to-amber-200 transition-all duration-300 shadow-lg hover:shadow-amber-300/20'>Search</button>

                        </div>
                    </form>
                    <div className="flex flex-wrap gap-4 justify-center md:justify-start mt-6">
                        <button className='group flex items-center gap-3 bg-amber-800/30 hover:bg-amber-800/50 px-6 py-3 rounded-xl transition-all duration-300 border-2 border-amber-700/50 hover:border-amber-400 backdrop-blur-sm '>
                            <FaDownload className='text-xl text-amber-400 group-hover:animate-bounce' />
                            <span className='text-lg'>Download App</span>
                        </button>

                        <button onClick={()=>setShowVideos(true)} className='group flex items-center gap-3 bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 px-6 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-amber-300/30'>
                            <FaPlay className='text-xl text-amber-900' />
                            <span className='text-lg text-amber-900 font-semibold'>Watch Videos</span>

                        </button>
                    </div>
                </div>  
                {/* RIGHT IMAGE CONTENT */}
                <div className='flex-1 flex group mt-8 md:mt-0 min-h-[300px] sm:min-h-[400px]'>
                    <div className='relative rounded-full p-1 bg-gradient-to-br from-amber-700 via-amber-800 to-amber-300 shadow-2xl z-20 w-[250px] xs:w-[300px] sm:w-[350px] h-[250px] xs:h-[300px] sm:h-[350px] mx-auto'>
                        <img src="" alt="Food Delivery" className='rounded-full border-4 xs:border-8 border-amber-900/50 w-full h-full object-cover object-top' />
                    </div>    
                </div>
            </div>
        </div>
    </div>
  )
}

export default Banner