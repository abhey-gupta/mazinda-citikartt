"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Script from "next/script";
import OvalLoader from "@/components/OvalLoader";
import Modal from "react-modal";
import Cookies from "js-cookie";
import axios from "axios";
import { useSearchParams } from "next/navigation";

const CheckoutPage = ({ params }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedCampus = searchParams.get("campus");
  const [user, setUser] = useState({});
  const [userToken, setUserToken] = useState("");
  const [cart, setCart] = useState({});
  const [cartLoading, setCartLoading] = useState(true);
  const [orderPlaceButtonLoading, setOrderPlaceButtonLoading] = useState(false);
  const [address, setAddress] = useState({
    hostel: "",
    campus: selectedCampus,
    phoneNumber: "",
    instructions: "",
  });
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState("payondelivery");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [packagingAndHandlingCharges, serviceCharges, deliveryCharges] = [
    0,
    0,
    {},
  ];
  const [deliveryCharge, setDeliveryCharge] = useState(0.0);

  const calculateSubtotal = () =>
    Object.keys(cart)
      .reduce(
        (subtotal, itemName) =>
          subtotal + cart[itemName].quantity * parseFloat(cart[itemName].price),
        0
      )
      .toFixed(2);
  const calculateTotal = () =>
    (
      parseFloat(calculateSubtotal()) +
      packagingAndHandlingCharges +
      serviceCharges +
      deliveryCharge
    ).toFixed(2);

  const handleInputChange = (e) =>
    setAddress({ ...address, [e.target.name]: e.target.value });

  const handlePaymentMethodChange = (e) =>
    setSelectedPaymentMethod(e.target.value);

  const clearCart = async () => {
    const token = Cookies.get("token");
    try {
      await axios.put(`/api/user/updatecart`, { token, cart: {} });
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  const handleProceedToPaymentOnline = async (amount) => {
    const isAddressComplete = Object.values(address).every((val) => val !== "");
    const isValidPhoneNumber = /^\d{10}$/.test(address.phoneNumber);

    if (!isAddressComplete || !isValidPhoneNumber) {
      toast.info("Kindly enter a complete address 🧐", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      if (!isValidPhoneNumber)
        toast.info("Phone number must have 10 digits 🧐", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      return;
    }

    if (selectedPaymentMethod === "online") {
      const response = await fetch(`/api/razorpay`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      });
      const json = await response.json();
      const order = json.order;

      const options = {
        key: process.env.RAZORPAY_ID,
        amount: order.amount,
        currency: "INR",
        name: "Citikartt",
        order_id: order.id,
        handler: async function (response) {
          const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
            response;
          const res = await fetch(`/api/razorpay/paymentverification`, {
            method: "POST",
            body: JSON.stringify({
              razorpay_payment_id,
              razorpay_order_id,
              razorpay_signature,
            }),
          });
          const json = await res.json();

          if (json.signatureIsValid) {
            console.log("Valid Payment");
            const response = await fetch(`/api/order/createorder`, {
              method: "POST",
              body: JSON.stringify({
                userId: user._id,
                vendorId: params._id,
                products: cart,
                address,
                amount: total,
                paymentMethod: "Online",
                paymentInfo: {
                  razorpay_payment_id,
                  razorpay_order_id,
                  razorpay_signature,
                },
              }),
            });
            const json = await response.json();

            if (json.success) router.push("checkout/success");
          } else {
            toast.error(
              "Sorry, your payment couldn't be verified. Contact us for support",
              {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              }
            );
          }
        },
        prefill: {
          name: "IIT Mandi foods",
          email: "email@user.com",
          phoneNo: "9999999999",
        },
      };

      const razorWindow = new window.Razorpay(options);
      razorWindow.open();
    } else if (selectedPaymentMethod === "payondelivery") {
      handleProceedToPaymentOffline();
    }
  };

  const handleProceedToPaymentOffline = async () => {
    setOrderPlaceButtonLoading(true);
    let isAddressComplete = Object.values(address).every((val) => val !== "");
    if (!isAddressComplete && address.instructions == "") {
      isAddressComplete = true;
    }
    const isValidPhoneNumber = /^\d{10}$/.test(address.phoneNumber);

    if (!isAddressComplete || !isValidPhoneNumber) {
      toast.info("Kindly enter complete details 🧐", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      if (!isValidPhoneNumber)
        toast.info("Phone number must have 10 digits 🧐", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      return;
    }

    const response = await fetch(`/api/order/createorder`, {
      method: "POST",
      body: JSON.stringify({
        userId: user._id,
        vendorId: params._id,
        products: cart,
        address,
        amount: total,
        paymentMethod: "Pay on Delivery",
        paymentLink: `upi://pay?pa=${process.env.NEXT_PUBLIC_UPI_ID}&pn=Citikartt&am=${total}&cu=INR&tn=Payment at Citikartt`,
      }),
    });
    const json = await response.json();

    if (json.success) {
      const response = await axios.post("/api/vendor/fetchvendorbyid", {
        _id: params._id,
      });
      const data = response.data;
      console.log(data);
      router.push("checkout/success");
      clearCart()
      // await axios.post("/api/sms", { phone: "9602081102" });
      await axios.post("/api/whatsapp/msg-to-group", {
        group_id: data.vendor.whatsapp_group_id,
        products: cart,
        instructions: address.instructions,
        amount: total,
      })
      await axios.post("/api/orderEmail", { vendorName: data.vendor.name });
    } else {
      toast.error("Failed to place the order. Please try again later.", {
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
    setOrderPlaceButtonLoading(false);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const fetchUserToken = () => {
      const storedUserToken = Cookies.get("token");

      if (storedUserToken) {
        setUserToken(storedUserToken);
      } else {
        router.push("/auth/login");
      }
    };

    fetchUserToken();
  }, []);

  useEffect(() => {
    if (!userToken || !selectedCampus) return;

    const fetchCartData = async () => {
      setCartLoading(true);
      try {
        const response = await fetch(`/api/user/fetchcart`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: userToken }),
        });

        const json = await response.json();

        if (json.success) {
          setCart(json.cart);
        } else {
          console.error("Failed to fetch cart:", json.message);
        }
      } catch (error) {
        console.error("An error occurred while fetching cart:", error);
      }
      setCartLoading(false);
    };

    fetchCartData();

    const fetchVendor = async () => {
      try {
        const response = await fetch(`/api/vendor/fetchvendorbyid`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ _id: params._id }),
        });

        const json = await response.json();

        if (json.success) {
          setDeliveryCharge(
            parseFloat(json.vendor.deliveryCharges[selectedCampus])
          );
        } else {
          console.error("Failed to fetch vendor:", json.message);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };

    fetchVendor();

    const fetchUserData = async () => {
      try {
        const response = await fetch(`/api/user/fetchuser`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: userToken }),
        });

        const json = await response.json();

        if (json.success) {
          setUser(json.user);
        } else {
          console.error("Failed to fetch user:", json.message);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };

    fetchUserData();
  }, [userToken, selectedCampus]);

  const total = calculateTotal();

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <div className="container mx-auto p-5 md:w-1/2">
        <h1 className="text-2xl font-semibold mb-8 text-center">Checkout</h1>

        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Items in Cart</h2>
          <div className="bg-white shadow-md rounded-lg overflow-auto">
            {!cartLoading ? (
              Object.keys(cart).map((itemName) => (
                <div
                  key={itemName}
                  className="flex justify-between items-center border-b border-gray-300 p-3"
                >
                  <div>
                    <p>{itemName}</p>
                    <p className="text-gray-500 text-sm">
                      Quantity: {cart[itemName].quantity}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <p className="font-semibold">
                      ₹
                      {(
                        parseFloat(cart[itemName].price) *
                        cart[itemName].quantity
                      ).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <OvalLoader />
            )}
          </div>
        </div>

        <div className="mb-6 flex justify-end mr-2">
          <h2 className="text-lg font-semibold mb-2 inline mr-4">Subtotal</h2>
          <p className="text-xl font-semibold text-right inline">
            ₹{calculateSubtotal()}
          </p>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Shipping details</h2>
          <form>
            <div className="mb-3">
              <label
                htmlFor="hostel"
                className="block text-sm font-medium text-gray-700"
              >
                Hostel / House No
              </label>
              <input
                type="text"
                id="hostel"
                name="hostel"
                value={address.hostel}
                onChange={handleInputChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="campus"
                className="block text-sm font-medium text-gray-700"
              >
                Campus
              </label>
              <select
                id="campus"
                name="campus"
                value={selectedCampus}
                onChange={handleInputChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                disabled
              >
                <option value="North">North</option>
                <option value="South">South</option>
                <option value="Catalyst">Catalyst (New Building)</option>
                <option value="Garpa">Garpa</option>
                <option value="Mind Tree">Mind Tree</option>
              </select>
            </div>
            <div className="mb-3">
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium text-gray-700"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={address.phoneNumber}
                onChange={handleInputChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="instructions"
                className="block text-sm font-medium text-gray-700"
              >
                Any instructions? (optional)
              </label>
              <textarea
                type="text"
                id="instructions"
                name="instructions"
                value={address.instructions}
                onChange={handleInputChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
          </form>
        </div>

        <hr className="border-gray-300 mb-6" />

        <div className="mb-6 p-2">
          <h2 className="text-lg font-semibold mb-2">Additional Charges</h2>
          {[
            {
              label: "Packaging and Handling Charges:",
              value: packagingAndHandlingCharges.toFixed(2),
            },
            { label: "Service Charges:", value: serviceCharges.toFixed(2) },
            { label: "Delivery Charges:", value: deliveryCharge.toFixed(2) },
          ].map((item, index) => (
            <div key={index} className="mb-3 flex justify-between">
              <span>{item.label}</span>
              <span className="text-right font-semibold">₹{item.value}</span>
            </div>
          ))}
          <hr />
        </div>

        <div className="mb-2 flex justify-end mr-2">
          <h2 className="text-lg font-semibold mb-2 inline mr-4">Total</h2>
          <p className="text-xl font-semibold text-right inline">₹{total}</p>
        </div>

        <div className="mb-20 shadow-lg p-3 rounded-md">
          <h2 className="text-lg font-semibold mb-2">Select payment method</h2>
          <div className="mb-3">
            <div className="mt-1">
              <input
                type="radio"
                id="payondelivery"
                name="paymentMethod"
                value="payondelivery"
                checked={selectedPaymentMethod === "payondelivery"}
                onChange={handlePaymentMethodChange}
                className="mr-2"
              />
              <label htmlFor="payondelivery">Pay on Delivery</label>
            </div>
          </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white text-center">
          <button
            className="md:w-1/2 w-full bg-black text-white font-semibold py-2 rounded-lg mx-1 hover:bg-gray-950 focus:outline-none border border-black my-1"
            onClick={() => {
              if (selectedPaymentMethod === "online") {
                handleProceedToPaymentOnline(total);
              } else if (selectedPaymentMethod === "payondelivery") {
                openModal();
              }
            }}
          >
            Place Order
          </button>
        </div>
      </div>

      {/* Define the modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Confirm Payment Modal"
        style={{
          content: {
            width: "300px",
            height: "200px",
            margin: "auto",
            padding: "20px",
            borderRadius: "8px",
            textAlign: "center",
          },
        }}
      >
        <h2 className="font-semibold text-lg">Confirm Order</h2>
        <p className="mt-[10px]">
          Are you sure you want to proceed with{" "}
          {selectedPaymentMethod == "payondelivery"
            ? "Pay on delivery"
            : "Pay Online"}
          ?
        </p>
        <div className="mt-[25px]">
          <button
            disabled={orderPlaceButtonLoading}
            onClick={handleProceedToPaymentOffline}
            className="bg-black rounded-md text-white px-4 py-2 mx-2"
          >
            {orderPlaceButtonLoading ? <OvalLoader /> : "Confirm"}
          </button>
          <button
            onClick={closeModal}
            className="mx-2 border border-gray-200 px-4 py-2 rounded-md"
          >
            Cancel
          </button>
        </div>
      </Modal>
    </>
  );
};

export default CheckoutPage;
