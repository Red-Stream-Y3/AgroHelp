import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { Navbar, Footer } from './components';
import {
  Home,
  AdminHome,
  AdminDashboard,
  ManageKnowledge,
  ManageBlogs,
  ManageUsers,
  ManageComments,
  ForumDashboard,
  Login,
  Register,
  Crop,
  Disease,
} from './pages';
import { BlogDashboard } from './pages';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
                    }}>
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />

                        <Route path="/admin/*" element={<AdminHome />}>
                            <Route
                                path="dashboard"
                                element={<AdminDashboard />}
                            />
                            <Route
                                path="knowledge"
                                element={<ManageKnowledge />}
                            />
                            <Route path="blogs" element={<ManageBlogs />} />
                            <Route path="users" element={<ManageUsers />} />
                            <Route
                                path="comments"
                                element={<ManageComments />}
                            />
                        </Route>

                        <Route path="/crops/:id" element={<Crop />} />
                        <Route path="/diseases/:id" element={<Disease />} />

                        <Route path="/forum" element={<ForumDashboard />} />

                        <Route path="/blogs" element={<BlogDashboard />} />
                    </Routes>

                    <Footer />
                </div>
            </BrowserRouter>
        </>
    );
}

export default App;
