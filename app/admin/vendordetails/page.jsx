"use client";

import OvalLoader from "@/components/OvalLoader";
import React, { useEffect, useState } from "react";
import axios from "axios";

const VendorDetailsPage = () => {
  const [vendorData, setVendorData] = useState([]);
  const [openVendorId, setOpenVendorId] = useState(null);
  const [fetchingData, setFetchingData] = useState(true);
  const [editMode, setEditMode] = useState({});
  const [editedData, setEditedData] = useState({});
  const [editedDeliveryCharges, setEditedDeliveryCharges] = useState({});
  const [editedMinOrders, setEditedMinOrders] = useState({});

  // Function to toggle the dropdown for each vendor
  const toggleDropdown = (vendorId) => {
    setOpenVendorId(openVendorId === vendorId ? null : vendorId);
  };

  // Function to parse date into a readable format
  const parseDate = (date) => {
    const d = new Date(date);
    return d.toString();
  };

  // Function to handle clicking the "Edit" button
  const handleEditClick = (vendorId) => {
    setEditMode((prevEditMode) => ({
      ...prevEditMode,
      [vendorId]: true,
    }));
    // Clone the vendor data for editing
    setEditedData((prevEditedData) => ({
      ...prevEditedData,
      [vendorId]: {
        ...vendorData.vendors.find((vendor) => vendor._id === vendorId),
      },
    }));
    // Initialize the editedDeliveryCharges and editedMinOrders state
    setEditedDeliveryCharges((prevCharges) => ({
      ...prevCharges,
      [vendorId]: {
        ...vendorData.vendors.find((vendor) => vendor._id === vendorId)
          .deliveryCharges,
      },
    }));
    setEditedMinOrders((prevOrders) => ({
      ...prevOrders,
      [vendorId]: {
        ...vendorData.vendors.find((vendor) => vendor._id === vendorId)
          .minOrders,
      },
    }));
  };

  // Function to handle input changes in the edit mode
  const handleInputChange = (vendorId, fieldName, value) => {
    setEditedData((prevEditedData) => ({
      ...prevEditedData,
      [vendorId]: {
        ...prevEditedData[vendorId],
        [fieldName]: value,
      },
    }));
  };

  // Function to handle delivery charge changes in edit mode
  const handleDeliveryChargeChange = (vendorId, location, value) => {
    setEditedDeliveryCharges((prevCharges) => ({
      ...prevCharges,
      [vendorId]: {
        ...prevCharges[vendorId],
        [location]: value,
      },
    }));
  };

  // Function to handle minimum order value changes in edit mode
  const handleMinOrderChange = (vendorId, location, value) => {
    setEditedMinOrders((prevOrders) => ({
      ...prevOrders,
      [vendorId]: {
        ...prevOrders[vendorId],
        [location]: value,
      },
    }));
  };

  // Function to handle clicking the "Save" button
  const handleSaveClick = async (vendorId) => {
    // Save the edited data
    const updatedVendor = editedData[vendorId];
    const updatedDeliveryCharges = editedDeliveryCharges[vendorId];
    const updatedMinOrders = editedMinOrders[vendorId];
    updatedVendor.deliveryCharges = updatedDeliveryCharges;
    updatedVendor.minOrders = updatedMinOrders;

    // Update the state
    setVendorData((prevData) => ({
      ...prevData,
      vendors: prevData.vendors.map((vendor) =>
        vendor._id === vendorId ? updatedVendor : vendor
      ),
    }));
    setEditMode((prevEditMode) => ({
      ...prevEditMode,
      [vendorId]: false,
    }));

    console.log(updatedVendor)

    // Make an API call to update the vendor data
    const response = await axios.put("/api/admin/updateVendor", {
      updatedVendor,
    });
    const json = await response.data;
    console.log(json);
    alert(json.message);
  };

  // Use useEffect to fetch initial vendor data
  useEffect(() => {
    setFetchingData(true);
    const fetchVendors = async () => {
      const response = await axios.post("/api/admin/vendorDetails");
      const data = await response.data;
      setVendorData(data);
      setFetchingData(false);
    };
    fetchVendors();
  }, []);

  return (
    <div className="container mx-auto p-4 md:w-1/3">
      <h1 className="text-2xl font-semibold mb-5 text-center">
        Vendor Details
      </h1>
      {fetchingData ? (
        <OvalLoader />
      ) : (
        <ul>
          {vendorData.vendors.map((vendor) => (
            <li key={vendor._id}>
              <div className="flex justify-between">
                <button
                  className="border border-gray-300 rounded-md px-3 py-2 w-full my-2"
                  onClick={() => toggleDropdown(vendor._id)}
                >
                  {vendor.name}
                </button>
                <div className="flex items-center">
                  {editMode[vendor._id] ? (
                    <>
                      <button
                        className="text-white bg-green-500 px-2 py-1 ml-1 rounded-md mr-2"
                        onClick={() => handleSaveClick(vendor._id)}
                      >
                        Save
                      </button>
                      <button
                        className="text-red-600 border border-red-600 px-2 py-1 rounded-md"
                        onClick={() =>
                          setEditMode((prevEditMode) => ({
                            ...prevEditMode,
                            [vendor._id]: false,
                          }))
                        }
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      className="text-white bg-yellow-500 px-2 py-1 ml-1 rounded-md"
                      onClick={() => handleEditClick(vendor._id)}
                    >
                      Edit
                    </button>
                  )}
                </div>
              </div>
              {openVendorId === vendor._id && (
                <div className="border border-gray-300 p-3 rounded">
                  <div>
                    <div>
                      <span>
                        Vendor ID: <br />
                        {vendor._id}
                      </span>
                    </div>
                    <br />
                    <div>
                      <span>
                        Name:{" "}
                        {editMode[vendor._id] ? (
                          <input
                            type="text"
                            value={editedData[vendor._id].name}
                            onChange={(e) =>
                              handleInputChange(
                                vendor._id,
                                "name",
                                e.target.value
                              )
                            }
                          />
                        ) : (
                          <>{vendor.name}</>
                        )}
                      </span>
                    </div>

                    <div>
                      <span>
                        Number:{" "}
                        {editMode[vendor._id] ? (
                          <input
                            type="text"
                            value={editedData[vendor._id].number}
                            onChange={(e) =>
                              handleInputChange(
                                vendor._id,
                                "number",
                                e.target.value
                              )
                            }
                          />
                        ) : (
                          <>{vendor.number}</>
                        )}
                      </span>
                    </div>
                    <br />
                    <div>
                      <span>
                        Alternate Number:{" "}
                        {editMode[vendor._id] ? (
                          <input
                            type="text"
                            value={editedData[vendor._id].alternateNumber}
                            onChange={(e) =>
                              handleInputChange(
                                vendor._id,
                                "alternateNumber",
                                e.target.value
                              )
                            }
                          />
                        ) : (
                          <>{vendor.alternateNumber}</>
                        )}
                      </span>
                    </div>
                    <br />
                    <div>
                      <span>
                        Password:{" "}
                        {editMode[vendor._id] ? (
                          <input
                            type="password"
                            value={editedData[vendor._id].password}
                            onChange={(e) =>
                              handleInputChange(
                                vendor._id,
                                "password",
                                e.target.value
                              )
                            }
                          />
                        ) : (
                          <>{vendor.password}</>
                        )}
                      </span>
                    </div>
                    <br />
                    <div>
                      <span>
                        Image URI:{" "}
                        {editMode[vendor._id] ? (
                          <input
                            type="string"
                            value={editedData[vendor._id].imageURI}
                            onChange={(e) =>
                              handleInputChange(
                                vendor._id,
                                "imageURI",
                                e.target.value
                              )
                            }
                          />
                        ) : (
                          <>{vendor.imageURI}</>
                        )}
                      </span>
                    </div>
                    <br />

                    <div>
                      <span>
                        Delivery Locations:{" "}
                        {editMode[vendor._id] ? (
                          <input
                            type="text"
                            value={editedData[
                              vendor._id
                            ].deliveryLocations.join(", ")}
                            onChange={(e) =>
                              handleInputChange(
                                vendor._id,
                                "deliveryLocations",
                                e.target.value.split(", ")
                              )
                            }
                          />
                        ) : (
                          <>{vendor.deliveryLocations.join(", ")}</>
                        )}
                      </span>
                    </div>
                    <br />
                    <div>
                      <span>
                        Delivery Charges:{" "}
                        {editMode[vendor._id] ? (
                          <div>
                            {Object.entries(
                              editedDeliveryCharges[vendor._id]
                            ).map(([location, charge]) => (
                              <div key={location}>
                                <span>{location}: </span>
                                <input
                                  type="number"
                                  value={charge}
                                  onChange={(e) =>
                                    handleDeliveryChargeChange(
                                      vendor._id,
                                      location,
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                            ))}
                          </div>
                        ) : (
                          <>
                            {Object.entries(vendor.deliveryCharges).map(
                              ([location, charge]) => (
                                <div key={location}>
                                  <span>{location}: </span>
                                  <span>{charge} </span>
                                </div>
                              )
                            )}
                          </>
                        )}
                      </span>
                    </div>
                    <br />
                    <div>
                      <span>
                        Min Order Value:{" "}
                        {editMode[vendor._id] ? (
                          <div>
                            {Object.entries(editedMinOrders[vendor._id]).map(
                              ([location, order]) => (
                                <div key={location}>
                                  <span>{location}: </span>
                                  <input
                                    type="number"
                                    value={order}
                                    onChange={(e) =>
                                      handleMinOrderChange(
                                        vendor._id,
                                        location,
                                        e.target.value
                                      )
                                    }
                                  />
                                </div>
                              )
                            )}
                          </div>
                        ) : (
                          <>
                            {Object.entries(vendor.minOrders).map(
                              ([location, order]) => (
                                <div key={location}>
                                  <span>{location}: </span>
                                  <span>{order} </span>
                                </div>
                              )
                            )}
                          </>
                        )}
                      </span>
                    </div>
                    <br />
                    <div>
                      <span>
                        Created At: <br />
                        {parseDate(vendor.createdAt)}
                      </span>
                    </div>
                    <br />
                    <div>
                      <span>
                        Updated At: <br />
                        {parseDate(vendor.updatedAt)}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default VendorDetailsPage;
