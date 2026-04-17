import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  Search,
  Mail,
  User as UserIcon,
  X,
  Paperclip,
  Send,
} from "lucide-react";

const Users = ({ url, token }) => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Modal & Email States
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [emailData, setEmailData] = useState({
    subject: "",
    message: "",
    image: null,
  });
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${url}/api/user/list`, {
        headers: { token },
      });

      if (response.data.success) {
        // Logic to handle 'data' or 'users' key from backend
        const userData = response.data.data || response.data.users || [];
        setUsers(userData);
        
        if (userData.length === 0) {
          console.log("Database connected, but 0 users found.");
        }
      }
    } catch (error) {
      console.error("Users Fetch Error:", error);
      toast.error("Could not reach user database");
    }
  };

  const handleSendEmail = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Using FormData to support the Photo Attachment
    const formData = new FormData();
    formData.append("userEmail", selectedUser.email);
    formData.append("userName", selectedUser.name);
    formData.append("subject", emailData.subject);
    formData.append("message", emailData.message);
    if (emailData.image) formData.append("image", emailData.image);

    try {
      const response = await axios.post(
        `${url}/api/admin/send-email`,
        formData,
        {
          headers: { token, "Content-Type": "multipart/form-data" },
        },
      );

      if (response.data.success) {
        toast.success(`Email sent to ${selectedUser.name}`);
        setShowModal(false);
        setEmailData({ subject: "", message: "", image: null });
      }
    } catch (error) {
      toast.error("Failed to send email. Check your Resend API config.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchUsers();
  }, [token]);

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="p-8 w-full bg-gray-50 min-h-screen relative">
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-black text-gray-800 uppercase italic">
            User <span className="text-orange-600">Database</span>
          </h2>
          <p className="text-sm text-gray-500 font-medium">
            Managing {users.length} registered customers
          </p>
        </div>
        <div className="relative w-full md:w-96">
          <input
            type="text"
            placeholder="Search users..."
            className="w-full pl-10 pr-4 py-3 border-2 border-gray-100 rounded-2xl focus:border-orange-500 outline-none shadow-sm bg-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-3.5 text-gray-400" size={18} />
        </div>
      </div>

      {/* Users Table */}
      <div className="overflow-hidden border border-gray-200 rounded-[2rem] shadow-sm bg-white">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr className="text-left text-xs font-black text-gray-500 uppercase tracking-widest">
              <th className="p-5">User Details</th>
              <th className="p-5">Joined Date</th>
              <th className="p-5 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredUsers.map((user, index) => (
              <tr
                key={index}
                className="hover:bg-orange-50/30 transition-colors"
              >
                <td className="p-5">
                  <div className="flex items-center gap-3">
                    <div className="bg-orange-100 p-2 rounded-full text-orange-600">
                      <UserIcon size={16} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-800">
                        {user.name}
                      </p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="p-5 text-sm text-gray-600 font-medium">
                  {user.date ? new Date(user.date).toLocaleDateString() : "N/A"}
                </td>
                <td className="p-5 text-center">
                  <button
                    onClick={() => {
                      setSelectedUser(user);
                      setShowModal(true);
                    }}
                    className="inline-flex items-center gap-2 bg-gray-900 text-white px-5 py-2 rounded-xl text-xs font-black hover:bg-orange-600 transition-all shadow-md uppercase"
                  >
                    <Mail size={14} /> Send Mail
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- EMAIL MODAL --- */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100">
            <div className="bg-gray-900 p-6 flex justify-between items-center text-white">
              <h3 className="font-black italic uppercase tracking-tighter">
                New Message to {selectedUser?.name}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="hover:text-orange-500 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSendEmail} className="p-6 space-y-4">
              <div>
                <label className="text-xs font-black uppercase text-gray-400 ml-1">
                  Subject
                </label>
                <input
                  required
                  type="text"
                  className="w-full mt-1 p-3 bg-gray-50 border border-gray-100 rounded-xl focus:border-orange-500 outline-none text-sm"
                  placeholder="Order follow-up..."
                  value={emailData.subject}
                  onChange={(e) =>
                    setEmailData({ ...emailData, subject: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="text-xs font-black uppercase text-gray-400 ml-1">
                  Message
                </label>
                <textarea
                  required
                  rows="4"
                  className="w-full mt-1 p-3 bg-gray-50 border border-gray-100 rounded-xl focus:border-orange-500 outline-none text-sm"
                  placeholder="Type your message here..."
                  value={emailData.message}
                  onChange={(e) =>
                    setEmailData({ ...emailData, message: e.target.value })
                  }
                ></textarea>
              </div>

              <div className="relative">
                <label className="text-xs font-black uppercase text-gray-400 ml-1">
                  Attachment (Photo)
                </label>
                <div className="mt-1 flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-gray-100 border-dashed rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-all">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Paperclip className="w-6 h-6 mb-2 text-gray-400" />
                      <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                        {emailData.image
                          ? emailData.image.name
                          : "Click to attach photo"}
                      </p>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) =>
                        setEmailData({ ...emailData, image: e.target.files[0] })
                      }
                    />
                  </label>
                </div>
              </div>

              <button
                disabled={loading}
                type="submit"
                className="w-full bg-orange-600 text-white py-4 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-gray-900 transition-all active:scale-95 disabled:bg-gray-300"
              >
                {loading ? (
                  "Sending..."
                ) : (
                  <>
                    <Send size={18} /> Send via Resend
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
