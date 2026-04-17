import React, { useContext } from 'react';
import { FoodContext } from '../../context/FoodContext';

const CartTotal = () => {
    const { currency, getCartAmount } = useContext(FoodContext);
    const delivery_fee = 500; 
    
    // Default to 0 if the function isn't ready
    const subtotal = getCartAmount() || 0;

    return (
        <div className='w-full bg-white p-6 rounded-3xl shadow-sm border border-gray-100'>
            <h2 className='text-2xl font-black mb-6'>Cart <span className='text-orange-600'>Totals</span></h2>
            <div className='flex flex-col gap-3 text-sm'>
                <div className='flex justify-between'>
                    <p className='text-gray-500'>Subtotal</p>
                    <p className='font-bold'>{currency}{subtotal.toFixed(2)}</p>
                </div>
                <hr className='border-gray-50' />
                <div className='flex justify-between'>
                    <p className='text-gray-500'>Delivery Fee</p>
                    <p className='font-bold'>{currency}{subtotal === 0 ? "0.00" : delivery_fee.toFixed(2)}</p>
                </div>
                <hr className='border-gray-100' />
                <div className='flex justify-between text-gray-900'>
                    <b className='text-lg'>Total</b>
                    <b className='text-lg text-orange-600'>
                        {currency}{subtotal === 0 ? "0.00" : (subtotal + delivery_fee).toFixed(2)}
                    </b>
                </div>
            </div>
        </div>
    );
};

export default CartTotal;