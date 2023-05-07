/** @format */

import React from "react";

const Container = ({ children }) => {
  return (
    <div className="max-w-7xl mx-auto min-h-screen px-4 sm:px-6 lg:px-8 py-4 bg-gray-900 mb-4 mt-4 rounded">
      {children}
    </div>
  );
};

export default Container;
