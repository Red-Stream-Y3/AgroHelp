import React from "react";

const Popup = ({ children, show, setShow }) => {
    return (
        <>
            {show ? (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div 
                            style={{ marginTop: "45vh" }}
                            className="p-5 sm:p-7 z-20 mx-auto relative m-auto bg-darkbg rounded-lg shadow-xl transition-all sm:max-w-xl w-fit">
                            {children}
                        </div>
                        <div className="fixed inset-0 transition-opacity">
                            <div
                                onClick={() => setShow(false)}
                                className="transition-all absolute inset-0"
                                style={{ backdropFilter: "blur(10px)" }}></div>
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    );
};

export default Popup;