import React, { useState, useEffect } from "react";
import { Forum } from "../../api/forum.js";
import { FaSpinner } from "react-icons/fa";
import { useGlobalContext } from "../../context/ContextProvider";
import { ForumCard, ForumCardContainer, ForumSearch, ForumSearchResults, Loader } from "../../components";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdOutlineAdd } from "react-icons/md";
import { Popup } from "../../components";

const ForumDashboard = (props) => {
    //TODO: send email when resolved

    //current user and toast methods
    const { user, notify } = useGlobalContext();
    
    //forums
    const [recentForums, setRecentForums] = useState([]);
    const [myForums, setMyForums] = useState([]);
    const [subscribedForums, setSubscribedForums] = useState([]);

    //inputs
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [searchSelected, setSearchSelected] = useState({}); //forum selected from search results
	const [title, setTitle] = useState(""); //create form title
	const [content, setContent] = useState(""); //create form content

    //status
    const [searched, setSearched] = useState(false);
    const [showSearchSelected, setShowSearchSelected] = useState(false); //popup
    const [loading, setLoading] = useState(false);
    const [searching, setSearching] = useState(false); //searching forums
	const [showCreateForum, setShowCreateForum] = useState(false);
	const [createForumLoading, setCreateForumLoading] = useState(false);
	const [dashLoaded, setDashLoaded] = useState(false);
	const [myLoaded, setMyLoaded] = useState(false);
	const [subLoaded, setSubLoaded] = useState(false);
    const [tab, setTab] = useState("dashboard"); //dashboard, myForums, subscribed

    const selectTab = (tab) => {
        setTab(tab);
    };

    //search forums
    const handleSearch = async () => {
        if (search === "") {
            notify("error", "Please enter a search query");
            return;
        }

        setSearched(true);
        setSearching(true);

        const res = await Forum.searchForums(search, (res) => {
            res.status >= 400
                ? notify("error", "Error getting recent forums")
                : null;
        });
        setSearchResults(res);

        setSearching(false);
    };

    //refresh dashboard forums
    const refreshDashboardForums = async () => {
        if(dashLoaded) return;

        setLoading(true);

        const recent = await Forum.getForums((res) => {
            res.status >= 400
                ? notify("error", "Error getting recent forums")
                : null;
        });

        if (recent !== null && recent !== undefined) {
            setRecentForums(recent);
            setDashLoaded(true);
        }
        
        setLoading(false);
    };
	
	//refresh my forums
    const refreshMyForums = async () => {
        if (myLoaded) return;

        setLoading(true);

        const my = await Forum.getForumsByUser(user, (res)=>{
            res.status >= 400
                ? notify("error", "Error getting your forums")
                : null;
        });

        if (my !== null && my !== undefined) {
            setMyForums(my);
            setMyLoaded(true);
        }

        setLoading(false);
    };

	//refresh subscribed forums
    const refreshSubscribedForums = async () => {
        if(subLoaded) return;

        setLoading(true);

			const sub = await Forum.getSubscribedForumsByUser(user, (res) => {
                res.status >= 400
                    ? notify("error", "Error getting subscribed forums")
                    : null;
            });

            if (sub !== null && sub !== undefined) {
                setSubscribedForums(sub);
                setSubLoaded(true);
            }
			
			setLoading(false);
    };

    //initial forum loading
    useEffect(() => {
        refreshDashboardForums();
        refreshMyForums();
        refreshSubscribedForums();
    }, [user]);

    //get search results
    useEffect(() => {
        if (searched && search.length > 0) {
            handleSearch();
        }
    }, [search]);

    //refresh all forums
    const refreshAllForums = async (keepCurrent) => {
        const refresh = async () => {
            if (
                keepCurrent !== null &&
                keepCurrent !== undefined &&
                keepCurrent === true
            ) {
                //refresh other tabs except current tab
                switch (tab) {
                    case "dashboard":
                        setMyLoaded(false);
                        setSubLoaded(false);
                        break;
                    case "myForums":
                        setDashLoaded(false);
                        setSubLoaded(false);
                        break;
                    case "subscribed":
                        setDashLoaded(false);
                        setMyLoaded(false);
                        break;
                }
            } else {
                setDashLoaded(false);
                setMyLoaded(false);
                setSubLoaded(false);
            }
        };
        await refresh();
    };

	//create a forum
	const handleCreateForum = async () => {
		
		if (title === "" || content === "") {
			notify("error", "Please fill in all fields");
			return;
		}

		setCreateForumLoading(true);

		const res = await Forum.createForum(user, {title:title, content:content}, (res) => {
            res.status >= 400
                ? notify("error", "Error getting recent forums")
                : null;
        });
        
		if (res) {
			setShowCreateForum(false);
			setTitle("");
			setContent("");
			setDashLoaded(false);
			setMyLoaded(false);
			notify("success", "Forum created successfully");
		}

		setCreateForumLoading(false);
	};

    const tabClasses =
        "transition-all border-b border-gray-200 inline-block p-4 rounded-t-lg text-gray-400 hover:text-green-400 hover:border-green-400";
    const tabHighlightClasses =
        " text-green-500 border-green-500 border-b-4 bg-gray-700 rounded-t-lg";
    return (
        <div style={{ height: "calc(100% - 20px)" }} className="text-white p-5">
            {searched && (
                <div
                    onClick={() => setSearched(false)}
                    className="fixed left-0 z-10 w-full h-full"
                />
            )}

            {/* Search bar for mobile */}
            <div className="lg:hidden">
                <ForumSearch
                    search={search}
                    setSearch={setSearch}
                    setSearched={setSearched}
                    handleSearchClick={handleSearch}
                />
                {/* Search results */}
                {searched && (
                    <div className="relative">
                        <ForumSearchResults
                            searching={searching}
                            searchResults={searchResults}
                            setSearched={setSearched}
                            setSelected={setSearchSelected}
                            setShowSelected={setShowSearchSelected}
                        />
                    </div>
                )}
            </div>

            {/* Title and tabs */}
            <div className="mt-2 flex">
                <h1 className="hidden sm:block my-1 sm:my-3 text-2xl sm:text-3xl font-bold tracking-tight ml-4 sm:ml-8">
                    FORUM
                </h1>
                <div className="sm:block sm:ml-5 w-fit dark:border-gray-700">
                    <ul className="flex flex-wrap -mb-px text-sm font-medium text-center">
                        <li className="mr-2">
                            <button
                                onClick={() => selectTab("dashboard")}
                                className={`${tabClasses}+${
                                    tab === "dashboard"
                                        ? tabHighlightClasses
                                        : ""
                                }`}>
                                Latest
                            </button>
                        </li>
                        <li className="mr-2">
                            <button
                                onClick={() => selectTab("myForums")}
                                className={`${tabClasses}+${
                                    tab === "myForums" && tabHighlightClasses
                                }`}>
                                My Forums
                            </button>
                        </li>
                        <li className="mr-2">
                            <button
                                onClick={() => selectTab("subscribed")}
                                className={`${tabClasses}+${
                                    tab === "subscribed" && tabHighlightClasses
                                }`}>
                                Subscribed
                            </button>
                        </li>
                    </ul>
                </div>

                {/* searchbar for desktop */}
                <div className="ml-3 hidden lg:inline w-120 pt-2">
                    <ForumSearch
                        search={search}
                        setSearch={setSearch}
                        handleSearchClick={handleSearch}
                        setSearched={setSearched}
                    />
                    {/* Search results */}
                    {searched && (
                        <div className="relative">
                            <ForumSearchResults
                                searching={searching}
                                searchResults={searchResults}
                                setSearched={setSearched}
                                setSelected={setSearchSelected}
                                setShowSelected={setShowSearchSelected}
                            />
                        </div>
                    )}
                </div>
            </div>

            <hr className="border-1 border-white opacity-50" />

            {/* main container */}
            <div
                id="forumContainer"
                className="sm:px-20 sm:py-2 max-w-md sm:max-w-full m-auto">
                {loading ? (
                    <div>
                        <Loader />
                    </div>
                ) : (
                    <>
                        {tab === "dashboard" && (
                            <>
                                {recentForums.length > 0 ? (
                                    <ForumCardContainer
                                        forums={recentForums}
                                        tab={tab}
                                        loaded={dashLoaded}
                                        refresh={refreshDashboardForums}
                                        refreshAll={refreshAllForums}
                                    />
                                ) : (
                                    <div className="m-auto w-fit mt-5 text-gray-500">
                                        No forums to display!
                                    </div>
                                )}
                            </>
                        )}
                        {tab === "myForums" && (
                            <div>
                                {user === null || user === undefined ? (
                                    <div className="m-auto w-fit mt-5 text-gray-500">
                                        You must be logged in to create a forum
                                    </div>
                                ) : (
                                    <>
                                        <div className="m-auto w-fit">
                                            <button
                                                onClick={() => {
                                                    setShowCreateForum(true);
                                                }}
                                                className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 rounded mt-5 mb-5">
                                                <MdOutlineAdd className="inline-block mr-2" />
                                                Create Forum
                                            </button>
                                        </div>
                                        {myForums.length > 0 ? (
                                            <ForumCardContainer
                                                forums={myForums}
                                                tab={tab}
                                                loaded={myLoaded}
                                                refresh={refreshMyForums}
                                                refreshAll={refreshAllForums}
                                            />
                                        ) : (
                                            <div className="m-auto w-fit mt-5 text-gray-500">
                                                You have not created any forums
                                                yet {" " + showCreateForum}
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        )}
                        {tab === "subscribed" && (
                            <div>
                                {user === null || user === undefined ? (
                                    <div className="m-auto w-fit mt-5 text-gray-500">
                                        You must be logged in to see your
                                        subscribed forums
                                    </div>
                                ) : (
                                    <>
                                        {subscribedForums.length > 0 ? (
                                            <ForumCardContainer
                                                forums={subscribedForums}
                                                tab={tab}
                                                loaded={subLoaded}
                                                refresh={refreshSubscribedForums}
                                                refreshAll={refreshAllForums}
                                            />
                                        ) : (
                                            <div className="m-auto w-fit mt-5 text-gray-500">
                                                You have not subscribed to any
                                                forums yet
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* Create forum popup */}
            <Popup show={showCreateForum} setShow={setShowCreateForum}>
                <div>
                    <p className="text-xl font-bold">Create Forum</p>
                    <hr className="border-1 border-gray-200 opacity-50" />
                    <input
                        type="text"
                        className="w-full bg-slate-800 mt-5 p-2 rounded border-2 border-gray-500 focus:outline-none focus:border-green-500"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <textarea
                        className="w-full bg-slate-800 mt-5 p-2 rounded border-2 border-gray-500 focus:outline-none focus:border-green-500"
                        placeholder="Further desriptions or explanations"
                        value={content}
                        autoCapitalize="on"
                        spellCheck="true"
                        onChange={(e) => setContent(e.target.value)}
                    />
                    <div className="flex justify-end mt-5">
                        <button
                            className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 rounded"
                            onClick={handleCreateForum}>
                            {createForumLoading ? (
                                <FaSpinner className="animate-spin" />
                            ) : (
                                "Create"
                            )}
                        </button>
                    </div>
                </div>
            </Popup>

            {/* Selected forum popup for search */}
            <Popup show={showSearchSelected} setShow={setShowSearchSelected} ring={true}>
                <div className="text-left w-screen max-w-sm sm:max-w-lg max-h-96 overflow-y-auto">
                    <ForumCard
                        forum={searchSelected}
                        checkRes={(res) =>
                            res >= 400
                                ? notify("error", "Error getting forum")
                                : null
                        }
                        notify={notify}
                        refreshAll={refreshAllForums}
                    />
                </div>
            </Popup>

            <ToastContainer />
        </div>
    );
};

export default ForumDashboard;
