// "use client";

// import OvalLoader from "@/components/OvalLoader";
// import React, { useState } from "react";
// import { toast } from "react-toastify";
// import axios from 'axios';
// import "react-toastify/dist/ReactToastify.css";

// const AddVendor = () => {
//   const [vendorData, setVendorData] = useState({
//     name: "",
//     number: "",
//     alternateNumber: "",
//     password: "",
//     category: "",
//     imageURI: "",
//     deliveryLocations: [],
//     deliveryCharges: {},
//   });

//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleInputChange = (e) => {
//     const { name, type, value, checked } = e.target;
//     let newLocations = [...vendorData.deliveryLocations];
//     let newDeliveryCharges = { ...vendorData.deliveryCharges };

//     if (type === "checkbox") {
//       if (checked) {
//         newLocations.push(value);
//         newDeliveryCharges[value] = "";
//       } else {
//         newLocations = newLocations.filter((location) => location !== value);
//         delete newDeliveryCharges[value];
//       }

//       setVendorData({
//         ...vendorData,
//         deliveryLocations: newLocations,
//         deliveryCharges: newDeliveryCharges,
//       });
//     } else {
//       if (name.endsWith("Charge")) {
//         newDeliveryCharges[name.replace("Charge", "")] = value;
//       } else {
//         setVendorData({
//           ...vendorData,
//           [name]: value,
//         });
//       }
//     }
//   };

//   const handleDeliveryChargeChange = (location, value) => {
//     setVendorData((prevData) => ({
//       ...prevData,
//       deliveryCharges: {
//         ...prevData.deliveryCharges,
//         [location]: value,
//       },
//     }));
//   };

//   const deliveryLocations = [
//     { key: 'North', label: 'North Campus' },
//     { key: 'South', label: 'South Campus' },
//     { key: 'Catalyst', label: 'Catalyst (New Building)' },
//     { key: 'Garpa', label: 'Garpa' },
//     { key: 'Mind Tree', label: 'Mind Tree' },
//     // Add more locations as needed
//   ];

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     setIsSubmitting(true);

//     const response = await axios.post("/api/admin/addVendor", { vendorData });
//     const json = await response.data;
//     setIsSubmitting(false);

//     if (json.success) {
//       toast.success(json.message, {
//         position: "top-center",
//         autoClose: 3000,
//         hideProgressBar: true,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "light",
//       });
//     } else {
//       toast.error(json.message, {
//         position: "top-center",
//         autoClose: 3000,
//         hideProgressBar: true,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "light",
//       });
//     }
//   };

//   return (
//     <>
//       <div className="p-4 max-w-md mx-auto bg-white mt-4">
//         <h2 className="text-2xl font-semibold mb-4">Add Vendor</h2>

//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700">
//               Name:
//             </label>
//             <input
//               type="text"
//               name="name"
//               value={vendorData.name}
//               onChange={handleInputChange}
//               className="mt-1 p-2 border rounded-md w-full"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700">
//               Number:
//             </label>
//             <input
//               type="text"
//               name="number"
//               value={vendorData.number}
//               onChange={handleInputChange}
//               className="mt-1 p-2 border rounded-md w-full"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700">
//               Alternate Number:
//             </label>
//             <input
//               type="text"
//               name="alternateNumber"
//               value={vendorData.alternateNumber}
//               onChange={handleInputChange}
//               className="mt-1 p-2 border rounded-md w-full"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700">
//               Password:
//             </label>
//             <input
//               type="password"
//               name="password"
//               value={vendorData.password}
//               onChange={handleInputChange}
//               className="mt-1 p-2 border rounded-md w-full"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700">
//               Category:
//             </label>
//             <input
//               type="text"
//               name="category"
//               value={vendorData.category}
//               onChange={handleInputChange}
//               className="mt-1 p-2 border rounded-md w-full"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700">
//               Image URI:
//             </label>
//             <input
//               type="text"
//               name="imageURI"
//               value={vendorData.imageURI}
//               onChange={handleInputChange}
//               className="mt-1 p-2 border rounded-md w-full"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700">
//               Can Deliver To:
//             </label>
//             {deliveryLocations.map((location) => (
//               <div key={location.key}>
//                 <label>
//                   {location.label}
//                   <input
//                     type="checkbox"
//                     name="deliveryLocations"
//                     value={location.key}
//                     checked={vendorData.deliveryLocations.includes(location.key)}
//                     onChange={handleInputChange}
//                     className="ml-2"
//                   />
//                   {vendorData.deliveryLocations.includes(location.key) && (
//                     <input
//                       type="text"
//                       placeholder={`Delivery Charge for ${location.label}`}
//                       value={vendorData.deliveryCharges[location.key] || ""}
//                       onChange={(e) => handleDeliveryChargeChange(location.key, e.target.value)}
//                       className="mt-1 p-2 border rounded-md w-full"
//                     />
//                   )}
//                 </label>
//               </div>
//             ))}
//           </div>

//           <button
//             type="submit"
//             className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
//             disabled={isSubmitting}
//           >
//             {isSubmitting ? <OvalLoader /> : (
//               "Add Vendor"
//             )}
//           </button>
//         </form>
//       </div>
//     </>
//   );
// };

// export default AddVendor;


"use client";

import OvalLoader from "@/components/OvalLoader";
import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from 'axios';
import "react-toastify/dist/ReactToastify.css";

const AddVendor = () => {
  const [vendorData, setVendorData] = useState({
    name: "",
    number: "",
    alternateNumber: "",
    password: "",
    category: "",
    imageURI: "",
    deliveryLocations: [],
    deliveryCharges: {},
    minOrders: {}, // Add minOrder values for each location
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, type, value, checked } = e.target;
    let newLocations = [...vendorData.deliveryLocations];
    let newDeliveryCharges = { ...vendorData.deliveryCharges };
    let newMinOrders = { ...vendorData.minOrders };

    if (type === "checkbox") {
      if (checked) {
        newLocations.push(value);
        newDeliveryCharges[value] = "";
        newMinOrders[value] = ""; // Initialize minOrder value
      } else {
        newLocations = newLocations.filter((location) => location !== value);
        delete newDeliveryCharges[value];
        delete newMinOrders[value]; // Remove minOrder value
      }

      setVendorData({
        ...vendorData,
        deliveryLocations: newLocations,
        deliveryCharges: newDeliveryCharges,
        minOrders: newMinOrders,
      });
    } else {
      if (name.endsWith("Charge")) {
        newDeliveryCharges[name.replace("Charge", "")] = value;
      } else if (name.endsWith("MinOrder")) {
        newMinOrders[name.replace("MinOrder", "")] = value;
      } else {
        setVendorData({
          ...vendorData,
          [name]: value,
        });
      }
    }
  };

  const handleDeliveryChargeChange = (location, value) => {
    setVendorData((prevData) => ({
      ...prevData,
      deliveryCharges: {
        ...prevData.deliveryCharges,
        [location]: value,
      },
    }));
  };

  const handleMinOrderChange = (location, value) => {
    setVendorData((prevData) => ({
      ...prevData,
      minOrders: {
        ...prevData.minOrders,
        [location]: value,
      },
    }));
  };

  const deliveryLocations = [
    { key: 'North', label: 'North Campus' },
    { key: 'South', label: 'South Campus' },
    { key: 'Catalyst', label: 'Catalyst (New Building)' },
    { key: 'Garpa', label: 'Garpa' },
    { key: 'Mind Tree', label: 'Mind Tree' },
    // Add more locations as needed
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);

    const response = await axios.post("/api/admin/addVendor", { vendorData });
    const json = await response.data;
    console.log(json);
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
        <h2 className="text-2xl font-semibold mb-4">Add Vendor</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Name:
            </label>
            <input
              type="text"
              name="name"
              value={vendorData.name}
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
              value={vendorData.number}
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
              value={vendorData.alternateNumber}
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
              value={vendorData.password}
              onChange={handleInputChange}
              className="mt-1 p-2 border rounded-md w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Category:
            </label>
            <input
              type="text"
              name="category"
              value={vendorData.category}
              onChange={handleInputChange}
              className="mt-1 p-2 border rounded-md w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Image URI:
            </label>
            <input
              type="text"
              name="imageURI"
              value={vendorData.imageURI}
              onChange={handleInputChange}
              className="mt-1 p-2 border rounded-md w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Can Deliver To:
            </label>
            {deliveryLocations.map((location) => (
              <div key={location.key}>
                <label>
                  {location.label}
                  <input
                    type="checkbox"
                    name="deliveryLocations"
                    value={location.key}
                    checked={vendorData.deliveryLocations.includes(location.key)}
                    onChange={handleInputChange}
                    className="ml-2"
                  />
                  {vendorData.deliveryLocations.includes(location.key) && (
                    <>
                      <input
                        type="text"
                        placeholder={`Delivery Charge for ${location.label}`}
                        name={`${location.key}Charge`}
                        value={vendorData.deliveryCharges[location.key] || ""}
                        onChange={(e) => handleDeliveryChargeChange(location.key, e.target.value)}
                        className="mt-1 p-2 border rounded-md w-full"
                      />
                      <input
                        type="text"
                        placeholder={`Min Order Value for ${location.label}`}
                        name={`${location.key}MinOrder`}
                        value={vendorData.minOrders[location.key] || ""}
                        onChange={(e) => handleMinOrderChange(location.key, e.target.value)}
                        className="mt-1 p-2 border rounded-md w-full"
                      />
                    </>
                  )}
                </label>
              </div>
            ))}
          </div>

          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            disabled={isSubmitting}
          >
            {isSubmitting ? <OvalLoader /> : (
              "Add Vendor"
            )}
          </button>
        </form>
      </div>
    </>
  );
};

export default AddVendor;
