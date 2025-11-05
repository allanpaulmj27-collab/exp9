import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Vendors from './pages/Vendors';
import Products from './pages/Products';

function App() {
  const token = localStorage.getItem('token');

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm fixed-top">
  <div className="container-fluid px-5">
    <Link className="navbar-brand fw-bold fs-4 text-primary" to="/">Marketplace</Link>
    <div className="d-flex align-items-center gap-2">
      <Link className="btn btn-outline-primary" to="/vendors">Vendors</Link>
      <Link className="btn btn-outline-success" to="/products">Products</Link>
      {!token ? (
        <>
          <Link className="btn btn-outline-primary" to="/login">Login</Link>
          <Link className="btn btn-primary" to="/register">Register</Link>
        </>
      ) : (
        <Link className="btn btn-danger" to="/dashboard">Dashboard</Link>
      )}
    </div>
  </div>
</nav>


      <div className="container mt-5 pt-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/vendors" element={<Vendors />} />
          <Route path="/products" element={<Products />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
