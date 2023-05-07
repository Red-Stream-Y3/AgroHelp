/** @format */

import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaPenNib } from "react-icons/fa";
import { BlogContainer, Loader } from "../../components";
import { Editor } from "@tinymce/tinymce-react";
import { useGlobalContext } from "../../context/ContextProvider";
import { createBlog } from "../../api/blog";
import { toast } from "react-toastify";

export default function BlogCreate() {
  //const { user } = useGlobalContext();

  const user = JSON.parse(localStorage.getItem("userInfo"));
  const authorID = user._id;

  const isLogged = user; // Check if user exists

  const [blog, setBlog] = useState({
    title: "",
    body: "",
    tags: "",
    author: authorID,
  });

  const handleEditorChange = (content, editor) => {
    setBlog({ ...blog, body: content });
  };

  const handleChange = (e) => {
    setBlog({
      ...blog,
      [e.target.name]: e.target.value,
    });
  };
  const navigateTo = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newBlog = await createBlog(blog);
      toast.success("Blog Uploaded!", {
        hideProgressBar: false,
        closeOnClick: true,
        autoClose: 1500,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => {
        navigateTo(`/viewblog/${newBlog._id}`);
      }, 2000);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    if (!user || !isLogged) {
      window.location.href = "/login";
    }
  }, [isLogged, user]);

  return (
    <>
      {!isLogged ? (
        <Loader />
      ) : (
        <div className="my-4">
          <BlogContainer>
            <div className="flex items-center">
              <FaPenNib className="h-8 w-8 text-primarylight m-2" />
              <span className="text-white text-2xl font-bold ml-2 ">
                Drafting as
                <span className="text-gray-300"> {user.firstName} {user.lastName} ({user.username})</span>
              </span>
            </div>
            <hr className="border-gray-500 border-1 w-full mt-4" />

            <form onSubmit={handleSubmit} className="my-4">
              <div className="flex flex-col">
                <label className="text-white text-xl font-bold my-4">Title</label>
                <input
                  className="border-2 border-gray-300 p-2 rounded-lg"
                  type="text"
                  name="title"
                  placeholder="Title"
                  value={blog.title}
                  onChange={handleChange}
                />
              </div>

              <div className="flex flex-col my-4">
                <label className="text-white text-xl font-bold my-4">Content</label>
                <Editor
                  apiKey="in0avjv2q4rxzz3r60yiu4b4m1uej22oxbuc8pohxxbj2npx"
                  value={blog.body}
                  init={{
                    height: 500,
                    menubar: true,
                    plugins:
                      "advlist autolink lists link image charmap print preview anchor searchreplace visualblocks code fullscreen insertdatetime media table paste code help wordcount",
                    toolbar:
                      "undo redo | formatselect | bold italic backcolor | \
                      alignleft aligncenter alignright alignjustify | \
                      bullist numlist outdent indent | removeformat | image | help",
                    image_title: true,
                    image_caption: true,
                    image_dimensions: false,
                    image_class_list: [
                      { title: "None", value: "" },
                      { title: "Responsive", value: "img-fluid" },
                    ],
                    image_uploadtab: true,
                    //images_upload_url: "YOUR_IMAGES_UPLOAD_URL",
                    images_upload_handler: function (
                      blobInfo,
                      success,
                      failure
                    ) {
                      var xhr, formData;

                      xhr = new XMLHttpRequest();
                      xhr.withCredentials = false;
                      xhr.open("POST", "YOUR_IMAGES_UPLOAD_URL");

                      xhr.onload = function () {
                        var json;

                        if (xhr.status != 200) {
                          failure("HTTP Error: " + xhr.status);
                          return;
                        }

                        json = JSON.parse(xhr.responseText);

                        if (!json || typeof json.location != "string") {
                          failure("Invalid JSON: " + xhr.responseText);
                          return;
                        }

                        success(json.location);
                      };

                      formData = new FormData();
                      formData.append(
                        "file",
                        blobInfo.blob(),
                        blobInfo.filename()
                      );

                      xhr.send(formData);
                    },
                  }}
                  onEditorChange={handleEditorChange}
                />
              </div>

              <div className="flex flex-col my-4">
                <label className="text-white text-xl font-bold my-4">Tags</label>
                <input
                  className="border-2 border-gray-300 p-2 rounded-lg"
                  type="text"
                  name="tags"
                  placeholder="Tags (comma separated)"
                  value={blog.tags}
                  onChange={handleChange}
                />
              </div>

              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                type="submit"
                onClick={handleSubmit}
              >
                Upload
              </button>
            </form>

            <div className="my-4 flexitems-center"></div>
          </BlogContainer>
        </div>
      )}
    </>
  );
}
