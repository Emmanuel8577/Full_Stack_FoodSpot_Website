import React, { useContext, useEffect } from 'react';
import { FoodContext } from '../context/FoodContext';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Verify = () => {
    // Standardized to 'url' to match your updated FoodContext
    const { url, token, clearCart } = useContext(FoodContext); 
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const success = searchParams.get('success');
    const orderId = searchParams.get('orderId');

    const verifyPayment = async () => {
        try {
            // We need the token and the orderId from the URL to proceed
            if (!token) return;
            if (!orderId) {
                navigate('/');
                return;
            }

            // Hits your Render backend to confirm the Stripe session status
            const response = await axios.post(`${url}/api/order/verifyStripe`, 
                { success, orderId }, 
                { headers: { token } }
            );

            if (response.data.success) {
                clearCart();
                toast.success("Payment successful!");
                navigate('/orders');
            } else {
                toast.error("Payment failed or cancelled.");
                navigate('/cart');
            }
        } catch (error) {
            console.error("Verification Error:", error);
            toast.error("An error occurred during verification.");
            navigate('/cart');
        }
    };

    useEffect(() => {
        // Trigger verification once the component mounts and token is available
        if (token) {
            verifyPayment();
        }
    }, [token]);

    return (
        <div className='min-h-[60vh] flex items-center justify-center'>
            {/* Professional Spinner */}
            <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 border-4 border-gray-200 border-t-orange-600 rounded-full animate-spin"></div>
                <p className="text-gray-500 font-medium animate-pulse">Verifying your payment...</p>
            </div>
        </div>
    );
};

export default Verify;