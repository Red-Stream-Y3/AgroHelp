import React from 'react'
import { useState, useEffect } from 'react'
import { FaSearch } from 'react-icons/fa'
import {BlogContainer, BlogBanner, BlogCard, BlogSearchBar}  from '../../components'
import { Link } from 'react-router-dom'

export default function BlogDashboard() {

  const [blogs, setBlogs] = useState([]);

  //get all blogs
  const getAllBlogs = async() => {
    try{
      const response = await fetch("http://localhost:9120/api/blog");
      const jsonData = await response.json();

      setBlogs(jsonData);
      //console.log(jsonData);
    } catch(err){
      console.error(err.message);
    }
  };

  useEffect(() => {
    getAllBlogs();
  }, []);

  //date formatter
  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US');
  }
  return (
    <div>
      <BlogBanner />
      <BlogContainer>
        <BlogSearchBar/>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4 mt-2">
          {blogs.map(blog => (
            <div key={blog.id}>
              <BlogCard
                title={blog.title}
                author={blog.author.firstName + " " + blog.author.lastName}
                date={formatDate(blog.createdAt)}
                tags={blog.tags}
                onClick={() => console.log("Blog Card clicked!")}
              />
            </div>
          ))}            
        </div>
        
      </BlogContainer>
    </div>
      
  )
}
