"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import jwt from "jsonwebtoken";
import Cookies from "js-cookie";
import OvalLoader from "@/components/OvalLoader";
import axios from "axios";

const Menu = () => {
  const router = useRouter();
  const [menu, setMenu] = useState({});
  const [storeName, setstoreName] = useState("");
  const [fetchingData, setFetchingData] = useState(true); // for the spinner
  const [storeOpen, setStoreOpen] = useState(true);
  const vendor_token = Cookies.get("vendor_token");

  const handleToggle = async () => {
    try {
      const data = jwt.verify(vendor_token, "this is jwt secret");
      const number = data.number;

      const response = await axios.put(`/api/vendor/togglestore`, { number });

      const json = response.data;

      if (json.success) {
        setStoreOpen(!storeOpen);
        toast.success(json.message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (err) {
      console.log("An error occurred: " + err.message);
    }
  };

  useEffect(() => {
    const fetchVendor = async () => {
      const data = jwt.verify(vendor_token, "this is jwt secret");
      const number = data.number;

      try {
        const response = await axios.post(`/api/vendor/fetchvendor`, {
          number,
        });

        const json = response.data;

        if (json.success) {
          setMenu(json.vendor.menu || {}); // Handle empty or undefined menu object
          setStoreOpen(json.vendor.openStatus);
          setstoreName(json.vendor.name);
        } else {
          console.error("Failed to fetch menu:", json.message);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      } finally {
        setFetchingData(false);
      }
    };

    setFetchingData(true);
    fetchVendor();
  }, []);

  return (
    <div className="max-w-md mx-auto p-4">
      <div className="flex justify-between">
        <h2 className="text-2xl mb-4 text-center">Menu</h2>

        <button
          onClick={handleToggle}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
        >
          {storeOpen ? "Close Store" : "Open Store"}
        </button>
      </div>

      <div className="font-bold text-2xl text-center my-4">{storeName}</div>

      <div className="flex justify-center mt-4">
        <button
          onClick={() => {
            router.push("/vendor/addproduct");
          }}
          className="bg-white border border-blue-500 hover:bg-blue-600 text-blue-500 hover:text-white py-2 px-4 rounded-md mb-4 mx-2"
        >
          Add New Product
        </button>
        <button
          onClick={() => {
            router.push("/vendor/orders");
          }}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md mb-4 mx-2"
        >
          Current Orders
        </button>
      </div>

      {fetchingData ? (
        <OvalLoader /> // Check if menu is not empty or undefined before rendering
      ) : Object.entries(menu).length > 0 ? (
        Object.entries(menu).map(([category, products]) => (
          <div
            key={category}
            className="mb-4 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] p-2 rounded-md"
          >
            <h3 className="text-lg font-semibold ml-2 underline">{category}</h3>
            <ul className="list-disc ml-6">
              {products && products.length > 0 ? (
                products.map((product, index) => (
                  <li
                    key={index}
                    className="mb-2 list-none flex justify-between"
                  >
                    <span>
                      {product.name}
                      <span
                        className={
                          product.categoryType === "nonveg"
                            ? "bg-red-500 p-1 text-white rounded-lg ml-2 text-sm"
                            : "bg-green-500 p-1 text-white rounded-lg ml-2 text-sm"
                        }
                      >
                        {product.categoryType}
                      </span>
                    </span>
                    ₹{product.price}
                  </li>
                ))
              ) : (
                <p className="text-center">No products available.</p>
              )}
            </ul>
          </div>
        ))
      ) : (
        <p className="text-center">Menu is empty.</p>
      )}
    </div>
  );
};

export default Menu;
