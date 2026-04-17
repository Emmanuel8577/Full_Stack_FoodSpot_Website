import React, { useContext, useEffect } from 'react';
import { FoodContext } from '../context/FoodContext'; // Ensure path is correct
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Verify = () => {
    // Check if your context uses 'url' or 'backendUrl' - standardizing to 'url'
    const { url, token, clearCart} = useContext(FoodContext); 
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const success = searchParams.get('success');
    const orderId = searchParams.get('orderId');

    const verifyPayment = async () => {
        try {
            if (!token) return;

            // Ensure this endpoint matches your backend route exactly
            const response = await axios.post(`${url}/api/order/verifyStripe`, 
                { success, orderId }, 
                { headers: { token } }
            );

            if (response.data.success) {
                clearCart();
                toast.success("Payment successful!");
                navigate('/orders');
            } else {
                toast.error("Payment failed. Order cancelled.");
                navigate('/cart');
            }
        } catch (error) {
            console.error("Verification Error:", error);
            toast.error("An error occurred during verification.");
            navigate('/cart');
        }
    };

    useEffect(() => {
        if (token) {
            verifyPayment();
        }
    }, [token]);

    return (
        <div className='min-h-[60vh] flex items-center justify-center'>
            <div className="w-20 h-20 border-4 border-gray-300 border-t-orange-600 rounded-full animate-spin"></div>
        </div>
    );
};

export default Verify;