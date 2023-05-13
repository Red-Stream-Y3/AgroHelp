import React from "react";

const Skeleton = ({count}) => {
    return (
        <div className="animate-pulse w-full">
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-96 mb-4"></div>
            {count !== undefined ? (
                [...Array(count)].map((e, i) => (
                    <div
                        key={i}
                        className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                ))
            ) : (
                <>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                </>
            )}

            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
        </div>
    );
}

export default Skeleton;