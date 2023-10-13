"use client";

import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const HomePage = () => {
  const router = useRouter();

  const token = Cookies.get("token");
  if (!token) {
    router.push("/auth/login");
  }

  const categories = [
    {
      name: "Food",
      imageURI:
        "https://images.squarespace-cdn.com/content/v1/53b839afe4b07ea978436183/1daa9086-0f1d-4d65-86b5-4a15a36d08d4/traditional-food-around-the-world-Travlinmad.jpg",
      availabilityStatus: true,
    },
    {
      name: "Stationery",
      imageURI:
        "https://5.imimg.com/data5/RD/XV/MY-18339614/all-stationery-office.png",
      availabilityStatus: false,
    },
    {
      name: "Grocery",
      imageURI:
        "https://5.imimg.com/data5/BM/DV/KV/ANDROID-92423289/product-jpeg-500x500.jpg",
      availabilityStatus: false,
    },
    {
      name: "Electronics",
      imageURI:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ79o342ESufXiPHiepowfJYnCWjPmi4xdpJQ&usqp=CAU",
      availabilityStatus: false,
    },
  ];

  const rendorCategoriesCard = (category) => (
    <div
      key={category._id}
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
        if (category.availabilityStatus) {
          router.push(`/${category.name.toLowerCase()}`);
        }
      }}
    >
      <div
        className="w-full h-48"
        style={{
          backgroundImage: `url(${category.imageURI})`,
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
          <h2 className="text-white text-lg font-semibold">{category.name}</h2>
        </div>
      </div>
      <div>
        <button
          className={`${
            category.availabilityStatus
              ? "bg-green-500 hover:bg-green-600"
              : "bg-yellow-500 hover:bg-yellow-600"
          } text-white py-2 px-1 rounded-b-md w-full text-[0.9rem]`}
        >
          {category.availabilityStatus
            ? "Explore nearby stores"
            : "Currently unavailable"}
        </button>
      </div>
    </div>
  );

  
  return (
    <div className="p-4">
        <div className="flex flex-wrap justify-center">
          {categories.map(rendorCategoriesCard)}
        </div>
    </div>
  );
};

export default HomePage;