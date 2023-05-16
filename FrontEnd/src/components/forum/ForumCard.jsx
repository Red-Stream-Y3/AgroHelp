import React, { useState, useEffect } from "react";
import { AiOutlineLike, AiOutlineDislike, AiOutlineCheckCircle } from "react-icons/ai";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import { useGlobalContext } from "../../context/ContextProvider";
import { Forum } from "../../api/forum.js";
import Skeleton from "../common/Skeleton";
import Popup from "../common/Popup";

const ForumCard = ({
    forum,
    checkRes,
    notify,
    refreshAll,
    setSelectedForum,
    setShowSelectedForum,
}) => {
    //forum object
    const [forumObj, setForumObj] = useState(forum);

    //status
    const [loading, setLoading] = useState(false);
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);
    const [showReplies, setShowReplies] = useState(false);

    //user object
    const { user } = useGlobalContext();

    //input
    const [replyInput, setReplyInput] = useState("");

    //counters
    const [numLikes, setNumLikes] = useState(0);
    const [numDislikes, setNumDislikes] = useState(0);

    //show hidden long content
    const [showLongContent, setShowLongContent] = useState(false);
    const longLimit = 100;

    //edit reply
    const [showEditReplyPopup, setShowEditReplyPopup] = useState(false);
    const [replyEditInput, setReplyEditInput] = useState("");
    const [replyEditId, setReplyEditId] = useState("");

    //delete reply
    const [showDeleteReplyPopup, setShowDeleteReplyPopup] = useState(false);
    const [replyDeleteId, setReplyDeleteId] = useState("");

    //edit forum
    const [showEditForumPopup, setShowEditForumPopup] = useState(false);
    const [forumEditInput, setForumEditInput] = useState("");

    //delete forum
    const [showDeleteForumPopup, setShowDeleteForumPopup] = useState(false);

    //accept reply
    const [showAcceptReplyPopup, setShowAcceptReplyPopup] = useState(false);
    const [replyAcceptId, setReplyAcceptId] = useState("");

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

        //check if user has liked or disliked
        if (
            forumObj.likes.length > 0 &&
            user !== null &&
            user !== undefined &&
            forumObj.likes.includes(user._id)
        ) {
            setLiked(true);
        } else {
            setLiked(false);
        }

        if (
            user !== null &&
            user !== undefined &&
            forumObj.dislikes.length > 0 &&
            forumObj.dislikes.includes(user._id)
        ) {
            setDisliked(true);
        } else {
            setDisliked(false);
        }
    }, [forumObj, user]);

    //check if content is too long
    useEffect(() => {
        if (forumObj.content.length > longLimit) {
            setShowLongContent(true);
        } else {
            setShowLongContent(false);
        }
    }, [forumObj]);

    //action handlers
    const handleLike = async () => {
        if (user === null || user === undefined) {
            notify("info", "Please login to like a forum");
            return;
        }

        let res = await Forum.likeForum(user, forum._id, checkRes);
        if (res.message === "Unliked forum") {
            setLiked(false);
            setDisliked(false);
        } else if (res.message === "Liked forum") {
            setLiked(true);
            setDisliked(false);
        }
        await refreshForum();
        await refreshAll(true);
    };

    const handleDislike = async () => {
        if (user === null || user === undefined) {
            notify("info", "Please login to dislike a forum");
            return;
        }

        let res = await Forum.dislikeForum(user, forum._id, checkRes);
        if (res.message === "Removed dislike") {
            setLiked(false);
            setDisliked(false);
        } else if (res.message === "Disliked forum") {
            setLiked(false);
            setDisliked(true);
        }
        await refreshForum();
        refreshAll(true);
    };

    const handleReplySubmit = async () => {
        if (user === null || user === undefined) {
            notify("info", "Please login to reply to a forum");
            return;
        }

        if(forumObj.resolved){
            notify("info", "This forum is resolved. You cannot reply to it.");
            return
        }

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
        await refreshAll(true);
    };

    const handleReplyLike = async (replyId) => {
        if (user === null || user === undefined) {
            notify("info", "Please login to like a reply");
            return;
        }

        let res = await Forum.likeReply(user, forum._id, replyId, checkRes);
        if (res.message === "Removed like") {
            setLiked(false);
            setDisliked(false);
        } else if (res.message === "Liked reply") {
            setLiked(true);
            setDisliked(false);
        }
        await refreshForum();
        await refreshAll(true);
    };

    const handleReplyDislike = async (replyId) => {
        if (user === null || user === undefined) {
            notify("info", "Please login to dislike a reply");
            return;
        }

        let res = await Forum.dislikeReply(user, forum._id, replyId, checkRes);
        if (res.message === "Removed dislike") {
            setLiked(false);
            setDisliked(false);
        } else if (res.message === "Disliked reply") {
            setLiked(false);
            setDisliked(true);
        }
        await refreshForum();
        await refreshAll(true);
    };

    const handleEditReplySubmit = async () => {
        setLoading(true);

        if (replyEditInput === "") {
            notify("info", "Reply field is empty");
            setLoading(false);
            return;
        }

        let res = await Forum.editReply(
            user,
            forum._id,
            replyEditId,
            replyEditInput,
            checkRes
        );
        if (res.message === "Edited reply") {
            setReplyEditInput("");
            setReplyEditId("");
            setShowEditReplyPopup(false);
            notify("success", "Edited reply");
        }
        await refreshForum();
        setLoading(false);
        await refreshAll(true);
    };

    const handleDeleteReply = async () => {
        setLoading(true);

        let res = await Forum.deleteReply(
            user,
            forum._id,
            replyDeleteId,
            checkRes
        );
        if (res.message === "Deleted reply from forum") {
            setReplyDeleteId("");
            setShowDeleteReplyPopup(false);
            notify("success", "Deleted reply from forum");
        }
        await refreshForum();
        setLoading(false);
        await refreshAll(true);
    };

    const handleSubscribe = async () => {
        if (user === null || user === undefined) {
            notify("info", "Please login to subscribe to forum");
            return;
        }

        let res = await Forum.subscribeToForum(user, forum._id, checkRes);
        if (res.message === "Subscribed to forum") {
            notify("success", "Subscribed to forum");
        }
        await refreshForum();
        await refreshAll(true);
    };

    const handleUnsubscribe = async () => {
        let res = await Forum.unsubscribeFromForum(user, forum._id, checkRes);
        if (res.message === "Unsubscribed from forum") {
            notify("success", "Unsubscribed from forum");
        }
        await refreshForum();
        await refreshAll();
    };

    const handleDeleteForum = async () => {
        setLoading(true);

        let res = await Forum.deleteForum(user, forumObj._id, checkRes);
        if (res.message === "Forum removed") {
            setShowDeleteForumPopup(false);
            notify("success", "Forum removed");
        }

        await refreshAll();
        setLoading(false);
    };

    const handleEditForum = async () => {
        setLoading(true);

        let res = await Forum.updateForum(
            user,
            {
                _id: forumObj._id,
                title: forumObj.title,
                content: forumEditInput,
            },
            checkRes
        );

        if (res) {
            setForumEditInput("");
            setShowEditForumPopup(false);
            
            notify("success", "Forum edited");
        }

        await refreshForum();
        await refreshAll(true);
        setLoading(false);
    };

    const handleAcceptReply = async () => {
        setLoading(true);

        let res = await Forum.acceptReply(
            user,
            forumObj._id,
            replyAcceptId,
            checkRes
        );
        if (res.message === "Accepted reply as answer") {
            setReplyAcceptId("");
            setShowAcceptReplyPopup(false);
            notify("success", "Accepted reply as answer");
        }

        if (!forumObj.resolved) {
            let res = await Forum.markResolved(user, forumObj._id, checkRes);
            if (res.message === "Forum Resolved") {
                notify("success", "Marked forum as resolved");
            }
        }

        await refreshForum();
        await refreshAll(true);
        setLoading(false);
    };

    return (
        <div className="rounded-md bg-darkbg p-3 mt-2 w-full sm:max-w-4xl text-sm sm:text-base transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-20 cursor-pointer">
            {!loading ? (
                <div>
                    <div className="sm:flex sm:justify-between mb-1 sm:mb-0">
                        {/* username and date */}
                        <div className="inline-flex">
                            <div className="mr-2">
                                @
                                {forumObj.username +
                                    " " +
                                    (user !== null &&
                                    user !== undefined &&
                                    forumObj.userID === user._id
                                        ? "(me)"
                                        : "")}
                            </div>
                            <div className="text-gray-500">
                                {forumObj.createdAt.toString().split("T")[0]}
                            </div>
                            <div className="ml-3">
                                {user !== null &&
                                user !== undefined &&
                                forumObj.subscribers.includes(user._id) ? (
                                    <button
                                        onClick={handleUnsubscribe}
                                        className="ml-auto mr-2 text-xs text-green-500">
                                        Unsubscribe
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleSubscribe}
                                        className="ml-auto mr-2 text-xs text-blue-500">
                                        Subscribe
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* forum delete and edit buttons */}
                        {user !== null &&
                        user !== undefined &&
                        forumObj.userID === user._id ? (
                            <div className="w-fit">
                                <button
                                    onClick={() => {
                                        if(forumObj.resolved) {
                                            notify("info", "Cannot edit resolved forum");
                                            return;
                                        };
                                        setForumEditInput(forumObj.content);
                                        setShowEditForumPopup(true);
                                    }}
                                    className="ml-auto mr-2 text-xs text-gray-500">
                                    Edit
                                </button>
                                <button
                                    onClick={() => {
                                        setShowDeleteForumPopup(true);
                                    }}
                                    className="ml-auto mr-2 text-xs text-gray-500">
                                    Delete
                                </button>
                            </div>
                        ) : null}
                    </div>

                    {/* title */}
                    <div
                        onClick={() => {
                            try {
                                setSelectedForum(forumObj);
                                setShowSelectedForum(true);
                            } catch (error) {
                                // no need to do anything
                            }
                        }}
                        className="font-bold cursor-pointer hover:underline">
                        {forumObj.title +
                            (forumObj.resolved ? " (Solved)" : "")}
                    </div>

                    {/* content */}
                    <div>
                        {showLongContent ? (
                            <>
                                {forumObj.content.substring(0, 100) + "..."}
                                <button
                                    onClick={() => {
                                        setShowLongContent(!showLongContent);
                                    }}
                                    className="ml-2 text-xs text-gray-500">
                                    Show More
                                </button>
                            </>
                        ) : (
                            <>
                                {forumObj.content}
                                {forumObj.content.length > longLimit ? (
                                    <button
                                        onClick={() => {
                                            setShowLongContent(
                                                !showLongContent
                                            );
                                        }}
                                        className="ml-2 text-xs text-gray-500">
                                        Hide
                                    </button>
                                ) : null}
                            </>
                        )}
                    </div>

                    {/* like / dislike / reply buttons */}
                    <div className="flex items-center">
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
                        <div className="ml-5 text-sm text-gray-500">
                            {forumObj.replies.length + " replies"}
                        </div>
                        {forumObj.replies.length > 0 ? (
                            <div>
                                <button
                                    onClick={() => setShowReplies(!showReplies)}
                                    className="transition-all ease-in-out text-sm active:scale-105s text-blue-500 px-2 py-2 m-2 ml-5 sm:ml-10">
                                    {showReplies
                                        ? "Hide replies"
                                        : "Show replies"}
                                </button>
                            </div>
                        ) : null}
                    </div>

                    <hr className="border-gray-500" />

                    {/* collapsable replies section */}
                    <div>
                        {showReplies ? (
                            <div>
                                {/* reply username and date */}
                                {forumObj.replies
                                    .sort((a, b) => {
                                        if (a.likes.length > b.likes.length)
                                            return -1;
                                        if (a.likes.length < b.likes.length)
                                            return 1;
                                        return 0;
                                    })
                                    .map((reply) => {
                                        return (
                                            <div
                                                key={reply._id}
                                                className={`m-1 p-1 mx-auto bg-gray-700 rounded-md sm:max-w-2xl`}>
                                                <div className="flex justify-between">
                                                    <div className="ml-2 mt-1 text-xs">
                                                        @
                                                        {reply.username +
                                                            " " +
                                                            (user !== null &&
                                                            user !==
                                                                undefined &&
                                                            reply.userID ===
                                                                user._id
                                                                ? "(me)"
                                                                : "")}
                                                        {reply.accepted ? (
                                                            <p className="inline ml-2 text-green-500">
                                                                Accepted answer
                                                            </p>
                                                        ) : (
                                                            ""
                                                        )}
                                                    </div>
                                                    <div className="flex">
                                                        {user !== null &&
                                                        user !== undefined &&
                                                        forumObj.userID ===
                                                            user._id &&
                                                        !reply.accepted &&
                                                        !forumObj.resolved ? (
                                                            <div className="w-fit">
                                                                <button
                                                                    onClick={() => {
                                                                        setShowAcceptReplyPopup(
                                                                            true
                                                                        );
                                                                        setReplyAcceptId(
                                                                            reply._id
                                                                        );
                                                                    }}
                                                                    className="ml-auto mr-2 text-xs text-green-500">
                                                                    <div className="flex items-center">
                                                                        <AiOutlineCheckCircle />{" "}
                                                                        Accept
                                                                    </div>
                                                                </button>
                                                            </div>
                                                        ) : null}
                                                        {user !== null &&
                                                        user !== undefined &&
                                                        !forumObj.resolved &&
                                                        reply.userID ===
                                                            user._id ? (
                                                            <div className="w-fit">
                                                                <button
                                                                    onClick={() => {
                                                                        setReplyEditId(
                                                                            reply._id
                                                                        );
                                                                        setReplyEditInput(
                                                                            reply.content
                                                                        );
                                                                        setShowEditReplyPopup(
                                                                            true
                                                                        );
                                                                    }}
                                                                    className="ml-auto mr-2 text-xs text-gray-500">
                                                                    Edit
                                                                </button>
                                                                <button
                                                                    onClick={() => {
                                                                        setReplyDeleteId(
                                                                            reply._id
                                                                        );
                                                                        setShowDeleteReplyPopup(
                                                                            true
                                                                        );
                                                                    }}
                                                                    className="ml-auto mr-2 text-xs text-gray-500">
                                                                    Delete
                                                                </button>
                                                            </div>
                                                        ) : null}
                                                    </div>
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
                                                            {user !== null &&
                                                            user !==
                                                                undefined &&
                                                            reply.likes.includes(
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
                                                            {user !== null &&
                                                            user !==
                                                                undefined &&
                                                            reply.dislikes.includes(
                                                                user._id
                                                            ) ? (
                                                                <AiFillDislike />
                                                            ) : (
                                                                <AiOutlineDislike />
                                                            )}
                                                        </button>
                                                        <div>
                                                            {
                                                                reply.dislikes
                                                                    .length
                                                            }
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
                            autoCapitalize="on"
                            spellCheck={true}
                            onFocus={() => {
                                if(forumObj.resolved){
                                    notify("info", "This forum is resolved. You cannot reply to it.");
                                }
                            }}
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

            {/* delete reply popup */}
            <Popup
                show={showDeleteReplyPopup}
                setShow={setShowDeleteReplyPopup}>
                <div className="items-center">Delete this reply?</div>

                {/* confirm, cancel buttons */}
                <div className="flex justify-center mt-2">
                    <button
                        onClick={handleDeleteReply}
                        className="transition-all ease-in-out active:scale-95 hover:bg-green-700 bg-green-800 focus:ring-2 ring-green-700 rounded-md px-2 py-2 my-2 ml-2">
                        Confirm
                    </button>
                    <button
                        onClick={() => setShowDeleteReplyPopup(false)}
                        className="transition-all ease-in-out active:scale-95 hover:bg-red-700 bg-red-800 focus:ring-2 ring-red-700 rounded-md px-2 py-2 my-2 ml-2">
                        Cancel
                    </button>
                </div>
            </Popup>

            {/* edit reply popup */}
            <Popup show={showEditReplyPopup} setShow={setShowEditReplyPopup}>
                <div className="items-center w-100 sm:w-102">
                    <textarea
                        placeholder="Edit reply"
                        value={replyEditInput}
                        autoFocus={true}
                        autoCapitalize="on"
                        spellCheck="true"
                        onChange={({ target }) =>
                            setReplyEditInput(target.value)
                        }
                        className="rounded-md bg-slate-800 w-full p-2 text-sm"
                    />

                    {/* confirm, cancel buttons */}
                    <div className="flex justify-center mt-2">
                        <button
                            onClick={handleEditReplySubmit}
                            className="transition-all ease-in-out active:scale-95 hover:bg-green-700 bg-green-800 focus:ring-2 ring-green-700 rounded-md px-2 py-2 my-2 ml-2">
                            Confirm
                        </button>
                        <button
                            onClick={() => setShowEditReplyPopup(false)}
                            className="transition-all ease-in-out active:scale-95 hover:bg-red-700 bg-red-800 focus:ring-2 ring-red-700 rounded-md px-2 py-2 my-2 ml-2">
                            Cancel
                        </button>
                    </div>
                </div>
            </Popup>

            {/* edit forum popup */}
            <Popup show={showEditForumPopup} setShow={setShowEditForumPopup}>
                <div className="items-center w-100 sm:w-102">
                    <div className="text-sm font-bold">{forumObj.title}</div>
                    <div className="text-slate-500 text-xs mb-3">
                        To protect the integrity of the question, you cannot
                        edit the title
                    </div>
                    <textarea
                        placeholder="Edit forum"
                        value={forumEditInput}
                        autoFocus={true}
                        autoCapitalize="on"
                        spellCheck="true"
                        onChange={({ target }) =>
                            setForumEditInput(target.value)
                        }
                        className="rounded-md bg-slate-800 w-full p-2 text-sm"
                    />

                    {/* confirm, cancel buttons */}
                    <div className="flex justify-center mt-2">
                        <button
                            onClick={handleEditForum}
                            className="transition-all ease-in-out active:scale-95 hover:bg-green-700 bg-green-800 focus:ring-2 ring-green-700 rounded-md px-2 py-2 my-2 ml-2">
                            Confirm
                        </button>
                        <button
                            onClick={() => setShowEditForumPopup(false)}
                            className="transition-all ease-in-out active:scale-95 hover:bg-red-700 bg-red-800 focus:ring-2 ring-red-700 rounded-md px-2 py-2 my-2 ml-2">
                            Cancel
                        </button>
                    </div>
                </div>
            </Popup>

            {/* delete forum popup */}
            <Popup
                show={showDeleteForumPopup}
                setShow={setShowDeleteForumPopup}>
                <div className="items-center">Delete this forum?</div>

                {/* confirm, cancel buttons */}
                <div className="flex justify-center mt-2">
                    <button
                        onClick={handleDeleteForum}
                        className="transition-all ease-in-out active:scale-95 hover:bg-green-700 bg-green-800 focus:ring-2 ring-green-700 rounded-md px-2 py-2 my-2 ml-2">
                        Confirm
                    </button>
                    <button
                        onClick={() => setShowDeleteForumPopup(false)}
                        className="transition-all ease-in-out active:scale-95 hover:bg-red-700 bg-red-800 focus:ring-2 ring-red-700 rounded-md px-2 py-2 my-2 ml-2">
                        Cancel
                    </button>
                </div>
            </Popup>

            {/* accept reply popup */}
            <Popup
                show={showAcceptReplyPopup}
                setShow={setShowAcceptReplyPopup}>
                <div className="items-center">
                    Accept this reply as the answer?
                </div>
                <div className="items-center text-slate-400 text-xs">
                    Note: This action is permenant and cannot be undone
                </div>

                {/* confirm, cancel buttons */}
                <div className="flex justify-center mt-2">
                    <button
                        onClick={handleAcceptReply}
                        className="transition-all ease-in-out active:scale-95 hover:bg-green-700 bg-green-800 focus:ring-2 ring-green-700 rounded-md px-2 py-2 my-2 ml-2">
                        Confirm
                    </button>
                    <button
                        onClick={() => setShowAcceptReplyPopup(false)}
                        className="transition-all ease-in-out active:scale-95 hover:bg-red-700 bg-red-800 focus:ring-2 ring-red-700 rounded-md px-2 py-2 my-2 ml-2">
                        Cancel
                    </button>
                </div>
            </Popup>
        </div>
    );
};

export default ForumCard;
