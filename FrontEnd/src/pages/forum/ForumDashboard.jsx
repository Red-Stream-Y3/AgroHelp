import React, { useState, useEffect } from "react";
import { Forum } from "../../api/forum.js";
import { FaSpinner } from "react-icons/fa";
import { useGlobalContext } from "../../context/ContextProvider";
import { ForumCard } from "../../components";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ForumDashboard = (props) => {

	const { user } = useGlobalContext();

	const [recentForums, setRecentForums] = useState([]);
	const [search, setSearch] = useState("");
	const [searchResults, setSearchResults] = useState([]);
	const [searched, setSearched] = useState(false);
	const [loading, setLoading] = useState(false);

	//save toast method in global context
	const notify = (type, message) => {
		switch (type) {
		case "success":
			toast.success(message);
			break;
		case "error":
			toast.error(message);
			break;
		case "info":
			toast.info(message);
			break;
		case "warning":
			toast.warn(message);
			break;
		default:
			toast(message);
			break;
		}
	};

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
				if(res.data.message){
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
	
	

	//get the top 10 recent forums
	useEffect(() => {
		const fetchForums = async () => {
			setLoading(true);
			const forums = await Forum.getForums(checkStatus);
			setRecentForums(forums);
			setLoading(false);
		};
		fetchForums();
		
	}, []);

    return (
        <div className="text-white p-5 sm:p-5">
            <h1 className="my-1 sm:my-3 text-2xl sm:text-3xl font-bold tracking-tight ml-4 sm:ml-8">
                FORUM
            </h1>
            <hr className="border-1 border-white opacity-50" />
            <div id="forumContainer" className="max-w-md sm:max-w-3xl m-auto">
                {loading ? (
                    <FaSpinner
                        className={"animate-spin mt-5 sm:mt-10 mx-auto"}
                        size={40}
                    />
                ) : (
                    <div>
						{recentForums.map((forum) => {
							return <ForumCard key={forum._id} forum={forum} checkRes={checkStatus} notify={notify} />;
						})}
					</div>
                )}
            </div>
			<ToastContainer />
        </div>
    );
};

export default ForumDashboard;
