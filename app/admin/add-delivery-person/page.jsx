"use client";

import OvalLoader from "@/components/OvalLoader";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from 'axios';

const AddDeliveryPerson = () => {
  const [deliveryPersonData, setDeliveryPersonData] = useState({
    name: "",
    number: "",
    alternateNumber: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    setDeliveryPersonData({
      ...deliveryPersonData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const response = await axios.post("/api/delivery-person/add-delivery-person", { deliveryPersonData });

    const json = response.data;
    setIsSubmitting(false);

    if (json.success) {
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
    } else {
      toast.error(json.message, {
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
  };

  return (
    <>
      <div className="p-4 max-w-md mx-auto bg-white mt-4">
        <h2 className="text-2xl font-semibold mb-4">Add Delivery Person</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Name:
            </label>
            <input
              type="text"
              name="name"
              value={deliveryPersonData.name}
              onChange={handleInputChange}
              className="mt-1 p-2 border rounded-md w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Number:
            </label>
            <input
              type="text"
              name="number"
              value={deliveryPersonData.number}
              onChange={handleInputChange}
              className="mt-1 p-2 border rounded-md w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Alternate Number:
            </label>
            <input
              type="text"
              name="alternateNumber"
              value={deliveryPersonData.alternateNumber}
              onChange={handleInputChange}
              className="mt-1 p-2 border rounded-md w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Password:
            </label>
            <input
              type="password"
              name="password"
              value={deliveryPersonData.password}
              onChange={handleInputChange}
              className="mt-1 p-2 border rounded-md w-full"
              required
            />
          </div>

          <button
            type="submit"
            className="px-4 py-2 bg-black text-white rounded-md hover:opacity-60 focus:outline-none focus:bg-blue-600"
            disabled={isSubmitting}
          >
            {isSubmitting ? <OvalLoader /> : "Add Delivery Person"}
          </button>
        </form>
      </div>
    </>
  );
};

export default AddDeliveryPerson;