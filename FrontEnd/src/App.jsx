import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar, Footer } from './components';
import {
  Home,
  AdminHome,
  AdminDashboard,
  ManageArticles,
  ManageUsers,
  ManageComments,
} from './pages';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />

        <Route path="/admin/*" element={<AdminHome />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="manage-articles" element={<ManageArticles />} />
          <Route path="manage-users" element={<ManageUsers />} />
          <Route path="manage-comments" element={<ManageComments />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
