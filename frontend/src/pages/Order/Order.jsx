import React, { useContext, useEffect } from 'react';
import { FoodContext } from '../../context/FoodContext';
import jsPDF from 'jspdf';

const Orders = () => {
  const { orders, currency, token, getUserOrders, url } = useContext(FoodContext);

  useEffect(() => {
    if (token && typeof getUserOrders === 'function') {
      getUserOrders();
    }
  }, [token, getUserOrders]);

  const downloadReceipt = (order) => {
    const doc = new jsPDF();
    const methodUsed = order.paymentMethod || "Not Specified";
    const isPaid = order.payment || order.status === 'Delivered';
    const paymentStatusText = methodUsed === 'Stripe' 
        ? "Stripe (Online Paid)" 
        : `Cash on Delivery (${isPaid ? 'Paid' : 'Pending Payment'})`;

    // --- Professional Header ---
    doc.setFillColor(234, 88, 12); // Orange-600
    doc.rect(0, 0, 210, 45, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(28);
    doc.text("CHUK'S KITCHEN", 105, 25, { align: "center" });
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("Official Purchase Receipt", 105, 35, { align: "center" });

    // --- Order Metadata ---
    doc.setTextColor(40, 40, 40);
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text("BILL TO:", 20, 60);
    doc.setFont("helvetica", "normal");
    doc.text(`${order.address.firstName} ${order.address.lastName}`, 20, 67);
    doc.text(`${order.address.phone}`, 20, 73);
    doc.text(`${order.address.email}`, 20, 79);

    doc.setFont("helvetica", "bold");
    doc.text("ORDER DETAILS:", 130, 60);
    doc.setFont("helvetica", "normal");
    doc.text(`Order ID: #${order._id.slice(-8).toUpperCase()}`, 130, 67);
    doc.text(`Date: ${new Date(order.date).toLocaleDateString()}`, 130, 73);
    doc.text(`Method: ${paymentStatusText}`, 130, 79);

    // --- Items Table Header ---
    doc.setDrawColor(200, 200, 200);
    doc.line(20, 90, 190, 90);
    doc.setFont("helvetica", "bold");
    doc.text("Item Description", 25, 97);
    doc.text("Qty", 130, 97);
    doc.text("Price", 165, 97);
    doc.line(20, 102, 190, 102);

    // --- Items List ---
    let yPos = 112;
    doc.setFont("helvetica", "normal");
    order.items.forEach((item) => {
      doc.text(item.name, 25, yPos);
      doc.text(item.quantity.toString(), 132, yPos);
      doc.text(`${currency}${item.price.toLocaleString()}`, 165, yPos);
      yPos += 10;
    });

    // --- Summary Section ---
    doc.line(120, yPos, 190, yPos);
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(234, 88, 12);
    doc.text("GRAND TOTAL:", 120, yPos + 12);
    doc.text(`${currency}${order.amount.toLocaleString()}`, 165, yPos + 12);

    // --- Footer ---
    const pageHeight = doc.internal.pageSize.height;
    doc.setDrawColor(234, 88, 12);
    doc.setLineWidth(1);
    doc.line(20, pageHeight - 35, 190, pageHeight - 35);
    
    doc.setTextColor(100, 100, 100);
    doc.setFontSize(12);
    doc.setFont("helvetica", "italic");
    doc.text("Thank you for your patronage!", 105, pageHeight - 25, { align: "center" });
    
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.text("Excellence in every bite.", 105, pageHeight - 15, { align: "center" });

    doc.save(`Chuks_Kitchen_Receipt_${order._id.slice(-6)}.pdf`);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-16 px-4 lg:px-20">
      <div className="max-w-6xl m-auto">
        <h1 className="text-4xl font-black text-gray-900 mb-10 uppercase italic">
          My <span className="text-orange-600">Orders</span>
        </h1>

        <div className="space-y-6">
          {orders && orders.length > 0 ? (
            [...orders].reverse().map((order, index) => (
              <div key={index} className="bg-white border p-8 rounded-[2.5rem] shadow-sm flex flex-col lg:flex-row items-center justify-between gap-8">
                
                <div className="flex items-center gap-8 flex-1">
                  <img 
                    src={order.items && order.items[0] ? `${url}/images/${order.items[0].image}` : 'https://via.placeholder.com/150'} 
                    className="w-24 h-24 object-cover rounded-3xl bg-gray-100" 
                    alt="Food" 
                  />

                  <div className="flex-1">
                    <h2 className="text-xl font-black text-gray-900 leading-tight mb-2">
                      {order.items.map((item, idx) => (
                        <span key={idx}>{item.name} x {item.quantity}{idx < order.items.length - 1 ? ', ' : ''}</span>
                      ))}
                    </h2>
                    
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                      <p className="text-2xl font-black text-orange-600">
                        {currency}{order.amount.toLocaleString()}
                      </p>
                      <p className="bg-gray-100 text-gray-600 px-3 py-1 rounded-lg text-[11px] font-black uppercase">
                        {order.paymentMethod === 'Stripe' ? '💳 Stripe' : '💵 COD'}
                      </p>
                      <button 
                        onClick={() => downloadReceipt(order)} 
                        className="text-blue-600 hover:text-orange-600 text-[11px] font-black uppercase underline transition-colors"
                      >
                        Download Receipt
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-3 w-full lg:w-1/4">
                  <p className="text-base font-black uppercase italic text-gray-700">{order.status}</p>
                  <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-orange-500 transition-all duration-700" 
                      style={{ width: order.status === 'Delivered' ? '100%' : order.status === 'Out for delivery' ? '70%' : '30%' }}
                    ></div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-20 text-gray-400 font-bold uppercase tracking-widest">No orders found.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;