import axios from "axios";

//user authorization config
const getconfig = (user) => {
    return {
        headers: {
            Authorization: `Bearer ${user.token}`,
        },
    };
};

//server API url
const BASE_URL = `${localStorage.getItem("agroServer") || "http://localhost:9120"}/api/forums`;

//get forums
export const getForums = async (checkStatus) => {
    const res = await axios.get(BASE_URL);

    if (res.data){
        return res.data;
    } else {
        checkStatus(res);
        return null;
    };
}

//get forum by id
export const getForumById = async (id, checkStatus) => {

    const res = await axios.get(`${BASE_URL}/${id}`);

    if (res.data){
        return res.data;
    } else {
        checkStatus(res);
        return null;
    };
}

//create forum
export const createForum = async (user, forum, checkStatus) => {

    const res = await axios.post(BASE_URL, {
        user: {
            _id: user._id,
            username: user.username,
        },
        forum: {
            title: forum.title,
            content: forum.content,
        },
    }, getconfig(user));

    if (res.data){
        return res.data;
    } else {
        checkStatus(res);
        return null;
    };
}

//update forum
export const updateForum = async (user, forum, checkStatus) => {
    const res = await axios.put(
        `${BASE_URL}/${forum._id}`,
        {
            user: {
                _id: user._id,
                username: user.username,
            },
            forum: {
                title: forum.title,
                content: forum.content,
            },
        },
        getconfig(user)
    );

    if (res.data) {
        return res.data;
    } else {
        checkStatus(res);
        return null;
    }
};

//delete forum
export const deleteForum = async (user, id, checkStatus) => {
    const res = await axios.delete(`${BASE_URL}/${id}`, getconfig(user));

    if (res.data) {
        return res.data;
    } else {
        checkStatus(res);
        return null;
    }
};

//search forums
export const searchForums = async (query, checkStatus) => {
    const res = await axios.get(`${BASE_URL}/search/q=${query}`);

    if (res.data) {
        return res.data;
    } else {
        checkStatus(res);
        return null;
    }
}

//subscribe to forum
export const subscribeToForum = async (user, id, checkStatus) => {
    const res = await axios.post(`${BASE_URL}/subscribe/${id}`, {
        user: {
            _id: user._id,
            username: user.username,
        },
        forum: {}
    }, getconfig(user));

    if (res.data) {
        return res.data;
    } else {
        checkStatus(res);
        return null;
    }
}

//unsubscribe from forum
export const unsubscribeFromForum = async (user, id, checkStatus) => {
    const res = await axios.post(`${BASE_URL}/unsubscribe/${id}`, {
        user: {
            _id: user._id,
            username: user.username,
        },
        forum: {}
    }, getconfig(user));

    if (res.data) {
        return res.data;
    } else {
        checkStatus(res);
        return null;
    }
}

//get subscribed forums
export const getSubscribedForumsByUser = async (id, checkStatus) => {
    const res = await axios.get(`${BASE_URL}/subscribed/${id}`);

    if (res.data) {
        return res.data;
    } else {
        checkStatus(res);
        return null;
    }
}

//like a forum
export const likeForum = async (user, id, checkStatus) => {
    const res = await axios.post(`${BASE_URL}/like/${id}`, {
        user: {
            _id: user._id,
            username: user.username,
        },
        forum: {}
    }, getconfig(user));

    if (res.data) {
        return res.data;
    } else {
        checkStatus(res);
        return null;
    }
}

//unlike a forum
export const unlikeForum = async (user, id, checkStatus) => {
    const res = await axios.post(`${BASE_URL}/unlike/${id}`, {
        user: {
            _id: user._id,
            username: user.username,
        },
        forum: {}
    }, getconfig(user));

    if (res.data) {
        return res.data;
    } else {
        checkStatus(res);
        return null;
    }
}

//get liked forums
export const getLikedForumsByUser = async (user, checkStatus) => {
    const res = await axios.get(`${BASE_URL}/liked/${user._id}`, getconfig(user));

    if (res.data) {
        return res.data;
    } else {
        checkStatus(res);
        return null;
    }
}

//dislike a forum
export const dislikeForum = async (user, id, checkStatus) => {
    const res = await axios.post(`${BASE_URL}/dislike/${id}`, {
        user: {
            _id: user._id,
            username: user.username,
        },
        forum: {}
    }, getconfig(user));

    if (res.data) {
        return res.data;
    } else {
        checkStatus(res);
        return null;
    }
}

//undislike a forum
export const undislikeForum = async (user, id, checkStatus) => {
    const res = await axios.post(`${BASE_URL}/undislike/${id}`, {
        user: {
            _id: user._id,
            username: user.username,
        },
        forum: {}
    }, getconfig(user));

    if (res.data) {
        return res.data;
    } else {
        checkStatus(res);
        return null;
    }
}

//get disliked forums
export const getDislikedForumsByUser = async (user, checkStatus) => {
    const res = await axios.get(`${BASE_URL}/disliked/${user._id}`, getconfig(user));

    if (res.data) {
        return res.data;
    } else {
        checkStatus(res);
        return null;
    }
}

//reply to forum
export const replyToForum = async (user, id, reply, checkStatus) => {
    const res = await axios.post(`${BASE_URL}/reply/${id}`, {
        user: {
            _id: user._id,
            username: user.username,
        },
        content: reply,
    }, getconfig(user));

    if (res.data) {
        return res.data;
    } else {
        checkStatus(res);
        return null;
    }
}

//delete reply
export const deleteReply = async (user, id, replyID, checkStatus) => {
    const res = await axios.delete(`${BASE_URL}/reply/${id}/${replyID}`, getconfig(user));

    if (res.data) {
        return res.data;
    } else {
        checkStatus(res);
        return null;
    }
}

//edit reply
export const editReply = async (user, id, replyID, reply, checkStatus) => {
    const res = await axios.put(`${BASE_URL}/reply/${id}/${replyID}`, {
        user: {
            _id: user._id,
            username: user.username,
        },
        content: reply,
    }, getconfig(user));

    if (res.data) {
        return res.data;
    } else {
        checkStatus(res);
        return null;
    }
}

//like reply
export const likeReply = async (user, id, replyID, checkStatus) => {
    const res = await axios.post(`${BASE_URL}/reply/like/${id}/${replyID}`, {
        user: {
            _id: user._id,
            username: user.username,
        },
        content: {},
    }, getconfig(user));

    if (res.data) {
        return res.data;
    } else {
        checkStatus(res);
        return null;
    }
}

//unlike reply
export const unlikeReply = async (user, id, replyID, checkStatus) => {
    const res = await axios.post(`${BASE_URL}/reply/unlike/${id}/${replyID}`, {
        user: {
            _id: user._id,
            username: user.username,
        },
        content: {},
    }, getconfig(user));

    if (res.data) {
        return res.data;
    } else {
        checkStatus(res);
        return null;
    }
}

//dislike reply
export const dislikeReply = async (user, id, replyID, checkStatus) => {
    const res = await axios.post(`${BASE_URL}/reply/dislike/${id}/${replyID}`, {
        user: {
            _id: user._id,
            username: user.username,
        },
        content: {},
    }, getconfig(user));

    if (res.data) {
        return res.data;
    } else {
        checkStatus(res);
        return null;
    }
}

//undislike reply
export const undislikeReply = async (user, id, replyID, checkStatus) => {
    const res = await axios.post(`${BASE_URL}/reply/undislike/${id}/${replyID}`, {
        user: {
            _id: user._id,
            username: user.username,
        },
        content: {},
    }, getconfig(user));

    if (res.data) {
        return res.data;
    } else {
        checkStatus(res);
        return null;
    }
}

//accept reply as answer
export const acceptReply = async (user, id, replyID, checkStatus) => {
    const res = await axios.post(`${BASE_URL}/reply/accept/${id}/${replyID}`, {}, getconfig(user));

    if (res.data) {
        return res.data;
    } else {
        checkStatus(res);
        return null;
    }
}

//mark forum as resolved
export const markResolved = async (user, id, checkStatus) => {
    const res = await axios.post(`${BASE_URL}/resolved/${id}`, {}, getconfig(user));

    if (res.data) {
        return res.data;
    } else {
        checkStatus(res);
        return null;
    }
}

//get user's forums
export const getForumsByUser = async (user, checkStatus) => {
    const res = await axios.get(`${BASE_URL}/myforums/${user._id}`, getconfig(user));

    if (res.data) {
        return res.data;
    } else {
        checkStatus(res);
        return null;
    }
}

export const Forum = {
    getForums,
    getForumById,
    createForum,
    updateForum,
    deleteForum,
    searchForums,
    subscribeToForum,
    unsubscribeFromForum,
    getSubscribedForumsByUser,
    likeForum,
    unlikeForum,
    getLikedForumsByUser,
    dislikeForum,
    undislikeForum,
    getDislikedForumsByUser,
    replyToForum,
    deleteReply,
    editReply,
    likeReply,
    unlikeReply,
    dislikeReply,
    undislikeReply,
    acceptReply,
    markResolved,
    getForumsByUser
};