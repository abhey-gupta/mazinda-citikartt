"use client";

import { ThreeDots } from "react-loader-spinner";

const loading = () => {
  return (
    <div className="flex justify-center">
      <ThreeDots
        height="80"
        width="80"
        radius="9"
        color="black"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
      />
    </div>
  );
};

export default loading;
