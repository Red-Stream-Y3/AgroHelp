import React from "react";

const Popup = ({ children, show, setShow, ring }) => {
    return (
        <>
            {show ? (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div
                            className={
                                "text-sm sm:text-base p-5 sm:p-7 z-20 absolute left-0 right-0 top-0 bottom-0 m-auto bg-darkbg rounded-lg shadow-xl transition-all sm:max-w-xl w-fit h-fit overflow-y-auto" +
                                (ring === true ? " ring-green-600 ring-2" : "")
                            }>
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