import React from "react";
import { useGlobalContext } from "../../context/ContextProvider";
import ForumCard from "./forumCard";

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
                    />
                );
            })}
        </div>
    );
};

export default CardContainer;