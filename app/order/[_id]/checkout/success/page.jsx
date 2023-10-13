import Link from "next/link";

const OrderSuccessPage = () => {
  return (
    <div className="container mx-auto p-5 text-center">
      <div className="text-green-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-24 w-24 mx-auto"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
      <h1 className="text-2xl font-semibold text-green-600 mb-4">
        Order Placed Successfully
      </h1>
      <p className="text-lg text-gray-600">
        Your order has been successfully placed. Thank you for shopping with us!
      </p>

      <div className="mt-8">
        <Link href="/myorders" className="text-blue-500 hover:underline text-lg mx-2">
            View Your Orders
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
