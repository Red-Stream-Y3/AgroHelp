/** @format */

import React, { useEffect } from "react";
import { BlogContainer, BlogHeader } from "../../components";
import { useParams } from "react-router-dom";

export default function BlogView() {
  const [blog, setBlog] = React.useState({});
  const { id } = useParams();

  //console.log(id);

  const getBlogbyId = async () => {
    try {
      const response = await fetch(`http://localhost:9120/api/blog/${id}`);
      const jsonData = await response.json();

      setBlog(jsonData);
      //console.log(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getBlogbyId();
  }, [id]);

  //date formatter
  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB");
  }

  const firstName = blog.author ? blog.author.firstName : "";
  const lastName = blog.author ? blog.author.lastName : "";
  const authorDP = blog.author ? blog.author.profilePic : "";

  return (
    <div className="my-4">
      <BlogContainer>
        <BlogHeader
          title={blog.title}
          author={firstName + " " + lastName}
          authorDP={authorDP}
          date={formatDate(blog.createdAt)}
          tags={blog.tags}
        />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {blog.body &&
            blog.body.map((item) => {
              return (
                <div key={item.id}>
                  {item.type === "text" && <p>{item.content}</p>}
                  {item.type === "image" && <img src={item.content} alt="" className="my-4 object-cover h-48 w-96 ..." />}
                </div>
              );
            })}
        </div>
      </BlogContainer>
    </div>
  );
}
