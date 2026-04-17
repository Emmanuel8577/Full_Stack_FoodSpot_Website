import React, { useContext, useEffect, useState } from 'react';
import { FoodContext } from '../../context/FoodContext';
import { MdDeleteOutline, MdAdd, MdRemove } from 'react-icons/md';
import CartTotal from '../../components/CartTotal/CartTotal';

const Cart = () => {
    const { products, currency, cartItems, updateQuantity, navigate, url } = useContext(FoodContext);
    const [cartData, setCartData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);

    useEffect(() => {
        if (products.length > 0) {
            const tempData = [];
            for (const items in cartItems) {
                if (cartItems[items] > 0) {
                    tempData.push({
                        _id: items,
                        quantity: cartItems[items]
                    });
                }
            }
            setCartData(tempData);
        }
    }, [cartItems, products]);

    const confirmDelete = () => {
        updateQuantity(itemToDelete, 0);
        setShowModal(false);
        setItemToDelete(null);
    };

    return (
        <div className='min-h-screen bg-gray-50 py-20 px-4 md:px-10 lg:px-20'>
            <div className='max-w-6xl mx-auto'>
                <h1 className='text-3xl font-black italic uppercase text-gray-800 mb-10'>
                    Your <span className='text-orange-600'>Cart</span>
                </h1>

                {cartData.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100">
                        <p className="text-gray-400 text-xl font-bold italic">Your cart is currently empty.</p>
                        <button onClick={() => navigate('/')} className="mt-4 text-orange-600 font-bold underline">Go Shopping</button>
                    </div>
                ) : (
                    <div className='grid grid-cols-1 lg:grid-cols-3 gap-10'>
                        <div className='lg:col-span-2 space-y-4'>
                            {cartData.map((item, index) => {
                                const productData = products.find((p) => p._id === item._id);
                                if (!productData) return null;

                                return (
                                    <div key={index} className='bg-white p-4 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4'>
                                        <img 
                                            src={`${url}/images/${productData.image}`} 
                                            alt={productData.name} 
                                            className='w-20 h-20 rounded-2xl object-cover bg-gray-50' 
                                        />
                                        <div className='flex-1'>
                                            <h3 className='font-bold text-gray-800'>{productData.name}</h3>
                                            <p className='text-orange-600 font-black'>{currency}{productData.price}</p>
                                        </div>
                                        <div className='flex items-center gap-3 bg-gray-50 p-2 rounded-2xl'>
                                            <button onClick={() => updateQuantity(item._id, item.quantity - 1)} className='p-1 hover:bg-white rounded-lg transition-all'><MdRemove /></button>
                                            <span className='font-bold text-sm w-5 text-center'>{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item._id, item.quantity + 1)} className='p-1 hover:bg-white rounded-lg transition-all'><MdAdd /></button>
                                        </div>
                                        <button onClick={() => { setItemToDelete(item._id); setShowModal(true); }} className='text-gray-400 hover:text-red-500 p-2'><MdDeleteOutline size={24} /></button>
                                    </div>
                                );
                            })}
                        </div>
                        <div className='lg:col-span-1'>
                            <CartTotal />
                            <button onClick={() => navigate('/checkout')} className='w-full mt-6 bg-gray-900 text-white py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-orange-600 transition-all'>Checkout</button>
                        </div>
                    </div>
                )}
            </div>

            {/* Delete Confirmation Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white p-8 rounded-[2rem] max-w-sm w-full text-center">
                        <h3 className="text-xl font-bold mb-4 text-gray-800">Remove Item?</h3>
                        <p className="text-gray-500 mb-6">Are you sure you want to remove this from your cart?</p>
                        <div className="flex gap-4">
                            <button onClick={() => setShowModal(false)} className="flex-1 py-3 bg-gray-100 rounded-xl font-bold transition-all">Cancel</button>
                            <button onClick={confirmDelete} className="flex-1 py-3 bg-red-500 text-white rounded-xl font-bold hover:bg-red-600 transition-all">Remove</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;