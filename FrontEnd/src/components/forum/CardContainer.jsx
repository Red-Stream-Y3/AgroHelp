import React from "react";
import { useGlobalContext } from "../../context/ContextProvider";
import ForumCard from "./ForumCard";

const CardContainer = (props) => {
    return (
        <div className="flex flex-col w-full items-center">
            {props.forums.map((forum) => {
                return (
                    <ForumCard
                        key={forum._id}
                        forum={forum}
                        checkRes={props.checkStatus}
                        notify={props.notify}
                        refreshAll={props.refreshAll}
                        setSelectedForum={props.setSelectedForum}
                        setShowSelectedForum={props.setShowSelectedForum}
                    />
                );
            })}
        </div>
    );
};

export default CardContainer;