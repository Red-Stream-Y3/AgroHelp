import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../context/ContextProvider";
import Popup from "../common/Popup";
import ForumCard from "./ForumCard";

const CardContainer = (props) => {
    const { notify } = useGlobalContext();

    const [showSelectedForum, setShowSelectedForum] = useState(false); //popup
    const [selectedForum, setSelectedForum] = useState({}); //forum to be displayed in popup

    //function to check status and create a toast notification
    const checkStatus = (res) => {
        switch (res.status) {
            case 255:
                notify("success", res.data.message);
                break;
            case 256:
                notify("success", "Forum created successfully");
                break;
            case 404:
                if (res.data.message) {
                    notify("error", res.data.message);
                } else {
                    notify("error", "Error! Forum not found");
                }
                break;
            case 401:
                notify("error", "Unauthorized");
                break;
            case 500:
                notify("error", "Server error");
                break;
            default:
                notify("error", "Error getting forum");
                break;
        }
    };

    useEffect(() => {
        props.refresh();
    }, [props.loaded, props.tab]);

    return (
        <>
            <div className="flex flex-col w-full items-center">
                {props.forums.map((forum) => {
                    return (
                        <ForumCard
                            key={forum._id}
                            forum={forum}
                            checkRes={checkStatus}
                            notify={notify}
                            refreshAll={props.refreshAll}
                            setSelectedForum={setSelectedForum}
                            setShowSelectedForum={setShowSelectedForum}
                        />
                    );
                })}
            </div>

            {/* Selected forum popup */}
            <Popup
                show={showSelectedForum}
                setShow={setShowSelectedForum}
                ring={true}>
                <div className="text-left w-screen max-w-sm sm:max-w-lg max-h-96 overflow-y-auto">
                    <ForumCard
                        forum={selectedForum}
                        checkRes={props.checkStatus}
                        notify={props.notify}
                        refreshAll={props.refreshAll}
                    />
                </div>
            </Popup>
        </>
    );
};

export default CardContainer;