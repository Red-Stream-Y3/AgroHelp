const {
    getForums,
    getForumById,
    createForum,
    updateForum,
    deleteForum,
    searchForums,
    subscribeToForum,
    unsubscribeFromForum,
    getSubscribedForums,
    likeForum,
    unlikeForum,
    getLikedForums,
    dislikeForum,
    undislikeForum,
    getDislikedForums,
    replyToForum,
    deleteReplyFromForum,
    editReplyOnForum,
    likeReplyOnForum,
    unlikeReplyOnForum,
    dislikeReplyOnForum,
    undislikeReplyOnForum,
    acceptReplyAsAnswer,
    resolveForum,
    getMyForums,
} = require("../controllers/forumController");

const mockRequest = (data) => {
    const req = {
        body: {},
    };

    if(data){
        req.body = data;
    }

    return req;
  }

const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };

//test case for getForums
describe("getForums", () => {
    test("should return 200 status code", async () => {
        const req = mockRequest();
        const res = mockResponse();
        await getForums(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
    }, 50000);
});