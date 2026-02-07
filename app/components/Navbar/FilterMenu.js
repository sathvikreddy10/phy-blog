"use client"
import React, { useState, useEffect } from 'react'

const TIME_OPTIONS = [1, 5, 10, 30]; // 👈 The only allowed options

export default function FilterMenu({ onUpdate }) {
  
  const [filters, setFilters] = useState({
    author: "",
    readTime: 10, 
    startDate: "",
    endDate: "",
    isFeatured: false,
    isRead: false
  })

  // State to toggle input type for placeholders
  const [dateType, setDateType] = useState({ start: 'text', end: 'text' })

  // Notify parent on change
  useEffect(() => {
    if (onUpdate) onUpdate(filters)
  }, [filters, onUpdate])

  // 1. NEW LOGIC: Cycle through specific time options
  const handleTimeChange = (direction) => {
    setFilters(prev => {
      const currentIndex = TIME_OPTIONS.indexOf(prev.readTime);
      let newIndex = currentIndex + direction;

      // Prevent going out of bounds
      if (newIndex < 0) newIndex = 0;
      if (newIndex >= TIME_OPTIONS.length) newIndex = TIME_OPTIONS.length - 1;

      return { ...prev, readTime: TIME_OPTIONS[newIndex] };
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFilters(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  return (
    <div 
      onClick={(e) => e.stopPropagation()} 
      className="absolute top-14 right-0 w-80 bg-[#adcffe] rounded-2xl p-5 flex flex-col gap-4 z-30 font-body text-[#171717]"
    >
      
      {/* AUTHOR */}
      <div className="flex items-center justify-between border-b border-gray-400/30 pb-2">
        <span className="text-sm font-medium">Author</span>
        <input 
          name="author"
          value={filters.author}
          onChange={handleChange}
          type="text" 
          className="bg-transparent text-right outline-none text-sm w-32 placeholder-gray-500 font-medium" 
          placeholder="Name..." 
        />
      </div>

      {/* READ TIME: Cycle Logic */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Read time</span>
        <div className="flex items-center gap-2 text-xs bg-white/60 px-2 py-1 rounded-md select-none">
          <button 
            onClick={() => handleTimeChange(-1)}
            disabled={filters.readTime === 1} // Disable if at start
            className="hover:bg-black/10 px-1 rounded transition-colors font-bold disabled:opacity-30"
          >
            &lt;
          </button>
          
          <span className="w-8 text-center font-medium">{filters.readTime}m</span>
          
          <button 
            onClick={() => handleTimeChange(1)}
            disabled={filters.readTime === 30} // Disable if at end
            className="hover:bg-black/10 px-1 rounded transition-colors font-bold disabled:opacity-30"
          >
            &gt;
          </button>
        </div>
      </div>

      {/* DATES: Placeholder Trick */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Date</span>
        <div className="flex gap-2 text-xs items-center">
            
            {/* Start Date */}
            <input 
              name="startDate"
              placeholder="MM/YY" 
              type={filters.startDate ? "date" : dateType.start} // Show date if value exists, else use state
              onFocus={() => setDateType(prev => ({ ...prev, start: 'date' }))}
              onBlur={() => !filters.startDate && setDateType(prev => ({ ...prev, start: 'text' }))}
              value={filters.startDate}
              onChange={handleChange}
              className="bg-white/60 px-2 py-1 rounded-md w-18 bg-transparent outline-none text-center cursor-pointer placeholder-gray-500"
            />
            
            <span>to</span>
            
            {/* End Date */}
             <input 
              name="endDate"
              placeholder="MM/YY"
              type={filters.endDate ? "date" : dateType.end}
              onFocus={() => setDateType(prev => ({ ...prev, end: 'date' }))}
              onBlur={() => !filters.endDate && setDateType(prev => ({ ...prev, end: 'text' }))}
              value={filters.endDate}
              onChange={handleChange}
              className="bg-white/60 px-2 py-1 rounded-md w-18 bg-transparent outline-none text-center cursor-pointer placeholder-gray-500"
            />
        </div>
      </div>

      {/* CHECKBOXES */}
      <div className="flex justify-between mt-2 px-1">
        <label className="flex items-center gap-2 text-[0.9rem] cursor-pointer select-none hover:opacity-80 transition-opacity">
          <input 
            name="isFeatured"
            type="checkbox" 
            checked={filters.isFeatured}
            onChange={handleChange}
            className="accent-blue-600 w-3 h-3 cursor-pointer" 
          /> 
          Is Featured
        </label>

        <label className="flex items-center gap-2 text-[0.9rem] cursor-pointer select-none hover:opacity-80 transition-opacity">
          <input 
            name="isRead"
            type="checkbox" 
            checked={filters.isRead}
            onChange={handleChange}
            className="accent-blue-600 w-3 h-3 cursor-pointer" 
          /> 
          Is Read
        </label>
      </div>
    </div>
  )
}