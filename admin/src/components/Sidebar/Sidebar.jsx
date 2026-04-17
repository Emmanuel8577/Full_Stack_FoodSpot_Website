import React from 'react'
import { NavLink } from 'react-router-dom'
import { PlusCircle, List, ShoppingBag, Users, MessageSquare } from 'lucide-react'

const Sidebar = () => {
  return (
    <div className='w-[18%] min-h-screen border-r-2 border-gray-100 pt-10 px-[2%] flex flex-col gap-4'>
      <NavLink to='/add' className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l-xl hover:bg-orange-50 transition-all'>
        <PlusCircle size={20}/> <p className='hidden md:block'>Add Food</p>
      </NavLink>
      <NavLink to='/list' className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l-xl hover:bg-orange-50 transition-all'>
        <List size={20}/> <p className='hidden md:block'>Food List</p>
      </NavLink>
      <NavLink to='/orders' className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l-xl hover:bg-orange-50 transition-all'>
        <ShoppingBag size={20}/> <p className='hidden md:block'>Orders</p>
      </NavLink>
      <NavLink to='/users' className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l-xl hover:bg-orange-50 transition-all'>
        <Users size={20}/> <p className='hidden md:block'>Manage Users</p>
      </NavLink>
    </div>
  )
}

export default Sidebar