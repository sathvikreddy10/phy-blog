"use client"

import Filter from './Filter.svg'
import Search from './search-icon.svg'
import CloseIcon from './X.svg' // 👈 Make sure this file exists in the folder
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'
import FilterMenu from './FilterMenu.js'

export default function SearchBar() {
    const pathName = usePathname()
    
    // States
    const [isExpanded, setIsExpanded] = useState(false)
    const [showFilter, setShowFilter] = useState(false)
    const [query, setQuery] = useState("")

    // 1. Hide on non-home pages
    if (pathName !== '/') return null

    // 2. Handle Text Input
    const handleSearch = (e) => {
        setQuery(e.target.value)
        // This log confirms data is capturing correctly
        console.log("Live Search Query:", e.target.value)
    }

    // 3. Reset everything when clicking outside
    const handleClose = () => {
        setIsExpanded(false)
        setShowFilter(false)
    }

    // 4. Toggle Filter Logic
    const toggleFilter = () => {
        const willOpen = !showFilter;
        setShowFilter(willOpen); 
        
        // If opening filter, ensure the bar is expanded too
        if (willOpen) setIsExpanded(true); 
    }

    return (
        <>
            {/* INVISIBLE BACKDROP (Detects clicks outside) */}
            {(isExpanded || showFilter) && (
                <div 
                    className="fixed inset-0 z-10" 
                    onClick={handleClose} 
                />
            )}

            {/* MAIN SEARCH CONTAINER */}
            <div className={`absolute left-1/2 -translate-x-1/2 mt-1 z-20 transition-all duration-300 ease-out
                ${isExpanded ? 'w-96' : 'w-64'} 
            `}>
                
                <div className="h-10 rounded-full bg-[#adcffe] flex justify-between items-center px-2 relative cursor-pointer min-w-0 overflow-hidden">
                    {/* Left Icon */}
                    <img src={Search.src} alt="Search" className="w-7 shrink-0"/>
                    
                    {/* Center: Swap between Text and Input */}
                    <div className="flex-1 flex items-center ml-2 min-w-0">
                        {!isExpanded ? (
                            // STATE 1: Static Text (Click to Open)
                            <div className='overflow-hidden flex items-center min-w-0 w-full'>
                            <span 
                                onClick={() => setIsExpanded(true)}
                                className="text-sm text-[#171717] font-body select-none text-center truncate block flex-1 min-w-0 px-2 "
                            >
                               {query ? query : "Search"}
                            </span>
                            </div>
                        ) : (
                            // STATE 2: Active Input
                            <input 
                                autoFocus // 👈 Crucial: Types immediately
                                value={query}
                                onChange={handleSearch}
                                className="bg-transparent border-none outline-none text-sm w-full placeholder-gray-600 font-body min-w-0" 
                                placeholder="Search anything..." 
                            />
                        )}
                    </div>
                    
                    {/* Right: Toggle Button (Filter <-> Close) */}
                    <button 
                        onClick={toggleFilter}
                        className="p-1 hover:bg-white/20 rounded-full transition-colors w-10 flex justify-center items-center shrink-0"
                    >
                        {showFilter ? (
                            <img src={CloseIcon.src} alt="Close" className="w-8 h-8"/> 
                        ) : (
                            <img src={Filter.src} alt="Filter" className="w-10"/>
                        )}
                    </button>
                </div>

                {/* Filter Menu Component */}
                {showFilter && <FilterMenu />}
            </div>
        </>
    )
}