import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

// 1. Add 'token' to the props
const List = ({ url, token }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Error fetching list");
      }
    } catch (error) {
      toast.error("Network error fetching list");
    }
  }

  const removeFood = async (foodId) => {
    try {
      // 2. Add the headers object containing the token
      const response = await axios.post(
        `${url}/api/food/remove`, 
        { id: foodId }, 
        { headers: { token } } 
      );

      if (response.data.success) {
        toast.success(response.data.message);
        // 3. Refresh the list AFTER a successful delete
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Unauthorized: You don't have permission to remove items.");
    }
  }

  useEffect(() => {
    fetchList();
  }, [])

  return (
    <div className='list add flex-col w-full p-8'>
      <p className='text-xl font-semibold mb-4 text-gray-800'>All Foods List</p>
      <div className="list-table border border-gray-200 rounded-lg overflow-hidden shadow-sm bg-white">
        <div className="list-table-format title bg-gray-100 grid grid-cols-[0.5fr_2fr_1fr_1fr_0.5fr] items-center gap-4 p-3 border-b font-bold text-gray-700">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        
        {list.length > 0 ? (
          list.map((item, index) => (
            <div key={index} className='list-table-format grid grid-cols-[0.5fr_2fr_1fr_1fr_0.5fr] items-center gap-4 p-3 border-b hover:bg-gray-50 transition-colors'>
              <img src={`${url}/images/` + item.image} alt={item.name} className='w-12 h-12 object-cover rounded shadow-sm' />
              <p className='font-medium text-gray-800'>{item.name}</p>
              <p className='px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-[10px] font-bold text-center w-fit uppercase'>
                {item.category}
              </p>
              <p className='font-semibold'>₦{item.price}</p>
              <p 
                onClick={() => removeFood(item._id)} 
                className='cursor-pointer text-red-600 font-black hover:scale-125 transition-transform text-center w-8'
              >
                X
              </p>
            </div>
          ))
        ) : (
          <p className='p-10 text-center text-gray-400'>No food items found.</p>
        )}
      </div>
    </div>
  )
}

export default List