/** @format */

import React from "react";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaPenNib } from "react-icons/fa";
import { BlogContainer, Loader } from "../../components";
import { Editor } from "@tinymce/tinymce-react";
import { updateBlog, getBlogById } from "../../api/blog";
import { useParams } from "react-router-dom";

export default function BlogUpdate() {
  const { id } = useParams();

  const navigateTo = useNavigate();

  const user = JSON.parse(localStorage.getItem("userInfo"));
  const authorID = user._id;

  const [blog, setBlog] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState("");
  const [author, setAuthor] = useState("");

  //fetch blog by id
  useEffect(() => {
    try {
      const fetchBlog = async () => {
        const blog = await getBlogById(id);
        setBlog(blog);
        //console.log(blog);
      };
      fetchBlog();
    } catch (error) {
      console.log("error", error);
    }
  }, [id]);

  useEffect(() => {
    if (blog) {
      setTitle(blog.title);
      setBody(blog.body);
      setTags(blog.tags);
      setAuthor(blog.author);
      //console.log(title);
    }
  }, [blog]);

  //handle editor change
  const handleEditorChange = (content, editor) => {
    setBody(content);
  };

  //handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedBlog = {
      title,
      body,
      tags,
      author: authorID,
    };

    try {
      const result = await updateBlog(id, updatedBlog);
      toast.success("Blog updated", {
        hideProgressBar: false,
        closeOnClick: true,
        autoClose: 1500,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => {
        navigateTo(`/viewblog/${id}`);
      }, 1000);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="my-4">
      <BlogContainer>
        <div className="flex items-center">
          <FaPenNib className="h-8 w-4 text-green-500" />
          <span className=" text-gray-200 text-2xl font-extrabold ml-2 ">
            Drafting as {user.username}
          </span>
        </div>

        <form onSubmit={handleSubmit} className="my-4">
          <div className="flex flex-col">
            <label className="text-xl text-gray-200 font-bold my-4">
              Title
            </label>
            <input
              className="border-2 border-gray-300 p-2 rounded-lg"
              type="text"
              name="title"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="flex flex-col my-4">
            <label className=" text-gray-200 font-bold text-xl my-4">
              Content
            </label>
            <Editor
              apiKey="in0avjv2q4rxzz3r60yiu4b4m1uej22oxbuc8pohxxbj2npx"
              value={body}
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
                images_upload_handler: function (blobInfo, success, failure) {
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
                  formData.append("file", blobInfo.blob(), blobInfo.filename());

                  xhr.send(formData);
                },
              }}
              onEditorChange={handleEditorChange}
            />
          </div>

          <div className="flex flex-col my-4">
            <label className=" text-gray-200 font-bold my-4">Tags</label>
            <input
              className="border-2 border-gray-300 p-2 rounded-lg mb-8'"
              type="text"
              name="tags"
              placeholder="Tags (comma separated)"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </div>

          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
            onClick={handleSubmit}
          >
            Save Changes
          </button>
        </form>

        <div className="my-4 flexitems-center"></div>
      </BlogContainer>
    </div>
  );
}
