/** @format */

import { useState, useEffect } from "react";
import { PublicBlogCard, Loader, BlogContainer } from "../../components";
import { useParams } from "react-router-dom";
import { searchBlog } from "../../api/blog";

const BlogSearch = () => {
  const { searchTerm } = useParams();

  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Promise.all([searchBlog(searchTerm)])
      .then(([blogRes]) => {
        setSearchResults([...blogRes.data]);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [searchTerm]);
  console.log(searchResults);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div>
      <BlogContainer>
        <div className="flex flex-col items-center justify-center bg-gray-900">
          <div className="flex flex-col items-center place-items-center py-5 px-8 ml-0 mr-auto w-full">
            <h1 className="text-3xl text-left text-white font-bold pt-5 pl-5">
              Search Results for : {searchTerm}
            </h1>

            <hr className="border-gray-500 border-1 w-full mt-4" />
          </div>
          <div className="flex flex-wrap justify-center md:justify-center md:pl-3">
            {searchResults.map((blog) => (
              <div key={blog._id} className="m-4 w-full">
                <PublicBlogCard
                  title={blog.title}
                  author={blog.author.firstName + " " + blog.author.lastName}
                  authorID={blog.author._id}
                  date={blog.createdAt}
                  tags={blog.tags}
                  likes={blog.likes.length}
                  dislikes={blog.dislikes.length}
                  comments={blog.comments.length}
                />
              </div>
            ))}
          </div>
        </div>
      </BlogContainer>
    </div>
  );
};
export default BlogSearch;
