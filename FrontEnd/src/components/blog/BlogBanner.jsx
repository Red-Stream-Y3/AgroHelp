import React from "react";

const Banner = ({ backgroundImage }) => {
  const backgroundImageUrl =
    "https://s3-eu-west-1.amazonaws.com/yara-links/vhsm.jpg";

  return (
    <div
      className=" h-40 bg-cover bg-center rounded flex flex-col justify-end py-6 max-w-7xl mx-auto my-8 sm:h-48"
      style={{ backgroundImage: `url(${backgroundImageUrl})` }}
    >
      <h1 className="text-4xl sm:text-6xl text-white font-bold tracking-tight ml-4 sm:ml-8">
        BLOGS
      </h1>
    </div>
  );
};

export default Banner;