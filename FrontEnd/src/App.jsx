/** @format */

import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { Navbar, Footer } from "./components";
import {
  Home,
  AdminHome,
  AdminDashboard,
  ManageKnowledge,
  ManageForum,
  ManageBlogs,
  ManageUsers,
  ManageComments,
  ForumDashboard,
  Login,
  Register,
  Profile,
  AccountSettings,
  Crop,
  Disease,
  KnowledgeBase,
  CreateCrop,
  CreateDisease,
  UpdateCrop,
  UpdateDisease,
  MyArticles,
  Search,
} from "./pages";
import {
  BlogDashboard,
  BlogCreate,
  BlogView,
  BlogUpdate,
  BlogsbyAuthor,
  MyBlogPosts,
  BookmarkedBlogs,
  BlogSearch,
} from "./pages";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/settings" element={<AccountSettings />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/search/:searchTerm" element={<Search />} />

            <Route path="/admin/*" element={<AdminHome />}>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="knowledge" element={<ManageKnowledge />} />
              <Route path="forum" element={<ManageForum />} />
              <Route path="blogs" element={<ManageBlogs />} />
              <Route path="users" element={<ManageUsers />} />
              <Route path="comments" element={<ManageComments />} />
            </Route>

            <Route path="knowledge-base" element={<KnowledgeBase />} />
            <Route path="crop/:id" element={<Crop />} />
            <Route path="disease/:id" element={<Disease />} />
            <Route path="create/crop" element={<CreateCrop />} />
            <Route path="create/disease" element={<CreateDisease />} />
            <Route path="update/crop/:id" element={<UpdateCrop />} />
            <Route path="update/disease/:id" element={<UpdateDisease />} />
            <Route path="contributor/dashboard" element={<MyArticles />} />
            <Route path="/forum" element={<ForumDashboard />} />

            <Route path="/blog" element={<BlogDashboard />} />
            <Route path="/createblog" element={<BlogCreate />} />
            <Route path="/viewblog/:id" element={<BlogView />} />
            <Route path="/editblog/:id" element={<BlogUpdate />} />
            <Route path="/blogAuthor/:id" element={<BlogsbyAuthor />} />
            <Route path="/myblogs/:id" element={<MyBlogPosts />} />
            <Route path="/blogsearch/:searchTerm" element={<BlogSearch />} />
            <Route path="/savedBlogs/:id" element={<BookmarkedBlogs />} />
          </Routes>

          <Footer />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
