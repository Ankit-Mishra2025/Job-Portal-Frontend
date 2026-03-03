import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setsearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setsearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div className="text-center px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-4 sm:gap-5 my-8 sm:my-12 lg:my-16 max-w-4xl mx-auto">

                {/* Badge */}
                <span className="mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium text-sm sm:text-base">
                    No. 1 Job Hunt Website
                </span>

                {/* Heading */}
                <h1 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl 2xl:text-6xl font-bold leading-tight">
                    Search, Apply &{' '}
                    <br className="hidden sm:block" />
                    Get Your{' '}
                    <span className="text-[#6A38C2]">Dream Jobs</span>
                </h1>

                {/* Subtext */}
                <p className="text-gray-500 text-sm sm:text-base lg:text-lg max-w-xl mx-auto leading-relaxed">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid aspernatur temporibus nihil tempora dolor!
                </p>

                {/* Search Bar */}
                <div className="flex w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-[45%] 2xl:w-[40%] shadow-md border border-gray-200 pl-3 sm:pl-4 rounded-full items-center gap-2 mx-auto mt-2">
                    <input
                        type="text"
                        placeholder="Find your dream jobs"
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && searchJobHandler()}
                        className="outline-none border-none w-full py-2 sm:py-3 text-sm sm:text-base bg-transparent placeholder:text-gray-400"
                    />
                    <Button
                        onClick={searchJobHandler}
                        className="rounded-r-full bg-[#6A38C2] hover:bg-[#5b30a6] h-10 sm:h-12 px-4 sm:px-5 flex-shrink-0 transition-colors"
                    >
                        <Search className="h-4 w-4 sm:h-5 sm:w-5" />
                    </Button>
                </div>

            </div>
        </div>
    )
}

export default HeroSection