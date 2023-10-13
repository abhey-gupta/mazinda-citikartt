"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Import Next.js router
import { Hourglass } from "react-loader-spinner";
import axios from "axios"
import OvalLoader from "@/components/OvalLoader";
import Link from "next/link";
import Cookies from "js-cookie";

const MyOrdersPage = () => {
  const router = useRouter(); // Initialize the Next.js router
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  const fetchVendor = async (vendorId) => {
    const response = await axios.post(`/api/vendor/fetchvendorbyid`, {
      _id: vendorId
    });
    return response.data;
  };

  useEffect(() => {
    const userToken = Cookies.get("token");

    // Check if userToken is not present, then redirect to login page
    if (!userToken) {
      router.push("/auth/login"); // Redirect to your login page
      return; // Exit the useEffect
    }

    const fetchOrders = async () => {
      try {
        const response = await axios.post(`/api/order/fetchuserorders`, {
          userToken
        });
        const json = response.data;

        // Update orders with vendor names
        const ordersWithVendors = await Promise.all(
          json.orders.map(async (order) => {
            const vendorInfo = await fetchVendor(order.vendorId);
            return {
              ...order,
              vendorName: vendorInfo.vendor.name,
            };
          })
        );

        setOrders(ordersWithVendors);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, [router]); // Include router as a dependency

  const toggleExpand = (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  // Filter orders to exclude orders with status "Shipped"
  const filteredOrders = orders.filter((order) => order.status !== "Delivered");

  return (
    <div className="container mx-auto p-5 md:w-1/2">
      <h1 className="text-3xl font-semibold mb-8 text-center">My Orders</h1>
      {loading ? <OvalLoader/> : error ? (
        <p className="text-lg text-red-500 text-center">
          Error: {error.message}
        </p>
      ) : filteredOrders.length === 0 ? (
        <p className="text-lg text-gray-600 text-center my-5">
          You don't have any active orders yet 😔
        </p>
      ) : (
        <div>
          {filteredOrders.toReversed().map((order) => (
            <div
              key={order._id}
              className="bg-white shadow-md rounded-lg mb-6 px-4 pt-4 pb-1 cursor-pointer"
              onClick={() => toggleExpand(order._id)}
            >
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">
                  Order ID:{" "}
                  <span className="text-sm font-normal text-gray-600">
                    {order._id.slice(-4)}
                  </span>
                </h2>
                <p
                  className="flex items-center justify-center"
                  style={{
                    color:
                      order.status === "Processing"
                        ? "orange"
                        : order.isDelivered
                        ? "green"
                        : "#f7cd00",
                  }}
                >
                  <span className="mx-2">{order.status} </span>
                  <Hourglass
                    visible={true}
                    height="15"
                    width="15"
                    ariaLabel="hourglass-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    colors={["#306cce", "#72a1ed"]}
                  />
                </p>
              </div>
              <div className="flex items-center justify-between mt-2">
                <p className="text-green-600">₹{order.amount.toFixed(2)} <span className="text-gray-600">[{order.paymentMethod == "Online" ? "Paid 😉" : order.paymentMethod}]</span></p>
                <p className="text-gray-600 text-sm">
                  {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>

              {expandedOrderId === order._id && (
                <div className="mt-4">
                  <p className="text-gray-600">
                    <strong>Status:</strong> {order.status}
                  </p>
                  <p className="text-gray-600">
                    <strong>Vendor:</strong> {order.vendorName}
                  </p>
                  <p className="text-gray-600">
                    <strong>Delivery Address:</strong>
                  </p>
                  <p className="text-gray-600 ml-4">
                    Hostel: {order.address.hostel}
                  </p>
                  <p className="text-gray-600 ml-4">
                    Campus: {order.address.campus}
                  </p>
                  <p className="text-gray-600 ml-4">
                    Phone Number: {order.address.phoneNumber}
                  </p>
                  <p className="text-gray-600">
                    <strong>Instructions:</strong> {order.address.instructions}
                  </p>
                  <p className="text-gray-600">
                    For any queries regarging your order, you can mail at contact@citikartt.com
                  </p>
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold">Products Ordered:</h3>
                    <table className="w-full border-collapse border border-gray-300">
                      <thead>
                        <tr className="bg-gray-800 text-white">
                          <th className="p-2 border border-gray-300">
                            Product Name
                          </th>
                          <th className="p-2 border border-gray-300">
                            Quantity
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.keys(order.products).map((productName) => (
                          <tr key={productName}>
                            <td className="p-2 border border-gray-300">
                              {productName}
                            </td>
                            <td className="p-2 border border-gray-300 flex justify-center">
                              {order.products[productName].quantity}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Downward arrow icon */}
              <div className="flex items-center text-gray-500 justify-center mt-2 scale-[0.8]">
                View details
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="w-full flex justify-center mt-5">
        <Link
          className="border border-black text-black px-3 py-2 rounded-md hover:bg-black hover:text-white"
          href="myorders/previous-orders"
        >
          View previous orders
        </Link>
      </div>
    </div>
  );
};

export default MyOrdersPage;