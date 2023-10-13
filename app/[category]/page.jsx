"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; 
import OvalLoader from "@/components/OvalLoader";
import axios from "axios";
import Cookies from "js-cookie";
import { useSearchParams } from "next/navigation"; 
import { toast } from "react-toastify";

const CategoryPage = ({ params }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [vendorsData, setVendorsData] = useState([]);
  const [selectedCampus, setSelectedCampus] = useState(
    searchParams.get("campus") || "All"
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const userToken = Cookies.get("token");
    const fetchVendors = async () => {
      try {
        const response = await axios.post("/api/admin/vendorDetails", {
          userToken,
        });
        const data = await response.data;

        if (!data.success) {
          throw new Error("Network response was not ok");
        }
        setVendorsData(data.vendors);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching vendors:", error);
        setIsLoading(false);
      }
    };

    fetchVendors();
  }, []);

  useEffect(() => {
    // Update the URL query parameters when selectedCampus changes
    router.push(`?campus=${selectedCampus}`);
  }, [selectedCampus]);

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      router.push("/auth/login");
    }
  }, []);

  const handleCampusChange = (e) => {
    const campus = e.target.value;
    setSelectedCampus(campus);

    if (campus === "All") {
      toast.info("Kindly select your campus", {
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

  const renderVendorCard = (vendor) => (
    <div
      key={vendor._id}
      className="relative bg-white border rounded-lg shadow-md m-2 transition transform md:hover:scale-105"
      style={{
        width: "calc(100% - 1rem)",
        maxWidth: "300px",
        flexBasis: "45%",
        minWidth: "150px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        overflow: "hidden",
        cursor: "pointer",
      }}
      onClick={() => {
        if (selectedCampus === "All") {
          toast.info("Kindly select your campus", {
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
          if (vendor.openStatus) {
            router.push(`/order/${vendor._id}?campus=${selectedCampus}`);
          }
        }
      }}
    >
      <div
        className="w-full h-48"
        style={{
          backgroundImage: `url(${vendor.imageURI})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          className="p-2"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <h2 className="text-white text-sm md:text-md font-semibold">
            {vendor.name}
          </h2>
        </div>
      </div>
      <div>
        <button
          className={`${
            vendor.openStatus
              ? "bg-green-500 hover:bg-green-600"
              : "bg-yellow-500 hover:bg-yellow-600"
          } text-white py-2 px-4 rounded-b-md w-full`}
        >
          {vendor.openStatus ? "Order Now" : "Closed"}
        </button>
      </div>
    </div>
  );

  const filteredVendors =
    selectedCampus === "All"
      ? vendorsData.filter((vendor) => params.category === vendor.category)
      : vendorsData.filter(
          (vendor) =>
            params.category === vendor.category &&
            vendor.deliveryLocations.includes(selectedCampus)
        );

  return (
    <div className="p-4">
      <div className="sticky top-0 bg-white z-50 py-2">
        <div className="flex justify-center">
          <select
            className="bg-white border rounded-md px-3 py-2"
            onChange={handleCampusChange}
            value={selectedCampus}
          >
            <option value="All">Select Campus</option>
            <option value="North">North Campus</option>
            <option value="South">South Campus</option>
            <option value="Catalyst">Catalyst (New Building)</option>
            <option value="Garpa">Garpa</option>
            <option value="Mind Tree">Mind Tree</option>
          </select>
        </div>
      </div>

      {isLoading ? (
        <OvalLoader />
      ) : (
        <div className="flex flex-wrap justify-center">
          {filteredVendors.map(renderVendorCard)}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
