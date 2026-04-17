import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Package, Search, Calendar, X, Printer, ChevronLeft, ChevronRight } from "lucide-react";
import jsPDF from "jspdf";

const Orders = ({ url, token }) => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchDate, setSearchDate] = useState("");
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 15;

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(`${url}/api/order/list`, {
        headers: { token },
      });

      if (response.data.success) {
        const list = response.data.orders || response.data.data || [];
        setOrders([...list].reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Orders Fetch Error:", error);
      toast.error("Failed to load orders from database");
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const newStatus = event.target.value;
      const response = await axios.post(
        `${url}/api/order/status`,
        { orderId, status: newStatus },
        { headers: { token } },
      );

      if (response.data.success) {
        await fetchAllOrders();
        toast.success(`Order set to ${newStatus}`);
      }
    } catch (error) {
      toast.error("Status update failed");
    }
  };

  // --- Admin Receipt Generator ---
  const printAdminReceipt = (order) => {
    const doc = new jsPDF();
    const isPaid = order.payment || order.status === 'Delivered';
    
    doc.setFillColor(31, 41, 55); 
    doc.rect(0, 0, 210, 40, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.text("CHUK'S KITCHEN - ADMIN COPY", 105, 20, { align: "center" });
    doc.setFontSize(10);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 105, 30, { align: "center" });

    doc.setTextColor(40, 40, 40);
    doc.setFont("helvetica", "bold");
    doc.text(`CUSTOMER: ${order.address.firstName} ${order.address.lastName}`, 20, 55);
    doc.text(`ORDER ID: ${order._id.toUpperCase()}`, 20, 62);
    doc.text(`STATUS: ${order.status.toUpperCase()}`, 20, 69);
    doc.text(`PAYMENT: ${isPaid ? 'PAID' : 'PENDING'} (${order.paymentMethod})`, 20, 76);

    doc.line(20, 85, 190, 85);
    let y = 95;
    order.items.forEach((item) => {
      doc.text(`${item.name} x ${item.quantity}`, 25, y);
      doc.text(`N${item.price.toLocaleString()}`, 160, y);
      y += 10;
    });
    doc.line(20, y, 190, y);
    doc.setFontSize(14);
    doc.text(`TOTAL AMOUNT: N${order.amount.toLocaleString()}`, 120, y + 15);

    doc.save(`Admin_Order_${order._id.slice(-6)}.pdf`);
  };

  useEffect(() => {
    if (token) fetchAllOrders();
  }, [token]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, searchDate]);

  const filteredOrders = orders.filter((order) => {
    const s = searchTerm.toLowerCase();
    const firstName = order.address?.firstName || "";
    const lastName = order.address?.lastName || "";
    const fullName = `${firstName} ${lastName}`.toLowerCase();
    const orderId = (order._id || "").toLowerCase();
    const method = (order.paymentMethod || "COD").toLowerCase();

    const matchesText = fullName.includes(s) || orderId.includes(s) || method.includes(s);

    let matchesDate = true;
    if (searchDate && order.date) {
      const orderDate = new Date(order.date).toISOString().split("T")[0];
      matchesDate = orderDate === searchDate;
    }
    return matchesText && matchesDate;
  });

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  return (
    <div className="order add p-8 w-full">
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center mb-8 gap-6">
        <h3 className="text-xl font-bold italic uppercase tracking-wider text-gray-800">
          Order <span className="text-orange-600">Management</span>
        </h3>

        <div className="flex flex-col md:flex-row gap-4 w-full xl:w-auto">
          <div className="relative flex-1 md:w-80">
            <input
              type="text"
              placeholder="Search name, ID, or payment..."
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-100 rounded-2xl focus:border-orange-500 outline-none transition-all shadow-sm bg-white text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-3.5 text-gray-400" size={18} />
          </div>

          <div className="relative flex-1 md:w-56">
            <input
              type="date"
              className="w-full pl-10 pr-10 py-3 border-2 border-gray-100 rounded-2xl focus:border-orange-500 outline-none transition-all shadow-sm bg-white text-sm"
              value={searchDate}
              onChange={(e) => setSearchDate(e.target.value)}
            />
            <Calendar className="absolute left-3 top-3.5 text-gray-400" size={18} />
            {searchDate && (
              <X
                className="absolute right-3 top-3.5 text-gray-400 cursor-pointer hover:text-red-500"
                size={18}
                onClick={() => setSearchDate("")}
              />
            )}
          </div>
        </div>
      </div>

      <div className="order-list flex flex-col gap-4">
        {currentOrders.length > 0 ? (
          currentOrders.map((order) => (
            <div
              key={order._id}
              className="grid grid-cols-[0.5fr_2fr_1fr_1fr_1fr] items-start gap-4 border border-gray-200 p-5 rounded-xl text-sm text-gray-700 bg-white shadow-sm hover:border-orange-200 transition-all"
            >
              <Package size={40} className="text-orange-500" />
              <div>
                <p className="font-bold text-gray-800">
                  {order.items.map((item, i) =>
                    i === order.items.length - 1
                      ? `${item.name} x ${item.quantity}`
                      : `${item.name} x ${item.quantity}, `,
                  )}
                </p>
                <p className="mt-2 font-semibold text-orange-600">
                  {order.address.firstName + " " + order.address.lastName}
                </p>
                <p className="text-[10px] text-gray-400 font-mono tracking-tighter">ID: {order._id}</p>
              </div>

              <div className="flex flex-col gap-1">
                <p className="font-bold text-lg">₦{order.amount}</p>
                <p className="text-xs text-gray-500">📅 {new Date(order.date).toLocaleDateString()}</p>
              </div>

              <div className="flex flex-col gap-2">
                <span className={`text-[10px] px-2 py-0.5 rounded-full w-fit font-black uppercase tracking-wider ${order.payment ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                  {order.payment ? `PAID (${order.paymentMethod})` : `UNPAID (${order.paymentMethod})`}
                </span>
                <select
                  onChange={(e) => statusHandler(e, order._id)}
                  value={order.status}
                  className="bg-gray-50 border border-orange-200 p-2 rounded-lg outline-none cursor-pointer font-bold text-gray-600 text-xs"
                >
                  <option value="Order Placed">Order Placed</option>
                  <option value="Food Processing">Food Processing</option>
                  <option value="Out for delivery">Out for delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>

              <div className="flex items-center justify-end">
                <button 
                  onClick={() => printAdminReceipt(order)}
                  className="p-3 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-colors cursor-pointer flex items-center gap-2 font-bold"
                  title="Print Receipt"
                >
                  <Printer size={18} />
                  <span>Print Receipt</span>
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
            <p className="text-gray-400 font-medium">No orders found.</p>
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-10 gap-4">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`p-2 rounded-lg border-2 ${currentPage === 1 ? 'text-gray-300 border-gray-100' : 'text-orange-600 border-orange-100 hover:bg-orange-50'}`}
          >
            <ChevronLeft size={20} />
          </button>
          
          <span className="font-bold text-gray-600">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`p-2 rounded-lg border-2 ${currentPage === totalPages ? 'text-gray-300 border-gray-100' : 'text-orange-600 border-orange-100 hover:bg-orange-50'}`}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Orders;