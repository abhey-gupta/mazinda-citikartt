"use client";

import OvalLoader from "@/components/OvalLoader";
import { useEffect, useState } from "react";
import axios from "axios";

const VendorDetailsPage = () => {
  const [deliveryPersonData, setDeliveryPersonData] = useState([]);
  const [openDeliveryPersonId, setOpenDeliveryPersonId] = useState(null);
  const [fetchingData, setFetchingData] = useState(true);
  const [editMode, setEditMode] = useState({});
  const [editedData, setEditedData] = useState({});

  const toggleDropdown = (deliveryPersonId) => {
    setOpenDeliveryPersonId(
      openDeliveryPersonId === deliveryPersonId ? null : deliveryPersonId
    );
  };

  const parseDate = (date) => {
    const d = new Date(date);
    return d.toString();
  };

  const handleEditClick = (deliveryPersonId) => {
    setEditMode((prevEditMode) => ({
      ...prevEditMode,
      [deliveryPersonId]: true,
    }));
    // Clone the vendor data for editing
    setEditedData((prevEditedData) => ({
      ...prevEditedData,
      [deliveryPersonId]: {
        ...deliveryPersonData.find((vendor) => vendor._id === deliveryPersonId),
      },
    }));
  };

  const handleInputChange = (deliveryPersonId, fieldName, value) => {
    setEditedData((prevEditedData) => ({
      ...prevEditedData,
      [deliveryPersonId]: {
        ...prevEditedData[deliveryPersonId],
        [fieldName]: value,
      },
    }));
  };

  const handleSaveClick = async (deliveryPersonId) => {
    // Save the edited data
    const updatedDeliveryPerson = editedData[deliveryPersonId];

    // Update the state
    setDeliveryPersonData((prevData) =>
      prevData.map((vendor) =>
        vendor._id === deliveryPersonId ? updatedDeliveryPerson : vendor
      )
    );

    setEditMode((prevEditMode) => ({
      ...prevEditMode,
      [deliveryPersonId]: false,
    }));

    try {
      const response = await axios.put(
        "/api/delivery-person/update-delivery-person",
        {
          updatedDeliveryPerson,
        }
      );
      const json = response.data;
        if (json.success){
            alert("Updated delivery person successfully");
        } else {
            alert("Failed to update delivery person");
        }
    } catch (error) {
      alert('Network error while updating delivery person');
      console.error("Error updating delivery person:", error);
    }
  };

  useEffect(() => {
    setFetchingData(true);
    const fetchVendors = async () => {
      const response = await axios.post(
        "/api/delivery-person/fetch-all-delivery-persons"
      );
      const data = response.data;
      setDeliveryPersonData(data.deliveryPersons);
    };
    fetchVendors();
    setFetchingData(false);
  }, []);

  return (
    <div className="container mx-auto p-4 md:w-1/3">
      <h1 className="text-2xl font-semibold mb-5 text-center">
        Delivery Persons Details
      </h1>
      {fetchingData ? (
        <OvalLoader />
      ) : (
        <ul>
          {deliveryPersonData.map((deliveryPerson) => (
            <li key={deliveryPerson._id}>
              <div className="flex justify-between">
                <button
                  className="border border-gray-300 rounded-md px-3 py-2 w-full my-2"
                  onClick={() => toggleDropdown(deliveryPerson._id)}
                >
                  {deliveryPerson.name}
                </button>
                <div className="flex items-center">
                  {editMode[deliveryPerson._id] ? (
                    <>
                      <button
                        className="text-white bg-green-500 px-2 py-1 ml-1 rounded-md mr-2"
                        onClick={() => handleSaveClick(deliveryPerson._id)}
                      >
                        Save
                      </button>
                      <button
                        className="text-red-600 border border-red-600 px-2 py-1 rounded-md"
                        onClick={() =>
                          setEditMode((prevEditMode) => ({
                            ...prevEditMode,
                            [deliveryPerson._id]: false,
                          }))
                        }
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      className="text-white bg-yellow-500 px-2 py-1 ml-1 rounded-md"
                      onClick={() => handleEditClick(deliveryPerson._id)}
                    >
                      Edit
                    </button>
                  )}
                </div>
              </div>
              {openDeliveryPersonId === deliveryPerson._id && (
                <div className="border border-gray-300 p-3 rounded">
                  <div>
                    <div>
                      <span>
                        Delivery Person ID: <br />
                        {deliveryPerson._id}
                      </span>
                    </div>

                    <br />
                    <div>
                      <span>
                        Name:{" "}
                        {editMode[deliveryPerson._id] ? (
                          <input
                            type="text"
                            value={editedData[deliveryPerson._id].name}
                            onChange={(e) =>
                              handleInputChange(
                                deliveryPerson._id,
                                "name",
                                e.target.value
                              )
                            }
                          />
                        ) : (
                          <>{deliveryPerson.name}</>
                        )}
                      </span>
                    </div>
                    <br />
                    <div>
                      <span>
                        Number:{" "}
                        {editMode[deliveryPerson._id] ? (
                          <input
                            type="text"
                            value={editedData[deliveryPerson._id].number}
                            onChange={(e) =>
                              handleInputChange(
                                deliveryPerson._id,
                                "number",
                                e.target.value
                              )
                            }
                          />
                        ) : (
                          <>{deliveryPerson.number}</>
                        )}
                      </span>
                    </div>
                    <br />
                    <div>
                      <span>
                        Alternate Number:{" "}
                        {editMode[deliveryPerson._id] ? (
                          <input
                            type="text"
                            value={
                              editedData[deliveryPerson._id].alternateNumber
                            }
                            onChange={(e) =>
                              handleInputChange(
                                deliveryPerson._id,
                                "alternateNumber",
                                e.target.value
                              )
                            }
                          />
                        ) : (
                          <>{deliveryPerson.alternateNumber}</>
                        )}
                      </span>
                    </div>
                    <br />
                    <div>
                      <span>
                        Password:{" "}
                        {editMode[deliveryPerson._id] ? (
                          <input
                            type="password"
                            value={editedData[deliveryPerson._id].password}
                            onChange={(e) =>
                              handleInputChange(
                                deliveryPerson._id,
                                "password",
                                e.target.value
                              )
                            }
                          />
                        ) : (
                          <>{deliveryPerson.password}</>
                        )}
                      </span>
                    </div>
                    <br />
                    <div>
                      <span>
                        Created At: <br />
                        {parseDate(deliveryPerson.createdAt)}
                      </span>
                    </div>
                    <br />
                    <div>
                      <span>
                        Updated At: <br />
                        {parseDate(deliveryPerson.updatedAt)}
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
