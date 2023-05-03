import React from "react";
import { useGlobalContext } from "../../context/ContextProvider";
import ForumCard from "./ForumCard";

const CardContainer = (props) => {
    return (
        <div>
            {props.forums.map((forum) => {
                return (
                    <ForumCard
                        key={forum._id}
                        forum={forum}
                        checkRes={props.checkStatus}
                        notify={props.notify}
                        setSubLoaded={props.setSubLoaded}
                    />
                );
            })}
        </div>
    );
};

export default CardContainer;