import axios from 'axios';

//user authorization config
const getconfig = (user) => {
  return {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };
};

//server API url
const BASE_URL = `/api/forums`;

//get forums
export const getForums = async (checkStatus) => {
  const res = await axios.get(BASE_URL);

  if (res.data) {
    return res.data;
  } else {
    try {
      checkStatus(res);
    } catch (error) {
      //checkstatus not provided
    }
    return null;
  }
};

//get forum by id
export const getForumById = async (id, checkStatus) => {
  const res = await axios.get(`${BASE_URL}/${id}`);

  if (res.data) {
    return res.data;
  } else {
    try {
      checkStatus(res);
    } catch (error) {
      //checkstatus not provided
    }
    return null;
  }
};

//create forum
export const createForum = async (user, forum, checkStatus) => {
  const res = await axios.post(
    BASE_URL,
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
    try {
      checkStatus(res);
    } catch (error) {
      //checkstatus not provided
    }
    return null;
  }
};

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
    try {
      checkStatus(res);
    } catch (error) {
      //checkstatus not provided
    }
    return null;
  }
};

//delete forum
export const deleteForum = async (user, id, checkStatus) => {
  const res = await axios.delete(`${BASE_URL}/${id}`, getconfig(user));

  if (res.data) {
    return res.data;
  } else {
    try {
      checkStatus(res);
    } catch (error) {
      //checkstatus not provided
    }
    return null;
  }
};

//search forums
export const searchForums = async (query, checkStatus) => {
  const res = await axios.get(`${BASE_URL}/search/q=${query}`);

  if (res.data) {
    return res.data;
  } else {
    try {
      checkStatus(res);
    } catch (error) {
      //checkstatus not provided
    }
    return null;
  }
};

//subscribe to forum
export const subscribeToForum = async (user, id, checkStatus) => {
  const res = await axios.post(
    `${BASE_URL}/subscribe/${id}`,
    {
      user: {
        _id: user._id,
        username: user.username,
      },
      forum: {},
    },
    getconfig(user)
  );

  if (res.data) {
    return res.data;
  } else {
    try {
      checkStatus(res);
    } catch (error) {
      //checkstatus not provided
    }
    return null;
  }
};

//unsubscribe from forum
export const unsubscribeFromForum = async (user, id, checkStatus) => {
  const res = await axios.post(
    `${BASE_URL}/unsubscribe/${id}`,
    {
      user: {
        _id: user._id,
        username: user.username,
      },
      forum: {},
    },
    getconfig(user)
  );

  if (res.data) {
    return res.data;
  } else {
    try {
      checkStatus(res);
    } catch (error) {
      //checkstatus not provided
    }
    return null;
  }
};

//get subscribed forums
export const getSubscribedForumsByUser = async (user, checkStatus) => {
  try {
    const res = await axios.get(
      `${BASE_URL}/subscribed/${user._id}`,
      getconfig(user)
    );

    if (res.data) {
      return res.data;
    } else {
      try {
        checkStatus(res);
      } catch (error) {
        //checkstatus not provided
      }
      return null;
    }
  } catch (error) {
    //console.log(error);
  }
};

//like / unlike a forum
export const likeForum = async (user, id, checkStatus) => {
  const res = await axios.post(
    `${BASE_URL}/like/${id}`,
    {
      user: {
        _id: user._id,
        username: user.username,
      },
      forum: {},
    },
    getconfig(user)
  );

  if (res.data) {
    return res.data;
  } else {
    try {
      checkStatus(res);
    } catch (error) {
      //checkstatus not provided
    }
    return null;
  }
};

//get liked forums
export const getLikedForumsByUser = async (user, checkStatus) => {
  const res = await axios.get(`${BASE_URL}/liked/${user._id}`, getconfig(user));

  if (res.data) {
    return res.data;
  } else {
    try {
      checkStatus(res);
    } catch (error) {
      //checkstatus not provided
    }
    return null;
  }
};

//dislike / undislike a forum
export const dislikeForum = async (user, id, checkStatus) => {
  const res = await axios.post(
    `${BASE_URL}/dislike/${id}`,
    {
      user: {
        _id: user._id,
        username: user.username,
      },
      forum: {},
    },
    getconfig(user)
  );

  if (res.data) {
    return res.data;
  } else {
    try {
      checkStatus(res);
    } catch (error) {
      //checkstatus not provided
    }
    return null;
  }
};

//get disliked forums
export const getDislikedForumsByUser = async (user, checkStatus) => {
  const res = await axios.get(
    `${BASE_URL}/disliked/${user._id}`,
    getconfig(user)
  );

  if (res.data) {
    return res.data;
  } else {
    try {
      checkStatus(res);
    } catch (error) {
      //checkstatus not provided
    }
    return null;
  }
};

//reply to forum
export const replyToForum = async (user, id, reply, checkStatus) => {
  const res = await axios.post(
    `${BASE_URL}/reply/${id}`,
    {
      user: {
        _id: user._id,
        username: user.username,
      },
      content: reply,
    },
    getconfig(user)
  );

  if (res.data) {
    return res.data;
  } else {
    try {
      checkStatus(res);
    } catch (error) {
      //checkstatus not provided
    }
    return null;
  }
};

//delete reply
export const deleteReply = async (user, id, replyID, checkStatus) => {
  const res = await axios.delete(
    `${BASE_URL}/reply/${id}/${replyID}`,
    getconfig(user)
  );

  if (res.data) {
    return res.data;
  } else {
    try {
      checkStatus(res);
    } catch (error) {
      //checkstatus not provided
    }
    return null;
  }
};

//edit reply
export const editReply = async (user, id, replyID, reply, checkStatus) => {
  const res = await axios.put(
    `${BASE_URL}/reply/${id}/${replyID}`,
    {
      user: {
        _id: user._id,
        username: user.username,
      },
      content: reply,
    },
    getconfig(user)
  );

  if (res.data) {
    return res.data;
  } else {
    try {
      checkStatus(res);
    } catch (error) {
      //checkstatus not provided
    }
    return null;
  }
};

//like / unlike a reply
export const likeReply = async (user, id, replyID, checkStatus) => {
  const res = await axios.post(
    `${BASE_URL}/reply/like/${id}/${replyID}`,
    {
      user: {
        _id: user._id,
        username: user.username,
      },
      content: {},
    },
    getconfig(user)
  );

  if (res.data) {
    return res.data;
  } else {
    try {
      checkStatus(res);
    } catch (error) {
      //checkstatus not provided
    }
    return null;
  }
};

//dislike / undislike a reply
export const dislikeReply = async (user, id, replyID, checkStatus) => {
  const res = await axios.post(
    `${BASE_URL}/reply/dislike/${id}/${replyID}`,
    {
      user: {
        _id: user._id,
        username: user.username,
      },
      content: {},
    },
    getconfig(user)
  );

  if (res.data) {
    return res.data;
  } else {
    try {
      checkStatus(res);
    } catch (error) {
      //checkstatus not provided
    }
    return null;
  }
};

//accept reply as answer
export const acceptReply = async (user, id, replyID, checkStatus) => {
  const res = await axios.post(
    `${BASE_URL}/reply/accept/${id}/${replyID}`,
    {},
    getconfig(user)
  );

  if (res.data) {
    return res.data;
  } else {
    try {
      checkStatus(res);
    } catch (error) {
      //checkstatus not provided
    }
    return null;
  }
};

//mark forum as resolved
export const markResolved = async (user, id, checkStatus) => {
  const res = await axios.post(
    `${BASE_URL}/resolve/${id}`,
    {},
    getconfig(user)
  );

  if (res.data) {
    return res.data;
  } else {
    try {
      checkStatus(res);
    } catch (error) {
      //checkstatus not provided
    }
    return null;
  }
};

//get user's forums
export const getForumsByUser = async (user, checkStatus) => {
  try {
    const res = await axios.get(
      `${BASE_URL}/myforums/${user._id}`,
      getconfig(user)
    );

    if (res.data) {
      return res.data;
    } else {
      try {
        checkStatus(res);
      } catch (error) {
        //checkstatus not provided
      }
      return null;
    }
  } catch (error) {
    //console.log(error.message);
  }
};

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
  getLikedForumsByUser,
  dislikeForum,
  getDislikedForumsByUser,
  replyToForum,
  deleteReply,
  editReply,
  likeReply,
  dislikeReply,
  acceptReply,
  markResolved,
  getForumsByUser,
};
