import React from "react";

const Card = ({ title, author, date, tags, onClick }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg px-4 py-6 sm:flex sm:flex-col sm:justify-between sm:items-start sm:px-6 sm:py-8" onClick={onClick}>
      <div className="text-2xl font-bold mb-2">{title}</div>
      <hr className="my-2" />
      <div className="text-gray-500 text-sm mb-2 flex items-center">
        <span className="mr-2">{author}</span>
        <span>|</span>
        <span className="ml-2 mr-2">{date}</span>
        <span>|</span>
        <span className="ml-2">{tags}</span>
      </div>
    </div>
  );
};

export default Card;
