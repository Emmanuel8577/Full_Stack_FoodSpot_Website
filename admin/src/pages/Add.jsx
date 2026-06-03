import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { UploadCloud } from "lucide-react"; // Make sure lucide-react is installed

const Add = ({ url, token }) => {
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Rice",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("image", image);

    try {
      const response = await axios.post(`${url}/api/food/add`, formData, {
        headers: { token },
      });
      if (response.data.success) {
        setData({ name: "", description: "", price: "", category: "Swallow" });
        setImage(false);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error connecting to server");
    }
  };

  return (
    <div className="p-8 w-full max-w-2xl">
      <form className="flex flex-col gap-5" onSubmit={onSubmitHandler}>
        <div className="flex flex-col gap-2">
          <p className="font-bold text-gray-700">Upload Image</p>
          <label htmlFor="image" className="cursor-pointer">
            {image ? (
              <img
                className="w-40 rounded-lg shadow-md"
                src={URL.createObjectURL(image)}
                alt=""
              />
            ) : (
              <div className="w-40 h-28 border-2 border-dashed border-gray-300 flex flex-col items-center justify-center rounded-lg text-gray-400">
                <UploadCloud size={30} />
                <span className="text-xs mt-2">Click to upload</span>
              </div>
            )}
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <p className="font-bold text-gray-700">Food Name</p>
          <input
            name="name"
            onChange={onChangeHandler}
            value={data.name}
            className="p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
            type="text"
            placeholder="e.g. Village Rice"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <p className="font-bold text-gray-700">Description</p>
          <textarea
            name="description"
            onChange={onChangeHandler}
            value={data.description}
            className="p-3 border rounded-lg h-24 focus:ring-2 focus:ring-orange-500 outline-none"
            placeholder="Write details here..."
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <p className="font-bold text-gray-700">Category</p>
            <select
              name="category"
              onChange={onChangeHandler}
              className="p-3 border rounded-lg bg-white"
            >
              <option value="Rice">Rice</option>
              <option value="Drinks">Drinks</option>
              <option value="Swallow">Swallow</option>
              <option value="Noodles">Noodles</option>
              <option value="Protein">Protein</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-bold text-gray-700">Price (₦)</p>
            <input
              name="price"
              onChange={onChangeHandler}
              value={data.price}
              className="p-3 border rounded-lg"
              type="number"
              placeholder="2500"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-4 bg-orange-600 text-white py-3 rounded-xl font-black uppercase tracking-widest hover:bg-gray-900 transition-all shadow-lg active:scale-95"
        >
          Add Item
        </button>
      </form>
    </div>
  );
};

export default Add;
