import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar, Footer } from './components';
import {
  Home,
  AdminHome,
  AdminDashboard,
  ManageBlogs,
  ManageUsers,
  ManageComments,
  ForumDashboard,
  Login,
  Register,
  Crop,
} from './pages';
import { BlogDashboard } from './pages';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/admin/*" element={<AdminHome />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="manage-blogs" element={<ManageBlogs />} />
          <Route path="manage-users" element={<ManageUsers />} />
          <Route path="manage-comments" element={<ManageComments />} />
        </Route>

        <Route path="/crops/:id" element={<Crop />} />

        <Route path="/forum" element={<ForumDashboard />} />

        <Route path="/blogs" element={<BlogDashboard />} />
        
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
