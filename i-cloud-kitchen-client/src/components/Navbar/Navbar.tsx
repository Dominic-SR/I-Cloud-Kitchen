import { NavLink } from "react-router-dom";
import { GiForkKnifeSpoon } from "react-icons/gi";

const Navbar = () => {
  return (
    <div className='bg-[#2D1b0b] border-b-8 border-amber-900/30 shadow-amber-900/30 sticky top-0 z-50 shadow-[0_25px_50px_-12px] font-vibes group/nav overflow-x-hidden'>
        <div className='absolute -top-3 left-1/2 -transalate-x-1/2 w-full max-w-7xl px-4'>
            <div className='h-[6px] bg-gradient-to-r from-transparent via-amber-600/50 to-transparent shadow-[0_0_20px] shadow-amber-500/30'>
                <div className='flex justify-between px-6'>
                    <GiForkKnifeSpoon className="text-amber-500/40 -mt-4 -ml-2 rotate-45 size={32} " />
                    <GiForkKnifeSpoon className="text-amber-500/40 -mt-4 -ml-2 -rotate-45 size={32} " />
                </div>
            </div>
        </div>
            {/* MAIN NAVIGATION CONTAINER */}
            <div className="max-w-7xl mx-auto px-4 relative">
                <div className="flex items-center justify-between h-16 md:h-20 lg:h-24">
                    {/* LOGO */}
                    <div className="flex-shrink-0 flex items-center space-x-2 group relative md:translate-x-4 lg:translate-x-6 ml-0 md:ml-2">
                        <div className="absolute -inset-4 bg-amber-500/10 rounded-full blur-xl opacity-0 group-hover/nav:opacity-100 transition-opacity duration-100">
                            <GiForkKnifeSpoon className="text-3xl md:text-4xl lg:text-5xl text-amber-500 transition-all group-hover:rotate-12 group-hover: text-amber-400 hover:drop-shadow[0_0_15px] hover:drop-shadow-500/50 " />
                            {/* <div className="flex flex-col relative ml-2 max-w-[140px] md:max-w-[160px] lg:max-w-none">
                                <NavLink to="/" className="text-2xl md:text-xl lg:text-4xl bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent font-monsieur tracking-wider drop-shadow-[0_2px_2px] drop-shadow-black -translate-x-2 truncate md:truncate-none" >
                                    I-Cloud Kitchen
                                </NavLink>
                            </div> */}
                        </div>
                    </div>

                </div>  
            </div>
       
    </div>
  )
}

export default Navbar