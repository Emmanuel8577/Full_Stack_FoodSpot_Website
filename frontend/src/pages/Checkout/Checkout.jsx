import React, { useContext, useState } from 'react';
import { FoodContext } from '../../context/FoodContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
    const { token, cartItems, setCartItems, getCartAmount, products, url, currency } = useContext(FoodContext);
    const navigate = useNavigate();
    
    // Fixed: If delivery_fee isn't in context, we define it here to prevent NaN errors
    const delivery_fee = 500; 
    
    const [method, setMethod] = useState('stripe'); 
    const [showLoginModal, setShowLoginModal] = useState(false); // State to handle modal visibility
    const [formData, setFormData] = useState({
        firstName: '', lastName: '', email: '', street: '',
        city: '', state: '', zipcode: '', country: 'Nigeria', phone: ''
    });

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        if (name === 'phone') {
            const sanitizedValue = value.replace(/\D/g, '');
            if (sanitizedValue.length <= 11) setFormData(data => ({ ...data, [name]: sanitizedValue }));
            return; 
        }
        setFormData(data => ({ ...data, [name]: value }));
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        // INTERCEPT: Check if token exists before running checkout logic
        if (!token) {
            setShowLoginModal(true);
            return;
        }

        if (formData.phone.length < 11) {
            return toast.error("Phone number must be exactly 11 digits");
        }

        try {
            let orderItems = [];
            for (const itemId in cartItems) {
                if (cartItems[itemId] > 0) {
                    const itemInfo = products.find(product => product._id === itemId);
                    if (itemInfo) {
                        const itemCopy = { ...itemInfo };
                        itemCopy.quantity = cartItems[itemId];
                        orderItems.push(itemCopy);
                    }
                }
            }

            const orderData = {
                address: formData,
                items: orderItems,
                amount: getCartAmount() + delivery_fee,
            };

            const endpoint = method === 'stripe' ? '/api/order/stripe' : '/api/order/place';
            const response = await axios.post(`${url}${endpoint}`, orderData, { headers: { token } });

            if (response.data.success) {
                if (method === 'stripe') {
                    window.location.replace(response.data.session_url);
                } else {
                    setCartItems({});
                    localStorage.removeItem("chuks_food_cart"); // Sync with our new local strategy
                    toast.success("Order placed successfully!");
                    navigate('/orders');
                }
            } else {
                toast.error(response.data.message);
            }

        } catch (error) {
            console.error("Checkout Error:", error);
            toast.error(error.response?.data?.message || "An error occurred");
        }
    };

    return (
        <>
            <form onSubmit={onSubmitHandler} className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    
                    {/* LEFT SIDE: DELIVERY INFO */}
                    <div className="space-y-8">
                        <h2 className="text-3xl font-black text-gray-900 uppercase">Delivery <span className="text-orange-600">Info</span></h2>
                        <div className="grid grid-cols-2 gap-4">
                            <input required name='firstName' onChange={onChangeHandler} value={formData.firstName} className='w-full px-5 py-3 border rounded-2xl bg-gray-50' type="text" placeholder='First name' />
                            <input required name='lastName' onChange={onChangeHandler} value={formData.lastName} className='w-full px-5 py-3 border rounded-2xl bg-gray-50' type="text" placeholder='Last name' />
                        </div>
                        <input required name='email' onChange={onChangeHandler} value={formData.email} className='w-full px-5 py-3 border rounded-2xl bg-gray-50' type="email" placeholder='Email address' />
                        <input required name='street' onChange={onChangeHandler} value={formData.street} className='w-full px-5 py-3 border rounded-2xl bg-gray-50' type="text" placeholder='Street address' />
                        <div className="grid grid-cols-2 gap-4">
                            <input required name='city' onChange={onChangeHandler} value={formData.city} className='w-full px-5 py-3 border rounded-2xl bg-gray-50' type="text" placeholder='City' />
                            <input required name='state' onChange={onChangeHandler} value={formData.state} className='w-full px-5 py-3 border rounded-2xl bg-gray-50' type="text" placeholder='State' />
                        </div>
                        <input required name='phone' onChange={onChangeHandler} value={formData.phone} className='w-full px-5 py-3 border rounded-2xl bg-gray-50' type="tel" placeholder='Phone number (11 digits)' />
                    </div>

                    {/* RIGHT SIDE: ORDER SUMMARY & PAYMENT */}
                    <div className="space-y-8">
                        <div className="bg-gray-900 text-white p-8 rounded-[2.5rem] shadow-2xl">
                            <h3 className="text-2xl font-black mb-6 uppercase border-b border-gray-700 pb-4">Order Summary</h3>
                            
                            {/* ITEM LIST */}
                            <div className="space-y-4 mb-8 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                                {products.map((item) => {
                                    if (cartItems[item._id] > 0) {
                                        return (
                                            <div key={item._id} className="flex justify-between items-center text-gray-300">
                                                <p className="text-sm">
                                                    <span className="font-bold text-orange-500">{cartItems[item._id]}x</span> {item.name}
                                                </p>
                                                <p className="text-sm font-bold">{currency}{(item.price * cartItems[item._id]).toFixed(2)}</p>
                                            </div>
                                        )
                                    }
                                    return null;
                                })}
                            </div>

                            <div className="space-y-2 border-t border-gray-700 pt-4">
                                <div className="flex justify-between text-gray-400 text-sm">
                                    <span>Subtotal</span>
                                    <span>{currency}{getCartAmount().toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-400 text-sm">
                                    <span>Delivery Fee</span>
                                    <span>{currency}{delivery_fee.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-xl font-black mt-4">
                                    <span>Total</span>
                                    <span>{currency}{(getCartAmount() + delivery_fee).toFixed(2)}</span>
                                </div>
                            </div>
                        </div>

                        {/* PAYMENT METHOD SECTION */}
                        <div className="space-y-6">
                            <h3 className="text-xl font-bold text-gray-800">Select Payment Method</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div onClick={() => setMethod('stripe')} className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex items-center gap-3 ${method === 'stripe' ? 'border-orange-600 bg-orange-50' : 'border-gray-100 bg-white'}`}>
                                    <div className={`w-4 h-4 rounded-full border-2 ${method === 'stripe' ? 'border-orange-600 bg-orange-600' : 'border-gray-300'}`}></div>
                                    <span className="font-bold">💳 Stripe (Card)</span>
                                </div>
                                <div onClick={() => setMethod('cod')} className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex items-center gap-3 ${method === 'cod' ? 'border-orange-600 bg-orange-50' : 'border-gray-100 bg-white'}`}>
                                    <div className={`w-4 h-4 rounded-full border-2 ${method === 'cod' ? 'border-orange-600 bg-orange-600' : 'border-gray-300'}`}></div>
                                    <span className="font-bold">💵 Cash on Delivery</span>
                                </div>
                            </div>
                            <button type='submit' className='w-full bg-orange-600 text-white py-5 rounded-2xl font-black text-lg shadow-xl uppercase tracking-widest hover:bg-orange-700 transition-all'>
                                Confirm & Place Order
                            </button>
                        </div>
                    </div>

                </div>
            </form>

            {/* NOT-LOGGED-IN INTERCEPT MODAL OVERLAY */}
            {showLoginModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white w-full max-w-md rounded-[2rem] p-8 shadow-2xl text-center relative animate-in fade-in zoom-in-95 duration-200">
                        
                        {/* Upper Warning Icon Element */}
                        <div className="mx-auto w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                            <span className="text-2xl">🔒</span>
                        </div>

                        <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tight mb-2">
                            Authentication <span className="text-orange-600">Required</span>
                        </h3>
                        
                        <p className="text-gray-600 text-sm leading-relaxed mb-6">
                            You must log in to your profile account or create a new registration before you can complete this order placement.
                        </p>

                        {/* Modal Navigation Control Group */}
                        <div className="flex flex-col gap-3">
                            <button 
                                onClick={() => {
                                    setShowLoginModal(false);
                                    navigate('/login'); // Replace with your routing pathway string if different
                                }}
                                className="w-full bg-orange-600 text-white py-3.5 rounded-xl font-bold uppercase tracking-wider hover:bg-orange-700 transition-all shadow-md shadow-orange-600/20"
                            >
                                Sign In / Sign Up
                            </button>
                            
                            <button 
                                onClick={() => setShowLoginModal(false)}
                                className="w-full bg-gray-100 text-gray-700 py-3.5 rounded-xl font-bold uppercase tracking-wider hover:bg-gray-200 transition-all"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Checkout;