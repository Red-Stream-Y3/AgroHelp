import React, { useState, useEffect } from "react";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import { useGlobalContext } from "../../context/ContextProvider";
import { Forum } from "../../api/forum.js";
import Skeleton from "../common/Skeleton";

const ForumCard = ({ forum, checkRes, notify }) => {

    const [Loading, setLoading] = useState(false);
    const [forumObj, setForumObj] = useState(forum);
    const { user } = useGlobalContext();
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);
    const [replyInput, setReplyInput] = useState("");
    const [numReplies, setNumReplies] = useState(0);
    const [numLikes, setNumLikes] = useState(0);
    const [numDislikes, setNumDislikes] = useState(0);
    const [showReplies, setShowReplies] = useState(false);

    //refresh forum object
    const refreshForum = async () => {
        setLoading(true);
        let res = await Forum.getForumById(forum._id, checkRes);
        setForumObj(res);
        setLoading(false);
    };

    //check like and dislike status
    useEffect(() => {
        //count likes and dislikes
        setNumLikes(forumObj.likes.length);
        setNumDislikes(forumObj.dislikes.length);

        //count replies
        setNumReplies(forumObj.replies.length);

        //check if user has liked or disliked
        if (forumObj.likes.length > 0 && forumObj.likes.includes(user._id)) {
            setLiked(true);
        } else {
            setLiked(false);
        }

        if (
            forumObj.dislikes.length > 0 &&
            forumObj.dislikes.includes(user._id)
        ) {
            setDisliked(true);
        } else {
            setDisliked(false);
        }
    }, [forumObj]);

    const handleLike = async () => {
        let res = await Forum.likeForum(user, forum._id, checkRes);
        if (res.message === "Unliked forum") {
            setLiked(false);
            setDisliked(false);
        } else if (res.message === "Liked forum") {
            setLiked(true);
            setDisliked(false);
        }
        await refreshForum();
    };

    const handleDislike = async () => {
        let res = await Forum.dislikeForum(user, forum._id, checkRes);
        if (res.message === "Removed dislike") {
            setLiked(false);
            setDisliked(false);
        } else if (res.message === "Disliked forum") {
            setLiked(false);
            setDisliked(true);
        }
        await refreshForum();
    };

    const handleReplySubmit = async () => {
        setLoading(true);

        if (replyInput === "") {
            notify("info", "Reply field is empty");
            setLoading(false);
            return;
        }

        let res = await Forum.replyToForum(
            user,
            forum._id,
            replyInput,
            checkRes
        );
        if (res.message === "Replied to forum") {
            setReplyInput("");
            notify("success", "Replied to forum");
        }
        await refreshForum();
        setLoading(false);
    };

    const handleReplyLike = async (replyId) => {
        let res = await Forum.likeReply(user, forum._id, replyId, checkRes);
        if (res.message === "Removed like") {
            setLiked(false);
            setDisliked(false);
        } else if (res.message === "Liked reply") {
            setLiked(true);
            setDisliked(false);
        }
        await refreshForum();
    };

    const handleReplyDislike = async (replyId) => {
        let res = await Forum.dislikeReply(user, forum._id, replyId, checkRes);
        if (res.message === "Removed dislike") {
            setLiked(false);
            setDisliked(false);
        } else if (res.message === "Disliked reply") {
            setLiked(false);
            setDisliked(true);
        }
        await refreshForum();
    };

    const handleEditReply = async (replyId) => {};

    const handleDeleteReply = async (replyId) => {};

    return (
        <div className="rounded-md bg-darkbg p-3 mt-2 sm:max-w-4xl text-sm sm:text-base">
            {!Loading ? (
                <div>
                    <div className="justify-between">
                        {/* username and date */}
                        <div className="flex">
                            <div className="mr-2">@{forumObj.username}</div>
                            <div className="text-gray-500">
                                {forumObj.createdAt.toString().split("T")[0]}
                            </div>
                        </div>

                        {/* forum delete and edit buttons */}
                        {forum.userID === user._id ? (
                            <div className="w-fit">
                                <button
                                    onClick={() =>
                                        handleEditReply(
                                            reply._id
                                        )
                                    }
                                    className="ml-auto mr-2 text-xs text-gray-500">
                                    Edit
                                </button>
                                <button
                                    onClick={() =>
                                        handleDeleteReply(
                                            reply._id
                                        )
                                    }
                                    className="ml-auto mr-2 text-xs text-gray-500">
                                    Delete
                                </button>
                            </div>
                        ) : null}
                    </div>
                    

                    {/* title */}
                    <div className="font-bold">{forumObj.title}</div>

                    {/* content */}
                    <div>
                        {forumObj.content.length > 100 ? (
                            <>{forumObj.content.substring(0, 100) + "..."}</>
                        ) : (
                            <>{forumObj.content}</>
                        )}
                    </div>

                    {/* like / dislike buttons */}
                    <div className="flex">
                        <div className="flex items-center">
                            <button
                                onClick={handleLike}
                                className="transition-all ease-in-out active:scale-110 hover:bg-green-800 rounded-full px-2 py-2 m-2">
                                {liked ? <AiFillLike /> : <AiOutlineLike />}
                            </button>
                            <div>{numLikes}</div>
                        </div>
                        <div className="flex items-center ml-3">
                            <button
                                onClick={handleDislike}
                                className="transition-all ease-in-out active:scale-110 hover:bg-red-800 rounded-full px-2 py-2 m-2">
                                {disliked ? (
                                    <AiFillDislike />
                                ) : (
                                    <AiOutlineDislike />
                                )}
                            </button>
                            <div>{numDislikes}</div>
                        </div>
                        <div>
                            <button
                                onClick={() => setShowReplies(!showReplies)}
                                className="transition-all ease-in-out active:scale-105s text-blue-500 px-2 py-2 m-2 ml-5 sm:ml-10">
                                {showReplies ? "Hide replies" : "Show replies"}
                            </button>
                        </div>
                    </div>

                    <hr className="border-gray-500" />

                    {/* collapsable replies section */}
                    <div>
                        {showReplies ? (
                            <div>
                                {/* reply username and date */}
                                {forumObj.replies.map((reply) => {
                                    return (
                                        <div
                                            key={reply._id}
                                            className={`m-1 p-1 mx-auto bg-gray-700 rounded-md sm:max-w-2xl ${
                                                reply.userID === user._id &&
                                                "ring-2"
                                            }`}>
                                            <div className="flex justify-between">
                                                <div className="ml-2 mt-1 text-xs">
                                                    @{reply.username}
                                                </div>
                                                {reply.userID === user._id ? (
                                                    <div className="w-fit">
                                                        <button
                                                            onClick={() =>
                                                                handleEditReply(
                                                                    reply._id
                                                                )
                                                            }
                                                            className="ml-auto mr-2 text-xs text-gray-500">
                                                            Edit
                                                        </button>
                                                        <button
                                                            onClick={() =>
                                                                handleDeleteReply(
                                                                    reply._id
                                                                )
                                                            }
                                                            className="ml-auto mr-2 text-xs text-gray-500">
                                                            Delete
                                                        </button>
                                                    </div>
                                                ) : null}
                                            </div>
                                            <div className="ml-2">
                                                {reply.content}
                                            </div>
                                            <div className="flex">
                                                <div className="flex items-center">
                                                    <button
                                                        onClick={() =>
                                                            handleReplyLike(
                                                                reply._id
                                                            )
                                                        }
                                                        className="transition-all ease-in-out active:scale-110 hover:bg-gray-500 rounded-full px-2 py-2 m-2">
                                                        {reply.likes.includes(
                                                            user._id
                                                        ) ? (
                                                            <AiFillLike />
                                                        ) : (
                                                            <AiOutlineLike />
                                                        )}
                                                    </button>
                                                    <div>
                                                        {reply.likes.length}
                                                    </div>
                                                </div>
                                                <div className="flex items-center ml-3">
                                                    <button
                                                        onClick={() =>
                                                            handleReplyDislike(
                                                                reply._id
                                                            )
                                                        }
                                                        className="transition-all ease-in-out active:scale-110 hover:bg-gray-500 rounded-full px-2 py-2 m-2">
                                                        {reply.dislikes.includes(
                                                            user._id
                                                        ) ? (
                                                            <AiFillDislike />
                                                        ) : (
                                                            <AiOutlineDislike />
                                                        )}
                                                    </button>
                                                    <div>
                                                        {reply.dislikes.length}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : null}
                    </div>

                    {/* input for submitting reply */}
                    <div className="flex mt-2">
                        <textarea
                            placeholder="Reply"
                            value={replyInput}
                            autoFocus={true}
                            onChange={({ target }) =>
                                setReplyInput(target.value)
                            }
                            className="rounded-md bg-slate-800 w-full p-2 text-sm"
                        />
                        <div>
                            <button
                                onClick={handleReplySubmit}
                                className="transition-all ease-in-out active:scale-95 hover:bg-green-700 bg-green-800 focus:ring-2 ring-green-700 rounded-md px-2 py-2 my-2 ml-2">
                                Reply
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <Skeleton />
            )}
        </div>
    );
};

export default ForumCard;
